import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Navbar from '../components/Navbar';

const FONT = "'Manrope', -apple-system, Roboto, Helvetica, sans-serif";
const BG = '#040405';
const CARD_BG = '#111112';
const TEXT_SECONDARY = '#B4B4B4';

const containerStyle = {
  maxWidth: '1318px',
  margin: '0 auto',
  padding: '0 24px',
  width: '100%',
  boxSizing: 'border-box',
};

const OpenAccountButton = ({ dark = false }) => (
  <button
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '24px',
      padding: '6px 6px 6px 24px',
      borderRadius: '50px',
      background: dark ? CARD_BG : '#FFF',
      border: 'none',
      cursor: 'pointer',
      flexShrink: 0,
    }}
  >
    <span
      style={{
        color: dark ? '#FFF' : '#040405',
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: '0.16px',
        textTransform: 'uppercase',
        lineHeight: '20px',
        fontFamily: FONT,
      }}
    >
      Get Started
    </span>
    <div
      style={{
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        background: '#040405',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <path
          d="M1 7H19M13 1L19 7L13 13"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </button>
);

const SectionLabel = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <circle cx="8" cy="8" r="3" fill="white" />
    </svg>
    <span
      style={{
        color: '#FFF',
        fontSize: '16px',
        fontWeight: 500,
        letterSpacing: '0.16px',
        textTransform: 'uppercase',
        lineHeight: '20px',
        fontFamily: FONT,
      }}
    >
      {children}
    </span>
  </div>
);

// ─── Hero ────────────────────────────────────────────────────────────────────


// ─── Hero ────────────────────────────────────────────────────────────────────


// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  const heroRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.gsap-hero', { opacity: 0, y: 50, duration: 1, stagger: 0.1, ease: 'power3.out' });
      gsap.from('.gsap-hero-img', { opacity: 0, scale: 0.95, duration: 1.2, delay: 0.3, ease: 'power3.out' });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} style={{ background: BG, padding: '64px 0 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Navbar />
      <div className="gsap-hero" style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', flex: 1, justifyContent: 'center', marginTop: '60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFF' }}></div>
          <span style={{ color: '#FFF', fontFamily: FONT, fontSize: '14px', fontWeight: 500 }}>New Revora Infrastructure</span>
        </div>
        <h1 style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(48px, 8vw, 120px)', fontWeight: 500, lineHeight: 1.1, textAlign: 'center', maxWidth: '1000px', letterSpacing: '-0.02em', margin: 0 }}>
          The Operating System for Real-World Revenue Assets
        </h1>
        <div style={{ marginTop: '32px' }}>
          <OpenAccountButton />
        </div>
        
        <div className="gsap-hero-img" style={{ width: '100%', position: 'relative', overflow: 'hidden', borderRadius: '24px', marginTop: '64px' }}>
          <img src="/images/a11c1eb3dc27aa61a415ab5ae7c18a1eb55a6ff4.png" alt="Dashboard" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </div>
    </section>
  );
}


// ─── Card Upgrade ─────────────────────────────────────────────────────────────

