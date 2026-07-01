'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiBell, FiCheck, FiInfo, FiAlertTriangle, FiDollarSign, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';
import { RiDashboardLine, RiWalletLine, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiHistoryLine, RiShieldCheckLine, RiSettings4Line } from 'react-icons/ri';

const BG = '#080808';
const CARD_BG = '#101010';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A3A3A3';
const FONT = "'Jost', sans-serif";

export default function Notifications() {
  const isSidebarOpen = true;
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'System', 'Yield Payouts', 'Security', 'Governance'];

  const notifications = [
    { id: 1, type: 'Yield Payouts', title: 'Monthly Yield Disbursed', desc: 'You have received $450.00 USDC from your Miami Commercial Plaza tokens.', time: '2 hours ago', icon: <FiDollarSign />, unread: true, action: 'View Wallet' },
    { id: 2, type: 'Security', title: 'New Login Detected', desc: 'A new login was detected from Chrome on Windows in Dubai, UAE.', time: '5 hours ago', icon: <FiAlertTriangle />, unread: true, action: 'Review Activity' },
    { id: 3, type: 'System', title: 'Platform Upgrade', desc: 'Revora platform will undergo scheduled maintenance for 2 hours on Sunday to upgrade AI routing algorithms.', time: '1 day ago', icon: <FiInfo />, unread: false, action: null },
    { id: 4, type: 'Governance', title: 'New Proposal: Lower Platform Fees', desc: 'A new governance proposal has been submitted to lower marketplace fees from 1.5% to 1.0%. Cast your vote now.', time: '2 days ago', icon: <RiBarChartBoxLine />, unread: false, action: 'Vote Now' },
    { id: 5, type: 'Yield Payouts', title: 'Yield APY Updated', desc: 'The AI Autopilot has successfully re-routed funds to increase US Treasury Pool APY to 5.2%.', time: '3 days ago', icon: <FiDollarSign />, unread: false, action: null },
    { id: 6, type: 'Security', title: 'zk-SNARK Verification Successful', desc: 'Your identity proof has been successfully verified on the Casper Network.', time: '1 week ago', icon: <RiShieldCheckLine />, unread: false, action: null },
  ];

  const filteredNotifs = activeTab === 'All' ? notifications : notifications.filter(n => n.type === activeTab);

  return (
    <div style={{ display: 'flex', background: BG, minHeight: '100vh', color: TEXT_PRIMARY, fontFamily: FONT }}>
      <style>{`
        .sidebar { transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; }
        .sidebar-icon { padding: 12px; border-radius: 12px; cursor: pointer; color: ${TEXT_SECONDARY}; transition: all 0.2s ease; display: flex; align-items: center; gap: ${isSidebarOpen ? '16px' : '0px'}; white-space: nowrap; width: ${isSidebarOpen ? '100%' : '48px'}; overflow: hidden; }
        .sidebar-icon:hover { background: rgba(255,255,255,0.05); color: #FFF; }
        .sidebar-icon.active { background: rgba(255,255,255,0.1); color: #FFF; }
        .sidebar-label { font-size: 14px; font-weight: 500; opacity: ${isSidebarOpen ? 1 : 0}; max-width: ${isSidebarOpen ? '200px' : '0px'}; transition: all 0.3s ease; overflow: hidden; }
        
        .tab-btn {
          background: transparent;
          color: ${TEXT_SECONDARY};
          border: none;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: #FFF;
          color: #000;
        }

        .notif-card {
          background: ${CARD_BG};
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          gap: 20px;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .notif-card:hover {
          background: rgba(255,255,255,0.02);
          border-color: rgba(255,255,255,0.1);
        }
        .notif-card.unread {
          /* No border requested */
        }

        @media (max-width: 768px) { .sidebar { display: none !important; } .main-content { padding: 16px !important; } .notif-card { flex-direction: column; } }
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
          <Link href="/dashboard/notifications" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon active" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><FiBell size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Notifications</span></div></Link>
          <Link href="/dashboard/settings" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiSettings4Line size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Settings</span></div></Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '32px 48px', minHeight: '100vh', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '500', marginBottom: '8px', letterSpacing: '-0.02em' }}>Notifications</h1>
            <p style={{ color: TEXT_SECONDARY, fontSize: '16px' }}>Stay updated with your portfolio, platform alerts, and security notices.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', color: TEXT_SECONDARY, border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '50px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
              <FiCheck /> Mark all as read
            </button>
            <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', cursor: 'pointer' }}>
              <FiTrash2 />
            </button>
          </div>
        </header>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} {tab === 'All' && <span style={{ background: '#FFF', color: '#000', fontSize: '11px', padding: '2px 8px', borderRadius: '50px', marginLeft: '8px' }}>2</span>}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredNotifs.map(notif => (
            <div key={notif.id} className={`notif-card ${notif.unread ? 'unread' : ''}`}>
              {/* Icon */}
              <div style={{ width: '24px', height: '24px', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px', marginTop: '2px' }}>
                {notif.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '500' }}>{notif.title}</div>
                  <div style={{ color: TEXT_SECONDARY, fontSize: '13px', whiteSpace: 'nowrap' }}>{notif.time}</div>
                </div>
                <div style={{ color: TEXT_SECONDARY, fontSize: '15px', lineHeight: '1.5', marginBottom: '16px' }}>
                  {notif.desc}
                </div>
                {/* Actions */}
                {notif.action && (
                  <button className="premium-btn" style={{ fontSize: '13px', cursor: 'pointer', transition: 'background 0.2s' }}>
                    {notif.action}
                  </button>
                )}
              </div>

              {/* More options */}
              <div style={{ color: TEXT_SECONDARY, cursor: 'pointer' }}>
                <FiMoreHorizontal size={20} />
              </div>
            </div>
          ))}
          
          {filteredNotifs.length === 0 && (
            <div style={{ padding: '60px', textAlign: 'center', color: TEXT_SECONDARY }}>
              No notifications found for "{activeTab}".
            </div>
          )}
        </div>

        </div>
      </main>
    </div>
  );
}
