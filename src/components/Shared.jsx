'use client';
import React from 'react';

export const FONT = "'Manrope', -apple-system, Roboto, Helvetica, sans-serif";
export const BG = '#040405';
export const CARD_BG = '#111112';
export const TEXT_SECONDARY = '#B4B4B4';

export const containerStyle = {
  maxWidth: '1318px',
  margin: '0 auto',
  padding: '0 24px',
  width: '100%',
  boxSizing: 'border-box',
};

export const OpenAccountButton = ({ dark = false }) => (
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

export const SectionLabel = ({ children }) => (
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
