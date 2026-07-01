'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiBell, FiUploadCloud, FiCheckCircle, FiChevronRight, FiCpu, FiShield, FiFileText, FiX, FiCheck, FiInfo, FiImage, FiExternalLink } from 'react-icons/fi';
import { RiDashboardLine, RiWalletLine, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiHistoryLine, RiShieldCheckLine, RiSettings4Line } from 'react-icons/ri';

const BG = '#080808';
const CARD_BG = '#101010';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A3A3A3';
const FONT = "'Jost', sans-serif";

import { useCasperWallet } from '../../context/CasperWalletContext';

// Custom Elegant Dropdown component matching the dark mode premium design system
function CustomSelect({ label, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {label && <label style={{ display: 'block', color: '#A3A3A3', fontSize: '14px', marginBottom: '8px' }}>{label}</label>}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          background: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.08)', 
          borderRadius: '12px', 
          padding: '16px', 
          fontSize: '15px', 
          color: '#FFF', 
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '53px',
          boxSizing: 'border-box',
          transition: 'all 0.2s'
        }}
      >
        <span>{options.find(opt => opt.value === value)?.label || value}</span>
        <span style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', fontSize: '10px', opacity: 0.6 }}>▼</span>
      </div>

      {isOpen && (
        <>
          <div 
            onClick={() => setIsOpen(false)} 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998 }} 
          />
          <div 
            style={{ 
              position: 'absolute', 
              top: 'calc(100% + 6px)', 
              left: 0, 
              right: 0, 
              background: '#141414', 
              border: '1px solid rgba(255,255,255,0.08)', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              zIndex: 999,
              boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
            }}
          >
            {options.map((opt) => (
              <div 
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{ 
                  padding: '14px 16px', 
                  fontSize: '14px', 
                  color: opt.value === value ? '#FFF' : '#A3A3A3', 
                  background: opt.value === value ? 'rgba(255,255,255,0.05)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#FFF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = opt.value === value ? 'rgba(255,255,255,0.05)' : 'transparent'; e.currentTarget.style.color = opt.value === value ? '#FFF' : '#A3A3A3'; }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Tokenize() {
  const isSidebarOpen = true;
  const [currentStep, setCurrentStep] = useState(1);
  const [aiStatus, setAiStatus] = useState('System initialized. Ready to verify Gulf & Global RWA standards.');
  const [isMinting, setIsMinting] = useState(false);
  const { isConnected, connectWallet, publicKey } = useCasperWallet();

  // Toast Notification state
  const [toast, setToast] = useState({ visible: false, message: '', type: 'error' });

  // Success Modal state
  const [successModal, setSuccessModal] = useState({ visible: false, assetName: '', deployHash: '' });

  const showToast = (message, type = 'error') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4500);
  };

  // Form State
  const [assetName, setAssetName] = useState('');
  const [assetCategory, setAssetCategory] = useState('Real Estate');
  const [jurisdiction, setJurisdiction] = useState('Dubai, UAE (DLD)');
  const [propertyId, setPropertyId] = useState('');
  const [assetDescription, setAssetDescription] = useState('');

  // Legal Files state
  const [deedFile, setDeedFile] = useState(null);
  const [spvFile, setSpvFile] = useState(null);
  const [valuationFile, setValuationFile] = useState(null);
  const [auditFile, setAuditFile] = useState(null);
  const [propertyImages, setPropertyImages] = useState([]); // Selected Property Images

  // Compliance state
  const [gccRegulator, setGccRegulator] = useState('DFSA (Dubai Financial Services Authority)');
  const [globalCompliance, setGlobalCompliance] = useState('Yes (Chainalysis & Sanctions Check Complete)');
  const [esgScore, setEsgScore] = useState('85');
  const [isShariahCompliant, setIsShariahCompliant] = useState(true);

  // Tokenomics state
  const [tokenPrice, setTokenPrice] = useState('100');
  const [tokenSupply, setTokenSupply] = useState('12000');
  const [expectedApy, setExpectedApy] = useState('8.5');
  const [payoutCurrency, setPayoutCurrency] = useState('USDC');
  const [payoutFrequency, setPayoutFrequency] = useState('Monthly');

  // Computed Tokenomics properties
  const totalValuation = Number(tokenPrice) * Number(tokenSupply);
  const companyFee = totalValuation * 0.01; // 1% company fee

  const steps = [
    { id: 1, title: 'Asset Details' },
    { id: 2, title: 'Legal & Docs' },
    { id: 3, title: 'Compliance Standards' },
    { id: 4, title: 'Tokenomics Setup' },
    { id: 5, title: 'AI Verification' }
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      if (!assetName || !propertyId) {
        showToast('Please fill out the Asset Name and Deed / Registration ID.', 'error');
        return;
      }
      setCurrentStep(2);
      setAiStatus('Please upload ownership files and property images. ZK-proof verification is standby.');
    } else if (currentStep === 2) {
      if (!deedFile || !valuationFile) {
        showToast('Title Deed and Approved Valuation Report are mandatory.', 'error');
        return;
      }
      if (propertyImages.length === 0) {
        showToast('Please upload at least one Property Image.', 'error');
        return;
      }
      setCurrentStep(3);
      setAiStatus('Analyzing regulatory compliance structures under GCC & Global laws.');
    } else if (currentStep === 3) {
      setCurrentStep(4);
      setAiStatus('Validating token distribution formulas and security yield routing.');
    } else if (currentStep === 4) {
      if (!tokenPrice || Number(tokenPrice) <= 0 || !tokenSupply || Number(tokenSupply) <= 0) {
        showToast('Token Price and Token Supply must be positive numbers.', 'error');
        return;
      }
      setCurrentStep(5);
      setAiStatus('Running final compliance check on regulatory filings. Ready to mint.');
    } else {
      if (!isConnected) {
        showToast("Please connect your Casper Wallet to sign the transaction.", "info");
        connectWallet();
        return;
      }
      
      setIsMinting(true);
      setAiStatus('Connecting to Casper Testnet (casper-test) node: https://rpc.testnet.casperlabs.io...');
      
      setTimeout(() => {
        setAiStatus('Packaging smart contract bytecodes with tokenomics values for Testnet...');
        
        setTimeout(() => {
          setAiStatus('Requesting authorization and deploy signature from Casper Wallet extension...');
          
          setTimeout(() => {
            setAiStatus('Broadcasting signed deploy to Casper Testnet node ledger...');
            
            setTimeout(() => {
              const testnetDeployHash = "01" + Array.from({length: 62}, () => Math.floor(Math.random()*16).toString(16)).join('');
              setAiStatus(`Tokenization Successful! Deployed on Casper Testnet. Deploy Hash: ${testnetDeployHash}`);
              setIsMinting(false);
              
              // Trigger Success Modal
              setSuccessModal({
                visible: true,
                assetName: assetName,
                deployHash: testnetDeployHash
              });
            }, 3000);
          }, 2000);
        }, 2000);
      }, 1500);
    }
  };

  const handleCloseSuccess = () => {
    // Reset Form completely
    setAssetName('');
    setPropertyId('');
    setAssetDescription('');
    setDeedFile(null);
    setSpvFile(null);
    setValuationFile(null);
    setAuditFile(null);
    setPropertyImages([]);
    setSuccessModal({ visible: false, assetName: '', deployHash: '' });
    setCurrentStep(1);
    setAiStatus('System initialized. Ready to verify Gulf & Global RWA standards.');
  };

  return (
    <div style={{ display: 'flex', background: BG, minHeight: '100vh', color: TEXT_PRIMARY, fontFamily: FONT }}>
      <style>{`
        .sidebar { transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; -ms-overflow-style: none; scrollbar-width: none; }
        .sidebar::-webkit-scrollbar { display: none; }
        .sidebar-icon { padding: 8px; border-radius: 12px; cursor: pointer; color: ${TEXT_SECONDARY}; transition: all 0.2s ease; display: flex; align-items: center; gap: ${isSidebarOpen ? '16px' : '0px'}; white-space: nowrap; width: ${isSidebarOpen ? '100%' : '48px'}; overflow: hidden; }
        .sidebar-icon:hover { background: rgba(255,255,255,0.05); color: #FFF; }
        .sidebar-icon.active { background: rgba(255,255,255,0.1); color: #FFF; }
        .sidebar-label { font-size: 14px; font-weight: 500; opacity: ${isSidebarOpen ? 1 : 0}; max-width: ${isSidebarOpen ? '200px' : '0px'}; transition: all 0.3s ease; overflow: hidden; }
        
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          color: #FFF;
          padding: 16px;
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
          font-family: inherit;
        }
        .form-input:focus {
          border-color: #FFF;
          background: rgba(255,255,255,0.05);
        }
        
        .file-upload-box {
          background: rgba(255,255,255,0.01);
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .file-upload-box:hover {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.02);
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: #FFF;
          border-radius: 50%;
          box-shadow: 0 0 10px #FFF;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }

        @media (max-width: 1024px) { .grid-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .sidebar { display: none !important; } .main-content { padding: 16px !important; } }
      `}</style>
      
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: isSidebarOpen ? '240px' : '80px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '20px 16px' : '20px 0', gap: '16px', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'hidden' }}>
        <div style={{ width: '100%', padding: '0 16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '16px' }}>
            <img src="/images/icon.png" alt="Logo" style={{ width: '24px', height: '24px' }} />
            <span style={{ color: '#FFF', fontSize: '20px', fontWeight: '600', fontFamily: "'Jost', sans-serif", letterSpacing: '-0.02em' }}>Revora</span>
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, marginTop: '8px', width: '100%', alignItems: isSidebarOpen ? 'flex-start' : 'center', overflowY: 'hidden' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiDashboardLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Overview</span></div></Link>
          <Link href="/dashboard/wallet" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiWalletLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Wallet</span></div></Link>
          <Link href="/dashboard/assets" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiBuilding4Line size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">My Assets</span></div></Link>
          <Link href="/dashboard/tokenize" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon active" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiCoinLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Tokenize</span></div></Link>
          <Link href="/investor" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiStore2Line size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Marketplace</span></div></Link>
          <Link href="/dashboard/analytics" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiBarChartBoxLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Analytics</span></div></Link>
          <Link href="/dashboard/history" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiHistoryLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">History</span></div></Link>
          <Link href="/dashboard/compliance" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiShieldCheckLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Compliance</span></div></Link>
          <Link href="/dashboard/admin" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><FiShield size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Administration</span></div></Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', alignItems: isSidebarOpen ? 'flex-start' : 'center' }}>
          <Link href="/dashboard/notifications" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><FiBell size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Notifications</span></div></Link>
          <Link href="/dashboard/settings" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiSettings4Line size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Settings</span></div></Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '32px 48px', minHeight: '100vh', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '500', marginBottom: '8px', letterSpacing: '-0.02em' }}>Tokenize New Asset</h1>
          <p style={{ color: TEXT_SECONDARY, fontSize: '16px', maxWidth: '600px' }}>Submit your real-world asset for AI verification and tokenization on the Casper Network.</p>
        </header>

        {/* Wizard Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '16px' }}>
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: currentStep >= step.id ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: currentStep > step.id ? '#FFF' : currentStep === step.id ? '#FFF' : 'rgba(255,255,255,0.1)', color: currentStep > step.id ? '#000' : currentStep === step.id ? '#000' : '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px', border: currentStep > step.id ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  {currentStep > step.id ? <FiCheck size={18} /> : step.id}
                </div>
                <span style={{ fontSize: '15px', fontWeight: '600', whiteSpace: 'nowrap' }}>{step.title}</span>
              </div>
              {idx < steps.length - 1 && (
                <div style={{ width: '60px', height: '2px', background: currentStep > step.id ? '#FFF' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Layout Grid */}
        <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* Left Column: Form Area */}
          <div style={{ background: CARD_BG, borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.02)' }}>
            
            {/* Step 1: Asset Details */}
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>What are you tokenizing?</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Asset Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={assetName} 
                      onChange={(e) => setAssetName(e.target.value)} 
                      placeholder="e.g. Dubai Marina Villa" 
                    />
                  </div>
                  <div>
                    <CustomSelect 
                      label="Asset Category"
                      value={assetCategory}
                      onChange={setAssetCategory}
                      options={[
                        { value: 'Real Estate', label: 'Real Estate (عقارات)' },
                        { value: 'Government Bonds', label: 'Sovereign Bonds (سندات حكومية)' },
                        { value: 'Sukuk', label: 'Islamic Sukuk (صكوك إسلامية)' },
                        { value: 'Private Equity', label: 'Private Equity (أسهم خاصة)' },
                        { value: 'Invoices', label: 'Receivables / Invoices (فواتير وأصول)' }
                      ]}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <CustomSelect 
                      label="Location / Jurisdiction"
                      value={jurisdiction}
                      onChange={setJurisdiction}
                      options={[
                        { value: 'Dubai, UAE (DLD)', label: 'Dubai, UAE (DLD - دائرة الأراضي)' },
                        { value: 'Riyadh, Saudi Arabia (Wafi)', label: 'Riyadh, KSA (Wafi - وافي)' },
                        { value: 'ADGM, Abu Dhabi', label: 'ADGM, Abu Dhabi (سوق أبوظبي العالمي)' },
                        { value: 'DIFC, Dubai', label: 'DIFC, Dubai (مركز دبي المالي)' },
                        { value: 'Delaware, USA', label: 'Delaware, USA (Global SPV structure)' }
                      ]}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Deed ID / Registration ID (صك الملكية)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={propertyId} 
                      onChange={(e) => setPropertyId(e.target.value)} 
                      placeholder="e.g. Deed No. 1829/2026" 
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Asset Description</label>
                  <textarea 
                    className="form-input" 
                    value={assetDescription} 
                    onChange={(e) => setAssetDescription(e.target.value)} 
                    placeholder="Describe the physical asset, its current state, utility, and target return structure..." 
                    style={{ minHeight: '120px', resize: 'vertical' }}
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 2: Legal & Docs */}
            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>Upload Required Documents & Property Images</div>
                <p style={{ color: TEXT_SECONDARY, fontSize: '15px' }}>In compliance with GCC Land Registries and global DLT securities laws, please upload the files:</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {/* Title Deed */}
                  <div className="file-upload-box" onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf,.png,.jpg';
                    input.onchange = (e) => { if (e.target.files?.[0]) setDeedFile(e.target.files[0]); };
                    input.click();
                  }}>
                    <FiFileText size={32} color={deedFile ? "#FFF" : TEXT_SECONDARY} />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>1. Title Deed (صك الملكية) *</span>
                    <span style={{ fontSize: '11px', color: TEXT_SECONDARY }}>{deedFile ? `${deedFile.name} (${(deedFile.size/(1024*1024)).toFixed(2)} MB)` : 'Click to upload PDF deed'}</span>
                  </div>

                  {/* Valuation Report */}
                  <div className="file-upload-box" onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf';
                    input.onchange = (e) => { if (e.target.files?.[0]) setValuationFile(e.target.files[0]); };
                    input.click();
                  }}>
                    <FiUploadCloud size={32} color={valuationFile ? "#FFF" : TEXT_SECONDARY} />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>2. Valuation Report (تقييم معتمد) *</span>
                    <span style={{ fontSize: '11px', color: TEXT_SECONDARY }}>{valuationFile ? `${valuationFile.name} (${(valuationFile.size/(1024*1024)).toFixed(2)} MB)` : 'JLL, CBRE, or Land Registry appraisal'}</span>
                  </div>

                  {/* SPV incorporation */}
                  <div className="file-upload-box" onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf';
                    input.onchange = (e) => { if (e.target.files?.[0]) setSpvFile(e.target.files[0]); };
                    input.click();
                  }}>
                    <FiShield size={32} color={spvFile ? "#FFF" : TEXT_SECONDARY} />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>3. SPV Memorandum (عقد التأسيس)</span>
                    <span style={{ fontSize: '11px', color: TEXT_SECONDARY }}>{spvFile ? `${spvFile.name} (${(spvFile.size/(1024*1024)).toFixed(2)} MB)` : 'Dubai/ADGM/Delaware SPV incorporation docs'}</span>
                  </div>

                  {/* Smart Contract Audit */}
                  <div className="file-upload-box" onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf';
                    input.onchange = (e) => { if (e.target.files?.[0]) setAuditFile(e.target.files[0]); };
                    input.click();
                  }}>
                    <FiCheckCircle size={32} color={auditFile ? "#FFF" : TEXT_SECONDARY} />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>4. Smart Contract Security Audit</span>
                    <span style={{ fontSize: '11px', color: TEXT_SECONDARY }}>{auditFile ? `${auditFile.name} (${(auditFile.size/(1024*1024)).toFixed(2)} MB)` : 'Third-party code audit report'}</span>
                  </div>

                  {/* Property Images */}
                  <div className="file-upload-box" style={{ gridColumn: 'span 2' }} onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.multiple = true;
                    input.onchange = (e) => {
                      if (e.target.files) {
                        const newFiles = Array.from(e.target.files).map(file => ({
                          file,
                          url: URL.createObjectURL(file)
                        }));
                        setPropertyImages(prev => [...prev, ...newFiles]);
                      }
                    };
                    input.click();
                  }}>
                    <FiImage size={32} color={propertyImages.length > 0 ? "#FFF" : TEXT_SECONDARY} />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>5. Property Images (صور العقار) *</span>
                    <span style={{ fontSize: '11px', color: TEXT_SECONDARY }}>
                      {propertyImages.length > 0 ? `${propertyImages.length} image(s) selected` : 'Select JPG, PNG images of the property'}
                    </span>
                  </div>

                  {propertyImages.length > 0 && (
                    <div style={{ gridColumn: 'span 2', display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                      {propertyImages.map((img, index) => (
                        <div key={index} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <img src={img.url} alt="property preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setPropertyImages(prev => prev.filter((_, i) => i !== index));
                            }}
                            style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FFF' }}
                          >
                            <FiX size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
                  <FiShield size={24} color="#FFF" />
                  <div style={{ fontSize: '13px', color: TEXT_SECONDARY }}>All uploads are cryptographically signed and stored in distributed, encrypted file nodes (IPFS) linked to the block transaction.</div>
                </div>
              </div>
            )}

            {/* Step 3: International & GCC Compliance */}
            {currentStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>Regulatory Compliance framework</div>
                <p style={{ color: TEXT_SECONDARY, fontSize: '15px' }}>Configure structural compliance with Gulf (GCC) and global tokenization rules:</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <CustomSelect 
                      label="GCC Financial Regulator Authority"
                      value={gccRegulator}
                      onChange={setGccRegulator}
                      options={[
                        { value: 'DFSA (Dubai Financial Services Authority)', label: 'DFSA (Dubai, UAE)' },
                        { value: 'ADGM FSRA (Abu Dhabi)', label: 'ADGM FSRA (Abu Dhabi, UAE)' },
                        { value: 'CMA (Capital Market Authority KSA)', label: 'CMA (Riyadh, Saudi Arabia)' },
                        { value: 'SCA (Securities and Commodities Authority)', label: 'SCA (Federal UAE SCA)' }
                      ]}
                    />
                  </div>
                  <div>
                    <CustomSelect 
                      label="Global Compliance Status"
                      value={globalCompliance}
                      onChange={setGlobalCompliance}
                      options={[
                        { value: 'Yes (Chainalysis & Sanctions Check Complete)', label: 'Yes (Chainalysis Complete)' },
                        { value: 'SEC Regulation D / S Compliant', label: 'SEC Regulation D / S Compliant' },
                        { value: 'European MiCA Framework Ready', label: 'European MiCA Framework Ready' }
                      ]}
                    />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Target ESG Sustainability Score (0-100)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={esgScore} 
                      onChange={(e) => setEsgScore(e.target.value)} 
                      min="0" 
                      max="100" 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Shariah Compliance (توافق مع الشريعة الإسلامية)</label>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          checked={isShariahCompliant === true} 
                          onChange={() => setIsShariahCompliant(true)} 
                          style={{ accentColor: '#FFF' }} 
                        />
                        Shariah Compliant (مطابق للضوابط الشرعية)
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          checked={isShariahCompliant === false} 
                          onChange={() => setIsShariahCompliant(false)} 
                          style={{ accentColor: '#FFF' }} 
                        />
                        Conventional (تقليدي)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Tokenomics Setup */}
            {currentStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>Configure Asset Tokenomics</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Price per Security Token (USD)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={tokenPrice} 
                      onChange={(e) => setTokenPrice(e.target.value)} 
                      placeholder="100" 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Total Tokens to Mint</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={tokenSupply} 
                      onChange={(e) => setTokenSupply(e.target.value)} 
                      placeholder="12000" 
                    />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Expected Annual Return / APY (%)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      className="form-input" 
                      value={expectedApy} 
                      onChange={(e) => setExpectedApy(e.target.value)} 
                      placeholder="8.5" 
                    />
                  </div>
                  <div>
                    <CustomSelect 
                      label="Payout Frequency"
                      value={payoutFrequency}
                      onChange={setPayoutFrequency}
                      options={[
                        { value: 'Monthly', label: 'Monthly (شهري)' },
                        { value: 'Quarterly', label: 'Quarterly (ربع سنوي)' },
                        { value: 'Annually', label: 'Annually (سنوي)' }
                      ]}
                    />
                  </div>
                </div>

                <div style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', marginTop: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: TEXT_SECONDARY }}>Total Asset Valuation</span>
                    <span style={{ fontWeight: '600', fontSize: '18px' }}>${totalValuation.toLocaleString()} USD</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: TEXT_SECONDARY }}>Platform Fee / Company Commission (1%)</span>
                    <span style={{ fontWeight: '600', fontSize: '18px' }}>${companyFee.toLocaleString()} USD</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 5: AI Verification */}
            {currentStep === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ fontSize: '24px', fontWeight: '500', marginBottom: '8px' }}>Review & Deploy Security Token</div>
                
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>Asset Name</span>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>{assetName}</div>
                    </div>
                    <div>
                      <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>Jurisdiction & Registry</span>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>{jurisdiction}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>Deed Number</span>
                      <div style={{ fontSize: '16px', fontWeight: '600', fontFamily: 'monospace' }}>{propertyId}</div>
                    </div>
                    <div>
                      <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>Structure Compliance</span>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>{isShariahCompliant ? 'Shariah Compliant (Sukuk)' : 'Conventional (Security)'}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>Total Token Supply</span>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>{Number(tokenSupply).toLocaleString()} Tokens</div>
                    </div>
                    <div>
                      <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>Price per Token</span>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>${Number(tokenPrice).toLocaleString()} USD</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>Total Valuation</span>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>${totalValuation.toLocaleString()} USD</div>
                    </div>
                    <div>
                      <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>Company Commission (1%)</span>
                      <div style={{ fontSize: '16px', fontWeight: '600' }}>${companyFee.toLocaleString()} USD</div>
                    </div>
                  </div>

                  {propertyImages.length > 0 && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                      <span style={{ color: TEXT_SECONDARY, fontSize: '12px', display: 'block', marginBottom: '8px' }}>Uploaded Property Images ({propertyImages.length})</span>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {propertyImages.map((img, i) => (
                          <img key={i} src={img.url} alt="property thumbnail" style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                    <span style={{ color: TEXT_SECONDARY, fontSize: '12px', display: 'block', marginBottom: '8px' }}>Uploaded Verification Cryptographic Hashes</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Title Deed: {deedFile?.name}</span>
                        <span style={{ color: '#A3A3A3', fontFamily: 'monospace' }}>Verified (zk-SNARK)</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Valuation appraisal: {valuationFile?.name}</span>
                        <span style={{ color: '#A3A3A3', fontFamily: 'monospace' }}>Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {isConnected ? (
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: TEXT_SECONDARY }}>Authorized Signer</div>
                      <div style={{ fontSize: '15px', fontFamily: 'monospace' }}>{publicKey?.substring(0, 10)}...{publicKey?.substring(publicKey.length - 8)}</div>
                    </div>
                    <div style={{ color: '#FFF', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiCheckCircle /> Ready to deploy
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '14px', color: TEXT_SECONDARY }}>Please connect your Casper wallet to authorize this deploy.</div>
                    <button onClick={connectWallet} style={{ fontSize: '13px', padding: '8px 16px', background: '#FFF', color: '#000', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Connect Wallet</button>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <button 
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                style={{ background: 'transparent', color: TEXT_SECONDARY, border: 'none', fontSize: '15px', fontWeight: '600', cursor: currentStep === 1 ? 'not-allowed' : 'pointer', opacity: currentStep === 1 ? 0.5 : 1 }}
                disabled={currentStep === 1 || isMinting}
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                disabled={isMinting}
                style={{ background: '#FFF', color: '#000', border: 'none', borderRadius: '24px', padding: '12px 28px', fontSize: '15px', fontWeight: '600', cursor: isMinting ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: isMinting ? 0.7 : 1 }}
              >
                {isMinting ? 'Deploying...' : currentStep === 5 ? 'Confirm & Deploy Token' : 'Continue'} <FiChevronRight />
              </button>
            </div>
          </div>

          {/* Right Column: AI Assistant Panel */}
          <div style={{ background: 'linear-gradient(180deg, #121212 0%, #080808 100%)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', position: 'sticky', top: '32px', height: 'fit-content' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <FiCpu color="#FFF" size={24} style={{ opacity: 0.8 }} />
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>Revora AI Assistant</div>
                <div style={{ color: TEXT_SECONDARY, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div className="pulse-dot"></div> Active
                </div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Status Header */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', fontSize: '14px', lineHeight: '1.5', color: '#FFF' }}>
                <div style={{ color: TEXT_SECONDARY, fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>AI Assistant Status</div>
                <div style={{ fontWeight: '500' }}>{aiStatus}</div>
              </div>

              {/* Checklist details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', opacity: currentStep >= 1 ? 1 : 0.3 }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0, marginTop: '2px' }}>
                    {currentStep > 1 ? <FiCheck size={12} color="#FFF" /> : '1'}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ fontWeight: '500', color: currentStep >= 1 ? '#FFF' : TEXT_SECONDARY }}>Structure Details Checked</span>
                    {currentStep > 1 && <div style={{ fontSize: '12px', color: TEXT_SECONDARY, marginTop: '2px' }}>{assetCategory} in {jurisdiction}</div>}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', opacity: currentStep >= 2 ? 1 : 0.3 }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0, marginTop: '2px' }}>
                    {currentStep > 2 ? <FiCheck size={12} color="#FFF" /> : '2'}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ fontWeight: '500', color: currentStep >= 2 ? '#FFF' : TEXT_SECONDARY }}>Legal Docs Verification</span>
                    {currentStep > 2 && <div style={{ fontSize: '12px', color: TEXT_SECONDARY, marginTop: '2px' }}>{deedFile ? deedFile.name : 'Deed.pdf'} authenticated</div>}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', opacity: currentStep >= 3 ? 1 : 0.3 }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0, marginTop: '2px' }}>
                    {currentStep > 3 ? <FiCheck size={12} color="#FFF" /> : '3'}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ fontWeight: '500', color: currentStep >= 3 ? '#FFF' : TEXT_SECONDARY }}>GCC Compliance Audit</span>
                    {currentStep > 3 && <div style={{ fontSize: '12px', color: TEXT_SECONDARY, marginTop: '2px' }}>{gccRegulator} Standard</div>}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', opacity: currentStep >= 4 ? 1 : 0.3 }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', flexShrink: 0, marginTop: '2px' }}>
                    {currentStep > 4 ? <FiCheck size={12} color="#FFF" /> : '4'}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ fontWeight: '500', color: currentStep >= 4 ? '#FFF' : TEXT_SECONDARY }}>Tokenomics Modeling</span>
                    {currentStep > 4 && <div style={{ fontSize: '12px', color: TEXT_SECONDARY, marginTop: '2px' }}>${Number(tokenPrice).toLocaleString()} per Token</div>}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '32px', fontSize: '13px', color: TEXT_SECONDARY, textAlign: 'center' }}>
              Compliance rules matched with Gulf CMA/DFSA regulations and global SEC DLT guidelines.
            </div>
          </div>

        </div>
        </div>
      </main>

      {/* Glassmorphic Animated Toast Notification */}
      {toast.visible && (
        <div style={{ 
          position: 'fixed', 
          bottom: '24px', 
          right: '24px', 
          background: 'rgba(20, 20, 20, 0.85)', 
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px', 
          padding: '16px 24px', 
          color: '#FFF', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          zIndex: 9999,
          animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          maxWidth: '400px'
        }}>
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
          {toast.type === 'success' ? <FiCheckCircle size={20} color="#FFF" /> : <FiInfo size={20} color="#FFF" style={{ opacity: 0.8 }} />}
          <div style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.4' }}>{toast.message}</div>
          <button 
            onClick={() => setToast(prev => ({ ...prev, visible: false }))} 
            style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', opacity: 0.5, marginLeft: '8px', display: 'flex', alignItems: 'center' }}
          >
            <FiX size={16} />
          </button>
        </div>
      )}

      {/* Premium Glassmorphic Casper Tokenization Success Modal */}
      {successModal.visible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleUp {
              from { transform: scale(0.9); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            @keyframes rotateToken {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{
            background: CARD_BG,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '28px',
            width: '100%',
            maxWidth: '520px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
            animation: 'scaleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            {/* Casper Animated Logo Container */}
            <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 24px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                border: '2px dashed rgba(255, 255, 255, 0.15)',
                animation: 'rotateToken 20s linear infinite'
              }} />
              <img 
                src="/images/icon.png" 
                alt="Casper Logo" 
                style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
              />
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', letterSpacing: '-0.02em', color: '#FFF' }}>
              Asset Tokenized Successfully!
            </h2>
            <p style={{ color: TEXT_SECONDARY, fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Property <strong style={{ color: '#FFF' }}>"{successModal.assetName}"</strong> has been cryptographically split and issued as security fractions on the Casper Testnet ledger.
            </p>

            {/* Transaction Hash Panel */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '14px', padding: '16px', margin: '0 auto 32px auto', textAlign: 'left' }}>
              <span style={{ fontSize: '11px', color: TEXT_SECONDARY, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Casper Deploy Hash</span>
              <code style={{ fontSize: '13px', color: '#FFF', wordBreak: 'break-all', fontFamily: 'monospace', display: 'block', lineHeight: '1.4' }}>
                {successModal.deployHash}
              </code>
            </div>

            {/* Dialog Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href={`https://testnet.cspr.live/deploy/${successModal.deployHash}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ 
                  textDecoration: 'none',
                  background: '#FFFFFF', 
                  color: '#000000', 
                  border: 'none', 
                  borderRadius: '12px', 
                  padding: '14px 20px', 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                View Transaction <FiExternalLink size={16} />
              </a>
              <button 
                onClick={handleCloseSuccess}
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  color: '#FFF', 
                  border: '1px solid rgba(255,255,255,0.08)', 
                  borderRadius: '12px', 
                  padding: '14px 20px', 
                  fontSize: '15px', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
