'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiUploadCloud, FiShield, FiFileText, FiClock, FiLink2, FiCheckCircle, FiBell, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import { RiDashboardLine, RiWalletLine, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiHistoryLine, RiShieldCheckLine, RiSettings4Line } from 'react-icons/ri';

const BG = '#0A0A0A';
const CARD_BG = '#121212';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#888888';
const FONT = "'Jost', sans-serif";

export default function VerificationAdmin() {
  const [propertyName, setPropertyName] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [selectedAuthority, setSelectedAuthority] = useState('Dubai Land Department');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  // Initial mockup data (green colors updated to gray)
  const [assets, setAssets] = useState([
    { id: 1, name: 'Beach villa for lease', location: '101B, Palm Coast', authority: 'Dubai Land Department', hash: '05a782bc...4f91', time: '10 mins ago', status: 'Verified' },
    { id: 2, name: 'River flat for rental', location: '2/A, New South Quest', authority: 'ADGM Registry', hash: '12d88a1e...99e2', time: '2 hours ago', status: 'Verified' },
    { id: 3, name: 'Penthouse in downtown', location: "170, Queen's Street", authority: 'Swiss DLT Authority', hash: '88b22cfd...e112', time: '1 day ago', status: 'Pending Verification' },
  ]);

  const [logs, setLogs] = useState([
    { action: 'DLT Hash Timestamped', details: 'Casper block #1,829,112', time: '10 mins ago' },
    { action: 'Linked to Land Registry', details: 'Dubai Land Department API confirmed', time: '12 mins ago' },
    { action: 'Owner Verification Complete', details: 'Ownership certificate matches', time: '15 mins ago' },
    { action: 'Document Uploaded', details: 'TitleDeed_PalmCoast.pdf registered', time: '18 mins ago' },
  ]);

  // Handle register / timestamp submission
  const handleRegisterAsset = (e) => {
    e.preventDefault();
    if (!propertyName || !propertyLocation) return;
    setIsRegistering(true);

    setTimeout(() => {
      const newAsset = {
        id: assets.length + 1,
        name: propertyName,
        location: propertyLocation,
        authority: selectedAuthority,
        hash: Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6),
        time: 'Just now',
        status: 'Verified'
      };

      setAssets([newAsset, ...assets]);
      setLogs([
        { action: 'DLT Hash Timestamped', details: `Casper block #${Math.floor(Math.random() * 2000000)}`, time: 'Just now' },
        { action: 'Linked to Land Registry', details: `${selectedAuthority} API confirmed`, time: '1 min ago' },
        { action: 'Document Uploaded', details: uploadedFile ? uploadedFile.name : 'OwnershipDoc.pdf', time: '1 min ago' },
        ...logs
      ]);

      setPropertyName('');
      setPropertyLocation('');
      setUploadedFile(null);
      setIsRegistering(false);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', background: BG, minHeight: '100vh', color: TEXT_PRIMARY, fontFamily: FONT }}>
      <style>{`
        .dashboard-container {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 24px;
          width: 100%;
        }
        .card {
          background: ${CARD_BG};
          border-radius: 20px;
          padding: 28px;
          border: 1px solid rgba(255,255,255,0.03);
        }
        .sidebar {
          transition: width 0.3s ease;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .sidebar::-webkit-scrollbar {
          display: none;
        }
        .sidebar-icon {
          padding: 8px;
          border-radius: 12px;
          cursor: pointer;
          color: ${TEXT_SECONDARY};
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 16px;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
        }
        .sidebar-icon:hover {
          background: rgba(255,255,255,0.05);
          color: #FFF;
        }
        .sidebar-icon.active {
          background: rgba(255,255,255,0.1);
          color: #FFF;
        }
        .upload-zone {
          border: 2px dashed rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 32px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .upload-zone:hover {
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.01);
        }
        @media (max-width: 1200px) {
          .dashboard-container {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .sidebar {
            display: none !important;
          }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="sidebar" style={{ width: '240px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', padding: '20px 16px', gap: '16px', flexShrink: 0, position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ width: '100%', padding: '0 16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '16px' }}>
            <img src="/images/icon.png" alt="Logo" style={{ width: '24px', height: '24px' }} />
            <span style={{ color: '#FFF', fontSize: '20px', fontWeight: '600', letterSpacing: '-0.02em' }}>Revora</span>
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, marginTop: '8px', width: '100%', overflowY: 'hidden' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon">
              <RiDashboardLine size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Overview</span>
            </div>
          </Link>
          <Link href="/dashboard/wallet" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon">
              <RiWalletLine size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Wallet</span>
            </div>
          </Link>
          <Link href="/dashboard/assets" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon">
              <RiBuilding4Line size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>My Assets</span>
            </div>
          </Link>
          <Link href="/dashboard/tokenize" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon">
              <RiCoinLine size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Tokenize</span>
            </div>
          </Link>
          <Link href="/investor" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon">
              <RiStore2Line size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Marketplace</span>
            </div>
          </Link>
          <Link href="/dashboard/analytics" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon">
              <RiBarChartBoxLine size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Analytics</span>
            </div>
          </Link>
          <Link href="/dashboard/history" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon">
              <RiHistoryLine size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>History</span>
            </div>
          </Link>
          <Link href="/dashboard/compliance" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon">
              <RiShieldCheckLine size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Compliance</span>
            </div>
          </Link>
          <Link href="/dashboard/admin" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon active">
              <FiShield size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Administration</span>
            </div>
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
          <Link href="/dashboard/notifications" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon">
              <FiBell size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Notifications</span>
            </div>
          </Link>
          <Link href="/dashboard/settings" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon">
              <RiSettings4Line size={24} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>Settings</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 56px', minHeight: '100vh', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>

          {/* Header */}
          <header>
            <h1 style={{ fontSize: '36px', fontWeight: '600', marginBottom: '6px', letterSpacing: '-0.02em' }}>Administration</h1>
            <p style={{ color: TEXT_SECONDARY, fontSize: '16px', fontWeight: '400' }}>Verify assets, link registry authorities, and timestamp ownership on Casper DLT.</p>
          </header>

          {/* Problem & Solution Descriptive Card */}
          <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', background: 'linear-gradient(135deg, #141414 0%, #0A0A0A 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {/* Problem Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderRight: '1px solid rgba(255,255,255,0.05)', paddingRight: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#888888' }}>
                <FiAlertCircle size={20} />
                <h3 style={{ fontSize: '16px', fontWeight: '600' }}>The Challenge</h3>
              </div>
              <p style={{ fontSize: '14px', color: TEXT_SECONDARY, lineHeight: '1.6' }}>
                Fraudulent actors may attempt to list non-existent assets or counterfeit ownership credentials, undermining investor trust and security in secondary RWA marketplaces.
              </p>
            </div>
            
            {/* Solution Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A3A3A3' }}>
                <FiCheckCircle size={20} />
                <h3 style={{ fontSize: '16px', fontWeight: '600' }}>The Verification Solution</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: TEXT_SECONDARY }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#FFF', fontWeight: 'bold' }}>1.</span> Document Deposit: Upload ownership certificates securely.
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#FFF', fontWeight: 'bold' }}>2.</span> Authority Handshake: Link dynamically to official verification agencies.
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#FFF', fontWeight: 'bold' }}>3.</span> Casper Timestamp: Record cryptographic hashes immutably on DLT.
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#FFF', fontWeight: 'bold' }}>4.</span> Audit Trail: Keep a complete, tamper-proof history of asset status.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid (green replaced with gray/white style) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color: TEXT_SECONDARY, fontSize: '13px', fontWeight: '500' }}>Verified Assets</p>
              <p style={{ fontSize: '28px', fontWeight: '700' }}>12 Properties</p>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color: TEXT_SECONDARY, fontSize: '13px', fontWeight: '500' }}>Pending Verification</p>
              <p style={{ fontSize: '28px', fontWeight: '700' }}>3 Properties</p>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color: TEXT_SECONDARY, fontSize: '13px', fontWeight: '500' }}>Total Blockchain Hashes</p>
              <p style={{ fontSize: '28px', fontWeight: '700' }}>15 Timestamped</p>
            </div>
          </div>

          <div className="dashboard-container">

            {/* LEFT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Upload Ownership Documents Form */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FiFileText size={22} />
                  <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Register & Authenticate Asset</h2>
                </div>

                <form onSubmit={handleRegisterAsset} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', color: TEXT_SECONDARY, fontWeight: '500' }}>Property Name</label>
                      <input 
                        type="text" 
                        required
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        placeholder="e.g. Dubai Marina Villa" 
                        style={{ background: '#1D2125', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', height: '48px', padding: '0 16px', color: '#FFF', outline: 'none' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '12px', color: TEXT_SECONDARY, fontWeight: '500' }}>Location / Address</label>
                      <input 
                        type="text" 
                        required
                        value={propertyLocation}
                        onChange={(e) => setPropertyLocation(e.target.value)}
                        placeholder="e.g. 101B, Palm Coast" 
                        style={{ background: '#1D2125', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', height: '48px', padding: '0 16px', color: '#FFF', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', color: TEXT_SECONDARY, fontWeight: '500' }}>Registry / Verification Authority</label>
                    <select
                      value={selectedAuthority}
                      onChange={(e) => setSelectedAuthority(e.target.value)}
                      style={{ background: '#1D2125', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', height: '48px', padding: '0 16px', color: '#FFF', outline: 'none' }}
                    >
                      <option value="Dubai Land Department">Dubai Land Department</option>
                      <option value="ADGM Registry">ADGM Registry</option>
                      <option value="Swiss DLT Authority">Swiss DLT Authority</option>
                    </select>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div 
                    className="upload-zone"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.pdf,.doc,.docx,.png';
                      input.onchange = (e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFile(e.target.files[0]);
                        }
                      };
                      input.click();
                    }}
                  >
                    <FiUploadCloud size={32} style={{ color: TEXT_SECONDARY, marginBottom: '8px' }} />
                    <p style={{ fontSize: '14px', fontWeight: '600' }}>
                      {uploadedFile ? uploadedFile.name : 'Upload ownership document / deed'}
                    </p>
                    <p style={{ fontSize: '12px', color: TEXT_SECONDARY, marginTop: '4px' }}>PDF, DOC, PNG up to 10MB</p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isRegistering}
                    style={{ height: '48px', borderRadius: '24px', background: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    {isRegistering ? 'Generating Blockchain Hash...' : 'Register & Timestamp on Casper'}
                  </button>
                </form>
              </div>

              {/* Asset Verification Registry */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Ownership Verification Registry</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {assets.map((asset) => (
                    <div key={asset.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <p style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{asset.name}</p>
                        <p style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>{asset.location} • {asset.authority}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.06)', color: '#A3A3A3', padding: '4px 10px', borderRadius: '12px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.05)' }}>
                          {asset.status}
                        </span>
                        <span style={{ fontSize: '11px', fontFamily: 'monospace', color: TEXT_SECONDARY }}>
                          Hash: {asset.hash}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Verification Authorities */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FiLink2 size={20} />
                  <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Active Registry Authorities</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>Dubai Land Department</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#A3A3A3', fontWeight: '600' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888888' }}></div> Connected
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>Abu Dhabi Global Market (ADGM)</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#A3A3A3', fontWeight: '600' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888888' }}></div> Connected
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>Swiss DLT Trust Registry</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#A3A3A3', fontWeight: '600' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#888888' }}></div> Connected
                    </span>
                  </div>
                </div>
              </div>

              {/* Audit Trail Timeline */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FiClock size={20} />
                  <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Verifiable Audit Trail</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '20px', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                  {logs.map((log, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      {/* Timeline dot */}
                      <div style={{ position: 'absolute', left: '-25px', top: '4px', width: '9px', height: '9px', borderRadius: '50%', background: idx === 0 ? '#FFFFFF' : '#333' }}></div>
                      <p style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{log.action}</p>
                      <p style={{ color: TEXT_SECONDARY, fontSize: '11px', marginBottom: '2px' }}>{log.details}</p>
                      <p style={{ color: '#444', fontSize: '10px', fontWeight: '600' }}>{log.time}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