function CardUpgradeSection() {
  const comp = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.gsap-prob-title', { scrollTrigger: { trigger: comp.current, start: 'top 80%' }, opacity: 0, y: 30, duration: 0.8 });
      gsap.from('.gsap-prob-stats', { scrollTrigger: { trigger: comp.current, start: 'top 70%' }, opacity: 0, x: -30, duration: 0.8, stagger: 0.2 });
      gsap.from('.gsap-prob-img', { scrollTrigger: { trigger: comp.current, start: 'top 70%' }, opacity: 0, scale: 0.9, duration: 1 });
    }, comp);
    return () => ctx.revert();
  }, []);

  const stats = [
    {
      value: 'Trillions',
      title: 'Global Financing Gap',
      desc: 'Earn Trillions back on everyday purchases with this card that makes rewards simple.',
    },
    {
      value: '100%',
      title: 'Asset Valuation',
      desc: 'Instead of static financial reports created once per year, Revora operates on living financial data.',
    },
  ];

  const statsRight = [
    {
      value: '0',
      title: 'Manual Paperwork',
      desc: 'The future of finance will not be built around paperwork. It will be built around data, intelligence, transparency, and trust.',
    },
    {
      value: '24/7',
      title: 'Autonomous Network',
      desc: 'A network of autonomous agents working around the clock to monitor business performance and risk.',
    },
  ];

  return (
    <section ref={comp} style={{ background: BG, padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        <div className="gsap-prob-title" style={{ maxWidth: '700px', textAlign: 'center', marginBottom: '58px' }}>
          <h2 style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 500, lineHeight: 1.2, marginBottom: '16px' }}>
            The Infrastructure Layer For Revenue-Based Capital Markets
          </h2>
          <p style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '16px', fontWeight: 400, lineHeight: '24px' }}>
            For decades, access to capital has been controlled by a small number of financial institutions relying on outdated underwriting models, collateral requirements, and slow manual approval processes. While the world has evolved, capital allocation has not.
          </p>
        </div>

        <div className="gsap-prob-stats" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', width: '100%', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', flex: '0 0 auto', minWidth: '180px' }}>
            {stats.map((s) => (
              <div key={s.value}>
                <div style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(36px, 4vw, 62px)', fontWeight: 500, lineHeight: 1.2 }}>{s.value}</div>
                <div style={{ color: '#FFF', fontFamily: FONT, fontSize: '18px', fontWeight: 500, marginTop: '8px' }}>{s.title}</div>
                <div style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '14px', lineHeight: '20px', marginTop: '8px', maxWidth: '200px' }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="gsap-prob-img" style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
             <img src="/images/1d4705e2f5db1f4fcd94f1dcecdc2176158c2a9d.png" alt="Stats" style={{ width: '100%', maxWidth: '400px', borderRadius: '24px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', flex: '0 0 auto', minWidth: '180px', alignItems: 'flex-end', textAlign: 'right' }}>
            {statsRight.map((s) => (
              <div key={s.value}>
                <div style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(36px, 4vw, 62px)', fontWeight: 500, lineHeight: 1.2 }}>{s.value}</div>
                <div style={{ color: '#FFF', fontFamily: FONT, fontSize: '18px', fontWeight: 500, marginTop: '8px' }}>{s.title}</div>
                <div style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '14px', lineHeight: '20px', marginTop: '8px', maxWidth: '200px' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function FeaturesSection() {
  const comp = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.gsap-feat-title', { scrollTrigger: { trigger: comp.current, start: 'top 80%' }, opacity: 0, y: 30, duration: 0.8 });
      gsap.from('.gsap-feat-card', { scrollTrigger: { trigger: '.gsap-feat-grid', start: 'top 80%' }, opacity: 0, y: 30, duration: 0.8, stagger: 0.15 });
    }, comp);
    return () => ctx.revert();
  }, []);

  const features = [
    { title: 'Smart Underwriting', desc: 'AI-driven analysis of real-time revenue streams to assess risk dynamically.' },
    { title: 'Real-time Analytics', desc: 'Monitor your business performance with live dashboards and actionable insights.' },
    { title: 'Automated Escrow', desc: 'Secure and transparent fund management built into every transaction.' }
  ];

  return (
    <section ref={comp} style={{ background: BG, padding: '100px 0' }}>
      <div style={{ ...containerStyle }}>
        <div className="gsap-feat-title" style={{ maxWidth: '600px', marginBottom: '60px' }}>
          <SectionLabel>Features</SectionLabel>
          <h2 style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.2, marginTop: '24px' }}>
            Autonomous Intelligence Layer
          </h2>
        </div>
        <div className="gsap-feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {features.map((f, idx) => (
            <div key={idx} className="gsap-feat-card" style={{ background: CARD_BG, padding: '40px', borderRadius: '24px' }}>
               <h3 style={{ color: '#FFF', fontFamily: FONT, fontSize: '24px', fontWeight: 500, marginBottom: '16px' }}>{f.title}</h3>
               <p style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '16px', lineHeight: '24px' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Us ──────────────────────────────────────────────────────────────────

function WhyUsSection() {
  const comp = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.gsap-vision-text', { scrollTrigger: { trigger: comp.current, start: 'top 75%' }, opacity: 0, y: 30, duration: 0.8, stagger: 0.2 });
      gsap.from('.gsap-vision-img', { scrollTrigger: { trigger: comp.current, start: 'top 75%' }, opacity: 0, scale: 0.95, duration: 1.2 });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp} style={{ background: '#1A1A1A', padding: '100px 0', overflow: 'hidden', borderRadius: '40px', margin: '0 20px' }}>
      <div style={{ ...containerStyle, display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
        {/* Left image */}
        <div className="gsap-vision-img" style={{ flex: '1 1 400px', position: 'relative', overflow: 'hidden', borderRadius: '32px', minHeight: '500px' }}>
          <img src="/images/a4c6b42028e0330ba7beafafdc6d366392de2571.png" alt="Banking support" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        {/* Right content */}
        <div className="gsap-vision-text" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '0' }}>
          <SectionLabel>Why us?</SectionLabel>
          <h2 style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(32px, 4vw, 62px)', fontWeight: 500, lineHeight: 1.2, marginTop: '24px' }}>
            Revenue as a financial asset
          </h2>
          <p style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '18px', fontWeight: 400, lineHeight: '27px', marginTop: '16px' }}>
            Our dedicated team provides personalized support, ensuring you have the resources and guidance for your financial journey.
          </p>
          <div style={{ marginTop: '24px' }}>
            <OpenAccountButton />
          </div>
        </div>
      </div>
    </section>
  );
}

