'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiBell, FiTrendingUp, FiTrendingDown, FiActivity, FiPieChart, FiBarChart2 } from 'react-icons/fi';
import { RiDashboardLine, RiWalletLine, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiHistoryLine, RiShieldCheckLine, RiSettings4Line } from 'react-icons/ri';

const BG = '#080808';
const CARD_BG = '#101010';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A3A3A3';
const FONT = "'Jost', sans-serif";

export default function Analytics() {
  const isSidebarOpen = true;
  const [timeRange, setTimeRange] = useState('1M');
  const [hoverIndex, setHoverIndex] = useState(null);

  const ranges = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];

  const dataMap = {
    '1W': {
      metrics: [
        { title: 'Total Value Locked', value: '$141,200.00', trend: '+1.5%', isUp: true },
        { title: '7d Trading Volume', value: '$4,120.00', trend: '-2.1%', isUp: false },
        { title: 'Average Portfolio Yield', value: '8.4% APY', trend: '+0.1%', isUp: true },
        { title: 'Realized Gains', value: '$120.00', trend: '+5.0%', isUp: true },
      ],
      chartData: [111000, 111500, 111200, 112000, 111800, 112450, 112900],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      bars: [40, 50, 45, 60, 55, 70, 65]
    },
    '1M': {
      metrics: [
        { title: 'Total Value Locked', value: '$142,500.00', trend: '+12.5%', isUp: true },
        { title: '30d Trading Volume', value: '$8,240.50', trend: '+4.2%', isUp: true },
        { title: 'Average Portfolio Yield', value: '8.4% APY', trend: '+0.8%', isUp: true },
        { title: 'Realized Gains', value: '$1,850.00', trend: '-1.2%', isUp: false },
      ],
      chartData: [120000, 122000, 121000, 125000, 128000, 132000, 131000, 135000, 139000, 142500],
      labels: ['1st', '4th', '8th', '12th', '16th', '20th', '24th', '28th', '30th', '31st'],
      bars: [40, 60, 45, 80]
    },
    '3M': {
      metrics: [
        { title: 'Total Value Locked', value: '$148,000.00', trend: '+22.5%', isUp: true },
        { title: '90d Trading Volume', value: '$24,500.00', trend: '+14.2%', isUp: true },
        { title: 'Average Portfolio Yield', value: '8.6% APY', trend: '+1.2%', isUp: true },
        { title: 'Realized Gains', value: '$4,200.00', trend: '+8.5%', isUp: true },
      ],
      chartData: [100000, 105000, 112000, 110000, 118000, 125000, 130000, 138000, 142000, 148000],
      labels: ['Week 1', 'Week 4', 'Week 8', 'Week 12'],
      bars: [50, 70, 90]
    },
    '6M': {
      metrics: [
        { title: 'Total Value Locked', value: '$135,400.00', trend: '+45.0%', isUp: true },
        { title: '6m Trading Volume', value: '$52,100.00', trend: '+24.1%', isUp: true },
        { title: 'Average Portfolio Yield', value: '8.2% APY', trend: '-0.4%', isUp: false },
        { title: 'Realized Gains', value: '$8,900.00', trend: '+15.2%', isUp: true },
      ],
      chartData: [80000, 85000, 95000, 102000, 108000, 115000, 122000, 120000, 128000, 135400],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      bars: [30, 45, 40, 60, 55, 80]
    },
    '1Y': {
      metrics: [
        { title: 'Total Value Locked', value: '$182,500.00', trend: '+112.5%', isUp: true },
        { title: '1y Trading Volume', value: '$128,240.00', trend: '+84.2%', isUp: true },
        { title: 'Average Portfolio Yield', value: '9.1% APY', trend: '+2.8%', isUp: true },
        { title: 'Realized Gains', value: '$18,850.00', trend: '+41.2%', isUp: true },
      ],
      chartData: [60000, 72000, 85000, 90000, 110000, 125000, 140000, 135000, 155000, 168000, 175000, 182500],
      labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
      bars: [40, 60, 85, 100]
    },
    'ALL': {
      metrics: [
        { title: 'Total Value Locked', value: '$242,500.00', trend: '+312.5%', isUp: true },
        { title: 'All Time Volume', value: '$348,240.00', trend: '+204.2%', isUp: true },
        { title: 'Average Portfolio Yield', value: '8.8% APY', trend: '+1.8%', isUp: true },
        { title: 'Realized Gains', value: '$45,850.00', trend: '+141.2%', isUp: true },
      ],
      chartData: [20000, 45000, 80000, 110000, 130000, 150000, 180000, 210000, 242500],
      labels: ['2023', '2024', '2025', '2026'],
      bars: [20, 50, 75, 100]
    }
  };

  const currentData = dataMap[timeRange];

  // Generate SVG Points dynamically
  const minVal = Math.min(...currentData.chartData) * 0.95;
  const maxVal = Math.max(...currentData.chartData) * 1.05;
  const range = maxVal - minVal || 1;
  
  const points = currentData.chartData.map((val, i) => {
    const x = i * (900 / (currentData.chartData.length - 1));
    const y = 260 - ((val - minVal) / range) * 220;
    return { x, y, val };
  });

  const createSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const cx1 = p1.x + (p2.x - p1.x) / 2;
      d += ` C ${cx1} ${p1.y}, ${cx1} ${p2.y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const pathD = createSmoothPath(points);
  const pathFill = `${pathD} L 900 300 L 0 300 Z`;

  // Interaction handlers
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const index = Math.round(percent * (points.length - 1));
    setHoverIndex(Math.max(0, Math.min(index, points.length - 1)));
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };


  return (
    <div style={{ display: 'flex', background: BG, minHeight: '100vh', color: TEXT_PRIMARY, fontFamily: FONT }}>
      <style>{`
        .tech-font { font-family: 'Jost', sans-serif; letter-spacing: -0.01em; }

        .sidebar { transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; }
        .sidebar-icon { padding: 12px; border-radius: 12px; cursor: pointer; color: ${TEXT_SECONDARY}; transition: all 0.2s ease; display: flex; align-items: center; gap: ${isSidebarOpen ? '16px' : '0px'}; white-space: nowrap; width: ${isSidebarOpen ? '100%' : '48px'}; overflow: hidden; }
        .sidebar-icon:hover { background: rgba(255,255,255,0.05); color: #FFF; }
        .sidebar-icon.active { background: rgba(255,255,255,0.1); color: #FFF; }
        .sidebar-label { font-size: 14px; font-weight: 500; opacity: ${isSidebarOpen ? 1 : 0}; max-width: ${isSidebarOpen ? '200px' : '0px'}; transition: all 0.3s ease; overflow: hidden; }
        
        .metric-card {
          background: ${CARD_BG};
          border-radius: 24px;
          padding: 32px;
          border: 1px solid rgba(255,255,255,0.02);
          transition: transform 0.3s ease;
        }
        .metric-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.1);
        }

        .range-btn {
          background: transparent;
          color: ${TEXT_SECONDARY};
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .range-btn.active {
          background: #FFF;
          color: #000;
        }
        
        .bar-chart-col {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          position: relative;
          display: flex;
          align-items: flex-end;
          transition: background 0.2s;
        }
        .bar-chart-col:hover {
          background: rgba(255,255,255,0.1);
        }
        .bar-fill {
          width: 100%;
          background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.1) 100%);
          border-radius: 8px;
        }

        @media (max-width: 1024px) { 
          .grid-layout { grid-template-columns: 1fr !important; } 
          .metric-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) { 
          .sidebar { display: none !important; } 
          .metric-grid { grid-template-columns: 1fr !important; }
        }
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
          <Link href="/dashboard/analytics" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon active" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiBarChartBoxLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Analytics</span></div></Link>
          <Link href="/dashboard/history" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '12px 16px' : '12px' }}><RiHistoryLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">History</span></div></Link>
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
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '500', marginBottom: '8px', letterSpacing: '-0.02em' }}>Analytics & Performance</h1>
            <p style={{ color: TEXT_SECONDARY, fontSize: '16px' }}>Deep dive into your portfolio's metrics and yield generation.</p>
          </div>
          <div style={{ display: 'flex', background: CARD_BG, border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '4px' }}>
            {ranges.map(r => (
              <button 
                key={r} 
                className={`range-btn ${timeRange === r ? 'active' : ''}`}
                onClick={() => setTimeRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="metric-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {currentData.metrics.map((m, idx) => (
            <div key={idx} className="metric-card">
              <div style={{ color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '16px' }}>{m.title}</div>
              <div className="tech-font" style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>{m.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', color: m.isUp ? '#FFFFFF' : '#A3A3A3', background: m.isUp ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '50px', width: 'fit-content' }}>
                {m.isUp ? <FiTrendingUp /> : <FiTrendingDown />} {m.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Main Chart Area */}
        <div style={{ background: CARD_BG, borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.02)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiActivity size={24} color="#FFF" />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '500' }}>Portfolio Growth</div>
                <div style={{ color: TEXT_SECONDARY, fontSize: '14px' }}>Value vs. Yield Comparison</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: TEXT_SECONDARY }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#FFFFFF' }}></div> Portfolio Value
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: TEXT_SECONDARY }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(255,255,255,0.2)' }}></div> Yield Generated
              </div>
            </div>
          </div>

          {/* SVG Chart Interactive Area */}
          <div 
            style={{ position: 'relative', height: '300px', width: '100%', borderBottom: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Grid Lines */}
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', bottom: `${(i+1)*25}%` }}></div>
            ))}
            
            <svg viewBox="0 0 900 300" style={{ width: '100%', height: '100%', overflow: 'visible' }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
              </defs>
              <path d={pathFill} fill="url(#chartGradient)" style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              <path d={pathD} fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', filter: 'drop-shadow(0px 4px 10px rgba(255, 255, 255, 0.2))' }} />
              
              {/* Interactive Tooltip Dot */}
              {hoverIndex !== null && (
                <>
                  <circle cx={points[hoverIndex].x} cy={points[hoverIndex].y} r="6" fill="#101010" stroke="#FFFFFF" strokeWidth="3" style={{ transition: 'all 0.1s ease-out' }} />
                  <line x1={points[hoverIndex].x} y1={points[hoverIndex].y} x2={points[hoverIndex].x} y2="300" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" style={{ transition: 'all 0.1s ease-out' }} />
                </>
              )}
            </svg>

            {/* Premium Dark Tooltip */}
            {hoverIndex !== null && (
              <div style={{ position: 'absolute', left: `${(points[hoverIndex].x / 900) * 100}%`, top: `${(points[hoverIndex].y / 300) * 100}%`, transform: 'translate(-50%, -120%)', background: 'rgba(15,15,15,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', padding: '16px 20px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.8)', zIndex: 10, transition: 'all 0.1s ease-out', pointerEvents: 'none', minWidth: '120px', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: TEXT_SECONDARY, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Point {hoverIndex + 1}</div>
                <div className="tech-font" style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>${points[hoverIndex].val.toLocaleString()}</div>
                <div className="tech-font" style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '600' }}>Active</div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: TEXT_SECONDARY, fontSize: '12px', marginTop: '16px', paddingLeft: '16px' }}>
            {currentData.labels.map((lbl, idx) => <span key={idx}>{lbl}</span>)}
          </div>
        </div>

        {/* Secondary Charts Layout */}
        <div className="grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          
          {/* Asset Allocation */}
          <div style={{ background: CARD_BG, borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <FiPieChart size={24} color={TEXT_SECONDARY} />
              <div style={{ fontSize: '18px', fontWeight: '500' }}>Asset Allocation</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'conic-gradient(#FFFFFF 0% 45%, #A3A3A3 45% 75%, #333333 75% 100%)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px', background: CARD_BG, borderRadius: '50%' }}></div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#FFFFFF' }}></div> Real Estate
                  </div>
                  <div style={{ fontWeight: '600' }}>45%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#A3A3A3' }}></div> Government Bonds
                  </div>
                  <div style={{ fontWeight: '600' }}>30%</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#333' }}></div> Invoice Factoring
                  </div>
                  <div style={{ fontWeight: '600' }}>25%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Bar Chart */}
          <div style={{ background: CARD_BG, borderRadius: '24px', padding: '40px', border: '1px solid rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <FiBarChart2 size={24} color={TEXT_SECONDARY} />
              <div style={{ fontSize: '18px', fontWeight: '500' }}>Yield Revenue (6 Months)</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '160px', width: '100%', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {currentData.bars.map((height, i) => (
                <div key={i} className="bar-chart-col" style={{ height: '100%' }}>
                  <div className="bar-fill" style={{ height: `${height}%`, transition: 'height 0.5s ease' }}></div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: TEXT_SECONDARY, fontSize: '12px', marginTop: '16px' }}>
              {currentData.labels.map((lbl, idx) => <span key={idx}>{lbl}</span>)}
            </div>
          </div>

        </div>
        </div>
      </main>
    </div>
  );
}
