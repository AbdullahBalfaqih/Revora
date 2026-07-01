'use client';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Navbar from '../components/Navbar';
import { FiFileText, FiUser, FiMessageSquare, FiZap, FiPlayCircle, FiLayers } from 'react-icons/fi';

const FONT = "'Jost', sans-serif";
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

const buttonStyles = `
  .button1 {
    line-height: 1;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background-color: var(--btn-bg, #000);
    color: var(--btn-text, #fff);
    border-radius: 10rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s, color 0.3s;
    font-family: 'Manrope', sans-serif;
  }

  .button1__icon-wrapper {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    position: relative;
    color: var(--btn-icon-text, #000);
    background-color: var(--btn-icon-bg, #fff);
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
    transition: background-color 0.3s, color 0.3s;
  }

  .button1:hover {
    background-color: var(--btn-text, #fff);
    color: var(--btn-bg, #000);
  }

  .button1:hover .button1__icon-wrapper {
    color: var(--btn-icon-bg, #fff);
    background-color: var(--btn-icon-text, #000);
  }

  .button1__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button1:hover .button1__icon-svg:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button1:hover .button1__icon-svg--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }
`;

const OpenAccountButton = ({ dark = false, text = "Get Started" }) => (
  <>
    <style dangerouslySetInnerHTML={{ __html: buttonStyles }} />
    <a href="/dashboard" className="button1" style={{
      '--btn-bg': dark ? '#111112' : '#FFF',
      '--btn-text': dark ? '#FFF' : '#040405',
      '--btn-icon-bg': dark ? '#FFF' : '#040405',
      '--btn-icon-text': dark ? '#040405' : '#FFF',
    }}>
      <span className="button1__icon-wrapper">
        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button1__icon-svg" width="10">
          <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
        </svg>

        <svg viewBox="0 0 14 15" fill="none" width="10" xmlns="http://www.w3.org/2000/svg" className="button1__icon-svg button1__icon-svg--copy">
          <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
        </svg>
      </span>
      {text}
    </a>
  </>
);

const SectionLabel = ({ children, icon }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
    {icon ? icon : (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" opacity="0.4" />
        <circle cx="8" cy="8" r="3" fill="white" />
      </svg>
    )}
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
      gsap.from('.gsap-hero', { opacity: 0, y: 50, duration: 2.5, ease: 'expo.out', stagger: 0.1, });
      gsap.from('.gsap-hero-img', { opacity: 0, scale: 0.95, duration: 2.5, ease: 'expo.out', delay: 0.3, });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} style={{ background: BG, padding: '64px 0 20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Navbar />
      <div className="gsap-hero" style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', flex: 1, justifyContent: 'center', marginTop: '60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '6px 16px 6px 6px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ background: '#FFF', borderRadius: '50px', padding: '4px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#040405', fontFamily: FONT, fontSize: '13px', fontWeight: 600 }}>NEW</span>
          </div>
          <span style={{ color: '#FFF', fontFamily: FONT, fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>REVORA INFRASTRUCTURE</span>
        </div>
        <h1 style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(40px, 6vw, 96px)', fontWeight: 500, lineHeight: 1.1, textAlign: 'center', maxWidth: '1000px', letterSpacing: '-0.02em', margin: 0 }}>
          The Operating System for Real-World Revenue Assets
        </h1>
        <div style={{ marginTop: '32px', position: 'relative', zIndex: 20 }}>
          <OpenAccountButton />
        </div>
      </div>

      {/* Overlapping Image at the Boundary */}
      <div className="gsap-hero-img hover:-translate-y-4 hover:scale-[1.02] transition-all duration-500 cursor-pointer drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:drop-shadow-[0_40px_80px_rgba(255,255,255,0.15)]" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translate(-50%, 65%)', width: '100%', maxWidth: '700px', zIndex: 10 }}>
        <img src="/images/a11c1eb3dc27aa61a415ab5ae7c18a1eb55a6ff4.png.png" alt="Cards" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </section>
  );
}


// ─── Card Upgrade ─────────────────────────────────────────────────────────────

const AnimatedWord = () => {
  const ref = useRef(null);
  useEffect(() => {
    const words = ["Thousands", "Millions", "Billions", "Trillions"];
    let obj = { idx: 0 };
    gsap.to(obj, {
      idx: words.length - 1,
      duration: 2,
      ease: "power1.inOut",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      onUpdate: () => {
        if (ref.current) {
          ref.current.innerText = words[Math.round(obj.idx)];
        }
      }
    });
  }, []);
  return <div ref={ref} style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.1 }}>Thousands</div>;
};

