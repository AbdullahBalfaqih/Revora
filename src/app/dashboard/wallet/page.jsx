'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FiSend, FiArrowDownLeft, FiArrowUpRight, FiSearch, FiBell, FiMenu, FiPlus, FiRefreshCcw, FiShield, FiCopy, FiLogOut, FiCpu, FiInfo } from 'react-icons/fi';
import { RiDonutChartFill, RiStackLine, RiBriefcase4Line, RiDashboardLine, RiWalletLine, RiHistoryLine, RiSettings4Line, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiShieldCheckLine } from 'react-icons/ri';

const BG = '#080808';
const CARD_BG = '#101010';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A3A3A3';
const FONT = "'Jost', sans-serif";

import { useCasperWallet } from '../../context/CasperWalletContext';
import { CasperServiceByJsonRPC, CLPublicKey } from 'casper-js-sdk';

export default function Wallet() {
  const isSidebarOpen = true;
  const { publicKey, isConnected, connectWallet, disconnectWallet } = useCasperWallet();
  const [csprBalance, setCsprBalance] = useState('0.00');
  const [isFetching, setIsFetching] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  
  // Custom Black Popup State
  const [popup, setPopup] = useState({ visible: false, message: '' });
  const showPopup = (message) => {
    setPopup({ visible: true, message });
    setTimeout(() => {
      setPopup({ visible: false, message: '' });
    }, 3000);
  };
  
  const [aiTreasuryAdvice, setAiTreasuryAdvice] = useState(null);
  const [isTreasuryAnalyzing, setIsTreasuryAnalyzing] = useState(false);

  const runTreasuryAI = async () => {
    if (!isConnected) {
      showPopup("Please connect a wallet first.");
      return;
    }
    setIsTreasuryAnalyzing(true);
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_type: 'treasury',
          data: { balance: csprBalance + ' CSPR', options: ['Aave USDC (6% APY)', 'Lido ETH (3.5% APY)', 'Casper Validator Stake (8% APY)'] }
        })
      });
      const json = await res.json();
      setAiTreasuryAdvice(json.result);
    } catch(e) {
      console.error(e);
    }
    setIsTreasuryAnalyzing(false);
  };

  const handleConnectClick = async () => {
    setIsConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    connectWallet();
    setIsConnecting(false);
  };

  const handleDisconnectConfirm = async () => {
    setIsDisconnecting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    disconnectWallet();
    setIsDisconnecting(false);
    setShowDisconnectModal(false);
  };

  React.useEffect(() => {
    let isMounted = true;
    
    async function fetchBalance() {
      if (!isConnected || !publicKey) {
        setCsprBalance('0.00');
        return;
      }
      
      try {
        setIsFetching(true);
        const client = new CasperServiceByJsonRPC("https://rpc.testnet.casperlabs.io/rpc");
        
        // 1. Get State Root Hash
        const stateRootHash = await client.getStateRootHash();
        
        // 2. Parse Public Key
        let clPublicKey;
        try {
          clPublicKey = CLPublicKey.fromHex(publicKey);
        } catch (e) {
          console.error("Invalid public key hex:", e);
          setIsFetching(false);
          return;
        }

        // 3. Get Account Balance URef
        const balanceUref = await client.getAccountBalanceUrefByPublicKey(clPublicKey, stateRootHash);
        
        if (!balanceUref) {
          if (isMounted) setCsprBalance('0.00');
          setIsFetching(false);
          return;
        }
        
        // 4. Get Balance (in motes)
        const balanceMotes = await client.getAccountBalance(stateRootHash, balanceUref);
        
        // 5. Convert to CSPR (1 CSPR = 1,000,000,000 motes)
        const balanceCSPR = (parseFloat(balanceMotes.toString()) / 1000000000).toFixed(2);
        
        if (isMounted) {
          setCsprBalance(balanceCSPR);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        if (isMounted) setIsFetching(false);
      }
    }

    fetchBalance();

    return () => {
      isMounted = false;
    };
  }, [isConnected, publicKey]);

  const csprUsdValue = (parseFloat(csprBalance) * 0.035).toFixed(2);
  const totalUsdValue = csprUsdValue;

  const tokens = [
    { id: 1, name: 'Casper', symbol: 'CSPR', amount: isConnected ? csprBalance : '0.00', value: isConnected ? `$${csprUsdValue}` : '$0.00', iconUrl: '/images/CSPR.png' },
    { id: 2, name: 'USD Coin', symbol: 'USDC', amount: '0.00', value: '$0.00', iconUrl: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png' },
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
        .spin-icon { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
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
                  <div style={{ fontSize: '48px', fontWeight: '500' }}>
                    {isConnected ? (isFetching ? 'Fetching...' : `$${Number(totalUsdValue).toLocaleString(undefined, {minimumFractionDigits: 2})}`) : '$0.00'}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  {isConnected ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.2)' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFF' }}></div>
                          Connected: {publicKey?.substring(0, 6)}...{publicKey?.substring(publicKey.length - 4)}
                        </div>
                        <button onClick={() => { navigator.clipboard.writeText(publicKey); showPopup('Address copied to clipboard!'); }} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} title="Copy Address">
                          <FiCopy size={14} />
                        </button>
                        <button onClick={() => setShowDisconnectModal(true)} style={{ background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.2)', color: '#FF5555', width: '28px', height: '28px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,50,50,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,50,50,0.1)'} title="Disconnect Wallet">
                          <FiLogOut size={14} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <button onClick={handleConnectClick} disabled={isConnecting} className="premium-btn" style={{ fontSize: '14px', cursor: isConnecting ? 'wait' : 'pointer', opacity: isConnecting ? 0.8 : 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {isConnecting && <FiRefreshCcw className="spin-icon" />}
                      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
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

            {/* Autonomous Treasury AI */}
            <div style={{ background: CARD_BG, borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '500' }}>
                  <FiCpu color="#00FF41" /> Autonomous Treasury AI
                </div>
                <button onClick={runTreasuryAI} disabled={isTreasuryAnalyzing} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', cursor: isTreasuryAnalyzing ? 'wait' : 'pointer' }}>
                  {isTreasuryAnalyzing ? 'Analyzing...' : 'Optimize Yield'}
                </button>
              </div>
              <p style={{ color: TEXT_SECONDARY, fontSize: '14px', margin: 0 }}>Let the AI agent analyze your current balance and recommend the optimal auto-staking or yield route.</p>
              {aiTreasuryAdvice && (
                <div style={{ background: 'rgba(0, 255, 65, 0.05)', border: '1px solid rgba(0, 255, 65, 0.2)', padding: '16px', borderRadius: '8px', color: '#FFF', fontSize: '14px', lineHeight: '1.6', marginTop: '8px' }}>
                  <strong>Agent Recommendation:</strong> {aiTreasuryAdvice}
                </div>
              )}
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

        {/* Disconnect Modal */}
        {showDisconnectModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '40px', maxWidth: '400px', width: '90%', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,50,50,0.1)', color: '#FF5555', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <FiLogOut size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#FFF' }}>Disconnect Wallet?</h3>
                <p style={{ color: TEXT_SECONDARY, fontSize: '15px', lineHeight: '1.6' }}>Are you sure you want to disconnect your Casper wallet? You will need to reconnect to interact with the Testnet.</p>
              </div>
              <div style={{ display: 'flex', gap: '16px', width: '100%', marginTop: '8px' }}>
                <button onClick={() => setShowDisconnectModal(false)} disabled={isDisconnecting} style={{ flex: 1, padding: '14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF', borderRadius: '8px', cursor: isDisconnecting ? 'not-allowed' : 'pointer', fontWeight: '600', fontSize: '15px', transition: 'all 0.2s', opacity: isDisconnecting ? 0.5 : 1 }} onMouseEnter={(e) => !isDisconnecting && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')} onMouseLeave={(e) => !isDisconnecting && (e.currentTarget.style.background = 'transparent')}>Cancel</button>
                <button onClick={handleDisconnectConfirm} disabled={isDisconnecting} style={{ flex: 1, padding: '14px', background: '#FF5555', border: 'none', color: '#000', borderRadius: '8px', cursor: isDisconnecting ? 'wait' : 'pointer', fontWeight: '600', fontSize: '15px', transition: 'all 0.2s', opacity: isDisconnecting ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onMouseEnter={(e) => !isDisconnecting && (e.currentTarget.style.opacity = '0.8')} onMouseLeave={(e) => !isDisconnecting && (e.currentTarget.style.opacity = '1')}>
                  {isDisconnecting ? <FiRefreshCcw className="spin-icon" color="#000" /> : 'Disconnect'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom White Popup */}
        {popup.visible && (
          <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', background: '#FFFFFF', border: '1px solid #E5E5E5', color: '#171717', padding: '16px 24px', borderRadius: '12px', fontSize: '15px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 9999, animation: 'fadeInUp 0.3s ease' }}>
            <FiInfo size={18} color="#171717" />
            {popup.message}
          </div>
        )}
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translate(-50%, 20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
        `}</style>
      </main>
    </div>
  );
}
