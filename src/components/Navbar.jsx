'use client';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const FONT_INTER = "'Inter Display', -apple-system, Roboto, Helvetica, sans-serif";
const navLinks = ['Features', 'Benefits', 'How it works', 'Pricing', 'Testimonials', 'FAQs'];

export default function Navbar() {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered slide down animation for logo, links, and button
      gsap.from('.nav-anim', { 
        y: -50, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power3.out',
        delay: 0.2
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .mobile-menu {
          transition: all 0.3s ease-in-out;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-20px);
        }
        .mobile-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 1025px) {
          .mobile-toggle { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
      `}</style>
      
      <nav
        ref={navRef}
        style={{
          display: 'flex',
          width: '100%',
          height: '76px',
          padding: '20px 24px', // Reduced padding for mobile
          justifyContent: 'center',
          alignItems: 'center',
          background: '#000000',
          boxSizing: 'border-box',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: '1080px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            className="nav-anim"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <img src="/images/icon.png" alt="Revora Icon" style={{ width: '32px', height: '32px', display: 'block' }} />
            <span
              style={{
                color: '#FFF',
                fontFamily: "'Jost', sans-serif",
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: '32px',
                letterSpacing: '-0.02em',
              }}
            >
              Revora
            </span>
          </a>

          {/* Desktop Nav links */}
          <div
            className="desktop-nav nav-anim"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  color: '#B3B3B3',
                  fontFamily: FONT_INTER,
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            className="desktop-nav nav-anim"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 20px',
              borderRadius: '50px',
              background: '#1E1E1E',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#FFF',
              fontFamily: FONT_INTER,
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px',
              cursor: 'pointer',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Connect Wallet
          </button>

          {/* Mobile Toggle Button */}
          <button
            className="mobile-toggle nav-anim"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#FFF', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></span>
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#FFF', transition: '0.3s', opacity: isOpen ? 0 : 1 }}></span>
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#FFF', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: '76px',
          left: 0,
          right: 0,
          background: '#000000',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '24px',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setIsOpen(false)}
              style={{
                color: '#FFF',
                fontFamily: FONT_INTER,
                fontSize: '18px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              {link}
            </a>
          ))}
        </div>
        
        <button
          onClick={() => setIsOpen(false)}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '50px',
            background: '#FFF',
            color: '#101010',
            fontFamily: FONT_INTER,
            fontSize: '16px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Connect Wallet
        </button>
      </div>
    </>
  );
}