const AnimatedNumber = ({ from = 0, to = 100, suffix = "" }) => {
  const ref = useRef(null);
  useEffect(() => {
    let obj = { val: from };
    gsap.to(obj, {
      val: to,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      onUpdate: () => {
        if (ref.current) {
          ref.current.innerText = Math.round(obj.val) + suffix;
        }
      }
    });
  }, [from, to, suffix]);
  return <div ref={ref} style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.1 }}>{from}{suffix}</div>;
};

function CardUpgradeSection() {
  const comp = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.gsap-prob-title', { scrollTrigger: { trigger: comp.current, start: 'top 80%' }, opacity: 0, y: 30, duration: 2.2, ease: 'expo.out' });
      gsap.from('.gsap-prob-stats', { scrollTrigger: { trigger: comp.current, start: 'top 70%' }, opacity: 0, x: -30, duration: 2.2, ease: 'expo.out', stagger: 0.2 });
      gsap.from('.gsap-prob-img', { scrollTrigger: { trigger: comp.current, start: 'top 70%' }, opacity: 0, scale: 0.9, duration: 2.5, ease: 'expo.out' });
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
    <section id="app-cards" ref={comp} style={{ background: BG, padding: '600px 0 100px', overflow: 'hidden' }}>
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '64px' }}>

        {/* Main Stats Layout */}
        <div className="gsap-prob-stats" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', width: '100%', flexWrap: 'wrap' }}>

          {/* Left Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', flex: '1 1 200px' }}>
            <div>
              <AnimatedWord />
              <div style={{ color: '#FFF', fontFamily: FONT, fontSize: '24px', fontWeight: 500, marginTop: '8px' }}>Financing Gap</div>
              <div style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '16px', lineHeight: '24px', marginTop: '12px', maxWidth: '250px' }}>Bridging the gap between real-world assets and digital liquidity, unlocking trillions in previously illiquid revenue streams.</div>
            </div>
            <div>
              <AnimatedNumber from={0} to={100} suffix="%" />
              <div style={{ color: '#FFF', fontFamily: FONT, fontSize: '24px', fontWeight: 500, marginTop: '8px' }}>Transparent</div>
              <div style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '16px', lineHeight: '24px', marginTop: '12px', maxWidth: '250px' }}>Every transaction, tokenized asset, and revenue stream is strictly verifiable, ensuring absolute transparency.</div>
            </div>
          </div>

          {/* Center Image */}
          <div className="gsap-prob-img" style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <img src="/images/phone2.png" alt="Card" style={{ width: '100%', maxWidth: '550px', objectFit: 'contain', transform: 'scale(1.15)' }} />
          </div>

          {/* Right Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', flex: '1 1 200px', textAlign: 'right', alignItems: 'flex-end' }}>
            <div>
              <div style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 500, lineHeight: 1.1 }}>24/7</div>
              <div style={{ color: '#FFF', fontFamily: FONT, fontSize: '24px', fontWeight: 500, marginTop: '8px' }}>Autonomous Network</div>
              <div style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '16px', lineHeight: '24px', marginTop: '12px', maxWidth: '250px' }}>Smart contracts and autonomous agents work around the clock to monitor asset performance and execute settlements.</div>
            </div>
            <div>
              <AnimatedNumber from={100} to={0} suffix="" />
              <div style={{ color: '#FFF', fontFamily: FONT, fontSize: '24px', fontWeight: 500, marginTop: '8px' }}>Manual Paperwork</div>
              <div style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '16px', lineHeight: '24px', marginTop: '12px', maxWidth: '250px' }}>The future of asset management isn't built on paperwork. It's built on verifiable data, automated compliance, and digital trust.</div>
            </div>
          </div>

        </div>

        {/* Bottom Button */}
        <div style={{ marginTop: '32px' }}>
          <OpenAccountButton text="OPEN YOUR ACCOUNT" />
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
      gsap.from('.gsap-feat-content', { scrollTrigger: { trigger: comp.current, start: 'top 80%' }, opacity: 0, y: 30, duration: 2.2, ease: 'expo.out', stagger: 0.15 });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={comp} style={{ background: BG, padding: '100px 0', overflow: 'hidden' }}>
      <div className="flex max-w-[1318px] mx-auto py-0 px-6 flex-col justify-center items-center w-full">
        <div className="gsap-feat-content flex flex-col justify-center items-start shrink-0 w-full max-w-[1270px]">
          <div className="flex justify-center items-center gap-2 shrink-0 overflow-hidden mb-6">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 12 12 22 12C12 12 12 22 12 22C12 22 12 12 2 12C12 12 12 2 12 2Z" fill="#FFF" />
              </svg>
              <span style={{ color: '#FFF', fontFamily: FONT, fontSize: '14px', fontWeight: 500 }}>Features</span>
            </div>
          </div>
          <div className="flex pt-6 justify-between items-end gap-6 shrink-0 w-full flex-wrap">
            <div className="flex flex-col items-start shrink-0 max-w-[800px]">
              <p className="text-[#FFF] font-medium leading-[1.2]" style={{ fontFamily: FONT, fontSize: 'clamp(40px, 5vw, 62px)' }}>
                Autonomous Intelligence Layer
              </p>
            </div>
            <div className="flex max-w-[430px] flex-col items-start shrink-0 w-full mb-2">
              <p className="text-[#B4B4B4] text-lg leading-[27px]" style={{ fontFamily: FONT }}>
                Explore the next generation of financial infrastructure, powered by real-time data, AI-driven underwriting, and smart contracts.
              </p>
            </div>
          </div>
        </div>

        <div className="gsap-feat-content flex pt-12 justify-center items-stretch gap-6 shrink-0 w-full max-w-[1270px] flex-col md:flex-row">
          <div className="flex p-12 flex-col justify-between items-end shrink-0 rounded-[32px] bg-[#111112] w-full md:w-3/5 min-h-[634px] overflow-hidden relative group">
            <div className="flex items-center gap-6 shrink-0 w-full z-10 relative">
              <div className="flex max-w-[400px] flex-col items-start shrink-0 w-full">
                <p className="text-[#FFF] font-medium leading-[1.2]" style={{ fontFamily: FONT, fontSize: 'clamp(28px, 3vw, 42px)' }}>
                  Smart Underwriting & Analytics
                </p>
              </div>
            </div>
            <img
              src="/images/Image.png"
              className="shrink-0 w-[110%] md:w-[680px] h-auto md:h-[413px] overflow-hidden max-w-none group-hover:scale-105 transition-transform duration-700"
              alt="Analytics"
              style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
            />
          </div>
          <div className="flex p-12 flex-col justify-between items-end shrink-0 rounded-[32px] bg-[#111112] w-full md:w-2/5 min-h-[634px] overflow-hidden relative group">
            <div className="flex items-center gap-6 shrink-0 w-full z-10 relative">
              <div className="flex max-w-[350px] flex-col items-start shrink-0 w-full">
                <p className="text-[#FFF] font-medium leading-[1.2]" style={{ fontFamily: FONT, fontSize: 'clamp(28px, 3vw, 42px)' }}>
                  Automated Escrow
                </p>
              </div>
            </div>
            <img
              src="/images/Image(1).png"
              className="shrink-0 w-[100%] md:w-[470px] h-auto md:h-[413px] overflow-hidden max-w-none group-hover:scale-105 transition-transform duration-700"
              alt="Escrow"
              style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
            />
          </div>
        </div>

        <div className="gsap-feat-content flex pt-12 justify-center items-center gap-6 shrink-0 w-full mt-8">
          <OpenAccountButton />
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
      gsap.from('.gsap-vision-text', { scrollTrigger: { trigger: comp.current, start: 'top 75%' }, opacity: 0, y: 30, duration: 2.2, ease: 'expo.out', stagger: 0.2 });
      gsap.from('.gsap-vision-img', { scrollTrigger: { trigger: comp.current, start: 'top 75%' }, opacity: 0, scale: 0.95, duration: 2.5, ease: 'expo.out' });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" ref={comp} style={{ background: '#1A1A1A', padding: '100px 0', overflow: 'hidden', borderRadius: '40px', margin: '0 20px' }}>
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
    title: 'For small business',
    desc: 'Access global liquidity pools and tokenize your real-world assets without traditional banking delays.',
    image: '/images/b26075f60520cd14f0f231df429bed45d450dc70.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    title: 'For startups',
    desc: 'Integrate programmable revenue streams and automated escrows directly into your fast-growing financial stack.',
    image: '/images/Image(1).png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1-2-9 9 9 0 0 1 9 9 22 22 0 0 1-4 3z" />
        <path d="M9 11l-3 3" />
        <path d="M15 13l-3 3" />
      </svg>
    )
  },
  {
    title: 'For enterprises',
    desc: 'Enterprise-grade treasury management, on-chain compliance, and autonomous intelligence for large-scale operations.',
    image: '/images/Image.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    )
  }
];


