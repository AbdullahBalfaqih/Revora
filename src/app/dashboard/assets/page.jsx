'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiSend, FiArrowDownLeft, FiArrowUpRight, FiSearch, FiBell, FiMenu, FiPlus, FiRefreshCcw, FiMapPin, FiTrendingUp, FiMoreVertical, FiFilter, FiShield } from 'react-icons/fi';
import { RiDonutChartFill, RiStackLine, RiBriefcase4Line, RiDashboardLine, RiWalletLine, RiHistoryLine, RiSettings4Line, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiShieldCheckLine } from 'react-icons/ri';

const BG = '#080808';
const CARD_BG = '#101010';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A3A3A3';
const FONT = "'Jost', sans-serif";

export default function Assets() {
  const isSidebarOpen = true;
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeLegalAsset, setActiveLegalAsset] = useState(null);

  React.useEffect(() => {
    if (activeLegalAsset) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeLegalAsset]);

  const filters = ['All', 'Real Estate', 'Government', 'Private Equity', 'Invoices'];

  const assetsList = [
    {
      id: 1,
      name: 'Miami Commercial Plaza',
      category: 'Real Estate',
      location: 'Miami, FL',
      tokensOwned: 50,
      tokenPrice: 100,
      totalValue: 5000,
      apy: '8.4%',
      trend: '+1.2%',
      status: 'Active Yield',
      imageUrl: '/ImageImage(5).png',
      chartData: 'M0 20 C 10 20, 20 10, 30 15 C 40 20, 50 5, 60 10 L 60 40 L 0 40 Z'
    },
    {
      id: 2,
      name: 'US Treasury Bill Pool',
      category: 'Government',
      location: 'Global',
      tokensOwned: 120,
      tokenPrice: 100,
      totalValue: 12000,
      apy: '5.2%',
      trend: '+0.1%',
      status: 'Locked',
      imageUrl: '/ImageImage(11).png',
      chartData: 'M0 30 C 20 30, 30 25, 40 25 C 50 25, 60 20, 70 20 L 70 40 L 0 40 Z'
    },
    {
      id: 3,
      name: 'Dubai Marina Luxury Apt',
      category: 'Real Estate',
      location: 'Dubai, UAE',
      tokensOwned: 15,
      tokenPrice: 100,
      totalValue: 1500,
      apy: '7.1%',
      trend: '+0.8%',
      status: 'Active Yield',
      imageUrl: '/ImageImage(6).png',
      chartData: 'M0 25 C 15 25, 25 15, 35 20 C 45 25, 55 10, 65 5 L 65 40 L 0 40 Z'
    },
    {
      id: 4,
      name: 'Tech Startup Factoring',
      category: 'Invoices',
      location: 'San Francisco, CA',
      tokensOwned: 40,
      tokenPrice: 100,
      totalValue: 4000,
      apy: '12.5%',
      trend: '+2.4%',
      status: 'High Risk',
      imageUrl: '/ImageImage(7).png',
      chartData: 'M0 40 C 10 30, 20 35, 30 15 C 40 -5, 50 20, 60 10 L 60 40 L 0 40 Z'
    }
  ];

  const filteredAssets = activeFilter === 'All' ? assetsList : assetsList.filter(a => a.category === activeFilter);

  return (
    <div style={{ display: 'flex', background: BG, minHeight: '100vh', color: TEXT_PRIMARY, fontFamily: FONT }}>
      <style>{`
        .sidebar { transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; -ms-overflow-style: none; scrollbar-width: none; }
        .sidebar::-webkit-scrollbar { display: none; }
        .sidebar-icon { padding: 8px; border-radius: 12px; cursor: pointer; color: ${TEXT_SECONDARY}; transition: all 0.2s ease; display: flex; align-items: center; gap: ${isSidebarOpen ? '16px' : '0px'}; white-space: nowrap; width: ${isSidebarOpen ? '100%' : '48px'}; overflow: hidden; }
        .sidebar-icon:hover { background: rgba(255,255,255,0.05); color: #FFF; }
        .sidebar-icon.active { background: rgba(255,255,255,0.1); color: #FFF; }
        .sidebar-label { font-size: 14px; font-weight: 500; opacity: ${isSidebarOpen ? 1 : 0}; max-width: ${isSidebarOpen ? '200px' : '0px'}; transition: all 0.3s ease; overflow: hidden; }
        
        .asset-card {
          background: ${CARD_BG};
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.02);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .asset-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .filter-btn {
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid rgba(255,255,255,0.05);
        }
        
        @media (max-width: 768px) { 
          .header-nav { flex-direction: column; align-items: flex-start; gap: 16px; } 
          .sidebar { display: none !important; } 
          .main-content { padding: 16px !important; } 
          .assets-grid { grid-template-columns: 1fr !important; }
        }
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
          <Link href="/dashboard/assets" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon active" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiBuilding4Line size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">My Assets</span></div></Link>
          <Link href="/dashboard/tokenize" style={{ textDecoration: 'none', width: '100%' }}><div className="sidebar-icon" style={{ justifyContent: isSidebarOpen ? 'flex-start' : 'center', padding: isSidebarOpen ? '8px 16px' : '8px' }}><RiCoinLine size={24} style={{ flexShrink: 0 }} /><span className="sidebar-label">Tokenize</span></div></Link>
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
        <header className="header-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '500', marginBottom: '8px', letterSpacing: '-0.02em' }}>My Portfolio Assets</h1>
            <p style={{ color: TEXT_SECONDARY, fontSize: '16px', maxWidth: '500px' }}>Manage your tokenized real-world assets, track their performance, and monitor active yields generated by AI routing.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: CARD_BG, border: '1px solid rgba(255,255,255,0.05)', borderRadius: '50px', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiSearch color={TEXT_SECONDARY} />
              <input type="text" placeholder="Search assets..." style={{ background: 'transparent', border: 'none', color: '#FFF', outline: 'none', width: '150px' }} />
            </div>
            <Link href="/investor" className="premium-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', }}>
              Explore Market <FiArrowUpRight />
            </Link>
          </div>
        </header>

        {/* Portfolio Summary Overview */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Total Portfolio Value</div>
              <div style={{ fontSize: '36px', fontWeight: '600' }}>$22,500.00</div>
            </div>
            <RiWalletLine size={32} color="#FFF" style={{ opacity: 0.8 }} />
          </div>
          <div style={{ flex: '1 1 300px', background: CARD_BG, borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Active Yields (Monthly)</div>
              <div style={{ fontSize: '36px', fontWeight: '600', color: '#FFF' }}>+$1,240.50</div>
            </div>
            <FiTrendingUp size={32} color="#FFF" style={{ opacity: 0.8 }} />
          </div>
          <div style={{ flex: '1 1 300px', background: CARD_BG, borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Unique Assets Owned</div>
              <div style={{ fontSize: '36px', fontWeight: '600' }}>4</div>
            </div>
            <RiBuilding4Line size={32} color="#FFF" style={{ opacity: 0.8 }} />
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="filter-btn"
                style={{
                  background: activeFilter === filter ? '#FFF' : 'transparent',
                  color: activeFilter === filter ? '#000' : TEXT_SECONDARY,
                }}
              >
                {filter}
              </button>
            ))}
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', color: TEXT_SECONDARY, border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
            <FiFilter /> Sort & Filter
          </button>
        </div>

        {/* Assets Grid */}
        <div className="assets-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredAssets.map(asset => (
            <div key={asset.id} className="asset-card">
              {/* Card Header Image */}
              <div style={{ height: '180px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <img 
                  src={asset.imageUrl} 
                  alt={asset.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '500', color: '#FFF' }}>
                  {asset.category}
                </span>
                <button style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', cursor: 'pointer' }}>
                  <FiMoreVertical size={16} />
                </button>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{asset.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: TEXT_SECONDARY, fontSize: '13px', marginBottom: '24px' }}>
                  <FiMapPin /> {asset.location}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '12px', marginBottom: '4px' }}>Tokens Owned</div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>{asset.tokensOwned}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '12px', marginBottom: '4px' }}>Current Value</div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>${asset.totalValue.toLocaleString()}</div>
                  </div>
                </div>

                {/* Performance & APY */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                  <div>
                    <div style={{ color: TEXT_SECONDARY, fontSize: '12px', marginBottom: '4px' }}>Current APY</div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {asset.apy} <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', color: '#A3A3A3', fontWeight: '600' }}>{asset.trend}</span>
                    </div>
                  </div>
                  {/* Mini Sparkline Chart */}
                  <div style={{ width: '80px', height: '40px' }}>
                    <svg viewBox="0 0 70 40" style={{ width: '100%', height: '100%' }}>
                      <path d={asset.chartData} fill="rgba(255,255,255,0.05)" />
                      <path d={asset.chartData.replace('L 60 40 L 0 40 Z', '').replace('L 70 40 L 0 40 Z', '').replace('L 65 40 L 0 40 Z', '')} fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" style={{ opacity: 0.7 }} />
                    </svg>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                  <button style={{ flex: 1, fontSize: '14px', cursor: 'pointer', background: '#FFFFFF', color: '#000000', border: 'none', borderRadius: '8px', padding: '12px 0', fontWeight: '600', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                    Trade
                  </button>
                  <button 
                    onClick={() => setActiveLegalAsset(asset)}
                    style={{ flex: 1, fontSize: '14px', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', color: '#FFF', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px 0', fontWeight: '600', transition: 'all 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  >
                    Legal & Docs
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add New Asset Card */}
          <Link href="/dashboard/tokenize" className="asset-card" style={{ textDecoration: 'none', color: '#FFF', border: '1px dashed rgba(255,255,255,0.15)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '410px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', opacity: 0.6 }}>
              <FiPlus size={32} color="#FFF" />
              <div style={{ fontSize: '18px', fontWeight: '500' }}>Tokenize New Asset</div>
            </div>
          </Link>
        </div>

        {/* Legal & SPV Modal */}
        {activeLegalAsset && (
          <div 
            className="font-sans" 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', overscrollBehavior: 'contain' }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div style={{ background: '#FFF', border: '1px solid #E5E5E5', borderRadius: '12px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', padding: '40px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overscrollBehavior: 'contain' }}>
              <button onClick={() => setActiveLegalAsset(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: '#999', cursor: 'pointer', fontSize: '32px', lineHeight: 1 }} className="hover:text-[#171717] transition-colors">&times;</button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '36px' }}>
                <RiShieldCheckLine size={32} color="#171717" />
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px', color: '#171717', letterSpacing: '-0.03em' }}>Legal & Ownership Structure</h2>
                  <div style={{ color: '#666', fontSize: '15px', fontWeight: '500' }}>{activeLegalAsset.name}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* SPV Info */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#171717', letterSpacing: '-0.02em', borderBottom: '1px solid #E5E5E5', paddingBottom: '12px' }}>Entity Details (SPV / Trust)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', background: '#F8F8F8', padding: '24px', border: '1px solid #E5E5E5', borderRadius: '8px' }}>
                    <div>
                      <div style={{ color: '#666', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>Legal Entity Name</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#171717' }}>{activeLegalAsset.name.split(' ')[0]} Holdings SPV Ltd.</div>
                    </div>
                    <div>
                      <div style={{ color: '#666', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>Jurisdiction</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#171717' }}>ADGM (Abu Dhabi) / Delaware</div>
                    </div>
                    <div>
                      <div style={{ color: '#666', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>Registration No.</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#171717' }}>#SPV-2026-8921</div>
                    </div>
                    <div>
                      <div style={{ color: '#666', fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>Token Standard</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#171717' }}>Casper CEP-18 (Security)</div>
                    </div>
                  </div>
                </div>

                {/* Token -> Deed Mapping */}
                <div style={{ background: '#F8F8F8', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#171717' }}>Legal Token Mapping</h3>
                  <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6' }}>
                    By holding {activeLegalAsset.tokensOwned} tokens of this asset, you hold a legally binding beneficial ownership stake in the SPV mentioned above. The smart contract acts as the digital shareholder registry, recognized under ADGM / Swiss DLT laws.
                  </p>
                </div>

                {/* Documents */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#171717', letterSpacing: '-0.02em', borderBottom: '1px solid #E5E5E5', paddingBottom: '12px' }}>Verified Digital Documents</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['Electronic Title Deed', 'SPV Articles of Association', 'Independent JLL Appraisal', 'Smart Contract Audit Report'].map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF', padding: '16px 20px', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <FiSend color="#666" size={18} />
                          <span style={{ fontSize: '16px', fontWeight: '500', color: '#171717' }}>{doc}</span>
                        </div>
                        <button className="flex py-2 px-5 justify-center items-center gap-2 rounded-lg bg-[#171717] hover:bg-[#333] transition-colors cursor-pointer border-none">
                          <span className="text-[#FFF] text-sm font-semibold leading-5">View PDF</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        </div>
      </main>
    </div>
  );
}
