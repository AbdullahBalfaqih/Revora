'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiBell, FiSearch, FiFilter, FiDownload, FiExternalLink, FiArrowDownLeft, FiArrowUpRight, FiRefreshCcw } from 'react-icons/fi';
import { RiDashboardLine, RiWalletLine, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiHistoryLine, RiShieldCheckLine, RiSettings4Line } from 'react-icons/ri';

const BG = '#080808';
const CARD_BG = '#101010';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A3A3A3';
const FONT = "'Jost', sans-serif";

export default function History() {
  const isSidebarOpen = true;
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Deposits', 'Withdrawals', 'Yield Claim', 'Token Trades'];

  const transactions = [
    { id: 'TX-99821A', date: 'Oct 24, 2026', time: '14:30', type: 'Yield Claim', asset: 'USDC', amount: '+ 450.00', status: 'Completed', hash: '0x8f...3a9b' },
    { id: 'TX-99820B', date: 'Oct 22, 2026', time: '09:15', type: 'Token Trades', asset: 'Dubai Marina', amount: '15 Tokens', status: 'Completed', hash: '0x2c...1b4f' },
    { id: 'TX-99819C', date: 'Oct 20, 2026', time: '18:45', type: 'Deposits', asset: 'CSPR', amount: '+ 15,000.00', status: 'Completed', hash: '0x9a...7d2e' },
    { id: 'TX-99818D', date: 'Oct 18, 2026', time: '11:20', type: 'Withdrawals', asset: 'USDC', amount: '- 2,000.00', status: 'Pending', hash: '0x1e...5c8a' },
    { id: 'TX-99817E', date: 'Oct 15, 2026', time: '16:05', type: 'Yield Claim', asset: 'USDC', amount: '+ 320.50', status: 'Completed', hash: '0x4b...9f1c' },
    { id: 'TX-99816F', date: 'Oct 10, 2026', time: '10:00', type: 'Token Trades', asset: 'Miami Plaza', amount: '50 Tokens', status: 'Failed', hash: '0x7d...3e2a' },
    { id: 'TX-99815G', date: 'Oct 05, 2026', time: '13:40', type: 'Deposits', asset: 'ETH', amount: '+ 2.50', status: 'Completed', hash: '0x5f...8a1b' },
  ];

  const filteredTx = activeTab === 'All' ? transactions : transactions.filter(t => t.type === activeTab);

  const getStatusColor = (status) => {
    if (status === 'Completed') return '#FFFFFF';
    if (status === 'Pending') return '#A3A3A3';
    return '#666666';
  };

  const getTypeIcon = (type) => {
    if (type === 'Deposits' || type === 'Yield Claim') return <FiArrowDownLeft size={16} />;
    if (type === 'Withdrawals') return <FiArrowUpRight size={16} />;
    return <FiRefreshCcw size={16} />;
  };

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
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn.active {
          background: #FFF;
          color: #000;
        }
        
        .tx-row {
          display: grid;
          grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1fr;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.2s;
        }
        .tx-row:hover {
          background: rgba(255,255,255,0.02);
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          display: inline-block;
          margin-right: 8px;
        }

        @media (max-width: 1024px) { .tx-row { grid-template-columns: 2fr 2fr 1.5fr 1fr; } .tx-hash { display: none; } }
        @media (max-width: 768px) { .sidebar { display: none !important; } .main-content { padding: 16px !important; } .tx-row { grid-template-columns: 1fr 1fr; gap: 16px; } .tx-type, .tx-hash { display: none; } }
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
          <Link href="/dashboard/history" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon active" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiHistoryLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">History</span></div></Link>
          <Link href="/dashboard/compliance" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiShieldCheckLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Compliance</span></div></Link>
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
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '500', marginBottom: '8px', letterSpacing: '-0.02em' }}>Transaction History</h1>
            <p style={{ color: TEXT_SECONDARY, fontSize: '16px' }}>View all blockchain transactions, trades, and yield payouts on the Casper Network.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: CARD_BG, padding: '12px 24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <FiSearch color={TEXT_SECONDARY} />
              <input type="text" placeholder="Search TxHash..." style={{ background: 'transparent', border: 'none', color: '#FFF', outline: 'none', width: '150px' }} />
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: CARD_BG, border: '1px solid rgba(255,255,255,0.05)', color: '#FFF', padding: '0 24px', borderRadius: '8px', fontWeight: '600' }}>
              <FiFilter /> Filter
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: '#FFF', color: '#000', border: 'none', padding: '0 24px', borderRadius: '8px', fontWeight: '700', boxShadow: '0 0 20px rgba(255,255,255,0.4)' }}>
              <FiDownload /> Export CSV
            </button>
          </div>
        </header>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div style={{ background: CARD_BG, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)', overflow: 'hidden' }}>
          
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr 1fr', padding: '20px 24px', background: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '600' }}>
            <div>Transaction</div>
            <div className="tx-type">Asset / Type</div>
            <div>Amount</div>
            <div className="tx-hash">TxHash</div>
            <div style={{ textAlign: 'right' }}>Status</div>
          </div>

          {/* Table Body */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredTx.map(tx => (
              <div key={tx.id} className="tx-row">
                {/* Col 1: Date & Time */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                    {getTypeIcon(tx.type)}
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>{tx.id}</div>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '13px' }}>{tx.date} • {tx.time}</div>
                  </div>
                </div>

                {/* Col 2: Type & Asset */}
                <div className="tx-type">
                  <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>{tx.asset}</div>
                  <div style={{ color: TEXT_SECONDARY, fontSize: '13px' }}>{tx.type}</div>
                </div>

                {/* Col 3: Amount */}
                <div style={{ fontSize: '15px', fontWeight: '600', color: tx.amount.includes('+') ? '#FFFFFF' : '#A3A3A3' }}>
                  {tx.amount}
                </div>

                {/* Col 4: TxHash */}
                <div className="tx-hash">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: TEXT_SECONDARY, fontSize: '14px', fontFamily: "'Courier New', Courier, monospace" }}>
                    {tx.hash} <FiExternalLink size={14} style={{ cursor: 'pointer' }} />
                  </div>
                </div>

                {/* Col 5: Status */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', color: getStatusColor(tx.status), padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="status-dot" style={{ background: getStatusColor(tx.status), boxShadow: '0 0 8px rgba(255,255,255,0.2)' }}></span>
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTx.length === 0 && (
            <div style={{ padding: '60px', textAlign: 'center', color: TEXT_SECONDARY }}>
              No transactions found for "{activeTab}".
            </div>
          )}

          {/* Pagination */}
          <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ color: TEXT_SECONDARY, fontSize: '14px' }}>Showing 1-7 of 124 transactions</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: TEXT_SECONDARY, cursor: 'pointer', fontSize: '13px', padding: '8px 16px', fontWeight: '600' }}>Previous</button>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#FFF', cursor: 'pointer', fontSize: '13px', padding: '8px 16px', fontWeight: '600' }}>Next</button>
            </div>
          </div>
        </div>

        </div>
      </main>
    </div>
  );
}