function UseCasesSection() {
  const comp = useRef(null);
  const [openIndex, setOpenIndex] = useState(2); // Open the LAST item by default


  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.gsap-usecase-title', { scrollTrigger: { trigger: comp.current, start: 'top 80%' }, opacity: 0, y: 30, duration: 2.2, ease: 'expo.out' });
      gsap.from('.gsap-usecase-card', { scrollTrigger: { trigger: '.gsap-usecase-grid', start: 'top 80%' }, opacity: 0, y: 30, duration: 2.2, ease: 'expo.out', stagger: 0.2 });
    }, comp);
    return () => ctx.revert();
  }, []);
  return (
    <section id="use-cases" style={{ background: BG, padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <SectionLabel icon={<FiLayers size={18} color="#FFF" />}>Use cases</SectionLabel>
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
        <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {/* Left image */}
          <div
            style={{
              flex: '1 1 400px',
              minHeight: '500px',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              background: '#040405'
            }}
          >
            {useCaseItems.map((item, idx) => (
              <img
                key={idx}
                src={item.image}
                alt={item.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: openIndex === idx ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                  display: 'block'
                }}
              />
            ))}
          </div>

          {/* Right items */}
          <div className="gsap-usecase-grid" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '500px' }}>
            {useCaseItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.title}
                  className="gsap-usecase-card"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  style={{
                    background: CARD_BG,
                    borderRadius: '20px',
                    padding: '32px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    flexGrow: isOpen ? 1 : 0,
                    flexShrink: 0,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ color: '#FFF', display: 'flex', alignItems: 'center' }}>
                        {item.icon}
                      </div>
                      <h3 style={{ color: '#FFF', fontFamily: FONT, fontSize: '28px', fontWeight: 600, margin: 0, letterSpacing: '-0.02em' }}>
                        {item.title}
                      </h3>
                    </div>
                    {/* Toggle Icon */}
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: isOpen ? '#FFF' : 'rgba(255,255,255,0.03)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
                        <path d="M6 9l6 6 6-6" stroke={isOpen ? '#000' : 'rgba(255,255,255,0.5)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div
                    style={{
                      opacity: isOpen ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'opacity 0.4s ease 0.1s',
                      marginTop: isOpen ? '24px' : '0',
                      paddingLeft: '40px',
                      flexGrow: isOpen ? 1 : 0,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <p style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '16px', lineHeight: '24px', margin: 0, maxWidth: '500px' }}>
                      {item.desc}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#FFF', fontFamily: FONT, fontSize: '15px', fontWeight: 500 }}>Learn more</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
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
      gsap.from('.gsap-getstarted-box', { scrollTrigger: { trigger: comp.current, start: 'top 80%' }, opacity: 0, scale: 0.9, duration: 2.5, ease: 'expo.out' });
      gsap.from('.gsap-getstarted-stat', { scrollTrigger: { trigger: '.gsap-getstarted-stats', start: 'top 80%' }, opacity: 0, y: 30, duration: 2.2, ease: 'expo.out', stagger: 0.15 });
    }, comp);
    return () => ctx.revert();
  }, []);
  return (
    <section id="get-started" style={{ background: BG, padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '900px', marginBottom: '48px' }}>
          <SectionLabel icon={<FiPlayCircle size={18} color="#FFF" />}>Get started</SectionLabel>
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
          {/* Left Stats */}
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(36px, 4vw, 62px)', fontWeight: 500, lineHeight: 1.2 }}>10+</div>
              <div style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '18px', fontWeight: 500, letterSpacing: '0.18px', textTransform: 'uppercase', marginTop: '8px' }}>INSTITUTIONS</div>
            </div>
            <div>
              <div style={{ color: '#FFF', fontFamily: FONT, fontSize: 'clamp(36px, 4vw, 62px)', fontWeight: 500, lineHeight: 1.2 }}>$250M+</div>
              <div style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '18px', fontWeight: 500, letterSpacing: '0.18px', textTransform: 'uppercase', marginTop: '8px' }}>ASSETS TOKENIZED</div>
            </div>
          </div>

          {/* Right Text and Button */}
          <div style={{ maxWidth: '450px' }}>
            <p style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '18px', lineHeight: '28px', marginBottom: '24px' }}>
              Join Revora to bridge the gap between traditional finance and decentralized liquidity. Tokenize your real-world assets with enterprise-grade security and transparency.
            </p>
            <OpenAccountButton text="START TOKENIZING" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

