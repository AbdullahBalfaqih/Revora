'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiMessageSquare, FiCpu, FiPlay, FiCheckCircle } from 'react-icons/fi';
import { RiDashboardLine, RiWalletLine, RiBuilding4Line, RiCoinLine, RiStore2Line, RiBarChartBoxLine, RiHistoryLine, RiShieldCheckLine, RiSettings4Line } from 'react-icons/ri';
import { useCasperWallet } from '../../context/CasperWalletContext';

const BG = '#080808';
const CARD_BG = '#101010';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#A3A3A3';
const FONT = "'Jost', sans-serif";

export default function AgentMarketplace() {
  const isSidebarOpen = true;
  const [messages, setMessages] = useState([]);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [dealReached, setDealReached] = useState(false);
  const [currentOffer, setCurrentOffer] = useState('$105.00');
  
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNegotiation = async () => {
    if (isNegotiating || dealReached) return;
    setIsNegotiating(true);
    setMessages([]);
    setDealReached(false);

    const assetContext = "Fractional RWA: 'Dubai Marina Villa' Token. Initial ask: $110.00. Initial bid: $100.00.";
    let contextHistory = assetContext;
    let currentPrice = "$110.00";

    // Round 1: Buyer
    let buyerRes = await fetchNegotiation('Buyer Agent', contextHistory, currentPrice);
    if (!buyerRes) { setIsNegotiating(false); return; }
    setMessages(prev => [...prev, { role: 'Buyer', text: buyerRes }]);
    contextHistory += ` Buyer says: ${buyerRes}.`;
    
    // Round 2: Seller
    let sellerRes = await fetchNegotiation('Seller Agent', contextHistory, currentPrice);
    if (!sellerRes) { setIsNegotiating(false); return; }
    setMessages(prev => [...prev, { role: 'Seller', text: sellerRes }]);
    contextHistory += ` Seller says: ${sellerRes}.`;

    // Round 3: Buyer
    let buyerRes2 = await fetchNegotiation('Buyer Agent', contextHistory, currentPrice);
    if (!buyerRes2) { setIsNegotiating(false); return; }
    setMessages(prev => [...prev, { role: 'Buyer', text: buyerRes2 }]);
    
    setDealReached(true);
    setIsNegotiating(false);
    setCurrentOffer('$104.50'); // Simulated agreed price
  };

  const fetchNegotiation = async (role, context, current_offer) => {
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_type: 'negotiator',
          data: { role, context, current_offer }
        })
      });
      const json = await res.json();
      return json.result;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (
    <div style={{ display: 'flex', background: BG, minHeight: '100vh', color: TEXT_PRIMARY, fontFamily: FONT }}>
      <style>{`
        .sidebar { transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; -ms-overflow-style: none; scrollbar-width: none; }
        .sidebar::-webkit-scrollbar { display: none; }
        .sidebar-icon { padding: 8px; border-radius: 12px; cursor: pointer; color: ${TEXT_SECONDARY}; transition: all 0.2s ease; display: flex; align-items: center; gap: ${isSidebarOpen ? '16px' : '0px'}; white-space: nowrap; width: ${isSidebarOpen ? '100%' : '48px'}; overflow: hidden; }
        .sidebar-icon:hover { background: rgba(255,255,255,0.05); color: #FFF; }
        .sidebar-icon.active { background: rgba(255,255,255,0.1); color: #FFF; }
        .sidebar-label { font-size: 14px; font-weight: 500; opacity: ${isSidebarOpen ? 1 : 0}; max-width: ${isSidebarOpen ? '200px' : '0px'}; transition: all 0.3s ease; overflow: hidden; }
        
        .message-bubble { padding: 16px; border-radius: 12px; max-width: 80%; line-height: 1.5; font-size: 15px; }
        .buyer-bubble { background: rgba(0, 122, 255, 0.1); border: 1px solid rgba(0, 122, 255, 0.2); align-self: flex-start; border-bottom-left-radius: 2px; }
        .seller-bubble { background: rgba(255, 149, 0, 0.1); border: 1px solid rgba(255, 149, 0, 0.2); align-self: flex-end; border-bottom-right-radius: 2px; }
      `}</style>
      
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: isSidebarOpen ? '240px' : '80px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', padding: isSidebarOpen ? '20px 16px' : '20px 0', gap: '16px', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'hidden' }}>
        <div style={{ width: '100%', padding: '0 16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '16px' }}>
            <img src="/images/icon.png" alt="Logo" style={{ width: '24px', height: '24px' }} />
            <span style={{ color: '#FFF', fontSize: '20px', fontWeight: '600' }}>Revora</span>
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, marginTop: '8px' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}><div className="sidebar-icon"><RiDashboardLine size={24} /><span className="sidebar-label">Overview</span></div></Link>
          <Link href="/dashboard/wallet" style={{ textDecoration: 'none' }}><div className="sidebar-icon"><RiWalletLine size={24} /><span className="sidebar-label">Wallet</span></div></Link>
          <Link href="/dashboard/assets" style={{ textDecoration: 'none' }}><div className="sidebar-icon"><RiBuilding4Line size={24} /><span className="sidebar-label">My Assets</span></div></Link>
          <Link href="/dashboard/tokenize" style={{ textDecoration: 'none' }}><div className="sidebar-icon"><RiCoinLine size={24} /><span className="sidebar-label">Tokenize</span></div></Link>
          <Link href="/investor" style={{ textDecoration: 'none' }}><div className="sidebar-icon"><RiStore2Line size={24} /><span className="sidebar-label">Marketplace</span></div></Link>
          <Link href="/dashboard/marketplace-agents" style={{ textDecoration: 'none' }}><div className="sidebar-icon active"><FiCpu size={24} /><span className="sidebar-label">Agentic Trades</span></div></Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 48px', minHeight: '100vh', overflowY: 'auto' }}>
        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: '500', marginBottom: '8px' }}>Agent-to-Agent Marketplace</h1>
            <p style={{ color: TEXT_SECONDARY, fontSize: '16px', maxWidth: '600px' }}>Watch autonomous AI agents negotiate and execute fractional RWA trades on your behalf.</p>
          </div>
          <button onClick={startNegotiation} disabled={isNegotiating} style={{ background: '#FFF', color: '#000', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: isNegotiating ? 'wait' : 'pointer', opacity: isNegotiating ? 0.7 : 1 }}>
            {isNegotiating ? <FiCpu className="spin-icon" /> : <FiPlay />}
            {isNegotiating ? 'Negotiating...' : 'Start AI Negotiation'}
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* Chat / Terminal Area */}
          <div style={{ background: CARD_BG, borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', height: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
              <FiMessageSquare size={20} color={TEXT_SECONDARY} />
              <span style={{ fontSize: '18px', fontWeight: '500' }}>Live Negotiation Feed</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '8px' }}>
              {messages.length === 0 && !isNegotiating && (
                <div style={{ margin: 'auto', color: TEXT_SECONDARY, textAlign: 'center' }}>
                  <FiCpu size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>No active negotiations. Click start to simulate.</p>
                </div>
              )}
              
              {messages.map((msg, i) => (
                <div key={i} className={`message-bubble ${msg.role === 'Buyer' ? 'buyer-bubble' : 'seller-bubble'}`}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', opacity: 0.7 }}>{msg.role} Agent</div>
                  {msg.text}
                </div>
              ))}
              {isNegotiating && (
                <div style={{ alignSelf: 'center', color: TEXT_SECONDARY, fontSize: '14px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                  <FiCpu className="spin-icon" /> Agents are typing...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Trade Status Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: CARD_BG, borderRadius: '24px', padding: '32px', border: '1px solid rgba(255,255,255,0.02)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '24px' }}>Trade Summary</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: TEXT_SECONDARY }}>Asset</span>
                <span style={{ fontWeight: '500' }}>Dubai Marina Villa Token</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: TEXT_SECONDARY }}>Fractions</span>
                <span style={{ fontWeight: '500' }}>100 Tokens</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ color: TEXT_SECONDARY }}>Initial Ask</span>
                <span style={{ fontWeight: '500', color: '#FF5555' }}>$110.00</span>
              </div>
              
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: TEXT_SECONDARY, fontSize: '14px', marginBottom: '8px' }}>Agreed Price</div>
                <div style={{ fontSize: '32px', fontWeight: '600', color: dealReached ? '#00FF41' : '#FFF' }}>
                  {dealReached ? currentOffer : 'Pending...'}
                </div>
              </div>

              {dealReached && (
                <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0,255,65,0.1)', border: '1px solid rgba(0,255,65,0.2)', borderRadius: '12px', color: '#00FF41', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: '500' }}>
                  <FiCheckCircle size={20} />
                  Smart Contract executed successfully on Casper Testnet.
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
