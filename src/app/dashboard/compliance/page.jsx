'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiBell, FiShield, FiCheckCircle, FiClock, FiLock, FiFileText, FiUploadCloud, FiKey } from 'react-icons/fi';
import { RiDashboardLine, RiWalletLine, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiHistoryLine, RiShieldCheckLine, RiSettings4Line } from 'react-icons/ri';

const BG = '#080808';
const CARD_BG = '#101010';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A3A3A3';
const FONT = "'Jost', sans-serif";

export default function Compliance() {
  const isSidebarOpen = true;

  const tiers = [
    { id: 1, name: 'Tier 1: Basic', reqs: ['Email Verification', 'Wallet Connection'], status: 'Completed', limit: '$5,000' },
    { id: 2, name: 'Tier 2: Verified', reqs: ['Government ID', 'Proof of Address'], status: 'Completed', limit: '$100,000' },
    { id: 3, name: 'Tier 3: Accredited', reqs: ['Proof of Income / Net Worth', 'Source of Funds'], status: 'Pending Review', limit: 'Unlimited' },
  ];

  return (
    <div style={{ display: 'flex', background: BG, minHeight: '100vh', color: TEXT_PRIMARY, fontFamily: FONT }}>
      <style>{`
        .sidebar { transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; }
        .sidebar-icon { padding: 12px; border-radius: 12px; cursor: pointer; color: ${TEXT_SECONDARY}; transition: all 0.2s ease; display: flex; align-items: center; gap: ${isSidebarOpen ? '16px' : '0px'}; white-space: nowrap; width: ${isSidebarOpen ? '100%' : '48px'}; overflow: hidden; }
        .sidebar-icon:hover { background: rgba(255,255,255,0.05); color: #FFF; }
        .sidebar-icon.active { background: rgba(255,255,255,0.1); color: #FFF; }
        .sidebar-label { font-size: 14px; font-weight: 500; opacity: ${isSidebarOpen ? 1 : 0}; max-width: ${isSidebarOpen ? '200px' : '0px'}; transition: all 0.3s ease; overflow: hidden; }
        
        .zk-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          animation: pulse 4s infinite alternate;
        }

        .tier-card {
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }
        .tier-card.active {
          border-color: #FFFFFF;
          box-shadow: 0 10px 30px rgba(255,255,255,0.05);
        }

        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }

        @media (max-width: 1024px) { .grid-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .sidebar { display: none !important; } .main-content { padding: 16px !important; } .tier-cards { flex-direction: column; } }
      `}</style>
      
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: isSidebarOpen ? '240px' : '80px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '32px 24px' : '32px 0', gap: '32px', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div style={{ width: '100%', padding: '0 16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '16px' }}>
            <img src="/images/icon.png" alt="Logo" style={{ width: '24px', height: '24px' }} />
            <span style={{ color: '#FFF', fontSize: '20px', fontWeight: '600', fontFamily: "'Jost', sans-serif", letterSpacing: '-0.02em' }}>Revora</span>
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, marginTop: '16px', width: '100%', alignItems: isSidebarOpen ? 'flex-start' : 'center', overflowY: 'auto' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiDashboardLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Overview</span></div></Link>
          <Link href="/dashboard/wallet" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiWalletLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Wallet</span></div></Link>
          <Link href="/dashboard/assets" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiBuilding4Line size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">My Assets</span></div></Link>
          <Link href="/dashboard/tokenize" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiCoinLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Tokenize</span></div></Link>
          <Link href="/investor" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiStore2Line size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Marketplace</span></div></Link>
          <Link href="/dashboard/analytics" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiBarChartBoxLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Analytics</span></div></Link>
          <Link href="/dashboard/history" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiHistoryLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">History</span></div></Link>
          <Link href="/dashboard/compliance" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon active" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiShieldCheckLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Compliance</span></div></Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: isSidebarOpen ? 'flex-start' : 'center' }}>
          <Link href="/dashboard/notifications" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><FiBell size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Notifications</span></div></Link>
          <Link href="/dashboard/settings" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiSettings4Line size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Settings</span></div></Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '32px 48px', minHeight: '100vh', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '500', marginBottom: '8px', letterSpacing: '-0.02em' }}>Compliance & KYC</h1>
          <p style={{ color: TEXT_SECONDARY, fontSize: '16px', maxWidth: '600px' }}>Manage your identity verification. We use zero-knowledge proofs to verify your identity without storing your sensitive data.</p>
        </header>

        {/* zk-SNARK Showcase */}
        <div style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '40px', position: 'relative', overflow: 'hidden', display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div className="zk-glow"></div>
          
          <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <FiLock size={24} color="#FFFFFF" />
              <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>zk-SNARK Privacy Active</div>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '500', marginBottom: '16px' }}>Your Data is Cryptographically Secured</h2>
            <p style={{ color: TEXT_SECONDARY, fontSize: '15px', lineHeight: '1.6', marginBottom: '24px', maxWidth: '500px' }}>
              When you upload your ID, our AI generates a mathematical proof (zk-SNARK) verifying you meet the requirements (e.g., Over 18, non-sanctioned country) without revealing your actual passport or face data to the blockchain.
            </p>
            <button className="premium-btn" style={{ fontSize: '14px', cursor: 'pointer' }}>
              View On-Chain Proof
            </button>
          </div>

          <div style={{ position: 'relative', zIndex: 1, width: '300px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Visual Representation of zk proof */}
            <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5 5" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <circle cx="100" cy="100" r="40" fill="transparent" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M85 100 L95 110 L120 85" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M100 20 L100 0 M100 200 L100 180 M20 100 L0 100 M200 100 L180 100" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Verification Tiers */}
        <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '24px' }}>Investor Tiers</h2>
        <div className="tier-cards" style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
          {tiers.map((tier, idx) => (
            <div key={tier.id} className={`tier-card ${tier.status === 'Completed' ? 'active' : ''}`} style={{ flex: 1, opacity: tier.status === 'Pending Review' ? 0.7 : 1 }}>
              {tier.status === 'Completed' && (
                <div style={{ position: 'absolute', top: '24px', right: '24px', color: '#FFFFFF' }}>
                  <FiCheckCircle size={24} />
                </div>
              )}
              {tier.status === 'Pending Review' && (
                <div style={{ position: 'absolute', top: '24px', right: '24px', color: '#FFFFFF' }}>
                  <FiClock size={24} />
                </div>
              )}
              
              <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>{tier.name}</div>
              <div style={{ color: tier.status === 'Completed' ? '#FFFFFF' : tier.status === 'Pending Review' ? '#FFFFFF' : TEXT_SECONDARY, fontSize: '13px', fontWeight: '600', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Status: {tier.status}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ color: TEXT_SECONDARY, fontSize: '12px', marginBottom: '8px' }}>Investment Limit</div>
                <div style={{ fontSize: '24px', fontWeight: '500' }}>{tier.limit}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                {tier.reqs.map((req, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: tier.status === 'Completed' ? TEXT_PRIMARY : TEXT_SECONDARY }}>
                    <FiCheckCircle color={tier.status === 'Completed' ? '#FFFFFF' : 'rgba(255,255,255,0.2)'} /> {req}
                  </div>
                ))}
              </div>

              {tier.status === 'Pending Review' && (
                <button className="premium-btn" style={{ width: '100%', marginTop: '24px', cursor: 'pointer' }}>
                  Review in Progress
                </button>
              )}
              {tier.status !== 'Completed' && tier.status !== 'Pending Review' && (
                <button className="premium-btn" style={{ width: '100%', marginTop: '24px', cursor: 'pointer' }}>
                  Start Verification
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Document Timeline Tracker */}
        <div style={{ background: CARD_BG, borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.02)' }}>
          <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '32px' }}>Document Verification Timeline</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '20px', top: '10px', bottom: '10px', width: '2px', background: 'rgba(255,255,255,0.05)' }}></div>
            
            <div style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'transparent', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}><FiUploadCloud /></div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#FFF' }}>Documents Uploaded</div>
                <div style={{ color: TEXT_SECONDARY, fontSize: '13px', marginTop: '4px' }}>Proof of Income and Source of Funds submitted. (Oct 26, 2026)</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'transparent', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}><FiKey /></div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#FFF' }}>zk-SNARK Generation</div>
                <div style={{ color: TEXT_SECONDARY, fontSize: '13px', marginTop: '4px' }}>AI is analyzing documents and generating zero-knowledge proofs.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1, opacity: 0.4 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'transparent', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)' }}><FiShield /></div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#FFF' }}>Blockchain Attestation</div>
                <div style={{ color: TEXT_SECONDARY, fontSize: '13px', marginTop: '4px' }}>Waiting for proof generation to complete.</div>
              </div>
            </div>
          </div>

        </div>

        </div>
      </main>
    </div>
  );
}