const blogPosts = [
  {
    image: '/images/phone3.png',
    tag: 'Guides',
    date: 'Jun 07, 2026',
    title: 'How to tokenize your first real-world asset on Revora',
  },
  {
    image: '/images/watch.png',
    tag: 'Updates',
    date: 'Jan 20, 2026',
    title: 'Revora for Apple Watch — track your tokenized assets from your wrist',
  },
];

function BlogSection() {
  return (
    <section id="blog" style={{ background: BG, padding: '80px 0 100px' }}>
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '48px' }}>
          <SectionLabel icon={<FiFileText size={18} color="#FFF" />}>Blog</SectionLabel>
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
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
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
    <section id="testimonials" style={{ background: BG, padding: '100px 0 80px', overflow: 'hidden' }}>
      <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', gap: '0' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <SectionLabel icon={<FiMessageSquare size={18} color="#FFF" />}>Testimonials</SectionLabel>
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
                      background: '#000',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FiUser size={32} color="#FFF" />
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
  'Platform': ['Home', 'Features', 'Why Us', 'Use Cases'],
  'Resources': ['App & Cards', 'Get Started', 'Blog', 'Testimonials'],
  'Company': ['About Us', 'Careers', 'Contact', 'Press'],
};

function FooterSection() {
  const [email, setEmail] = useState('');

  const idMap = {
    'Home': 'hero',
    'Features': 'features',
    'Why Us': 'why-us',
    'Use Cases': 'use-cases',
    'App & Cards': 'app-cards',
    'Get Started': 'get-started',
    'Blog': 'blog',
    'Testimonials': 'testimonials'
  };

  return (
    <footer style={{ background: BG, overflow: 'hidden' }}>
      <style>{`
        html {
          scroll-behavior: smooth !important;
        }
      `}</style>
      <div style={{ ...containerStyle, padding: '80px 0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', flexWrap: 'wrap', gap: '64px' }}>

        {/* Left Column */}
        <div style={{ flex: '1 1 300px', maxWidth: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div
                style={{
                  color: '#FFF',
                  fontFamily: FONT,
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <img src="/images/icon.png" alt="Revora Icon" style={{ width: '32px', height: '32px', display: 'block' }} />
                Revora
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
                Revora bridges the gap between real-world assets and decentralized finance. Secure. Transparent. Efficient.
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
          {/* Copyright */}
          <div style={{ marginTop: 'auto', paddingTop: '64px' }}>
            <span style={{ color: TEXT_SECONDARY, fontFamily: FONT, fontSize: '14px', lineHeight: '22px', display: 'block' }}>
              Copyright © 2026 Revora | Tokenizing the<br />
              <span style={{ color: '#FFF' }}>Future of Real World Assets</span>
            </span>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: '1 1 600px', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {/* Nav columns */}
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
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
                      href={`#${idMap[link] || ''}`}
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

          {/* Newsletter */}
          <div
            style={{
              background: CARD_BG,
              borderRadius: '24px',
              padding: '48px',
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
              Subscribe to our newsletter and stay informed with tokenization updates, exclusive asset drops, and platform news.
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
                  fontSize: '15px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                Subscribe
              </button>
            </div>
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
