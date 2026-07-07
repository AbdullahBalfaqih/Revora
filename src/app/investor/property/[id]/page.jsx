'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CardNav from '../../../../components/CardNav';
import { RiShieldCheckLine } from 'react-icons/ri';
import { FiSend, FiCpu } from 'react-icons/fi';

const propertiesData = {
  '1': {
    name: 'River flat for rental',
    location: '2/A, New South Quest',
    type: 'Villa',
    image: '/ImageImage(5).png',
    gallery: ['/ImageImage(1).png', '/ImageImage(2).png', '/ImageImage(3).png'],
    price: '$1,850',
    totalArea: '1,200 sq.ft',
    rooms: 3,
    year: 2023,
    description: 'Indulge in modern luxury with this beautifully designed river-facing flat. The property offers stunning water views, contemporary interiors, and premium finishes throughout. Perfect for investors seeking high-yield rental returns in a prime location.',
    features: ['Granite countertops', 'In-unit laundry & ample storage space', 'Two-car garage & driveway parking', 'Community pool', 'Fitness center', 'River-facing balcony'],
    floorPlanDesc: 'At the heart of our mission is personalized service. Our dedicated team of agents and advisors take the time to understand your goals, offering tailored recommendations and expert negotiation support.',
    spv: { entity: 'River Holdings SPV Ltd.', jurisdiction: 'ADGM (Abu Dhabi) / Delaware', regNo: '#SPV-2026-8921', tokenStandard: 'Casper CEP-18 (Security)' },
    tokenPrice: 50,
    totalTokens: 37000,
    remainingTokens: 12400,
    maxTokensPerPerson: 1500,
    mapUrl: 'https://maps.google.com/maps?q=London%20Canary%20Wharf&t=&z=14&ie=UTF8&iwloc=&output=embed',
  },
  '2': {
    name: 'Beach villa for lease',
    location: '101B, Palm Coast',
    type: 'Mansion',
    image: '/ImageImage(6).png',
    gallery: ['/ImageImage(4).png', '/ImageImage(7).png', '/ImageImage(8).png'],
    price: '$1,900',
    totalArea: '6,000 sq.ft',
    rooms: 5,
    year: 2022,
    description: 'Experience beachfront living at its finest with this stunning 5-bedroom mansion. The property boasts an infinity pool, lush landscaped gardens, and multiple outdoor lounges with panoramic ocean views and direct beach access.',
    features: ['Private infinity pool', 'Direct beach access', 'Smart home automation', 'Wine cellar', 'Home theater', 'Landscaped gardens'],
    floorPlanDesc: 'Designed with both luxury and functionality in mind, this mansion features open-concept living spaces that flow seamlessly to outdoor entertainment areas.',
    spv: { entity: 'Palm Coast Holdings SPV Ltd.', jurisdiction: 'DIFC (Dubai) / Cayman Islands', regNo: '#SPV-2026-4517', tokenStandard: 'Casper CEP-18 (Security)' },
    tokenPrice: 100,
    totalTokens: 19000,
    remainingTokens: 4520,
    maxTokensPerPerson: 800,
    mapUrl: 'https://maps.google.com/maps?q=Palm%20Jumeirah,%20Dubai&t=&z=14&ie=UTF8&iwloc=&output=embed',
  },
  '3': {
    name: 'Penthouse in downtown',
    location: "170, Queen's Street",
    type: 'Mansion',
    image: '/ImageImage(10).png',
    gallery: ['/ImageImage(9).png', '/ImageImage(1).png', '/ImageImage(2).png'],
    price: '$2,000',
    totalArea: '4,800 sq.ft',
    rooms: 4,
    year: 2021,
    description: 'Indulge in coastal luxury with this 5-bedroom beachfront villa, offering panoramic ocean views and direct beach access. The property boasts an infinity pool, lush landscaped gardens, and multiple outdoor lounges.',
    features: ['Granite countertops', 'In-unit laundry & ample storage space', 'Two-car garage & driveway parking', 'Community pool', 'Fitness center'],
    floorPlanDesc: 'At the heart of our mission is personalized service. Our dedicated team of agents and advisors take the time to understand your goals, offering tailored recommendations and expert negotiation support to help you achieve the best outcome.',
    spv: { entity: 'Queens Holdings SPV Ltd.', jurisdiction: 'ADGM (Abu Dhabi) / Delaware', regNo: '#SPV-2026-8921', tokenStandard: 'Casper CEP-18 (Security)' },
    tokenPrice: 80,
    totalTokens: 25000,
    remainingTokens: 9840,
    maxTokensPerPerson: 1200,
    mapUrl: 'https://maps.google.com/maps?q=Queen%20Street,%20Toronto&t=&z=14&ie=UTF8&iwloc=&output=embed',
  },
};

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

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [showLegal, setShowLegal] = useState(false);
  const [twinForecast, setTwinForecast] = useState(null);
  const [isGeneratingTwin, setIsGeneratingTwin] = useState(false);

  const property = propertiesData[params.id] || propertiesData['1'];

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    async function fetchTwin() {
      setIsGeneratingTwin(true);
      try {
        const res = await fetch('/api/agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            task_type: 'twin',
            data: { 
              name: property.name, location: property.location, price: property.price, type: property.type 
            }
          })
        });
        const json = await res.json();
        setTwinForecast(json.result);
      } catch (e) {
        console.error(e);
      }
      setIsGeneratingTwin(false);
    }
    
    if (property) {
      fetchTwin();
    }
  }, [property]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
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

      <div className="w-full px-4 xl:px-0 pt-[120px] pb-[60px] flex justify-center">
        <div className="flex max-w-[1300px] w-full flex-col gap-[60px]">

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#666] hover:text-[#171717] transition-colors cursor-pointer bg-transparent border-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span className="font-sans text-base font-medium">Back to Properties</span>
          </button>

          {/* Hero Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full h-[400px] xl:h-[590px] rounded-[10px] overflow-hidden"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content Area */}
          <div className="flex flex-col xl:flex-row justify-between items-start gap-10 w-full">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-10 w-full xl:w-[740px]">

              {/* Property Info Card */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex p-8 xl:p-10 flex-col gap-12 rounded-[10px] bg-[#F2F2F2] w-full"
              >
                {/* Title & Description */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-[#2A2A2A] font-sans text-[28px] xl:text-[32px] font-semibold leading-[38.4px]">
                      {property.name}
                    </h1>
                    <p className="text-[#666] font-sans text-base font-medium leading-6">
                      Discover homes and investments selected to suit your lifestyle and price range — all with the guidance of professionals who know the market best.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-col xl:flex-row gap-6 xl:gap-[102px]">
                    <div className="flex flex-col gap-3.5">
                      {property.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="rounded-lg bg-[#D9D9D9] w-2 h-2"></div>
                          <p className="text-[#171717] font-sans text-xs font-medium leading-[15.6px]">{f}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3.5">
                      {property.features.slice(3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="rounded-lg bg-[#D9D9D9] w-2 h-2"></div>
                          <p className="text-[#171717] font-sans text-xs font-medium leading-[15.6px]">{f}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap justify-between items-center gap-6">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[#171717] font-sans text-xl xl:text-2xl font-semibold leading-9 tracking-[-0.03em]">{property.location}</p>
                    <p className="text-[#171717] font-sans text-base xl:text-lg font-medium leading-[18px]">Location</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[#171717] font-sans text-xl xl:text-2xl font-semibold leading-9 tracking-[-0.03em]">{property.totalArea}</p>
                    <p className="text-[#171717] font-sans text-base xl:text-lg font-medium leading-[18px]">Total area</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[#171717] font-sans text-xl xl:text-2xl font-semibold leading-9 tracking-[-0.03em]">{property.rooms}</p>
                    <p className="text-[#171717] font-sans text-base xl:text-lg font-medium leading-[18px]">Rooms</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[#171717] font-sans text-xl xl:text-2xl font-semibold leading-9 tracking-[-0.03em]">{property.year}</p>
                    <p className="text-[#171717] font-sans text-base xl:text-lg font-medium leading-[18px]">Year</p>
                  </div>
                </div>
              </motion.div>

              {/* Property Description */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-[15px]">
                <h2 className="text-[#2A2A2A] font-sans text-[32px] xl:text-[40px] font-semibold leading-[48px]">Property Description</h2>
                <p className="text-[#666] font-sans text-lg font-medium leading-[32.4px]">{property.description}</p>
              </motion.div>

              {/* Agentic Digital Twin AI */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-4">
                <h2 className="text-[#2A2A2A] font-sans text-[32px] xl:text-[40px] font-semibold leading-[48px] flex items-center gap-3">
                  <FiCpu className="text-[#171717]" /> Agentic AI Digital Twin
                </h2>
                <div className="w-full bg-[#171717] rounded-[10px] p-8 border border-[#2A2A2A] shadow-inner text-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#A3A3A3] text-sm font-semibold tracking-wider">Live Forecast Model</span>
                    <span className="text-[#FFF] text-xs font-semibold px-2 py-1 bg-[rgba(255,255,255,0.1)] rounded border border-[rgba(255,255,255,0.2)]">Active</span>
                  </div>
                  {isGeneratingTwin ? (
                    <div className="flex items-center gap-3 text-[#A3A3A3] italic text-sm">
                      <FiCpu className="animate-spin" /> Synchronizing live market data with digital twin...
                    </div>
                  ) : (
                    <p className="text-[#FFF] font-sans text-[15px] leading-[28px] m-0">
                      {twinForecast || "Forecast data currently unavailable."}
                    </p>
                  )}
                </div>
              </motion.div>


              {/* Property Location */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-4">
                <h2 className="text-[#2A2A2A] font-sans text-[32px] xl:text-[40px] font-semibold leading-[48px]">Property Location</h2>
                <div className="w-full h-[370px] rounded-[10px] bg-[#EEE] overflow-hidden shadow-inner">
                  <iframe
                    src={property.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) contrast(120%)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={property.name}
                  ></iframe>
                </div>
              </motion.div>

              {/* Legal & SPV Section */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col gap-6">
                <h2 className="text-[#2A2A2A] font-sans text-[32px] xl:text-[40px] font-semibold leading-[48px]">Legal & Ownership Structure</h2>
                <p className="text-[#666] font-sans text-lg leading-[32.4px]">
                  This property is held through a Special Purpose Vehicle (SPV) or Trust structure, ensuring legal compliance with local and international regulations. Token holders receive beneficial ownership stakes recognized under applicable DLT laws.
                </p>

                {/* SPV Details Card */}
                <div className="rounded-[10px] bg-[#F2F2F2] p-8 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <RiShieldCheckLine size={24} color="#171717" />
                    <h3 className="text-[#171717] font-sans text-xl font-semibold">Entity Details (SPV / Trust)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[#666] text-sm font-medium mb-1">Legal Entity Name</p>
                      <p className="text-[#171717] text-base font-semibold">{property.spv.entity}</p>
                    </div>
                    <div>
                      <p className="text-[#666] text-sm font-medium mb-1">Jurisdiction</p>
                      <p className="text-[#171717] text-base font-semibold">{property.spv.jurisdiction}</p>
                    </div>
                    <div>
                      <p className="text-[#666] text-sm font-medium mb-1">Registration No.</p>
                      <p className="text-[#171717] text-base font-semibold">{property.spv.regNo}</p>
                    </div>
                    <div>
                      <p className="text-[#666] text-sm font-medium mb-1">Token Standard</p>
                      <p className="text-[#171717] text-base font-semibold">{property.spv.tokenStandard}</p>
                    </div>
                  </div>
                </div>

                {/* Token Mapping */}
                <div className="rounded-[10px] bg-[#F2F2F2] p-8">
                  <h3 className="text-[#171717] font-sans text-lg font-semibold mb-3">Legal Token Mapping</h3>
                  <p className="text-[#666] font-sans text-[15px] leading-[1.6]">
                    By purchasing tokens of this asset, you hold a legally binding beneficial ownership stake in the SPV mentioned above. The smart contract acts as the digital shareholder registry, recognized under ADGM / Swiss DLT laws.
                  </p>
                </div>

                {/* Documents */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[#171717] font-sans text-lg font-semibold pb-3 border-b border-[#E5E5E5]">Verified Digital Documents</h3>
                  {['Electronic Title Deed', 'SPV Articles of Association', 'Independent JLL Appraisal', 'Smart Contract Audit Report'].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#E5E5E5]">
                      <div className="flex items-center gap-3">
                        <FiSend color="#666" size={18} />
                        <span className="text-[#171717] font-sans text-base font-medium">{doc}</span>
                      </div>
                      <button className="flex py-2 px-5 justify-center items-center gap-2 rounded-lg bg-[#171717] hover:bg-[#333] transition-colors cursor-pointer border-none">
                        <span className="text-[#FFF] text-sm font-semibold leading-5">View PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - Contact Card */}
            <div className="w-full xl:w-[420px] xl:sticky xl:top-[90px] flex flex-col gap-6">
              {/* Token Sale Details Tag */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="bg-white rounded-[10px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col gap-5 border border-[#E5E5E5]"
              >
                <div className="flex justify-between items-center pb-4 border-b border-[#F0F0F0]">
                  <div>
                    <p className="text-[#666] font-sans text-xs font-semibold uppercase tracking-wider">Asset Valuation</p>
                    <p className="text-[#171717] font-sans text-3xl font-bold tracking-[-0.03em] mt-1">
                      {property.price === '$1,850' ? '$185,000' : property.price === '$1,900' ? '$190,000' : '$200,000'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#171717] px-3 py-1.5 rounded-[4px]">
                    <span className="text-white text-xs font-semibold font-sans">active sale</span>
                  </div>
                </div>

                {/* Token Pricing Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#999] font-sans text-xs font-medium">Token Price</p>
                    <p className="text-[#171717] font-sans text-xl font-bold mt-0.5">${property.tokenPrice}</p>
                  </div>
                  <div>
                    <p className="text-[#999] font-sans text-xs font-medium">Max Limit / Person</p>
                    <p className="text-[#171717] font-sans text-xl font-bold mt-0.5">{property.maxTokensPerPerson.toLocaleString()} Tokens</p>
                  </div>
                </div>

                {/* Remaining Tokens & Progress */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-[#666]">
                    <span>Remaining Tokens</span>
                    <span className="text-[#171717]">{property.remainingTokens.toLocaleString()} / {property.totalTokens.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-[#F0F0F0] h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#171717] h-full rounded-full transition-all duration-500" 
                      style={{ width: `${(property.remainingTokens / property.totalTokens) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-[#999] text-right font-medium">
                    {((property.remainingTokens / property.totalTokens) * 100).toFixed(1)}% supply remaining
                  </p>
                </div>                {/* Buy Button */}
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="flex py-3.5 px-6 justify-center items-center gap-2 rounded-lg bg-[#171717] hover:bg-[#333] transition-colors cursor-pointer w-full h-[52px] border-none mt-2"
                >
                  <span className="text-white font-sans text-lg font-semibold leading-5">Buy Tokens</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.352 3.95202C12.577 3.7273 12.882 3.60107 13.2 3.60107C13.518 3.60107 13.823 3.727 14.048 3.95202L21.248 11.152C21.4727 11.377 21.599 11.682 21.599 12C21.599 12.318 21.4727 12.623 21.248 12.848L14.048 20.048C13.8205 20.26 13.5197 20.3754 13.2088 20.3699C12.8979 20.3644 12.6013 20.2385 12.3814 20.0186C12.1616 19.7988 12.0356 19.5021 12.0301 19.1913C12.0247 18.8804 12.1401 18.5795 12.352 18.352L17.503 13.2H3.60002C3.28176 13.2 2.97654 13.0736 2.7515 12.8485C2.52645 12.6235 2.40002 12.3183 2.40002 12C2.40002 11.6818 2.52645 11.3765 2.7515 11.1515C2.97654 10.9264 3.28176 10.8 3.60002 10.8H17.503L12.352 5.64802C12.1273 5.42302 12.0011 5.11802 12.0011 4.80002C12.0011 4.48202 12.1273 4.17702 12.352 3.95202Z" fill="white" />
                  </svg>
                </button>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.2 } } }}
                className="rounded-[10px] bg-[#171717] w-[420px] p-8 xl:p-10 flex flex-col gap-6 relative shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
              >
                <p className="text-[#FFF] font-sans text-2xl font-semibold tracking-[-0.03em]">
                  Contact Us
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex py-4 px-5 items-center rounded-[10px] bg-[#1D2125] w-full h-[53px] overflow-hidden">
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Enter Your Name"
                      className="w-full bg-transparent text-white font-sans text-sm font-medium placeholder-[rgba(255,255,255,0.50)] border-none outline-none"
                    />
                  </div>
                  <div className="flex py-4 px-5 items-center rounded-[10px] bg-[#1D2125] w-full h-[53px] overflow-hidden">
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="Enter Your Number"
                      className="w-full bg-transparent text-white font-sans text-sm font-medium placeholder-[rgba(255,255,255,0.50)] border-none outline-none"
                    />
                  </div>
                  <div className="flex py-4 px-5 items-center rounded-[10px] bg-[#1D2125] w-full h-[53px] overflow-hidden">
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-full bg-transparent text-white font-sans text-sm font-medium placeholder-[rgba(255,255,255,0.50)] border-none outline-none"
                    />
                  </div>
                  <div className="flex min-h-[76px] items-center rounded-[10px] bg-[#1D2125] w-full h-[100px] overflow-hidden">
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Enter Your Massage"
                      rows={3}
                      className="w-full py-4 px-5 bg-transparent text-white font-sans text-sm font-medium placeholder-[rgba(255,255,255,0.50)] border-none outline-none resize-none"
                    />
                  </div>
                  <button className="flex py-3.5 px-6 justify-center items-center gap-2 rounded-lg bg-[#FFF] hover:bg-[#EAEAEA] transition-colors cursor-pointer w-full h-[52px] border-none mt-2">
                    <span className="text-[#171717] font-sans text-lg font-semibold leading-5">
                      Send Massage
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 w-6 h-6 overflow-hidden relative"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.352 3.95203C12.5771 3.727 12.8823 3.60059 13.2005 3.60059C13.5188 3.60059 13.824 3.727 14.049 3.95203L21.249 11.152C21.4737 11.377 21.6 11.682 21.6 12C21.6 12.318 21.4737 12.623 21.249 12.848L14.049 20.048C13.8222 20.2636 13.5201 20.3821 13.2072 20.3782C12.8943 20.3743 12.5953 20.2483 12.374 20.0271C12.1526 19.8059 12.0264 19.5069 12.0223 19.194C12.0182 18.8811 12.1365 18.579 12.352 18.352L17.504 13.2H3.60002C3.28176 13.2 2.97654 13.0736 2.7515 12.8486C2.52645 12.6235 2.40002 12.3183 2.40002 12C2.40002 11.6818 2.52645 11.3765 2.7515 11.1515C2.97654 10.9265 3.28176 10.8 3.60002 10.8H17.504L12.352 5.64803C12.1273 5.42303 12.0011 5.11803 12.0011 4.80003C12.0011 4.48203 12.1273 4.17703 12.352 3.95203Z"
                        fill="#171717"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
