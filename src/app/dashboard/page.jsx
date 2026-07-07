'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowUpRight, FiArrowDownLeft, FiBell, FiCopy, FiCheck, FiX, FiLoader, FiShield, FiCpu, FiActivity, FiTarget, FiDatabase, FiZap } from 'react-icons/fi';
import { RiDashboardLine, RiWalletLine, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiHistoryLine, RiShieldCheckLine, RiSettings4Line } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';

const BG = '#0A0A0A';
const CARD_BG = '#121212';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#888888';
const FONT = "'Inter', sans-serif";

export default function DashboardOverview() {
  const isSidebarOpen = true;
  const [activeTxTab, setActiveTxTab] = useState('incoming');
  const [activeTimeframe, setActiveTimeframe] = useState('6M');

  // Modals state
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [txSuccess, setTxSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic Chart paths & coordinates
  const chartData = {
    'W': {
      path: "M0 110 Q 75 40, 150 70 T 300 50",
      activeX: 150,
      activeY: 70,
      date: 'Oct 28, 2026',
      value: '$25,329.23'
    },
    'M': {
      path: "M0 100 Q 60 120, 120 60 T 240 80 T 300 40",
      activeX: 120,
      activeY: 60,
      date: 'Oct 15, 2026',
      value: '$22,450.00'
    },
    '6M': {
      path: "M0 110 Q 60 70, 120 90 T 180 50 T 300 110",
      activeX: 180,
      activeY: 50,
      date: 'Oct 22, 2026',
      value: '$20,100.24'
    },
    'Y': {
      path: "M0 90 Q 80 40, 160 100 T 300 60",
      activeX: 160,
      activeY: 100,
      date: 'Jun 12, 2026',
      value: '$16,800.50'
    }
  };

  const currentChart = chartData[activeTimeframe];

  // Copy Address to Clipboard handler
  const handleCopyAddress = () => {
    navigator.clipboard.writeText('01a938f2b2c91c3d8a4f89d3c11b22e11893cfa39281a17bda93e321');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Submit Send Transaction
  const handleSendTransaction = (e) => {
    e.preventDefault();
    if (!sendAmount || !sendAddress) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setTxSuccess(true);
      setTimeout(() => {
        setTxSuccess(false);
        setIsSendOpen(false);
        setSendAmount('');
        setSendAddress('');
      }, 2000);
    }, 2500);
  };

  const transactions = {
    incoming: [
      { name: 'Company', date: 'Jan 24, 2026 - 4:00 PM', amount: '$499.99 USD', logo: 'C' },
      { name: 'Business', date: 'Jan 22, 2026 - 6:15 PM', amount: '$99.99 USD', logo: 'B' },
      { name: 'Studio', date: 'Jan 20, 2026 - 11:00 AM', amount: '$300.00 USD', logo: 'S' },
      { name: 'Venture', date: 'Jan 18, 2026 - 4:00 PM', amount: '$150.00 USD', logo: 'V' },
    ],
    outgoing: [
      { name: 'Rent', date: 'Jan 15, 2026 - 9:00 AM', amount: '$1,200.00 USD', logo: 'R' },
      { name: 'Hosting', date: 'Jan 12, 2026 - 2:30 PM', amount: '$45.00 USD', logo: 'H' },
    ]
  };

  const x402Logs = [
    { id: 1, type: 'x402', text: 'Paid 0.05 CSPR to RWA_Oracle for Miami Plaza valuation.', color: '#FFFFFF' },
    { id: 2, type: 'AI', text: 'Due diligence passed. Status: Active Yield.', color: '#E0E0E0' },
    { id: 3, type: 'x402', text: 'Paid 0.02 CSPR to DeFi_Index for US Treasury yields.', color: '#C0C0C0' }
  ];

  const discoveredOpportunities = [
    {
      id: 1,
      name: 'Miami Commercial Plaza',
      apy: '+8.4% APY',
      risk: 'LOW',
      tags: ['REAL ESTATE'],
      action: 'Auto-Invest',
      hasIcon: true,
      disabled: false
    },
    {
      id: 2,
      name: 'Dubai Marina Luxury Apt',
      apy: '+7.1% APY',
      risk: 'LOW',
      tags: ['SHARIAH COMPLIANT'],
      action: 'Auto-Invest',
      hasIcon: true,
      disabled: false
    },
    {
      id: 3,
      name: 'Tech Startup Factoring',
      apy: '+12.5% APY',
      risk: 'HIGH',
      tags: ['HIGH RISK INVOICES'],
      action: null,
      hasIcon: true,
      disabled: true
    }
  ];

  return (
    <div style={{ display: 'flex', background: BG, minHeight: '100vh', color: TEXT_PRIMARY, fontFamily: FONT }}>
      <style>{`
        .dashboard-container {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 24px;
          width: 100%;
        }
        .card {
          background: ${CARD_BG};
          border-radius: 20px;
          padding: 28px;
          border: 1px solid rgba(255,255,255,0.03);
        }
        .tx-tab {
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }
        .tx-tab.active {
          background: #222;
          color: #FFF;
        }
        .tx-tab.inactive {
          background: transparent;
          color: #666;
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
        .glass-modal {
          background: rgba(18, 18, 18, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 32px;
          width: 460px;
          max-width: 90%;
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
            <div className="sidebar-icon active">
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
            <div className="sidebar-icon">
              <FiShield size={24} style={{ flexShrink: 0 }} />
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
            <h1 style={{ fontSize: '36px', fontWeight: '600', marginBottom: '6px', letterSpacing: '-0.02em' }}>Overview</h1>
            <p style={{ color: TEXT_SECONDARY, fontSize: '16px', fontWeight: '400' }}>Welcome back, John Carter!</p>
          </header>

          <div className="dashboard-container">
            
            {/* LEFT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Wallet Balance Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <p style={{ color: TEXT_SECONDARY, fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Wallet balance</p>
                  <p style={{ fontSize: '38px', fontWeight: '700', letterSpacing: '-0.03em' }}>$25,329.23</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => setIsSendOpen(true)}
                    style={{ flex: 1, height: '48px', borderRadius: '24px', background: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '600', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    SEND <FiArrowUpRight size={16} />
                  </button>
                  <button 
                    onClick={() => setIsReceiveOpen(true)}
                    style={{ flex: 1, height: '48px', borderRadius: '24px', background: 'transparent', color: '#FFFFFF', fontSize: '14px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                  >
                    RECEIVE <FiArrowDownLeft size={16} />
                  </button>
                </div>
              </div>

              {/* Transactions List */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Transactions</h2>
                  <Link href="/dashboard/history" style={{ color: TEXT_SECONDARY, fontSize: '14px', textDecoration: 'none', fontWeight: '500' }}>Browse all</Link>
                </div>

                <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '32px', width: 'fit-content' }}>
                  <button 
                    onClick={() => setActiveTxTab('incoming')}
                    className={`tx-tab ${activeTxTab === 'incoming' ? 'active' : 'inactive'}`}
                  >
                    Incoming
                  </button>
                  <button 
                    onClick={() => setActiveTxTab('outgoing')}
                    className={`tx-tab ${activeTxTab === 'outgoing' ? 'active' : 'inactive'}`}
                  >
                    Outcoming
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {transactions[activeTxTab].map((tx, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#1F1F1F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '16px', color: '#FFF' }}>
                          {tx.logo}
                        </div>
                        <div>
                          <p style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{tx.name}</p>
                          <p style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>{tx.date}</p>
                        </div>
                      </div>
                      <p style={{ fontSize: '15px', fontWeight: '600' }}>{tx.amount}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Income, Expenses, Investment Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p style={{ color: TEXT_SECONDARY, fontSize: '13px', fontWeight: '500' }}>Income</p>
                  <p style={{ fontSize: '22px', fontWeight: '700' }}>$2,608</p>
                </div>
                <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p style={{ color: TEXT_SECONDARY, fontSize: '13px', fontWeight: '500' }}>Expenses</p>
                  <p style={{ fontSize: '22px', fontWeight: '700' }}>$860</p>
                </div>
                <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p style={{ color: TEXT_SECONDARY, fontSize: '13px', fontWeight: '500' }}>Investment</p>
                  <p style={{ fontSize: '22px', fontWeight: '700' }}>$16,428</p>
                </div>
              </div>

              {/* Savings Card */}
              <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ color: TEXT_SECONDARY, fontSize: '14px', fontWeight: '500' }}>Savings</p>
                  <p style={{ fontSize: '24px', fontWeight: '700' }}>
                    $5,100.00 <span style={{ color: TEXT_SECONDARY, fontSize: '16px', fontWeight: '400' }}>/ $8,000.00</span>
                  </p>
                </div>
                
                {/* 75% Circular Progress Indicator */}
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                  <svg width="80" height="80" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#222"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#FFF"
                      strokeWidth="3.5"
                      strokeDasharray="75, 100"
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700' }}>
                    75%
                  </div>
                </div>
              </div>

              {/* Wallet History Line Chart Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '280px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Wallet history</h2>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['W', 'M', '6M', 'Y'].map((t) => (
                      <div 
                        key={t}
                        onClick={() => setActiveTimeframe(t)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '600',
                          background: t === activeTimeframe ? '#222' : 'transparent',
                          color: t === activeTimeframe ? '#FFF' : '#666',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* SVG Spline Line Chart */}
                <div style={{ flex: 1, position: 'relative', height: '140px', marginTop: '20px' }}>
                  <svg viewBox="0 0 300 120" width="100%" height="100%" style={{ overflow: 'visible' }}>
                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    
                    {/* Path 1 */}
                    <path
                      d="M0 100 Q 50 120, 100 80 T 200 40 T 300 90"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1.5"
                    />
                    {/* Main Path with DOT indicator */}
                    <path
                      d={currentChart.path}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      style={{ transition: 'd 0.5s ease' }}
                    />

                    {/* Active Point Dot */}
                    <circle cx={currentChart.activeX} cy={currentChart.activeY} r="5" fill="#FFFFFF" style={{ transition: 'cx 0.5s ease, cy 0.5s ease' }} />
                    <line x1={currentChart.activeX} y1={currentChart.activeY} x2={currentChart.activeX} y2="120" stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" strokeWidth="1" style={{ transition: 'x1 0.5s ease, x2 0.5s ease, y1 0.5s ease' }} />
                  </svg>

                  {/* Tooltip */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: `${currentChart.activeX - 60}px`,
                    background: '#1F1F1F',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    pointerEvents: 'none',
                    transition: 'left 0.5s ease',
                    zIndex: 10
                  }}>
                    <span style={{ color: TEXT_SECONDARY, fontSize: '10px', fontWeight: '500' }}>{currentChart.date}</span>
                    <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '700' }}>{currentChart.value}</span>
                  </div>
                </div>

                {/* Y-Axis Labels */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'absolute', left: '20px', bottom: '30px', fontSize: '10px', color: '#444', fontWeight: '600' }}>
                  <span>25K</span>
                  <span>20K</span>
                  <span>15K</span>
                  <span>10K</span>
                </div>
              </div>

            </div>

          </div>

          {/* AI AGENT HUB SECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '20px', position: 'relative' }}>
            {/* Background Shape */}
            <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', borderTop: '2px solid rgba(255,255,255,0.05)', borderLeft: '2px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }}></div>
            
            <header style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '-0.02em', color: '#FFF' }}>
                <FiCpu style={{ color: '#FFF' }} /> Revora Agentic AI
              </h2>
              <p style={{ color: TEXT_SECONDARY, fontSize: '15px' }}>Autonomous Portfolio Management & Risk Analysis</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', position: 'relative', zIndex: 1 }}>
              
              {/* Agent Status & DeFi Yield Routing */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: 'linear-gradient(145deg, #121212 0%, #0A0A0A 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF' }}><FiActivity /> Agent Status</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', padding: '6px 12px', borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.3)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFF', boxShadow: '0 0 8px #FFF' }}></span>
                    <span style={{ color: '#FFF', fontSize: '12px', fontWeight: '600' }}>ACTIVE & MONITORING</span>
                  </div>
                </div>
                
                <p style={{ color: TEXT_SECONDARY, fontSize: '14px', lineHeight: '1.5' }}>
                  The Revora AI is actively scanning Casper DeFi protocols and RWA markets. Yield routing is enabled.
                </p>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>Current Strategy</span>
                    <span style={{ fontWeight: '600', fontSize: '15px', color: '#FFF' }}>Silver-Tier Yield (Casper/USDC)</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                    <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>Target APY</span>
                    <span style={{ fontWeight: '700', fontSize: '18px', color: '#FFF' }}>14.2%</span>
                  </div>
                </div>

                {/* Simulated x402 Terminal */}
                <div style={{ marginTop: 'auto', background: '#050505', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.15)', height: '140px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', right: 0, bottom: 0, width: '40px', height: '40px', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)' }}></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px' }}>
                    <FiDatabase size={14} color="#FFF" />
                    <span style={{ fontSize: '12px', color: '#FFF', fontWeight: '600', letterSpacing: '1px' }}>x402 MICROPAYMENTS LOG</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'monospace', fontSize: '12px' }}>
                    {x402Logs.map(log => (
                      <p key={log.id} style={{ color: log.color }}>{'>'} [{log.type}] {log.text}</p>
                    ))}
                    <motion.p style={{ color: '#888' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}>
                      {'>'} Awaiting new opportunities_
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Opportunity Discovery & Risk Analysis */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF' }}><FiTarget /> Discovered Opportunities</h3>
                  <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: '#FFF', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => e.target.style.background = '#FFF'} onMouseOut={(e) => e.target.style.background = 'transparent'} onMouseEnter={(e) => e.target.style.color = '#000'} onMouseLeave={(e) => e.target.style.color = '#FFF'}>Refresh</button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {discoveredOpportunities.map(opp => (
                    <div key={opp.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', opacity: opp.disabled ? 0.5 : 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '600', fontSize: '15px', color: '#FFF' }}>{opp.name}</span>
                        <span style={{ color: '#FFF', fontWeight: '700', fontSize: '15px' }}>{opp.apy}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.2)' }}>RISK: {opp.risk}</span>
                          {opp.tags.map((tag, idx) => (
                            <span key={idx} style={{ background: 'transparent', color: '#CCC', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', border: '1px solid rgba(255,255,255,0.1)' }}>
                              {opp.disabled && opp.hasIcon ? <><FiX style={{display:'inline', marginBottom:'-2px'}}/> </> : null}{tag}
                            </span>
                          ))}
                        </div>
                        {opp.action && (
                          <button style={{ background: '#FFF', color: '#000', border: 'none', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {opp.hasIcon && !opp.disabled && <FiZap />} {opp.action}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODALS WINDOW SYSTEM */}
      <AnimatePresence>
        {/* Send Transaction Modal */}
        {isSendOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-modal"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Send Funds</h3>
                <button onClick={() => setIsSendOpen(false)} style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}><FiX size={20} /></button>
              </div>

              {isSending ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', py: '40px' }}>
                  <FiLoader size={48} className="animate-spin" style={{ color: '#FFF' }} />
                  <p style={{ fontSize: '15px', color: TEXT_SECONDARY }}>Broadcasting transaction to Casper network...</p>
                </div>
              ) : txSuccess ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', py: '40px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                    <FiCheck size={32} />
                  </div>
                  <p style={{ fontSize: '18px', fontWeight: '600' }}>Transaction Successful!</p>
                  <p style={{ fontSize: '13px', color: TEXT_SECONDARY }}>Funds successfully sent.</p>
                </div>
              ) : (
                <form onSubmit={handleSendTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', color: TEXT_SECONDARY, fontWeight: '500' }}>Destination Address</label>
                    <input 
                      type="text" 
                      required
                      value={sendAddress}
                      onChange={(e) => setSendAddress(e.target.value)}
                      placeholder="Enter Casper wallet public key..." 
                      style={{ background: '#1D2125', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', height: '48px', padding: '0 16px', color: '#FFF', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '12px', color: TEXT_SECONDARY, fontWeight: '500' }}>Amount (USD)</label>
                    <input 
                      type="number" 
                      required
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      placeholder="e.g. 500" 
                      style={{ background: '#1D2125', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', height: '48px', padding: '0 16px', color: '#FFF', outline: 'none' }}
                    />
                  </div>
                  <button type="submit" style={{ height: '48px', borderRadius: '24px', background: '#FFFFFF', color: '#000000', fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
                    Submit Transaction
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}

        {/* Receive Funds Modal */}
        {isReceiveOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-modal"
              style={{ textAlign: 'center' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', textAlign: 'left' }}>Receive Funds</h3>
                <button onClick={() => setIsReceiveOpen(false)} style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}><FiX size={20} /></button>
              </div>

              {/* Real QR Code */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ background: '#FFF', padding: '16px', borderRadius: '16px', display: 'inline-block' }}>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=01a938f2b2c91c3d8a4f89d3c11b22e11893cfa39281a17bda93e321"
                    width="150"
                    height="150"
                    alt="Casper Wallet Address QR Code"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>

              <p style={{ fontSize: '13px', color: TEXT_SECONDARY, marginBottom: '8px' }}>Your Public Wallet Address</p>
              <div style={{ display: 'flex', alignItems: 'center', justify: 'center', background: '#1D2125', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '12px', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#FFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '280px' }}>
                  01a938f2b2c91c3d8a4f89d3c11b22e11893cfa39281a17bda93e321
                </span>
                <button 
                  onClick={handleCopyAddress}
                  style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {copied ? <FiCheck size={18} style={{ color: '#4CAF50' }} /> : <FiCopy size={18} />}
                </button>
              </div>

              <p style={{ fontSize: '12px', color: TEXT_SECONDARY }}>Share this address or QR code to receive Casper CEP-18 tokens or USD deposits.</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
