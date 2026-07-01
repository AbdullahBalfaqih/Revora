'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiSend, FiArrowDownLeft, FiArrowUpRight, FiSearch, FiBell, FiMenu, FiPlus, FiRefreshCcw, FiShield } from 'react-icons/fi';
import { RiDonutChartFill, RiStackLine, RiBriefcase4Line, RiDashboardLine, RiWalletLine, RiHistoryLine, RiSettings4Line, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiShieldCheckLine } from 'react-icons/ri';

const BG = '#080808';
const CARD_BG = '#101010';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A3A3A3';
const FONT = "'Jost', sans-serif";

import { useCasperWallet } from '../../context/CasperWalletContext';

export default function Wallet() {
  const isSidebarOpen = true;
  const { publicKey, isConnected, connectWallet, disconnectWallet } = useCasperWallet();

  const tokens = [
    { id: 1, name: 'Casper', symbol: 'CSPR', amount: isConnected ? '100.00' : '0.00', value: isConnected ? '$3.50' : '$0.00', iconUrl: '/images/CSPR.png' },
    { id: 2, name: 'USD Coin', symbol: 'USDC', amount: isConnected ? '1,500.00' : '0.00', value: isConnected ? '$1,500.00' : '$0.00', iconUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png' },
    { id: 3, name: 'Ethereum', symbol: 'ETH', amount: '0.00', value: '$0.00', iconUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
  ];

  const recentTransfers = [
    { id: 1, type: 'Received', asset: 'USDC', amount: '+500.00', date: 'Today, 2:30 PM', status: 'Completed' },
    { id: 2, type: 'Sent', asset: 'CSPR', amount: '-1,200.00', date: 'Yesterday, 9:15 AM', status: 'Completed' },
    { id: 3, type: 'Swapped', asset: 'ETH to USDC', amount: '0.05 ETH', date: 'Jan 24, 2026', status: 'Completed' },
  ];

  return (
    <div style={{ display: 'flex', background: BG, minHeight: '100vh', color: TEXT_PRIMARY, fontFamily: FONT }}>
      <style>{`
        .dashboard-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
        .left-col { grid-column: span 8; }
        .right-col { grid-column: span 4; }
        .sidebar { transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; -ms-overflow-style: none; scrollbar-width: none; }
        .sidebar::-webkit-scrollbar { display: none; }
        .sidebar-icon { padding: 8px; border-radius: 12px; cursor: pointer; color: ${TEXT_SECONDARY}; transition: all 0.2s ease; display: flex; align-items: center; gap: ${isSidebarOpen ? '16px' : '0px'}; white-space: nowrap; width: ${isSidebarOpen ? '100%' : '48px'}; overflow: hidden; }
        .sidebar-icon:hover { background: rgba(255,255,255,0.05); color: #FFF; }
        .sidebar-icon.active { background: rgba(255,255,255,0.1); color: #FFF; }
        .sidebar-label { font-size: 14px; font-weight: 500; opacity: ${isSidebarOpen ? 1 : 0}; max-width: ${isSidebarOpen ? '200px' : '0px'}; transition: all 0.3s ease; overflow: hidden; }
        @media (max-width: 1024px) { .left-col { grid-column: span 12; } .right-col { grid-column: span 12; } }
        @media (max-width: 768px) { .dashboard-grid { gap: 16px; } .header-nav { flex-direction: column; align-items: flex-start; gap: 16px; } .sidebar { display: none !important; } .main-content { padding: 16px !important; } }
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
          <Link href="/dashboard" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <RiDashboardLine size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">Overview</span>
            </div>
          </Link>
          <Link href="/dashboard/wallet" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon active" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <RiWalletLine size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">Wallet</span>
            </div>
          </Link>
          <Link href="/dashboard/assets" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <RiBuilding4Line size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">My Assets</span>
            </div>
          </Link>
          <Link href="/dashboard/tokenize" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <RiCoinLine size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">Tokenize</span>
            </div>
          </Link>
          <Link href="/investor" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <RiStore2Line size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">Marketplace</span>
            </div>
          </Link>
          <Link href="/dashboard/analytics" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <RiBarChartBoxLine size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">Analytics</span>
            </div>
          </Link>
          <Link href="/dashboard/history" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <RiHistoryLine size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">History</span>
            </div>
          </Link>
          <Link href="/dashboard/compliance" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <RiShieldCheckLine size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">Compliance</span>
            </div>
          </Link>
          <Link href="/dashboard/admin" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <FiShield size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">Administration</span>
            </div>
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', alignItems: isSidebarOpen ? 'flex-start' : 'center' }}>
          <Link href="/dashboard/notifications" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <FiBell size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">Notifications</span>
            </div>
          </Link>
          <Link href="/dashboard/settings" style={{ textDecoration: 'none', width: '100%' }}>
            <div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}>
              <RiSettings4Line size={24} style={{ flexShrink: 0 }} />
              <span className="sidebar-label">Settings</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ flex: 1, padding: '32px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <header className="header-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '500', marginBottom: '4px' }}>Wallet</h1>
            <p style={{ color: TEXT_SECONDARY, fontSize: '16px' }}>Manage your funds and connected accounts.</p>
          </div>
          <Link href="/" style={{ color: TEXT_SECONDARY, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', background: CARD_BG, padding: '12px 24px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#FFF'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = TEXT_SECONDARY; }}>
            Back to Home
          </Link>
        </header>

        {/* Grid Layout */}
        <div className="dashboard-grid">
          
          {/* LEFT COLUMN */}
          <div className="left-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Total Balance Card */}
            <div style={{ background: 'linear-gradient(145deg, #1A1A1A 0%, #0A0A0A 100%)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Total Balance (USD)</div>
                  <div style={{ fontSize: '48px', fontWeight: '500' }}>{isConnected ? '$1,503.50' : '$0.00'}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  {isConnected ? (
                    <>
                      <div style={{ background: 'rgba(0,255,65,0.1)', color: '#00FF41', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00FF41' }}></div>
                        Connected: {publicKey?.substring(0, 6)}...{publicKey?.substring(publicKey.length - 4)}
                      </div>
                      <button onClick={disconnectWallet} style={{ background: 'transparent', color: TEXT_SECONDARY, border: 'none', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button onClick={connectWallet} className="premium-btn" style={{ fontSize: '14px', cursor: 'pointer' }}>
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{ flex: 1, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#FFF', padding: '12px 24px', fontWeight: '600', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#1a1a1a'} onMouseLeave={(e) => e.currentTarget.style.background = '#121212'}>
                  <FiArrowUpRight /> Send
                </button>
                <button style={{ flex: 1, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#FFF', padding: '12px 24px', fontWeight: '600', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#1a1a1a'} onMouseLeave={(e) => e.currentTarget.style.background = '#121212'}>
                  <FiArrowDownLeft /> Receive
                </button>
                <button style={{ flex: 1, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', background: '#121212', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#FFF', padding: '12px 24px', fontWeight: '600', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#1a1a1a'} onMouseLeave={(e) => e.currentTarget.style.background = '#121212'}>
                  <FiRefreshCcw /> Swap
                </button>
              </div>
            </div>

            {/* Tokens List */}
            <div style={{ background: CARD_BG, borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: '500' }}>Your Tokens</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {tokens.map(token => (
                  <div key={token.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '10px' }}>
                        <img src={token.iconUrl} alt={token.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>{token.name}</div>
                        <div style={{ color: TEXT_SECONDARY, fontSize: '14px' }}>{token.symbol}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>{token.amount}</div>
                      <div style={{ color: TEXT_SECONDARY, fontSize: '14px' }}>{token.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="right-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Recent Transfers */}
            <div style={{ background: CARD_BG, borderRadius: '24px', padding: '32px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '18px', fontWeight: '500' }}>Recent Transfers</div>
                <div style={{ color: TEXT_SECONDARY, fontSize: '14px', cursor: 'pointer' }}>View All</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {recentTransfers.map(transfer => (
                  <div key={transfer.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: transfer.type === 'Received' ? 'rgba(0,255,65,0.1)' : 'rgba(255,255,255,0.05)', color: transfer.type === 'Received' ? '#00FF41' : '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {transfer.type === 'Received' ? <FiArrowDownLeft /> : transfer.type === 'Sent' ? <FiArrowUpRight /> : <FiRefreshCcw />}
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '2px' }}>{transfer.type} {transfer.asset}</div>
                        <div style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>{transfer.date}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: transfer.type === 'Received' ? '#00FF41' : '#FFF' }}>
                      {transfer.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Casper Network Banner */}
            <div style={{ background: 'linear-gradient(135deg, #FF0000 0%, #800000 100%)', borderRadius: '24px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Casper Network</div>
                <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '24px', lineHeight: '1.5' }}>Experience enterprise-grade blockchain with low fees and high security.</div>
                <button className="premium-btn" style={{ fontSize: '13px', cursor: 'pointer' }}>
                  Learn More
                </button>
              </div>
            </div>

          </div>

        </div>
        </div>
      </main>
    </div>
  );
}
