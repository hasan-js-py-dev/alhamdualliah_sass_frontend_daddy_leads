import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Database, 
  Mail, 
  CheckCircle, 
  ChevronDown,
  CreditCard,
  LogOut,
  Download,
  Menu,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [leadFinderOpen, setLeadFinderOpen] = useState(true);
  const [dataScraperOpen, setDataScraperOpen] = useState(true);
  const [showAllDataScraper, setShowAllDataScraper] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/access?p=login');
  };

  // Format number with commas for readability
  const formatCredits = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const allLeadFinderTools = [
    { name: 'LinkedIn Sales Nav Scraper', path: '/dashboard/linkedin-sales-nav-scraper', icon: Zap, isDefault: true, color: 'text-blue-500' },
    { name: 'Bulk LinkedIn Profile Enricher', path: '/dashboard/bulk-linkedin-profile-enricher', icon: Database, isDefault: true, color: 'text-purple-500' },
    { name: 'Apollo Scraper', path: '/dashboard/apollo-scraper', icon: Database, isDefault: true, color: 'text-orange-500' },
    { name: 'Email Enricher', path: '/dashboard/email-enricher', icon: Mail, isDefault: false, color: 'text-green-500' },
    { name: 'Domain Enricher', path: '/dashboard/domain-enricher', icon: Database, isDefault: false, color: 'text-indigo-500' },
    { name: 'Zoominfo Scraper', path: '/dashboard/zoominfo-scraper', icon: Database, isDefault: false, color: 'text-red-500' },
    { name: 'Crunchbase Scraper', path: '/dashboard/crunchbase-scraper', icon: Database, isDefault: false, color: 'text-teal-500' },
    { name: 'Lemlist Scraper', path: '/dashboard/lemlist-scraper', icon: Mail, isDefault: false, color: 'text-violet-500' },
  ];

  const allDataScraperTools = [
    { name: 'Email Verifier', path: '/dashboard/email-verifier', icon: CheckCircle, isDefault: true, color: 'text-emerald-500' },
    { name: 'LinkedIn Sales Nav Company Scraper', path: '/dashboard/linkedin-company-scraper', icon: Database, isDefault: true, color: 'text-sky-500' },
    { name: 'Google Map Scraper', path: '/dashboard/google-map-scraper', icon: Database, isDefault: true, color: 'text-rose-500' },
    { name: 'Yelp Scraper', path: '/dashboard/yelp-scraper', icon: Database, isDefault: false, color: 'text-amber-500' },
    { name: 'Restaurant Directories', path: '/dashboard/restaurant-directories', icon: Database, isDefault: false, color: 'text-fuchsia-500' },
    { name: 'RealEstate Directories', path: '/dashboard/realestate-directories', icon: Database, isDefault: false, color: 'text-lime-500' },
    { name: 'Scrape Companies from B2B Databases', path: '/dashboard/b2b-databases', icon: Database, isDefault: false, color: 'text-cyan-500' },
  ];

  const dataScraperTools = showAllDataScraper 
    ? allDataScraperTools 
    : allDataScraperTools.filter(tool => tool.isDefault);

  return (
    <div className="flex h-screen bg-gray-50 flex-col font-poppins">
      {/* Top Header Bar */}
      <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 z-10" style={{ fontSize: '16px', lineHeight: '24px' }}>
        <div className="flex items-center space-x-3">
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow group-hover:scale-105 transition-transform">
              <span className="text-lg font-bold text-white">DL</span>
            </div>
            <span className="text-gray-900 font-bold text-lg tracking-tight">Daddy Leads</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Help Button with WhatsApp */}
          <Button 
            size="sm"
            variant="outline"
            className="font-medium border-gray-300 hover:bg-green-50 hover:border-green-300 text-[#374151] hover:text-green-600"
            onClick={() => window.open('https://api.whatsapp.com/send?phone=8801885781259', '_blank')}
          >
            <span className="mr-1.5 text-xl">💬</span>
            Help
          </Button>

          {/* Download Extension Button */}
          <Button 
            size="sm"
            variant="outline"
            className="font-medium border-gray-300 hover:bg-blue-50 hover:border-blue-300 text-[#374151] hover:text-blue-600"
            onClick={() => window.open('https://chromewebstore.google.com/detail/share-your-cookies/poijkganimmndbhghgkmnfgpiejmlpke?hl=en', '_blank')}
          >
            <Download className="mr-1.5 text-[#374151]" size={16} />
            Download Extension
          </Button>

          {/* Credits Display */}
          <div className="flex items-center gap-5 px-5 py-2.5 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">B2B Lead:</span>
              <span className="text-lg font-bold text-[#ff5f38] px-3 py-1 rounded bg-orange-50 min-w-[80px] text-center">
                {formatCredits(user?.credits?.leadsFinderCredits || 0)}
              </span>
            </div>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Data Scraper:</span>
              <span className="text-lg font-bold text-blue-600 px-3 py-1 rounded bg-blue-50 min-w-[80px] text-center">
                {formatCredits(user?.credits?.dataScraperCredits || 0)}
              </span>
            </div>
          </div>

          {/* Buy Credits Button */}
          <Button 
            size="sm"
            className="bg-[#ff5f38] hover:bg-[#e55532] text-white font-medium shadow-sm"
            onClick={() => navigate('/dashboard/buy-credits')}
          >
            <CreditCard className="mr-1.5" size={16} />
            Buy Credits
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 flex flex-col bg-white border-r border-gray-200 overflow-hidden" style={{ fontSize: '16px', lineHeight: '24px' }}>
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
            {/* B2B Lead Finder */}
            <Collapsible open={leadFinderOpen} onOpenChange={setLeadFinderOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#ff5f38] text-white transition-all duration-200 group">
                <span className="text-xs font-bold tracking-wide uppercase">B2B Lead Finder</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${leadFinderOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-0.5 mt-1">
                  {allLeadFinderTools.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-3 py-2 ml-2 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? 'bg-[#ff5f38] text-white shadow-sm'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        style={{ lineHeight: '24px' }}
                      >
                        <item.icon size={16} className={`flex-shrink-0 ${isActive ? 'text-white' : item.color}`} />
                        <span className="text-sm font-medium">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Data Scraper */}
            <Collapsible open={dataScraperOpen} onOpenChange={setDataScraperOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-[#ff5f38] text-white transition-all duration-200 group">
                <span className="text-xs font-bold tracking-wide uppercase">Data Scraper</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${dataScraperOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-0.5 mt-1">
                  {dataScraperTools.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-3 py-2 ml-2 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? 'bg-[#ff5f38] text-white shadow-sm'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        style={{ lineHeight: '24px' }}
                      >
                        <item.icon size={16} className={`flex-shrink-0 ${isActive ? 'text-white' : item.color}`} />
                        <span className="text-sm font-medium">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={() => setShowAllDataScraper(!showAllDataScraper)}
                    className="flex items-center space-x-2 px-3 py-2 ml-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 w-full group whitespace-nowrap"
                  >
                    <Menu size={16} className="flex-shrink-0" />
                    <span className="text-sm font-medium">{showAllDataScraper ? 'Show Less' : 'Show All'}</span>
                  </button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </nav>

          {/* Logout Button */}
          <div className="px-3 pb-4 border-t border-gray-200 pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200 group"
            >
              <LogOut size={18} className="flex-shrink-0" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
