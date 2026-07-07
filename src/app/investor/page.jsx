'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { TextAnimate } from '../../components/magicui/text-animate';
import CardNav from '../../components/CardNav';
import { RiShieldCheckLine } from 'react-icons/ri';
import { FiSend, FiBell, FiInfo } from 'react-icons/fi';
export default function Realtab() {
  const [activeTab, setActiveTab] = useState('Buy');
  const [activeAccordion, setActiveAccordion] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchCategory, setSearchCategory] = useState('Industrial');
  const [activeLegalAsset, setActiveLegalAsset] = useState(null);

  // Custom White Popup State
  const [popup, setPopup] = useState({ visible: false, message: '' });
  const showPopup = (message) => {
    setPopup({ visible: true, message });
    setTimeout(() => {
      setPopup({ visible: false, message: '' });
    }, 3500);
  };

  React.useEffect(() => {
    if (activeLegalAsset) {
      document.body.style.overflow = 'hidden';

    } else {
      document.body.style.overflow = 'auto';

    }
    return () => {
      document.body.style.overflow = 'auto';

    };
  }, [activeLegalAsset]);
  const handleSearchSubmit = () => {
    if (!searchName || !searchEmail) {
      showPopup('Please fill out your name and email before submitting.');
      return;
    }
    showPopup(`Success! We've received your ${activeTab.toLowerCase()} request for ${searchCategory}.`);
    setSearchName('');
    setSearchEmail('');
  };
  const accordionData = [
    {
      id: 1,
      number: "01",
      title: "Exterior Design",
      subtitle: "Modern Facades",
      image: "/ImageImage(8).png",
      description: "Bright and airy home featuring sleek finishes and open living space. Perfectly situated near shops, transit, and dining."
    },
    {
      id: 2,
      number: "02",
      title: "Estate Development",
      subtitle: "Premium Layouts",
      image: "/ImageImage(8).png",
      description: "Exceptional architecture with spacious interiors designed for comfortable and modern living."
    },
    {
      id: 3,
      number: "03",
      title: "Construction Building",
      subtitle: "Quality Materials",
      image: "/ImageImage(8).png",
      description: "Built with the highest standards of durability and sustainability to last for generations."
    }
  ];

  const navItems = [
    {
      label: "Platform",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [
        { label: "Home", href: "/", ariaLabel: "Home" },
        { label: "Marketplace", href: "/investor", ariaLabel: "Marketplace" },
        { label: "Tokenize Asset", href: "/dashboard", ariaLabel: "Tokenize Asset" }
      ]
    },
    {
      label: "Dashboard",
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Overview", href: "/dashboard", ariaLabel: "Overview" },
        { label: "My Assets", href: "/dashboard", ariaLabel: "My Assets" },
        { label: "Wallet History", href: "/dashboard", ariaLabel: "Wallet History" }
      ]
    },
    {
      label: "Analytics & Compliance",
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Performance & MRR", href: "#", ariaLabel: "Performance" },
        { label: "Risk Monitoring", href: "#", ariaLabel: "Risk Monitoring" },
        { label: "Legal & Contracts", href: "#", ariaLabel: "Legal & Contracts" }
      ]
    }
  ];

  const heavyFadeUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 }
    }
  };

  const heavyScaleIn = {
    hidden: { opacity: 0, scale: 1.1, filter: "blur(15px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 50, damping: 25, mass: 1, delay: 0.1 }
    }
  };

  const wipeIn = {
    hidden: { clipPath: "inset(0 100% 0 0)", filter: "blur(10px)" },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      filter: "blur(0px)",
      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
    }
  };
  return (
    <div className="flex flex-col items-start bg-[#F8F8F8] min-w-screen min-h-screen relative">
      <CardNav
        logo="/images/icon.png"
        logoAlt="Revora Logo"
        items={navItems}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#171717"
        buttonTextColor="#fff"
        ease="power3.out"
        className="fixed top-8 z-[100]"
      />
      <div className="flex flex-col items-start shrink-0 bg-[#F8F8F8] w-full h-full">
        {/* HERO SECTION */}
        <div className="flex w-full flex-col items-center relative overflow-visible pb-[100px] bg-[#F8F8F8]">
          {/* Hero Background */}
          <div className="w-full h-[732px] absolute left-0 top-0 overflow-hidden z-0">
            <motion.img
              initial="hidden"
              animate="visible"
              variants={heavyScaleIn}
              src="/ImageHeroSectionImage01.png"
              className="w-full h-full object-cover"
              alt="Hero Section"
            />
          </div>

          {/* Hero Content (Text) */}
          <div className="flex max-w-full xl:w-[1300px] flex-col items-center w-full relative z-10 pt-[180px] px-4 xl:px-0">
            <div className="w-full h-auto xl:h-[200px] relative flex justify-center">
               <TextAnimate
                  animation="blurInUp"
                  by="character"
                  words={['Marketplace', 'Real-World Assets', 'Tokenized Yields', 'Smart Capital', 'Revenue Streams', 'Digital Assets']}
                  className="text-[#171717] font-sans text-[clamp(40px,9vw,180px)] font-semibold leading-[1.2] text-center"
                />
            </div>
          </div>

          {/* Search Bar - Overlapping the bottom of the hero */}
          <div className="flex max-w-full xl:w-[1104px] flex-col justify-center items-start shrink-0 rounded-[10px] bg-transparent shadow-[0_34px_26px_0_rgba(13,10,44,0.05),0_12px_34px_0_rgba(13,10,44,0.05),0_4px_4px_0_rgba(0,0,0,0.25)] w-full lg:w-full xl:w-[1104px] mt-[180px] relative z-20 overflow-hidden px-4 xl:px-0">
            {/* Tabs */}
            <div className="flex items-end shrink-0 w-full lg:w-full xl:w-[1104px] h-16 relative bg-transparent">
              {['Buy', 'Rent', 'Sell'].map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex pt-[21px] pr-[30px] pb-5 pl-[30px] flex-col justify-center items-center gap-2.5 rounded-t-[10px] w-auto h-16 cursor-pointer transition-colors relative ${activeTab === tab ? 'bg-[#FFF] z-10' : 'bg-[rgba(255,255,255,0.8)] backdrop-blur-sm z-0 -ml-1'}`}
                >
                  <p className={`font-sans text-base leading-[24px] ${activeTab === tab ? 'text-[#171717] font-semibold' : 'text-[#171717] font-medium'}`}>{tab}</p>
                </div>
              ))}
            </div>

            {/* Form Fields */}
            <div className="flex py-[30px] px-10 flex-col xl:flex-row items-center shrink-0 rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] bg-[#FFF] w-full lg:w-full xl:w-[1104px] relative z-20 gap-8 xl:gap-0">
              {/* Name */}
              <div className="flex flex-col items-start gap-2 shrink-0 w-full xl:w-[260px]">
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Jane Smith"
                  className="text-[#171717] font-sans text-[clamp(16px,2vw,20px)] font-medium leading-[30px] w-full border-none outline-none bg-transparent placeholder-[#999]"
                />
                <div className="w-full h-px bg-[#E2E2E2]"></div>
              </div>

              <div className="shrink-0 bg-transparent w-10 h-20 hidden xl:block"></div>

              {/* Email */}
              <div className="flex flex-col items-start gap-2 shrink-0 w-full xl:w-[260px]">
                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="jane@framer.com"
                  className="text-[#171717] font-sans text-[clamp(16px,2vw,20px)] font-medium leading-[30px] w-full border-none outline-none bg-transparent placeholder-[#999]"
                />
                <div className="w-full h-px bg-[#E2E2E2]"></div>
              </div>

              <div className="shrink-0 bg-transparent w-10 h-20 hidden xl:block"></div>

              {/* Property Type */}
              <div className="flex flex-col items-start gap-2 shrink-0 w-full xl:w-[260px]">
                <div className="flex justify-between items-center w-full cursor-pointer">
                  <p className="text-[#999] font-sans text-[clamp(16px,2vw,20px)] font-medium leading-[30px]">Property Type</p>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M6 9L12 15L18 9" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="w-full h-px bg-[#E2E2E2]"></div>
              </div>

              <div className="shrink-0 bg-transparent w-6 h-20 hidden xl:block"></div>

              {/* Submit Button */}
              <button onClick={handleSearchSubmit} className="flex py-3.5 px-6 justify-center items-center gap-2 shrink-0 rounded-lg bg-[#2A2A2A] hover:bg-[#333] transition-colors cursor-pointer w-full xl:w-auto h-[52px]">
                <p className="text-[#FFF] font-sans text-lg font-semibold leading-5 whitespace-nowrap">Submit</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path fillRule="evenodd" clipRule="evenodd" d="M12.352 3.95202C12.577 3.7273 12.882 3.60107 13.2 3.60107C13.518 3.60107 13.823 3.7273 14.048 3.95202L21.248 11.152C21.4727 11.377 21.599 11.682 21.599 12C21.599 12.318 21.4727 12.623 21.248 12.848L14.048 20.048C13.8205 20.26 13.5197 20.3754 13.2088 20.3699C12.8979 20.3644 12.6013 20.2385 12.3814 20.0186C12.1616 19.7988 12.0356 19.5021 12.0301 19.1913C12.0247 18.8804 12.1401 18.5795 12.352 18.352L17.503 13.2H3.60002C3.28176 13.2 2.97654 13.0736 2.7515 12.8485C2.52645 12.6235 2.40002 12.3183 2.40002 12C2.40002 11.6818 2.52645 11.3765 2.7515 11.1515C2.97654 10.9264 3.28176 10.8 3.60002 10.8H17.503L12.352 5.64802C12.1273 5.42302 12.0011 5.11802 12.0011 4.80002C12.0011 4.48202 12.1273 4.17702 12.352 3.95202Z" fill="white" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Explore Our Latest Properties Section */}
        <div className="flex flex-col items-center w-full px-4 xl:px-0 py-[100px] bg-[#F8F8F8] relative z-10">
           <div className="w-full max-w-[1300px] flex flex-col items-center">
             <h2 className="text-[#171717] font-sans text-[clamp(32px,5vw,56px)] font-bold mb-2">Explore Our Latest Properties</h2>
             <p className="text-[#666] font-sans text-lg mb-16">Explore latest and featured properties for sale</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {/* Property 1 */}
                <Link href="/investor/property/1" className="flex flex-col rounded-[10px] bg-[#FFF] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden transition-transform hover:-translate-y-2 cursor-pointer no-underline group">
                  <div className="relative w-full h-[280px]">
                    <img src="/ImageImage(5).png" className="w-full h-full object-cover" alt="River flat for rental" />
                    <div className="absolute top-5 left-5 bg-white px-3.5 py-1.5 rounded-[5px] text-xs font-semibold text-[#171717] shadow-sm">Villa</div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <p className="text-sm text-[#999] mb-1 font-medium">2/A, New South Quest</p>
                      <h3 className="text-[22px] font-bold text-[#171717] leading-7 group-hover:text-[#2A2A2A] transition-colors">River flat for rental</h3>
                    </div>
                    <div className="w-full h-px bg-[#E5E5E5] my-1"></div>
                    <div className="flex justify-between items-center">
                       <div className="flex gap-4 text-sm text-[#666] font-semibold">
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            1
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                            2
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                            1200 sq.ft
                          </span>
                       </div>
                       <p className="text-2xl font-bold text-[#171717]">$1850</p>
                    </div>
                  </div>
                </Link>

                {/* Property 2 */}
                <Link href="/investor/property/2" className="flex flex-col rounded-[10px] bg-[#FFF] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden transition-transform hover:-translate-y-2 cursor-pointer no-underline group">
                  <div className="relative w-full h-[280px]">
                    <img src="/ImageImage(6).png" className="w-full h-full object-cover" alt="Beach villa for lease" />
                    <div className="absolute top-5 left-5 bg-white px-3.5 py-1.5 rounded-[5px] text-xs font-semibold text-[#171717] shadow-sm">Mansion</div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <p className="text-sm text-[#999] mb-1 font-medium">101B, Palm Coast</p>
                      <h3 className="text-[22px] font-bold text-[#171717] leading-7 group-hover:text-[#2A2A2A] transition-colors">Beach villa for lease</h3>
                    </div>
                    <div className="w-full h-px bg-[#E5E5E5] my-1"></div>
                    <div className="flex justify-between items-center">
                       <div className="flex gap-4 text-sm text-[#666] font-semibold">
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            2
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                            2
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                            6,000 sq.ft
                          </span>
                       </div>
                       <p className="text-2xl font-bold text-[#171717]">$1900</p>
                    </div>
                  </div>
                </Link>

                {/* Property 3 */}
                <Link href="/investor/property/3" className="flex flex-col rounded-[10px] bg-[#FFF] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden transition-transform hover:-translate-y-2 cursor-pointer no-underline group">
                  <div className="relative w-full h-[280px]">
                    <img src="/ImageImage(10).png" className="w-full h-full object-cover" alt="Penthouse in downtown" />
                    <div className="absolute top-5 left-5 bg-white px-3.5 py-1.5 rounded-[5px] text-xs font-semibold text-[#171717] shadow-sm">Mansion</div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <p className="text-sm text-[#999] mb-1 font-medium">17D, Queen&apos;s Street</p>
                      <h3 className="text-[22px] font-bold text-[#171717] leading-7 group-hover:text-[#2A2A2A] transition-colors">Penthouse in downtown</h3>
                    </div>
                    <div className="w-full h-px bg-[#E5E5E5] my-1"></div>
                    <div className="flex justify-between items-center">
                       <div className="flex gap-4 text-sm text-[#666] font-semibold">
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            1
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                            2
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                            4,800 sq.ft
                          </span>
                       </div>
                       <p className="text-2xl font-bold text-[#171717]">$2000</p>
                    </div>
                  </div>
                </Link>

                {/* Property 4 */}
                <Link href="/investor/property/1" className="flex flex-col rounded-[10px] bg-[#FFF] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden transition-transform hover:-translate-y-2 cursor-pointer no-underline group">
                  <div className="relative w-full h-[280px]">
                    <img src="/ImageImage(2).png" className="w-full h-full object-cover" alt="Quiet hillside retreat" />
                    <div className="absolute top-5 left-5 bg-white px-3.5 py-1.5 rounded-[5px] text-xs font-semibold text-[#171717] shadow-sm">Luxury</div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <p className="text-sm text-[#999] mb-1 font-medium">50C, La Paz Valley</p>
                      <h3 className="text-[22px] font-bold text-[#171717] leading-7 group-hover:text-[#2A2A2A] transition-colors">Quiet hillside retreat</h3>
                    </div>
                    <div className="w-full h-px bg-[#E5E5E5] my-1"></div>
                    <div className="flex justify-between items-center">
                       <div className="flex gap-4 text-sm text-[#666] font-semibold">
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            4
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                            2
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                            5,300 sq.ft
                          </span>
                       </div>
                       <p className="text-2xl font-bold text-[#171717]">$1500</p>
                    </div>
                  </div>
                </Link>

                {/* Property 5 */}
                <Link href="/investor/property/2" className="flex flex-col rounded-[10px] bg-[#FFF] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden transition-transform hover:-translate-y-2 cursor-pointer no-underline group">
                  <div className="relative w-full h-[280px]">
                    <img src="/ImageImage(8).png" className="w-full h-full object-cover" alt="Modern flat for rent" />
                    <div className="absolute top-5 left-5 bg-white px-3.5 py-1.5 rounded-[5px] text-xs font-semibold text-[#171717] shadow-sm">Cottage</div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <p className="text-sm text-[#999] mb-1 font-medium">88G, Shibuya Cross St</p>
                      <h3 className="text-[22px] font-bold text-[#171717] leading-7 group-hover:text-[#2A2A2A] transition-colors">Modern flat for rent</h3>
                    </div>
                    <div className="w-full h-px bg-[#E5E5E5] my-1"></div>
                    <div className="flex justify-between items-center">
                       <div className="flex gap-4 text-sm text-[#666] font-semibold">
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            2
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                            2
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                            5,100 sq.ft
                          </span>
                       </div>
                       <p className="text-2xl font-bold text-[#171717]">$2100</p>
                    </div>
                  </div>
                </Link>

                {/* Property 6 */}
                <Link href="/investor/property/3" className="flex flex-col rounded-[10px] bg-[#FFF] shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden transition-transform hover:-translate-y-2 cursor-pointer no-underline group">
                  <div className="relative w-full h-[280px]">
                    <img src="/ImageImage(7).png" className="w-full h-full object-cover" alt="Urban condo with view" />
                    <div className="absolute top-5 left-5 bg-white px-3.5 py-1.5 rounded-[5px] text-xs font-semibold text-[#171717] shadow-sm">Villa</div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <p className="text-sm text-[#999] mb-1 font-medium">29E, Rue des</p>
                      <h3 className="text-[22px] font-bold text-[#171717] leading-7 group-hover:text-[#2A2A2A] transition-colors">Urban condo with view</h3>
                    </div>
                    <div className="w-full h-px bg-[#E5E5E5] my-1"></div>
                    <div className="flex justify-between items-center">
                       <div className="flex gap-4 text-sm text-[#666] font-semibold">
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            2
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                            2
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                            4,900 sq.ft
                          </span>
                       </div>
                       <p className="text-2xl font-bold text-[#171717]">$1750</p>
                    </div>
                  </div>
                </Link>

             </div>
           </div>
        </div>
          <div className="flex py-[120px] px-[30px] flex-col items-center shrink-0 bg-[#171717] w-full h-auto overflow-hidden transition-all duration-300">
            <div className="flex max-w-full xl:w-[1300px] flex-col items-center gap-20 shrink-0 w-full xl:w-[1300px] h-auto">
              <div className="flex flex-col xl:flex-row justify-between items-center shrink-0 w-full xl:w-[1300px] h-auto xl:h-[154px] overflow-hidden">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={heavyFadeUp}
                  className="flex max-w-full xl:w-[550px] flex-col justify-center items-start gap-2 shrink-0 w-full xl:w-[550px] h-auto overflow-visible"
                >
                  <div className="flex flex-col items-start w-full xl:w-[550px]">
                    <p className="text-[#FFF] font-sans text-[clamp(32px,5vw,64px)] font-semibold leading-[1.35] w-full xl:w-[561px]">
                      We develop quality real estate projects
                    </p>
                  </div>
                </motion.div>
                <div className="flex py-3.5 px-6 justify-center items-center gap-2 shrink-0 rounded-lg bg-[#FFF] w-auto h-[52px] cursor-pointer hover:bg-[#EAEAEA] transition-colors relative">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#171717] font-sans text-lg font-semibold leading-5 w-fit whitespace-nowrap">
                      View All
                    </p>
                  </div>
                  <div className="flex flex-col items-start shrink-0 w-6 h-6">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 w-6 h-6 overflow-hidden relative "
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.3519 3.95202C12.5769 3.7273 12.8819 3.60107 13.1999 3.60107C13.5179 3.60107 13.8229 3.7273 14.0479 3.95202L21.2479 11.152C21.4726 11.377 21.5988 11.682 21.5988 12C21.5988 12.318 21.4726 12.623 21.2479 12.848L14.0479 20.048C13.8204 20.26 13.5195 20.3754 13.2087 20.3699C12.8978 20.3644 12.6012 20.2385 12.3813 20.0186C12.1614 19.7988 12.0355 19.5021 12.03 19.1913C12.0245 18.8804 12.1399 18.5795 12.3519 18.352L17.5029 13.2H3.5999C3.28164 13.2 2.97642 13.0736 2.75137 12.8485C2.52633 12.6235 2.3999 12.3183 2.3999 12C2.3999 11.6818 2.52633 11.3765 2.75137 11.1515C2.97642 10.9264 3.28164 10.8 3.5999 10.8H17.5029L12.3519 5.64802C12.1272 5.42302 12.001 5.11802 12.001 4.80002C12.001 4.48202 12.1272 4.17702 12.3519 3.95202Z"
                        fill="#171717"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col items-start absolute -left-[50px] top-3.5 w-6 h-6"></div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-[50px] shrink-0 w-full xl:w-[1300px] h-auto overflow-hidden">
                {accordionData.map((item) => {
                  const isActive = activeAccordion === item.id;
                  return (
                    <div key={item.id} className="flex flex-col justify-center items-start shrink-0 w-full overflow-hidden">
                      <div
                        className="flex flex-col xl:flex-row justify-between items-center shrink-0 w-full h-[70px] cursor-pointer group"
                        onClick={() => setActiveAccordion(isActive ? null : item.id)}
                      >
                        <div className="flex flex-col items-start w-fit">
                          <p className="text-[#FFF] font-sans text-[clamp(24px,5vw,40px)] font-semibold leading-[48px] w-fit">
                            {item.number}
                          </p>
                        </div>
                        <div className="flex flex-col items-start w-fit">
                          <p className="text-[#FFF] font-sans text-[clamp(24px,5vw,40px)] font-semibold leading-[48px] w-fit group-hover:text-[#CCC] transition-colors">
                            {item.title}
                          </p>
                        </div>
                        <div className="flex justify-center items-center gap-[5px] shrink-0 rounded-[35px] w-[70px] h-[70px] overflow-hidden">
                          <div className="flex flex-col items-start shrink-0 w-[30px] h-[30px] relative">
                            <div className={`flex justify-center items-center absolute rounded-[50px] w-[30px] h-[30px] overflow-hidden transition-transform duration-300 ${isActive ? 'rotate-0' : '-rotate-90'}`}>
                              <div className="flex flex-col items-start rounded-[50px] w-fit">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] overflow-hidden relative">
                                  <path d="M15 25V5M8.74902 18.75C8.74902 18.75 13.35 25 14.999 25C16.645 25 21.249 18.75 21.249 18.75" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 bg-[#D0D5DD] w-full h-px overflow-hidden mt-6 mb-6"></div>

                      <div className={`flex justify-between items-start shrink-0 w-full transition-all duration-500 ease-in-out overflow-hidden origin-top ${isActive ? 'h-auto xl:h-[430px] opacity-100 scale-y-100' : 'h-0 opacity-0 scale-y-0'}`}>
                        <div className="flex max-w-full xl:w-[400px] flex-col items-start shrink-0 w-full xl:w-[400px]">
                          <p className="text-[#FFF] font-sans text-[clamp(24px,5vw,32px)] font-semibold leading-[38.4px] w-fit">
                            {item.subtitle}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-center shrink-0 rounded-[10px] w-full xl:w-[406px] h-auto xl:h-[430px] overflow-hidden">
                          <img src={item.image} className="shrink-0 rounded-[10px] w-full xl:w-[406px] h-auto xl:h-[430px] overflow-hidden object-cover" alt={item.title} />
                        </div>
                        <div className="flex max-w-full xl:w-[400px] flex-col justify-between items-start shrink-0 w-full xl:w-[400px] h-auto xl:h-[409px] overflow-hidden">
                          <p className="text-[#666] font-sans text-lg font-medium leading-[32.4px] w-full xl:w-[400px]">
                            {item.description}
                          </p>
                          <div className="flex py-3.5 px-6 justify-center items-center gap-2 shrink-0 rounded-lg w-auto h-[52px] cursor-pointer group/btn relative">
                            <div className="flex flex-col items-start w-fit">
                              <p className="text-[#FFF] font-sans text-lg font-semibold leading-5 w-fit whitespace-nowrap group-hover/btn:underline">
                                View details
                              </p>
                            </div>
                            <div className="flex flex-col items-start shrink-0 w-6 h-6 transform group-hover/btn:translate-x-1 transition-transform">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 w-6 h-6 overflow-hidden relative">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.3519 3.95104C12.5769 3.72632 12.8819 3.6001 13.1999 3.6001C13.5179 3.6001 13.8229 3.72632 14.0479 3.95104L21.2479 11.151C21.4729 11.3761 21.5993 11.6813 21.5993 11.9995C21.5993 12.3178 21.4729 12.623 21.2479 12.848L14.0479 20.048C13.821 20.2635 13.5188 20.3818 13.2059 20.3777C12.893 20.3736 12.5941 20.2475 12.3729 20.0261C12.1516 19.8048 12.0256 19.5057 12.0217 19.1928C12.0178 18.8799 12.1363 18.5779 12.3519 18.351L17.5029 13.2H3.5999C3.28164 13.2 2.97642 13.0736 2.75137 12.8486C2.52633 12.6235 2.3999 12.3183 2.3999 12C2.3999 11.6818 2.52633 11.3766 2.75137 11.1515C2.97642 10.9265 3.28164 10.8 3.5999 10.8H17.5029L12.3519 5.64804C12.1269 5.423 12.0005 5.11779 12.0005 4.79954C12.0005 4.4813 12.1269 4.17608 12.3519 3.95104Z" fill="white" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex pt-[120px] pr-[30px] pb-[60px] pl-[30px] flex-col items-center shrink-0 w-full h-auto xl:h-[996px] overflow-hidden">
            <div className="flex max-w-full xl:w-[1300px] flex-col justify-center items-start gap-12 shrink-0 w-full xl:w-[1300px] h-auto xl:h-[816px]">
              <div className="flex flex-col xl:flex-row justify-between items-center shrink-0 w-full xl:w-[1300px] h-auto xl:h-[732px] overflow-hidden">
                <div className="flex max-w-full xl:w-[743px] flex-col justify-center items-center gap-[54px] shrink-0 w-full xl:w-[743px] h-auto xl:h-[696px] overflow-hidden">
                  <div className="flex flex-col items-start gap-2 shrink-0 w-full xl:w-[743px] h-[117px] overflow-hidden">
                    <div className="flex flex-col items-start w-full xl:w-[743px]">
                      <p className="text-[#2A2A2A] font-sans text-[clamp(32px,5vw,64px)] font-semibold leading-[76.8px] w-fit">
                        What makes us different
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full xl:w-[743px]">
                      <p className="text-[#666] font-sans text-lg font-medium leading-[32.4px] w-fit">
                        Simple steps to buy, sell or rent your properties
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-[60px] shrink-0 w-full xl:w-[743px] h-auto xl:h-[525px] overflow-hidden">
                    <div className="flex justify-end items-center rounded-[10px] w-full h-auto xl:h-[556px] overflow-hidden">
                      <img
                        src="/ImageImage(9).png"
                        className="rounded-[10px] w-full xl:w-[787px] h-auto xl:h-[556px] overflow-hidden max-w-none"
                        alt="Image (Image)"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex max-w-full xl:w-[474px] flex-col justify-center items-center gap-[30px] shrink-0 w-full xl:w-[474px] h-auto xl:h-[732px] overflow-hidden">
                  <div className="flex p-[30px] flex-col items-start gap-3 shrink-0 rounded-[10px] w-full xl:w-[474px] h-56 overflow-hidden">
                    <div className="flex justify-center items-center w-10 h-10 overflow-hidden">
                      <div className="flex flex-col items-start w-fit">
                        <div className="w-10 h-10 overflow-hidden relative">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 absolute left-0 top-0 "
                          >
                            <path
                              d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                              fill="#171717"
                            />
                          </svg>
                          <svg
                            width="18"
                            height="9"
                            viewBox="0 0 18 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[17px] h-2 absolute left-3 top-5 "
                          >
                            <path
                              d="M0.25 8.333V0M16.917 0V8.333"
                              stroke="white"
                              strokeWidth="0.5"
                              strokeMiterlimit="10"
                            />
                          </svg>
                          <svg
                            width="20"
                            height="9"
                            viewBox="0 0 20 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[19px] h-2 absolute left-2.5 top-[13px] "
                          >
                            <path
                              d="M0.25 8.236L9.833 0.25L19.416 8.236"
                              stroke="white"
                              strokeWidth="0.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <svg
                            width="20"
                            height="15"
                            viewBox="0 0 20 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-3.5 absolute left-2.5 top-[15px] "
                          >
                            <path
                              d="M17.083 4.547V0.25H14.167V1.917M6.25 6.917V11.917M8.75 9.417H3.75M11.667 14V6.917H16.667V14M14.584 10.667H15.417M20 14.001H0M3.75 6.917H8.75V11.917H3.75V6.917Z"
                              stroke="white"
                              strokeWidth="0.5"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <button className="cursor-pointer text-nowrap flex flex-col justify-center items-center gap-1 shrink-0 w-full xl:w-[414px] h-28 overflow-hidden">
                      <div className="flex flex-col items-start w-full xl:w-[414px]">
                        <p className="text-[#171717] font-sans text-2xl font-semibold leading-9 w-fit tracking-[-0.03em]">
                          Explore listings
                        </p>
                      </div>
                      <p className="text-[#666] font-sans text-base font-medium leading-6 w-full xl:w-[414px]">
                        Discover the best properties handpicked to match your
                        lifestyle and budget &amp; worked with experienced real
                        estate professionals
                      </p>
                    </button>
                  </div>
                  <div className="flex p-[30px] flex-col items-start gap-3 shrink-0 rounded-[10px] w-full xl:w-[474px] h-56 overflow-hidden">
                    <div className="flex justify-center items-center w-10 h-10 overflow-hidden">
                      <div className="flex flex-col items-start w-fit">
                        <div className="w-10 h-10 overflow-hidden relative">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 absolute left-0 top-0 "
                          >
                            <path
                              d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                              fill="#171717"
                            />
                          </svg>
                          <div className="w-5 h-5 absolute left-2.5 top-2.5">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 absolute -left-0 -top-0 "
                            >
                              <path
                                d="M14.747 15.156C13.8907 14.3814 12.8575 13.8286 11.738 13.546C12.341 13.2293 12.8461 12.7539 13.1988 12.1711C13.5514 11.5883 13.7382 10.9202 13.739 10.239C13.7379 9.24799 13.3435 8.29788 12.6425 7.59739C11.9414 6.8969 10.991 6.50329 9.99996 6.50303C9.00874 6.50303 8.05806 6.89651 7.35679 7.59703C6.65552 8.29756 6.26102 9.24781 6.25996 10.239C6.2608 10.9203 6.44773 11.5884 6.80055 12.1713C7.15338 12.7541 7.6587 13.2294 8.26196 13.546C7.14239 13.8286 6.10921 14.3814 5.25296 15.156C3.96309 16.3189 3.14708 17.9164 2.96096 19.643C2.95603 19.6881 2.96067 19.7337 2.97457 19.7768C2.98846 19.8199 3.01131 19.8596 3.04161 19.8933C3.07191 19.927 3.10898 19.9539 3.15039 19.9723C3.19181 19.9907 3.23664 20.0002 3.28196 20H16.718C16.7631 19.9999 16.8078 19.9902 16.849 19.9717C16.8902 19.9532 16.9271 19.9263 16.9573 19.8926C16.9874 19.859 17.0102 19.8194 17.0241 19.7764C17.038 19.7334 17.0427 19.688 17.038 19.643C16.8521 17.9165 16.0365 16.319 14.747 15.156ZM10.745 18.373L9.99996 19.196L9.25496 18.373L9.76996 15.878L9.99996 15.605L10.23 15.878L10.745 18.373ZM9.99796 13.975H10.002C10.2926 13.975 10.5786 13.994 10.86 14.032L9.99996 14.697L9.13996 14.032C9.42129 13.9947 9.70729 13.9757 9.99796 13.975ZM9.53596 15.155L8.76596 16.065L7.80596 14.357C7.96962 14.2985 8.1354 14.2462 8.30296 14.2L9.53596 15.154V15.155ZM10.464 15.155L11.697 14.2C11.865 14.246 12.0303 14.2984 12.193 14.357L11.233 16.066L10.463 15.154L10.464 15.155ZM6.90696 10.239C6.90881 9.41965 7.2354 8.63442 7.81516 8.05541C8.39493 7.4764 9.18058 7.15082 9.99996 7.15003C10.8195 7.15082 11.6053 7.47653 12.1851 8.05576C12.7649 8.63499 13.0914 9.42048 13.093 10.24C13.0916 11.0596 12.7654 11.8452 12.1858 12.4246C11.6062 13.004 10.8205 13.33 10.001 13.331C9.18158 13.33 8.39503 13.0041 7.81546 12.4249C7.23588 11.8457 6.90954 11.0604 6.90796 10.241L6.90696 10.239ZM7.20696 14.608L8.43196 16.788C8.45431 16.8275 8.48474 16.8619 8.52127 16.8889C8.5578 16.9158 8.5996 16.9348 8.64395 16.9445C8.6883 16.9542 8.7342 16.9545 8.77865 16.9453C8.82311 16.9361 8.86513 16.9176 8.90196 16.891L8.58896 18.403C8.56896 18.503 8.59696 18.608 8.66596 18.685L9.27296 19.355H3.64996C3.81566 18.3356 4.22563 17.3714 4.84486 16.5447C5.46409 15.7181 6.27418 15.0536 7.20596 14.608H7.20696ZM10.727 19.355L11.334 18.685C11.3683 18.6475 11.3931 18.6024 11.4065 18.5533C11.4199 18.5043 11.4214 18.4528 11.411 18.403L11.099 16.891C11.1358 16.9176 11.1778 16.9361 11.2223 16.9453C11.2667 16.9545 11.3126 16.9542 11.357 16.9445C11.4013 16.9348 11.4431 16.9158 11.4796 16.8889C11.5162 16.8619 11.5466 16.8275 11.569 16.788L12.793 14.608C13.7247 15.0536 14.5348 15.7181 15.1541 16.5447C15.7733 17.3714 16.1833 18.3356 16.349 19.355H10.727ZM7.22596 2.60503L8.43396 3.57503L8.02696 5.06903C8.00216 5.15655 8.00509 5.2496 8.03536 5.33538C8.06562 5.42116 8.12173 5.49545 8.19596 5.54803C8.26947 5.60076 8.35716 5.63011 8.44761 5.63225C8.53805 5.63439 8.62703 5.60922 8.70296 5.56003L9.99996 4.71203L11.297 5.56003C11.3724 5.61058 11.4616 5.63657 11.5524 5.63442C11.6431 5.63227 11.731 5.6021 11.804 5.54803C11.8782 5.49545 11.9343 5.42116 11.9646 5.33538C11.9948 5.2496 11.9978 5.15655 11.973 5.06903L11.566 3.57503L12.774 2.60503C12.8453 2.54888 12.8976 2.47203 12.9235 2.38502C12.9495 2.29801 12.9479 2.2051 12.919 2.11903C12.8918 2.03238 12.8385 1.95626 12.7663 1.90112C12.6942 1.84597 12.6067 1.8145 12.516 1.81103L10.968 1.73503L10.418 0.288029C10.3866 0.202729 10.3295 0.129245 10.2547 0.0776746C10.1798 0.0261047 10.0908 -0.0010196 9.99996 2.93132e-05C9.90907 -0.0010196 9.82009 0.0261047 9.74524 0.0776746C9.67039 0.129245 9.61335 0.202729 9.58196 0.288029L9.03196 1.73503L7.48396 1.81103C7.39321 1.8145 7.30576 1.84597 7.23361 1.90112C7.16146 1.95626 7.10813 2.03238 7.08096 2.11903C7.05202 2.2051 7.05043 2.29801 7.07639 2.38502C7.10235 2.47203 7.15459 2.54888 7.22596 2.60503ZM9.19296 2.37303C9.27961 2.36846 9.36309 2.33894 9.43335 2.28802C9.50361 2.2371 9.55765 2.16695 9.58896 2.08603L9.99996 1.00603L10.41 2.08603C10.4413 2.1671 10.4955 2.23735 10.566 2.28829C10.6364 2.33922 10.7201 2.36865 10.807 2.37303L11.962 2.43003L11.06 3.15303C10.9925 3.20782 10.9423 3.28098 10.9155 3.36368C10.8887 3.44638 10.8864 3.53507 10.909 3.61903L11.212 4.73403L10.245 4.10103C10.172 4.05368 10.0869 4.02849 9.99996 4.02849C9.913 4.02849 9.8279 4.05368 9.75496 4.10103L8.78796 4.73403L9.09096 3.61903C9.11349 3.53507 9.11122 3.44638 9.08442 3.36368C9.05762 3.28098 9.00745 3.20782 8.93996 3.15303L8.03796 2.43003L9.19296 2.37303ZM1.64496 8.83903L2.94096 7.99103L4.23796 8.83903C4.31372 8.88919 4.40299 8.91501 4.49383 8.91304C4.58467 8.91106 4.67274 8.88139 4.74626 8.828C4.81977 8.7746 4.87523 8.70003 4.9052 8.61425C4.93516 8.52847 4.93822 8.43559 4.91396 8.34803L4.50796 6.85403L5.71596 5.88403C5.78752 5.82781 5.83989 5.75079 5.86586 5.66358C5.89183 5.57636 5.89012 5.48323 5.86096 5.39703C5.83372 5.31022 5.78025 5.23399 5.7079 5.17883C5.63555 5.12368 5.54788 5.0923 5.45696 5.08903L3.90996 5.01403L3.35996 3.56603C3.32856 3.48073 3.27152 3.40724 3.19667 3.35567C3.12183 3.3041 3.03284 3.27698 2.94196 3.27803C2.85107 3.27698 2.76209 3.3041 2.68724 3.35567C2.61239 3.40724 2.55535 3.48073 2.52396 3.56603L1.97396 5.01403L0.425956 5.08903C0.335036 5.0923 0.247366 5.12368 0.175016 5.17883C0.102665 5.23399 0.0491913 5.31022 0.0219565 5.39703C-0.00697564 5.4831 -0.00857089 5.57601 0.0173894 5.66302C0.0433497 5.75003 0.0955935 5.82688 0.166956 5.88303L1.37496 6.85303L0.968956 8.34803C0.94469 8.43559 0.947747 8.52847 0.977717 8.61425C1.00769 8.70003 1.06314 8.7746 1.13665 8.828C1.21017 8.88139 1.29824 8.91106 1.38908 8.91304C1.47992 8.91501 1.56919 8.88919 1.64496 8.83903ZM0.979956 5.70803L2.13496 5.65203C2.22172 5.64738 2.30529 5.61771 2.37556 5.56661C2.44583 5.5155 2.4998 5.44514 2.53096 5.36403L2.94096 4.28403L3.35196 5.36403C3.38311 5.44514 3.43708 5.5155 3.50736 5.56661C3.57763 5.61771 3.66119 5.64738 3.74796 5.65203L4.90296 5.70803L4.00196 6.43203C3.93447 6.48662 3.88422 6.55956 3.85725 6.64207C3.83028 6.72457 3.82775 6.81312 3.84996 6.89703L4.15396 8.01303L3.18596 7.37903C3.11301 7.33168 3.02792 7.30649 2.94096 7.30649C2.854 7.30649 2.7689 7.33168 2.69596 7.37903L1.72896 8.01203L2.03196 6.89703C2.05439 6.81331 2.05217 6.72489 2.02556 6.6424C1.99895 6.55991 1.94909 6.48686 1.88196 6.43203L0.979956 5.70803ZM19.984 5.51103C19.9614 5.42306 19.9122 5.34422 19.8431 5.28532C19.774 5.22641 19.6884 5.19033 19.598 5.18203L18.056 5.02603L17.583 3.55203C17.5562 3.46516 17.5032 3.38872 17.4312 3.33321C17.3592 3.2777 17.2718 3.24585 17.181 3.24203C17.0903 3.23687 17.0002 3.25959 16.9228 3.30714C16.8453 3.35469 16.7844 3.4248 16.748 3.50803L16.123 4.92503L14.573 4.91903C14.4822 4.91791 14.3923 4.94488 14.3175 4.99626C14.2426 5.04765 14.1855 5.12092 14.154 5.20603C14.1206 5.29054 14.1143 5.3833 14.1357 5.47157C14.1572 5.55984 14.2055 5.6393 14.274 5.69903L15.429 6.73003L14.945 8.20103C14.9156 8.28703 14.9136 8.38003 14.9392 8.46723C14.9648 8.55443 15.0167 8.63156 15.088 8.68803C15.1579 8.74599 15.2442 8.78085 15.3348 8.78783C15.4254 8.79482 15.5159 8.77357 15.594 8.72703L16.934 7.94703L18.184 8.86303C18.257 8.91717 18.3448 8.9477 18.4357 8.95053C18.5266 8.95336 18.6161 8.92835 18.6924 8.87885C18.7686 8.82935 18.828 8.75773 18.8624 8.67358C18.8968 8.58944 18.9047 8.49678 18.885 8.40803L18.557 6.89403L19.815 5.98903C19.8892 5.93665 19.9453 5.86258 19.9758 5.777C20.0062 5.69141 20.0094 5.59851 19.985 5.51103H19.984ZM18.074 6.44703C18.0038 6.4982 17.95 6.56857 17.9189 6.64966C17.8879 6.73075 17.8809 6.81909 17.899 6.90403L18.143 8.03403L17.21 7.35103C17.1397 7.29994 17.0561 7.2703 16.9693 7.26569C16.8825 7.26108 16.7963 7.28169 16.721 7.32503L15.721 7.90603L16.083 6.80903C16.1097 6.72634 16.112 6.63768 16.0894 6.55374C16.0669 6.4698 16.0205 6.39419 15.956 6.33603L15.094 5.56603L16.251 5.57003H16.252C16.3387 5.5699 16.4235 5.54473 16.4962 5.49754C16.5689 5.45035 16.6265 5.38315 16.662 5.30403L17.128 4.24603L17.481 5.34603C17.536 5.51603 17.685 5.63603 17.861 5.65403L19.012 5.77103L18.074 6.44703ZM2.94096 10.264C3.11996 10.264 3.26396 10.408 3.26396 10.587V11.257C3.25936 11.3395 3.22339 11.417 3.16341 11.4737C3.10343 11.5305 3.02401 11.5621 2.94146 11.5621C2.8589 11.5621 2.77948 11.5305 2.7195 11.4737C2.65953 11.417 2.62355 11.3395 2.61896 11.257V10.587C2.61896 10.408 2.76296 10.264 2.94096 10.264ZM4.25796 11.58C4.30182 11.5776 4.34572 11.5841 4.38697 11.5992C4.42822 11.6143 4.46596 11.6377 4.49787 11.6679C4.52979 11.6981 4.55521 11.7344 4.57259 11.7748C4.58996 11.8151 4.59892 11.8586 4.59892 11.9025C4.59892 11.9465 4.58996 11.9899 4.57259 12.0303C4.55521 12.0706 4.52979 12.107 4.49787 12.1372C4.46596 12.1674 4.42822 12.1907 4.38697 12.2058C4.34572 12.2209 4.30182 12.2275 4.25796 12.225H3.58796C3.54409 12.2275 3.50019 12.2209 3.45894 12.2058C3.41769 12.1907 3.37995 12.1674 3.34804 12.1372C3.31612 12.107 3.2907 12.0706 3.27333 12.0303C3.25595 11.9899 3.24699 11.9465 3.24699 11.9025C3.24699 11.8586 3.25595 11.8151 3.27333 11.7748C3.2907 11.7344 3.31612 11.6981 3.34804 11.6679C3.37995 11.6377 3.41769 11.6143 3.45894 11.5992C3.50019 11.5841 3.54409 11.5776 3.58796 11.58H4.25796ZM2.61796 11.902C2.61796 11.9877 2.58393 12.0699 2.52335 12.1304C2.46278 12.191 2.38062 12.225 2.29496 12.225H1.62496C1.58109 12.2275 1.5372 12.2209 1.49594 12.2058C1.45469 12.1907 1.41695 12.1674 1.38504 12.1372C1.35312 12.107 1.3277 12.0706 1.31033 12.0303C1.29295 11.9899 1.28399 11.9465 1.28399 11.9025C1.28399 11.8586 1.29295 11.8151 1.31033 11.7748C1.3277 11.7344 1.35312 11.6981 1.38504 11.6679C1.41695 11.6377 1.45469 11.6143 1.49594 11.5992C1.5372 11.5841 1.58109 11.5776 1.62496 11.58H2.29496C2.47296 11.58 2.61796 11.724 2.61796 11.902ZM2.94096 13.541C2.85546 13.5408 2.77357 13.5066 2.71321 13.4461C2.65285 13.3855 2.61896 13.3035 2.61896 13.218V12.548C2.62355 12.4656 2.65953 12.3881 2.7195 12.3313C2.77948 12.2746 2.8589 12.243 2.94146 12.243C3.02401 12.243 3.10343 12.2746 3.16341 12.3313C3.22339 12.3881 3.25936 12.4656 3.26396 12.548V13.218C3.26396 13.3035 3.23006 13.3855 3.16971 13.4461C3.10935 13.5066 3.02745 13.5408 2.94196 13.541H2.94096ZM15.745 12.225C15.7011 12.2275 15.6572 12.2209 15.6159 12.2058C15.5747 12.1907 15.537 12.1674 15.505 12.1372C15.4731 12.107 15.4477 12.0706 15.4303 12.0303C15.413 11.9899 15.404 11.9465 15.404 11.9025C15.404 11.8586 15.413 11.8151 15.4303 11.7748C15.4477 11.7344 15.4731 11.6981 15.505 11.6679C15.537 11.6377 15.5747 11.6143 15.6159 11.5992C15.6572 11.5841 15.7011 11.5776 15.745 11.58H16.415C16.4588 11.5776 16.5027 11.5841 16.544 11.5992C16.5852 11.6143 16.623 11.6377 16.6549 11.6679C16.6868 11.6981 16.7122 11.7344 16.7296 11.7748C16.747 11.8151 16.7559 11.8586 16.7559 11.9025C16.7559 11.9465 16.747 11.9899 16.7296 12.0303C16.7122 12.0706 16.6868 12.107 16.6549 12.1372C16.623 12.1674 16.5852 12.1907 16.544 12.2058C16.5027 12.2209 16.4588 12.2275 16.415 12.225H15.745ZM17.385 12.548V13.218C17.385 13.3037 17.3509 13.3859 17.2904 13.4464C17.2298 13.507 17.1476 13.541 17.062 13.541C16.9763 13.541 16.8941 13.507 16.8336 13.4464C16.773 13.3859 16.739 13.3037 16.739 13.218V12.548C16.739 12.4624 16.773 12.3802 16.8336 12.3196C16.8941 12.2591 16.9763 12.225 17.062 12.225C17.1476 12.225 17.2298 12.2591 17.2904 12.3196C17.3509 12.3802 17.385 12.4624 17.385 12.548ZM18.702 11.902C18.702 11.9877 18.6679 12.0699 18.6074 12.1304C18.5468 12.191 18.4646 12.225 18.379 12.225H17.709C17.6651 12.2275 17.6212 12.2209 17.5799 12.2058C17.5387 12.1907 17.501 12.1674 17.469 12.1372C17.4371 12.107 17.4117 12.0706 17.3943 12.0303C17.377 11.9899 17.368 11.9465 17.368 11.9025C17.368 11.8586 17.377 11.8151 17.3943 11.7748C17.4117 11.7344 17.4371 11.6981 17.469 11.6679C17.501 11.6377 17.5387 11.6143 17.5799 11.5992C17.6212 11.5841 17.6651 11.5776 17.709 11.58H18.379C18.557 11.58 18.702 11.724 18.702 11.902ZM17.385 10.587V11.257C17.385 11.3427 17.3509 11.4249 17.2904 11.4854C17.2298 11.546 17.1476 11.58 17.062 11.58C16.9763 11.58 16.8941 11.546 16.8336 11.4854C16.773 11.4249 16.739 11.3427 16.739 11.257V10.587C16.739 10.5014 16.773 10.4192 16.8336 10.3586C16.8941 10.2981 16.9763 10.264 17.062 10.264C17.1476 10.264 17.2298 10.2981 17.2904 10.3586C17.3509 10.4192 17.385 10.5014 17.385 10.587Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="cursor-pointer text-nowrap flex flex-col justify-center items-center gap-1 shrink-0 w-full xl:w-[414px] h-28 overflow-hidden">
                      <div className="flex flex-col items-start w-full xl:w-[414px]">
                        <p className="text-[#171717] font-sans text-2xl font-semibold leading-9 w-fit tracking-[-0.03em]">
                          Connect with experts
                        </p>
                      </div>
                      <p className="text-[#666] font-sans text-base font-medium leading-6 w-full xl:w-[414px]">
                        Explore top-tier properties carefully selected to suit
                        your lifestyle and budget, all backed by the expertise
                        of seasoned real estate professionals.
                      </p>
                    </button>
                  </div>
                  <div className="flex p-[30px] flex-col items-start gap-3 shrink-0 rounded-[10px] w-full xl:w-[474px] h-56 overflow-hidden">
                    <div className="flex justify-center items-center w-10 h-10 overflow-hidden">
                      <div className="flex flex-col items-start w-fit">
                        <div className="w-10 h-10 overflow-hidden relative">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 absolute left-0 top-0 "
                          >
                            <path
                              d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                              fill="#171717"
                            />
                          </svg>
                          <div className="w-5 h-5 absolute left-2.5 top-2.5">
                            <div className="w-[19px] h-5 absolute left-px top-0">
                              <svg
                                width="19"
                                height="14"
                                viewBox="0 0 19 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-[19px] h-3.5 absolute left-0 top-1.5 "
                              >
                                <path
                                  d="M18.596 0L18.04 0.190001L18.286 0.91L6.36 12.836L0.83 7.306L5.747 2.389L5.332 1.974L0 7.306L6.36 13.666L18.96 1.066L18.596 0Z"
                                  fill="white"
                                />
                              </svg>
                              <svg
                                width="14"
                                height="13"
                                viewBox="0 0 14 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-[13px] h-3 absolute left-1.5 top-0 "
                              >
                                <path
                                  d="M7.006 1.71393L9.608 2.61593C9.49457 2.93448 9.42199 3.26612 9.392 3.60293C9.08087 3.60738 8.78364 3.73252 8.563 3.95193C8.338 4.17693 8.213 4.47693 8.213 4.79593C8.213 5.11493 8.338 5.41393 8.563 5.63893C8.788 5.86493 9.088 5.98893 9.407 5.98893C9.726 5.98893 10.025 5.86493 10.25 5.63893C10.476 5.41393 10.6 5.11393 10.6 4.79593C10.6005 4.58001 10.5422 4.36804 10.4314 4.18272C10.3206 3.9974 10.1614 3.84572 9.971 3.74393C9.982 3.45893 10.048 3.13893 10.161 2.80793L11.137 3.14593L12.097 5.95593L12.652 5.76593L12.063 4.04093C12.2457 3.80293 12.4103 3.54226 12.557 3.25893C13.287 1.84893 13.271 0.489931 12.518 0.100931C12.129 -0.100069 11.633 0.000930995 11.121 0.387931C10.671 0.727931 10.243 1.26293 9.917 1.89293L9.829 2.07193L6.851 1.03993L0 7.89093L0.415001 8.30593L7.006 1.71393ZM10.438 2.16293C10.724 1.60893 11.093 1.14493 11.475 0.855931C11.787 0.620931 12.076 0.532931 12.248 0.621931C12.582 0.794931 12.663 1.77893 12.036 2.98993C11.9718 3.11378 11.9024 3.23489 11.828 3.35293L11.6 2.68593L10.387 2.26593L10.437 2.16293H10.438ZM9.835 4.36693C9.892 4.42279 9.93727 4.48947 9.96818 4.56304C9.99909 4.63662 10.015 4.71562 10.015 4.79543C10.015 4.87524 9.99909 4.95424 9.96818 5.02782C9.93727 5.1014 9.892 5.16807 9.835 5.22393C9.75103 5.31091 9.64282 5.37058 9.52446 5.3952C9.4061 5.41981 9.28307 5.40822 9.17139 5.36193C9.05972 5.31563 8.96456 5.23679 8.89832 5.13566C8.83208 5.03453 8.79782 4.9158 8.8 4.79493C8.7996 4.71515 8.81504 4.63609 8.84541 4.56232C8.87579 4.48855 8.9205 4.42155 8.97696 4.36518C9.03342 4.30882 9.1005 4.26421 9.17432 4.23396C9.24814 4.20371 9.32723 4.1884 9.407 4.18893C9.569 4.18893 9.721 4.25193 9.835 4.36693ZM7.397 10.2129L7.639 9.67793L3.338 7.73393L2.933 8.13993L4.866 12.4499L5.401 12.2099L4.933 11.1659L6.356 9.74293L7.397 10.2129ZM4.677 10.5929L3.771 8.57293L5.785 9.48393L4.676 10.5939L4.677 10.5929Z"
                                  fill="white"
                                />
                              </svg>
                              <svg
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3 absolute left-[3px] top-1.5 "
                              >
                                <path
                                  d="M12.435 2.461L12.02 2.046L11.236 2.831L8.404 0L7.989 0.415L11.236 3.661L12.436 2.461H12.435ZM7.55 7.36L7.136 6.945L5.953 8.128L4.963 7.139L6.059 6.043L5.644 5.628L4.548 6.724L3.559 5.735L4.742 4.552L4.328 4.137L2.73 5.735L5.953 8.958L7.551 7.36H7.55ZM3.172 11.644C3.172 11.644 3.955 10.856 4.172 10.631C4.546 10.244 4.712 9.731 4.641 9.19C4.575 8.69 4.307 8.183 3.887 7.763C2.94 6.817 1.775 6.71 0.987 7.499L0 8.485L0.00399971 8.489V8.49L3.172 11.644ZM1.402 7.914C1.838 7.477 2.612 7.317 3.472 8.178C4.147 8.853 4.262 9.694 3.75 10.223C3.62 10.357 3.363 10.618 3.178 10.805L0.831 8.484L1.402 7.914Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="cursor-pointer text-nowrap flex flex-col justify-center items-center gap-1 shrink-0 w-full xl:w-[414px] h-28 overflow-hidden">
                      <div className="flex flex-col items-start w-full xl:w-[414px]">
                        <p className="text-[#171717] font-sans text-2xl font-semibold leading-9 w-fit tracking-[-0.03em]">
                          Close the deals
                        </p>
                      </div>
                      <p className="text-[#666] font-sans text-base font-medium leading-6 w-full xl:w-[414px]">
                        Find the perfect properties carefully curated to suit
                        your lifestyle and budget, all backed by the expertise
                        of trusted real estate professionals.
                      </p>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center w-full xl:w-[1300px]">
                <p className="text-[#666] font-sans text-2xl font-semibold leading-9 w-fit tracking-[-0.03em]">
                  Be a part of our journey. Get in touch
                </p>
              </div>
            </div>
          </div>
          <div className="flex py-[60px] px-[30px] flex-col items-center shrink-0 w-full h-auto xl:h-[1351px] overflow-hidden">
            <div className="flex max-w-full xl:w-[1300px] flex-col justify-center items-start gap-[60px] shrink-0 w-full xl:w-[1300px] h-auto xl:h-[1231px]">
              <div className="flex flex-col xl:flex-row justify-between items-center shrink-0 w-full xl:w-[1300px] h-[125px]">
                <div className="flex max-w-full xl:w-[475px] flex-col items-start shrink-0 w-full xl:w-[475px]">
                  <p className="text-[#2A2A2A] font-sans text-[clamp(26px,5vw,52px)] font-semibold leading-[62.4px] w-full xl:w-[475px]">
                    Our Featured Property
                  </p>
                </div>
                <div className="flex max-w-full xl:w-[476px] flex-col items-start shrink-0 w-full xl:w-[476px]">
                  <p className="text-[#666] font-sans text-lg leading-[32.4px] w-full xl:w-[476px]">
                    Our mission is to provide a seamless and user-friendly
                    experience for individuals and families searching for their
                    dream home.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-8 shrink-0 w-full xl:w-[1300px] h-auto xl:h-[1046px] overflow-hidden">
                <div className="flex justify-center items-center gap-3 shrink-0 w-full xl:w-[1300px] h-10 overflow-hidden">
                  <div className="flex py-2.5 px-4 justify-center items-center gap-2 shrink-0 rounded bg-[#171717] w-[100px] h-10">
                    <div className="flex flex-col items-start w-fit">
                      <p className="text-[#FFF] font-sans text-lg font-semibold leading-5 w-fit">
                        Mansion
                      </p>
                    </div>
                  </div>
                  <div className="flex py-2.5 px-4 justify-center items-center gap-2 shrink-0 rounded bg-[#FFF] w-[67px] h-10">
                    <div className="flex flex-col items-start w-fit">
                      <p className="text-[#666] font-sans text-lg font-semibold leading-5 w-fit">
                        Villa
                      </p>
                    </div>
                  </div>
                  <div className="flex py-2.5 px-4 justify-center items-center gap-2 shrink-0 rounded bg-[#FFF] w-[86px] h-10">
                    <div className="flex flex-col items-start w-fit">
                      <p className="text-[#666] font-sans text-lg font-semibold leading-5 w-fit">
                        Luxury
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-8 shrink-0 w-full xl:w-[1300px] h-auto xl:h-[975px] overflow-hidden">
                  <div className="flex justify-center items-center shrink-0 rounded-[10px] w-full xl:w-[1300px] h-auto xl:h-[524px] overflow-hidden">
                    <img
                      src="/ImageImage(10).png"
                      className="shrink-0 rounded-[10px] w-full xl:w-[1300px] h-auto xl:h-[524px] overflow-hidden max-w-none"
                      alt="Image (Image)"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-4 shrink-0 w-full xl:w-[1300px] h-auto xl:h-[335px] overflow-hidden">
                    <div className="flex justify-center items-center shrink-0 rounded-[10px] w-full xl:w-[448px] h-auto xl:h-[334px] overflow-hidden">
                      <img
                        src="/ImageImage(11).png"
                        className="shrink-0 rounded-[10px] w-full xl:w-[448px] h-auto xl:h-[334px] overflow-hidden max-w-none"
                        alt="Image (Image)"
                      />
                    </div>
                    <div className="flex pt-[30px] pr-10 pb-[30px] pl-[30px] flex-col items-start gap-12 shrink-0 rounded-[10px] bg-[#FFF] shadow-[10px10px50px0rgba(160,178,194,0.20)] w-full h-auto xl:h-[335px] overflow-hidden">
                      <div className="flex flex-col items-start gap-4 shrink-0 w-full xl:w-[766px] h-auto xl:h-[179px]">
                        <div className="flex flex-col items-start gap-1 shrink-0 w-full xl:w-[766px] h-[88px]">
                          <div className="flex flex-col items-start w-full xl:w-[766px]">
                            <p className="text-[#2A2A2A] font-sans text-2xl font-semibold leading-9 w-fit tracking-[-0.03em]">
                              Beach villa for lease
                            </p>
                          </div>
                          <p className="text-[#666] font-sans text-base font-medium leading-6 w-full xl:w-[766px]">
                            Explore top-rated properties tailored to your needs
                            and preferences, with personalized support from
                            experienced real estate professionals every step of
                            the way.
                          </p>
                        </div>
                        <div className="flex flex-col xl:flex-row items-start justify-between shrink-0 w-full h-auto">
                          <div className="flex flex-col items-start gap-3.5 shrink-0 w-auto h-auto">
                            <div className="flex items-center gap-2 shrink-0 w-auto h-auto">
                              <div className="shrink-0 rounded-lg bg-[#D9D9D9] w-2 h-2"></div>
                              <div className="flex flex-col items-start w-fit">
                                <p className="text-[#2A2A2A] font-sans text-xs font-medium leading-[15.6px] whitespace-nowrap">
                                  Master suite
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 w-auto h-auto">
                              <div className="shrink-0 rounded-lg bg-[#D9D9D9] w-2 h-2"></div>
                              <div className="flex flex-col items-start w-fit">
                                <p className="text-[#2A2A2A] font-sans text-xs font-medium leading-[15.6px] whitespace-nowrap">
                                  En-suite bathroom
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 w-auto h-auto">
                              <div className="shrink-0 rounded-lg bg-[#D9D9D9] w-2 h-2"></div>
                              <div className="flex flex-col items-start w-fit">
                                <p className="text-[#2A2A2A] font-sans text-xs font-medium leading-[15.6px] whitespace-nowrap">
                                  Private balcony &amp; walk-in closet
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-[13px] shrink-0 w-auto h-auto">
                            <div className="flex items-center gap-2 shrink-0 w-auto h-auto">
                              <div className="shrink-0 rounded-lg bg-[#D9D9D9] w-2 h-2"></div>
                              <div className="flex flex-col items-start w-fit">
                                <p className="text-[#2A2A2A] font-sans text-xs font-medium leading-[15.6px] whitespace-nowrap">
                                  Large windows &amp; natural light
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 w-auto h-auto">
                              <div className="shrink-0 rounded-lg bg-[#D9D9D9] w-2 h-2"></div>
                              <div className="flex flex-col items-start w-fit">
                                <p className="text-[#2A2A2A] font-sans text-xs font-medium leading-[15.6px] whitespace-nowrap">
                                  Central air conditioning &amp; heating
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-11 shrink-0 w-full xl:w-[766px] h-12">
                        <div className="flex flex-col items-start gap-1 shrink-0 w-full xl:w-[202px] h-12">
                          <p className="text-[#2A2A2A] font-sans text-xl font-semibold leading-6 w-fit">
                            101B, Palm Coast{" "}
                          </p>
                          <div className="flex flex-col items-start w-fit">
                            <p className="text-[#666] font-sans text-lg font-semibold leading-5 w-fit">
                              Location
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-1 shrink-0 w-[149px] h-[46px]">
                          <p className="text-[#2A2A2A] font-sans text-xl font-semibold leading-6 w-fit">
                            6,0000 sq.ft
                          </p>
                          <div className="flex flex-col items-start w-fit">
                            <p className="text-[#666] font-sans text-lg font-medium leading-[18px] w-fit">
                              Total area
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-1 shrink-0 w-[116px] h-[46px]">
                          <p className="text-[#2A2A2A] font-sans text-xl font-semibold leading-6 w-fit">
                            5
                          </p>
                          <div className="flex flex-col items-start w-fit">
                            <p className="text-[#666] font-sans text-lg font-medium leading-[18px] w-fit">
                              Rooms
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start gap-1 shrink-0 w-[161px] h-[46px]">
                          <p className="text-[#2A2A2A] font-sans text-xl font-semibold leading-6 w-fit">
                            2024
                          </p>
                          <div className="flex flex-col items-start w-fit">
                            <p className="text-[#666] font-sans text-lg font-medium leading-[18px] w-fit">
                              Year
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex py-3.5 px-6 justify-center items-center gap-2 shrink-0 rounded-lg bg-[#2A2A2A] w-auto cursor-pointer hover:bg-[#333] transition-colors h-[52px] relative">
                    <div className="flex flex-col items-start w-fit">
                      <p className="text-[#FFF] font-sans text-lg font-semibold leading-5 w-fit whitespace-nowrap">
                        View Property
                      </p>
                    </div>
                    <div className="flex flex-col items-start shrink-0 w-6 h-6">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 w-6 h-6 overflow-hidden relative "
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.352 3.95202C12.577 3.7273 12.882 3.60107 13.2 3.60107C13.518 3.60107 13.823 3.7273 14.048 3.95202L21.248 11.152C21.4727 11.377 21.599 11.682 21.599 12C21.599 12.318 21.4727 12.623 21.248 12.848L14.048 20.048C13.8205 20.26 13.5197 20.3754 13.2088 20.3699C12.8979 20.3644 12.6013 20.2385 12.3814 20.0186C12.1616 19.7988 12.0356 19.5021 12.0301 19.1913C12.0247 18.8804 12.1401 18.5795 12.352 18.352L17.503 13.2H3.60002C3.28176 13.2 2.97654 13.0736 2.7515 12.8485C2.52645 12.6235 2.40002 12.3183 2.40002 12C2.40002 11.6818 2.52645 11.3765 2.7515 11.1515C2.97654 10.9264 3.28176 10.8 3.60002 10.8H17.503L12.352 5.64802C12.1273 5.42302 12.0011 5.11802 12.0011 4.80002C12.0011 4.48202 12.1273 4.17702 12.352 3.95202Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start absolute -left-[50px] top-3.5 w-6 h-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex pt-[60px] pb-0 px-0 flex-col items-center shrink-0 w-full h-auto overflow-hidden">
            <div className="flex flex-col justify-center items-start shrink-0 w-full h-auto xl:h-[860px] relative">
              <motion.img
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={heavyScaleIn}
                src="/Video.png"
                className="w-full h-auto xl:h-[860px] object-cover"
                alt="Video"
              />
              <div className="flex p-2.5 items-center absolute bottom-0 w-full h-auto xl:h-[200px] overflow-hidden">
                <div className="flex items-center gap-10 shrink-0 w-full xl:w-[1508px] h-auto xl:h-[180px]">
                  <div className="flex justify-center items-center gap-[60px] shrink-0 w-full xl:w-[2209px] h-auto xl:h-[200px] overflow-hidden">
                    <div className="flex flex-col items-start shrink-0 w-fit"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


      </div>

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

  {/* Legal &amp; SPV Modal */ }
  {
    activeLegalAsset && (
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
                By purchasing tokens of this asset, you hold a legally binding beneficial ownership stake in the SPV mentioned above. The smart contract acts as the digital shareholder registry, recognized under ADGM / Swiss DLT laws.
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
  );
}