const useCaseItems = [
  {
    title: 'Profitable businesses',
    desc: 'Manage everyday finances, savings, and payments — all in one seamlessly connected account.',
  },
  {
    title: 'Investors',
    desc: 'Tools built for growing companies: invoicing, expense tracking, and multi-user access.',
  },
  {
    title: 'Real performance',
    desc: 'Enterprise-grade treasury management with advanced controls and dedicated support.',
  },
  {
    title: 'Dynamic assessment',
    desc: 'Send and receive money globally with real-time rates and zero hidden fees.',
  },
];

function UseCasesSection() {
  const comp = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.gsap-usecase-title', { scrollTrigger: { trigger: comp.current, start: 'top 80%' }, opacity: 0, y: 30, duration: 0.8 });
      gsap.from('.gsap-usecase-card', { scrollTrigger: { trigger: '.gsap-usecase-grid', start: 'top 80%' }, opacity: 0, y: 30, duration: 0.8, stagger: 0.2 });
    }, comp);
    return () => ctx.revert();
  }, []);
  return (
    <section style={{ background: BG, padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <SectionLabel>Use cases</SectionLabel>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '24px',
              marginTop: '24px',
              flexWrap: 'wrap',
            }}
          >
            <h2
              style={{
                color: '#FFF',
                fontFamily: FONT,
                fontSize: 'clamp(32px, 5vw, 62px)',
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: '816px',
                flex: '1 1 300px',
              }}
            >
              Unlocking capital from real-world revenue
            </h2>
            <div style={{ flex: '0 0 auto' }}>
              <OpenAccountButton />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {/* Left image */}
          <div
            style={{
              flex: '1 1 400px',
              minHeight: '500px',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <img
              src="/images/b26075f60520cd14f0f231df429bed45d450dc70.png"
              alt="Business banking"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Right items */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {useCaseItems.map((item) => (
              <div
                key={item.title}
                style={{
                  background: CARD_BG,
                  borderRadius: '20px',
                  padding: '32px 40px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div style={{ marginTop: '4px', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <path d="M6 10L9 13L14 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      color: '#FFF',
                      fontFamily: FONT,
                      fontSize: '20px',
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </div>
                  <p
                    style={{
                      color: TEXT_SECONDARY,
                      fontFamily: FONT,
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '24px',
                      marginTop: '6px',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Get Started ──────────────────────────────────────────────────────────────

const stats = [
  { value: 'Trillions', label: 'Financing Gap' },
  { value: '24/7', label: 'Autonomous Network' },
  { value: '100%', label: 'Transparent' },
];

function GetStartedSection() {
  const comp = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.gsap-getstarted-box', { scrollTrigger: { trigger: comp.current, start: 'top 80%' }, opacity: 0, scale: 0.9, duration: 1 });
      gsap.from('.gsap-getstarted-stat', { scrollTrigger: { trigger: '.gsap-getstarted-stats', start: 'top 80%' }, opacity: 0, y: 30, duration: 0.8, stagger: 0.15 });
    }, comp);
    return () => ctx.revert();
  }, []);
  return (
    <section style={{ background: BG, padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '900px', marginBottom: '48px' }}>
          <SectionLabel>Get started</SectionLabel>
          <h2
            style={{
              color: '#FFF',
              fontFamily: FONT,
              fontSize: 'clamp(32px, 5vw, 62px)',
              fontWeight: 500,
              lineHeight: 1.2,
              marginTop: '24px',
            }}
          >
            Get Started today and meet the future of banking
          </h2>
        </div>

        {/* Large image */}
        <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden' }}>
          <img
            src="/images/5ebc540851bdf4f1707ef4101186cb99c365cc65.png"
            alt="Creditflow app"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            marginTop: '48px',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          {stats.map((s) => (
            <div key={s.value}>
              <div style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(36px, 4vw, 62px)', fontWeight: 500, lineHeight: 1.2 }}>
                {s.value}
              </div>
              <div
                style={{
                  color: TEXT_SECONDARY,
                  fontFamily: FONT,
                  fontSize: '18px',
                  fontWeight: 500,
                  letterSpacing: '0.18px',
                  textTransform: 'uppercase',
                  marginTop: '8px',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

const blogPosts = [
  {
    image: '/images/1d4705e2f5db1f4fcd94f1dcecdc2176158c2a9d.png',
    tag: 'Guides',
    date: 'Jun 07, 2026',
    title: 'Savings by age: Rules to know how much you should save',
  },
  {
    image: null,
    tag: 'Updates',
    date: 'Jan 20, 2026',
    title: 'Creditflow for Apple Watch — manage your finances from your wrist',
  },
];

function BlogSection() {
  return (
    <section style={{ background: BG, padding: '80px 0 100px' }}>
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '48px' }}>
          <SectionLabel>Blog</SectionLabel>
          <h2
            style={{
              color: '#FFF',
              fontFamily: FONT,
              fontSize: 'clamp(36px, 5vw, 62px)',
              fontWeight: 500,
              lineHeight: 1.2,
              marginTop: '24px',
            }}
          >
            News &amp; articles
          </h2>
          <p
            style={{
              color: TEXT_SECONDARY,
              fontFamily: FONT,
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: '27px',
              marginTop: '16px',
            }}
          >
            Stay informed with our latest updates, insightful articles, and expert opinions on banking trends, financial planning, and market information.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', gap: '20px', width: '100%', flexWrap: 'wrap' }}>
          {blogPosts.map((post) => (
            <a
              key={post.title}
              href="#"
              style={{
                flex: '1 1 300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1.42',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  background: CARD_BG,
                }}
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  /* Apple Watch mockup placeholder */
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #1A1A1C, #111112)',
                    }}
                  >
                    <div
                      style={{
                        width: '100px',
                        height: '120px',
                        borderRadius: '30px',
                        background: '#2a2a2e',
                        border: '4px solid #3a3a3e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ color: '#FFF', fontFamily: FONT, fontSize: '11px', fontWeight: 500 }}>Savings</div>
                        <div style={{ color: '#FFF', fontFamily: FONT, fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>$14,106</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    padding: '8px 12px',
                    borderRadius: '50px',
                    background: CARD_BG,
                    color: '#FFF',
                    fontFamily: FONT,
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {post.tag}
                </span>
                <span style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '14px', fontWeight: 400 }}>{post.date}</span>
              </div>

              {/* Title */}
              <h3
                style={{
                  color: '#FFF',
                  fontFamily: FONT,
                  fontSize: '30px',
                  fontWeight: 500,
                  lineHeight: '36px',
                }}
              >
                {post.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: '"I have never encountered a better banking partner than Banking — they are exceptional!"',
    name: 'John Carter',
    role: 'VP of Finance at Agency',
    initials: 'JC',
    color: '#3B4F7A',
  },
  {
    quote: '"Creditflow is the epitome of innovation, bringing the future of banking to the present"',
    name: 'Sophie Moore',
    role: 'VP of Marketing at Business',
    initials: 'SM',
    color: '#4A3B7A',
  },
  {
    quote: '"Effortlessly manage accounts and track expenses with this outstanding banking app"',
    name: 'Matt Cannon',
    role: 'VP of Product at Company',
    initials: 'MC',
    color: '#3B7A4A',
  },
  {
    quote: '"This app makes managing my finances easy and stress-free every day."',
    name: 'Lilly Woods',
    role: 'VP of Finance at Organization',
    initials: 'LW',
    color: '#7A4A3B',
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const visible = 2;
  const max = testimonials.length - visible;

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(max, c + 1));

  return (
    <section style={{ background: BG, padding: '100px 0 80px', overflow: 'hidden' }}>
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <SectionLabel>Testimonials</SectionLabel>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginTop: '24px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <h2
              style={{
                color: '#FFF',
                fontFamily: FONT,
                fontSize: 'clamp(32px, 5vw, 62px)',
                fontWeight: 500,
                lineHeight: 1.2,
                maxWidth: '500px',
              }}
            >
              What they say about us
            </h2>
            {/* Nav arrows */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={prev}
                disabled={current === 0}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: current === 0 ? 'rgba(255,255,255,0.05)' : CARD_BG,
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: current === 0 ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: current === 0 ? 0.4 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M9 15L1 8L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={current === max}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: current === max ? 'rgba(255,255,255,0.05)' : CARD_BG,
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: current === max ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: current === max ? 0.4 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path d="M1 1L9 8L1 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              gap: '4px',
              transition: 'transform 0.4s ease',
              transform: `translateX(calc(-${current} * (50% + 2px)))`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  flex: '0 0 calc(50% - 2px)',
                  minWidth: 'calc(50% - 2px)',
                  background: CARD_BG,
                  borderRadius: '20px',
                  padding: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '64px',
                }}
              >
                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: t.color,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ color: '#FFF', fontFamily: FONT, fontSize: '20px', fontWeight: 600 }}>{t.initials}</span>
                  </div>

                  {/* Quote */}
                  <p
                    style={{
                      color: '#FFF',
                      fontFamily: "'General Sans', -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: 'clamp(20px, 2.5vw, 36px)',
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {t.quote}
                  </p>
                </div>

                {/* Attribution */}
                <div>
                  <div style={{ color: '#FFF', fontFamily: FONT, fontSize: '16px', fontWeight: 500, lineHeight: '20px' }}>{t.name}</div>
                  <div style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '16px', fontWeight: 400, lineHeight: '20px', marginTop: '4px' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const footerNav = {
  'Main Pages': ['Preview', 'Home V1', 'Home V2', 'Home V3', 'About', 'Team single', 'Blog V1', 'Blog V2', 'Blog V3'],
  'Templates Pages': ['Blog post', 'Blog post', 'Features', 'Contact V1', 'Contact V2', 'Contact V3', 'More Framer templates'],
  'Utility Pages': ['404 Not Found', 'Coming soon', 'Terms & conditions', 'Schedule demo'],
};

function FooterSection() {
  const [email, setEmail] = useState('');

  return (
    <footer style={{ background: BG, overflow: 'hidden' }}>
      <div style={{ ...containerStyle }}>
        <div
          style={{
            padding: '80px 0 48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '48px',
          }}
        >
          {/* Left: brand */}
          <div style={{ flex: '0 0 auto', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div
                style={{
                  color: '#FFF',
                  fontFamily: FONT,
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  marginBottom: '16px',
                }}
              >
                Creditflow
              </div>
              <p
                style={{
                  color: TEXT_SECONDARY,
                  fontFamily: FONT,
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  marginBottom: '24px',
                }}
              >
                Creditflow provides modern banking for today's fast-paced world. Secure. Smart. Simple.
              </p>
              <OpenAccountButton />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFF', fontFamily: FONT, fontSize: '18px', fontWeight: 400 }}>Follow us on</span>
              <div style={{ display: 'flex', gap: '16px' }}>
                {['X', 'in', 'f'].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    style={{
                      color: TEXT_SECONDARY,
                      fontFamily: FONT,
                      fontSize: '14px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      width: '20px',
                      textAlign: 'center',
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav columns */}
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            {Object.entries(footerNav).map(([section, links]) => (
              <div key={section} style={{ minWidth: '140px' }}>
                <div
                  style={{
                    color: '#FFF',
                    fontFamily: FONT,
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  {section}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {links.map((link, i) => (
                    <a
                      key={`${link}-${i}`}
                      href="#"
                      style={{
                        color: TEXT_SECONDARY,
                        fontFamily: FONT,
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        textDecoration: 'none',
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div
          style={{
            background: CARD_BG,
            borderRadius: '20px',
            padding: '48px',
            marginBottom: '48px',
          }}
        >
          <h3
            style={{
              color: '#FFF',
              fontFamily: FONT,
              fontSize: '28px',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            Stay tuned!
          </h3>
          <p
            style={{
              color: TEXT_SECONDARY,
              fontFamily: FONT,
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              marginBottom: '24px',
              maxWidth: '480px',
            }}
          >
            Subscribe to our newsletter and stay informed with product updates, exclusive offers, expert advice, and valuable financial tips.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              background: BG,
              borderRadius: '50px',
              padding: '8px 8px 8px 24px',
              maxWidth: '500px',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFF',
                fontFamily: FONT,
                fontSize: '16px',
                fontWeight: 400,
              }}
            />
            <button
              style={{
                padding: '12px 24px',
                borderRadius: '50px',
                background: '#FFF',
                border: 'none',
                cursor: 'pointer',
                color: '#040405',
                fontFamily: FONT,
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '24px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '14px' }}>
            Copyright © 2025 Creditflow · Designed by{' '}
            <a href="#" style={{ color: TEXT_SECONDARY }}>
              Brix Templates
            </a>{' '}
            · Powered by{' '}
            <a href="#" style={{ color: TEXT_SECONDARY }}>
              Framer
            </a>
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Financing Gap', 'Capital managers'].map((link) => (
              <a
                key={link}
                href="#"
                style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '14px', textDecoration: 'none' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CreditflowLandingPage() {
  return (
    <div style={{ background: BG, fontFamily: FONT, color: '#FFF', overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection />
      <CardUpgradeSection />
      <FeaturesSection />
      <WhyUsSection />
      <UseCasesSection />
      <GetStartedSection />
      <BlogSection />
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
}
