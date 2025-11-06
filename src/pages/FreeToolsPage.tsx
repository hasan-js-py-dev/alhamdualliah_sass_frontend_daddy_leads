import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

const FreeToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>Free Tools — Daddy Leads | Coming Soon</title>
        <meta name="description" content="Free B2B lead generation tools coming soon to Daddy Leads" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0b2e] to-[#2d1154]">
        <Navbar />
        
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-2xl">
                  <Wrench className="w-12 h-12 text-white" />
                </div>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
                Free Tools
              </h1>
              
              <p className="text-3xl font-semibold text-white/90">
                Coming Soon
              </p>
              
              <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                We're working hard to bring you powerful free tools for B2B lead generation. 
                Stay tuned for exciting features that will help you grow your business!
              </p>

              <div className="pt-8">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.location.href = '/'}
                >
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FreeToolsPage;
