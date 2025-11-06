import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Users } from 'lucide-react';
import { Button } from './ui/button';
import ReviewCard from './ReviewCard';
import chromeIcon from '@/assets/chrome-extension-icon.png';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SIGNUP_URL } from '@/config/domains';

const ReviewsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const reviews = [
    {
      name: "Moustapha A.",
      title: "CEO & Co-founder",
      company: "Small-Business (50 or fewer emp.)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Amazing SaaS! Amazing customer service. It is extremely simple to use and perfectly efficient. Extracting a database from LinkedIn Sales Navigator has never been easier.",
      source: 'g2' as const,
      date: "Jun 7, 2024"
    },
    {
      name: "Oscar Goodwin-Monteagudo",
      title: "Sales Manager",
      company: "Mid-Market Company",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Ease of use is super straightforward! Everything I need. Great tool for a sales person! Thank you. Have recommended to my team.",
      source: 'chrome_web_store' as const,
      date: "Jul 22, 2024"
    },
    {
      name: "Phil Lotter",
      title: "Business Development Lead",
      company: "Enterprise",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Great tool to use in business development to get info from LinkedIn Leads to your CRM system. Also like the safe email option which means better delivery rates.",
      source: 'chrome_web_store' as const,
      date: "Jun 12, 2024"
    },
    {
      name: "Zach Ledner",
      title: "Director of Partnerships at Voxel",
      company: "Tech Startup",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Daddy Leads is the only company I could find that easily enables users to quickly export sales nav leads to excel. The exported data also includes LinkedIn profile headlines and summaries which is a HUGE help. Would absolutely recommend.",
      source: 'chrome_web_store' as const,
      date: "Apr 19, 2024"
    },
    {
      name: "Mounika P.",
      title: "Digital Marketing Analyst",
      company: "Small-Business (50 or fewer emp.)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "I can extract all the leads from sales navigator along with verified emails all at once. This cuts a lot of time and effort. I can integrate with my Sales navigator with just 1 click. Also I can use credits as per my requirements as many times I want.",
      source: 'g2' as const,
      date: "Dec 29, 2024"
    },
    {
      name: "Sadashiv Borgaonkar",
      title: "Sales Operations Manager",
      company: "Enterprise",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "I have been using Daddy Leads since its launch date. Initially, the tool was not very effective in obtaining accurate emails. However, it has significantly improved. It is 100% reliable and safe. Use it without any hesitation.",
      source: 'chrome_web_store' as const,
      date: "Sep 15, 2024"
    },
    {
      name: "Chris Radvansky",
      title: "Business Development",
      company: "Tech Company",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Easy to use and great tool to have! Not too costly either. Highly recommend for lead generation.",
      source: 'chrome_web_store' as const,
      date: "Jul 17, 2024"
    },
    {
      name: "Richard Parmar",
      title: "Sales Director",
      company: "Mid-Market",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "One of the best tools to download lists out of LinkedIn Sales Navigator. Very satisfied with the experience.",
      source: 'chrome_web_store' as const,
      date: "Jul 7, 2024"
    },
    {
      name: "Caroline Forest",
      title: "Business Development Manager",
      company: "Small Business",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "Must-have tool for anyone in business development or sales for prospecting. Easy to use and the quality of the information is quite good. They are even flexible for small users like me. I highly recommend.",
      source: 'chrome_web_store' as const,
      date: "May 30, 2024"
    },
    {
      name: "Matt R.",
      title: "International Go To Market Consultant",
      company: "Small-Business (50 or fewer emp.)",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=faces",
      rating: 5,
      review: "I've used dozens of LI scrapers, but they all have a major issue. Daddy Leads has finally figured it out by not trusting LinkedIn blindly. You scrape your Sales Nav search and Daddy Leads cleans up your search results. Daddy Leads is the first scraper that builds lists I can trust.",
      source: 'g2' as const,
      date: "Jan 11, 2024"
    }
  ];

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFE5D9] via-[#FFD4C4] to-[#FFBFA9]" style={{ paddingBottom: '0px' }}>
      {/* Top curved edge - transitioning from black */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          className="relative block w-full h-[100px] md:h-[120px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
            fill="#000000"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Loved by{' '}
            </span>
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C42] to-[#FFA07A] bg-clip-text text-transparent">
              10,000+
            </span>
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {' '}Sales Professionals
            </span>
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            See what our customers have to say about their experience with Daddy Leads
          </p>
        </motion.div>

        {/* Scrolling Reviews */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <style>
            {`
              @keyframes scroll-reviews {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-33.333%);
                }
              }
              
              .animate-scroll-reviews {
                animation: scroll-reviews 60s linear infinite;
              }
              
              .animate-scroll-reviews.paused {
                animation-play-state: paused;
              }
              
              @media (prefers-reduced-motion: reduce) {
                .animate-scroll-reviews {
                  animation: none;
                }
              }
            `}
          </style>
          
          <div className={`flex gap-6 animate-scroll-reviews ${isPaused ? 'paused' : ''}`}>
            {duplicatedReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>

        {/* Safe, GDPR, Scalable Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-12 px-6">
            {/* Safe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="relative animate-icon-float">
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-lg animate-pulse-glow">
                    <Shield className="w-16 h-16 text-[#6366F1]" strokeWidth={2} />
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6, type: "spring" }}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-[#6366F1] rounded-full flex items-center justify-center shadow-lg animate-badge-bounce"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Safe</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Make sure your account never goes above the scraping limitations set by LinkedIn.
              </p>
            </motion.div>

            {/* GDPR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="relative animate-icon-float" style={{ animationDelay: '0.5s' }}>
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-lg animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                    <FileCheck className="w-16 h-16 text-[#6366F1]" strokeWidth={2} />
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                      className="absolute top-4 right-4 w-10 h-10 bg-[#6366F1] rounded-full flex items-center justify-center shadow-lg animate-badge-bounce"
                      style={{ animationDelay: '0.3s' }}
                    >
                      <Shield className="w-5 h-5 text-white" strokeWidth={3} />
                    </motion.div>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">GDPR</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Make your lead generation process GDPR compliant without effort.
              </p>
            </motion.div>

            {/* Scalable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="relative animate-icon-float" style={{ animationDelay: '1s' }}>
                  <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-lg animate-pulse-glow" style={{ animationDelay: '1s' }}>
                    <Users className="w-16 h-16 text-[#6366F1]" strokeWidth={2} />
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
                      className="absolute top-3 right-3 w-8 h-8 bg-[#6366F1] rounded-full flex items-center justify-center shadow-lg animate-badge-bounce"
                      style={{ animationDelay: '0.6s' }}
                    >
                      <span className="text-white text-xs font-bold">3+</span>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.9, type: "spring" }}
                      className="absolute bottom-3 right-3 w-6 h-6 bg-[#6366F1] rounded-full flex items-center justify-center shadow-lg animate-badge-bounce"
                      style={{ animationDelay: '0.9s' }}
                    >
                      <Shield className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Scalable</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Connect all your Sales Navigator accounts and collaborate with your team.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Cookie Handler Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 max-w-2xl mx-auto px-6 mb-4"
        >
          {/* Main Card */}
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl px-8 py-12 shadow-2xl overflow-hidden border border-white/20">
            {/* Animated Stars Background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a 
                  href="https://chromewebstore.google.com/detail/share-your-cookies/poijkganimmndbhghgkmnfgpiejmlpke?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    className="relative bg-white text-[#5B21B6] hover:bg-white/95 px-10 py-6 text-lg font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                    style={{
                      boxShadow: '0 8px 0 #d1d5db, 0 12px 25px rgba(91, 33, 182, 0.3)',
                      transform: 'translateY(0px)',
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'translateY(4px)';
                      e.currentTarget.style.boxShadow = '0 4px 0 #d1d5db, 0 8px 15px rgba(91, 33, 182, 0.25)';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '0 8px 0 #d1d5db, 0 12px 25px rgba(91, 33, 182, 0.3)';
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 0 #d1d5db, 0 16px 30px rgba(91, 33, 182, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '0 8px 0 #d1d5db, 0 12px 25px rgba(91, 33, 182, 0.3)';
                    }}
                  >
                    Download Cookie Handler Extension
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-6xl mx-auto px-6 mb-20"
        >
          <div className="bg-gradient-to-br from-white/50 via-blue-50/40 to-purple-50/30 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Title Section */}
              <div className="lg:col-span-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              {/* FAQ Accordion */}
              <div className="lg:col-span-8">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem
                    value="item-0"
                    className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/60 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        How does the LinkedIn scraping process work?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      Our LinkedIn scrapers use advanced automation to extract data from LinkedIn Sales Navigator, LinkedIn profiles, and company pages. Simply provide your search criteria or profile URLs, and our tool will collect names, titles, companies, emails, and other relevant information in minutes. All data is exported in CSV format for easy integration with your CRM.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-1"
                    className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/60 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        Do you provide emails for all the leads that you scrape?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      Yes! Our Email Enricher automatically finds and verifies professional email addresses for the leads we scrape. We use multiple data sources and verification methods to ensure high accuracy rates (95%+). If an email isn't available in our database, we use advanced algorithms to generate and verify potential email addresses.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/60 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        What is the difference between Email Enricher and Email Verifier?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      Email Enricher finds missing email addresses for your leads by searching across multiple databases and using intelligent email pattern matching. Email Verifier checks if existing email addresses are valid, deliverable, and active by performing real-time verification checks including syntax validation, domain verification, and mailbox confirmation.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-3"
                    className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/60 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        Can I scrape data from Apollo, ZoomInfo, and other B2B databases?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      Absolutely! We offer specialized scrapers for Apollo, ZoomInfo, Crunchbase, and other major B2B databases. These scrapers can extract company information, contact details, funding data, and technographic information. You can use filters to target specific industries, company sizes, locations, and more.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-4"
                    className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/60 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        How long does it take to complete a scraping request?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      Processing time depends on the size of your request. Small batches (up to 500 leads) typically complete in 5-15 minutes. Medium batches (500-2,000 leads) take 30-60 minutes. Large requests (2,000+ leads) may take 2-4 hours. You'll receive an email notification when your data is ready for download.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-5"
                    className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/60 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        Is the data scraping compliant with LinkedIn's terms of service?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      We prioritize ethical data collection practices. Our tools are designed for legitimate business purposes such as lead generation, market research, and recruitment. We recommend users review and comply with LinkedIn's terms of service and applicable data protection regulations (GDPR, CCPA) in their jurisdiction. Users are responsible for how they use the collected data.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-6"
                    className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-white/60 transition-colors">
                      <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                        What file formats do you support for data export and import?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 pt-2 text-gray-700 leading-relaxed">
                      We support CSV (Comma Separated Values) and Excel (XLSX) formats for both import and export. You can upload your existing lead lists for enrichment or verification, and download the processed results in your preferred format. Our CSV files are compatible with all major CRM systems including Salesforce, HubSpot, Pipedrive, and more.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center px-6"
        >
          <a href={SIGNUP_URL}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#6713e1] via-[#8b5cf6] to-[#a78bfa] text-white hover:from-[#5a0fc9] hover:via-[#7c3aed] hover:to-[#9178ed] px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-[0_20px_50px_rgba(103,19,225,0.4)] hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Button>
          </a>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex justify-center gap-8 px-6"
        >
          <a
            href="https://wa.link/vryx6n"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 transition-transform hover:scale-110 duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-2xl">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">WhatsApp</span>
          </a>
          
          <a
            href="https://t.me/daddyleadss"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 transition-transform hover:scale-110 duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-[#0088cc] hover:bg-[#0077b5] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-2xl">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">Telegram</span>
          </a>
          
          <a
            href="https://discord.gg/n977c57Wee"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 transition-transform hover:scale-110 duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-[#5865F2] hover:bg-[#4752C4] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-2xl">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">Discord</span>
          </a>
        </motion.div>

        {/* For Demo Connect Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 mb-16 flex justify-center px-6"
        >
          <Button 
            variant="outline"
            size="lg" 
            className="border-2 border-[#6713e1] text-[#6713e1] hover:bg-[#6713e1] hover:text-white px-10 py-5 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-default"
          >
            For Demo Connect
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;

