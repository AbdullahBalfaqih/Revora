'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiBell, FiUser, FiShield, FiLink, FiCpu, FiEye, FiTrash2, FiSave } from 'react-icons/fi';
import { RiDashboardLine, RiWalletLine, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiHistoryLine, RiShieldCheckLine, RiSettings4Line } from 'react-icons/ri';

const BG = '#080808';
const CARD_BG = '#101010';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A3A3A3';
const FONT = "'Jost', sans-serif";

export default function Settings() {
  const isSidebarOpen = true;
  const [activeTab, setActiveTab] = useState('Profile');
  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailAlerts: true,
    aiRouting: true,
    autoStake: false,
    publicProfile: false,
  });

  const handleToggle = (key) => setToggles({ ...toggles, [key]: !toggles[key] });

  const tabs = [
    { name: 'Profile', icon: <FiUser /> },
    { name: 'Security', icon: <FiShield /> },
    { name: 'Connected Wallets', icon: <FiLink /> },
    { name: 'AI Preferences', icon: <FiCpu /> },
    { name: 'Appearance', icon: <FiEye /> },
  ];

  return (
    <div style={{ display: 'flex', background: BG, minHeight: '100vh', color: TEXT_PRIMARY, fontFamily: FONT }}>
      <style>{`
        .sidebar { transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; }
        .sidebar-icon { padding: 12px; border-radius: 12px; cursor: pointer; color: ${TEXT_SECONDARY}; transition: all 0.2s ease; display: flex; align-items: center; gap: ${isSidebarOpen ? '16px' : '0px'}; white-space: nowrap; width: ${isSidebarOpen ? '100%' : '48px'}; overflow: hidden; }
        .sidebar-icon:hover { background: rgba(255,255,255,0.05); color: #FFF; }
        .sidebar-icon.active { background: rgba(255,255,255,0.1); color: #FFF; }
        .sidebar-label { font-size: 14px; font-weight: 500; opacity: ${isSidebarOpen ? 1 : 0}; max-width: ${isSidebarOpen ? '200px' : '0px'}; transition: all 0.3s ease; overflow: hidden; }
        
        .settings-tab {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-radius: 12px;
          color: ${TEXT_SECONDARY};
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .settings-tab:hover {
          background: rgba(255,255,255,0.02);
          color: #FFF;
        }
        .settings-tab.active {
          background: rgba(255,255,255,0.1);
          color: #FFF;
        }

        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.1);
          color: #FFF;
          padding: 16px;
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .form-input:focus {
          border-color: #FFF;
          background: rgba(255,255,255,0.05);
        }

        .toggle-switch {
          width: 50px;
          height: 28px;
          border-radius: 50px;
          background: rgba(255,255,255,0.1);
          position: relative;
          cursor: pointer;
          transition: all 0.3s;
        }
        .toggle-switch.on {
          background: #E0E0E0;
        }
        .toggle-knob {
          width: 20px;
          height: 20px;
          background: #FFF;
          border-radius: 50%;
          position: absolute;
          top: 4px;
          left: 4px;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .toggle-switch.on .toggle-knob {
          left: 26px;
          background: #000;
        }

        @media (max-width: 1024px) { .settings-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .sidebar { display: none !important; } .main-content { padding: 16px !important; } }
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
          <Link href="/dashboard/compliance" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiShieldCheckLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Compliance</span></div></Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: isSidebarOpen ? 'flex-start' : 'center' }}>
          <Link href="/dashboard/notifications" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><FiBell size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Notifications</span></div></Link>
          <Link href="/dashboard/settings" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon active" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiSettings4Line size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Settings</span></div></Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '32px 48px', minHeight: '100vh', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '500', marginBottom: '8px', letterSpacing: '-0.02em' }}>Settings</h1>
          <p style={{ color: TEXT_SECONDARY, fontSize: '16px' }}>Manage your account preferences, security configurations, and AI routing limits.</p>
        </header>

        <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px' }}>
          
          {/* Vertical Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tabs.map(tab => (
              <div 
                key={tab.name} 
                className={`settings-tab ${activeTab === tab.name ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon} {tab.name}
              </div>
            ))}
          </div>

          {/* Settings Content Area */}
          <div style={{ background: CARD_BG, borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.02)' }}>
            
            {/* Profile Section */}
            {activeTab === 'Profile' && (
              <div style={{ animation: 'fadeIn 0.5s' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '32px' }}>Personal Information</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>JC</div>
                  <div>
                    <button className="premium-btn" style={{ cursor: 'pointer', marginBottom: '8px' }}>Upload Avatar</button>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '13px' }}>JPG, GIF or PNG. Max size of 800K.</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>First Name</label>
                    <input type="text" className="form-input" defaultValue="John" />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Last Name</label>
                    <input type="text" className="form-input" defaultValue="Carter" />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Email Address</label>
                  <input type="email" className="form-input" defaultValue="john.carter@example.com" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <button className="premium-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <FiSave /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeTab === 'Security' && (
              <div style={{ animation: 'fadeIn 0.5s' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '32px' }}>Security & Authentication</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '4px' }}>Two-Factor Authentication (2FA)</div>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '14px' }}>Protect your account with an extra layer of security.</div>
                  </div>
                  <div className={`toggle-switch ${toggles.twoFactor ? 'on' : ''}`} onClick={() => handleToggle('twoFactor')}>
                    <div className="toggle-knob"></div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '40px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '4px' }}>Email Notifications</div>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '14px' }}>Receive alerts for new logins and large withdrawals.</div>
                  </div>
                  <div className={`toggle-switch ${toggles.emailAlerts ? 'on' : ''}`} onClick={() => handleToggle('emailAlerts')}>
                    <div className="toggle-knob"></div>
                  </div>
                </div>

                <h3 style={{ fontSize: '18px', color: '#FF3366', marginBottom: '16px' }}>Danger Zone</h3>
                <div style={{ border: '1px solid rgba(255,51,102,0.2)', background: 'rgba(255,51,102,0.05)', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>Delete Account</div>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '14px' }}>Permanently delete your account and clear all zk-SNARK verifications.</div>
                  </div>
                  <button className="premium-btn" style={{ cursor: 'pointer' }}>Delete Account</button>
                </div>
              </div>
            )}

            {/* AI Preferences */}
            {activeTab === 'AI Preferences' && (
              <div style={{ animation: 'fadeIn 0.5s' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '32px' }}>AI Autopilot & Routing</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>Allow AI Yield Routing <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E0E0E0', boxShadow: '0 0 10px #E0E0E0' }}></div></div>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '14px', maxWidth: '400px' }}>Allow the AI agent to automatically rebalance your stablecoins into the highest yielding RWA pools.</div>
                  </div>
                  <div className={`toggle-switch ${toggles.aiRouting ? 'on' : ''}`} onClick={() => handleToggle('aiRouting')}>
                    <div className="toggle-knob"></div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '40px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '4px' }}>Auto-Stake Yields</div>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '14px' }}>Automatically re-invest generated yield back into the asset.</div>
                  </div>
                  <div className={`toggle-switch ${toggles.autoStake ? 'on' : ''}`} onClick={() => handleToggle('autoStake')}>
                    <div className="toggle-knob"></div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Maximum AI Transaction Limit (per day)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input type="range" min="1000" max="100000" defaultValue="10000" style={{ flex: 1, accentColor: '#E0E0E0' }} />
                    <span style={{ fontSize: '18px', fontWeight: '600' }}>$10,000</span>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {(activeTab === 'Connected Wallets' || activeTab === 'Appearance') && (
              <div style={{ animation: 'fadeIn 0.5s', textAlign: 'center', padding: '60px', color: TEXT_SECONDARY }}>
                <FiLink size={48} style={{ marginBottom: '24px', opacity: 0.2 }} />
                <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '16px', color: '#FFF' }}>{activeTab}</h2>
                <p>These settings are currently managed via your Casper Signer extension.</p>
              </div>
            )}

          </div>

        </div>
        </div>
      </main>
    </div>
  );
}
