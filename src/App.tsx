import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./pages/dashboard/components/ProtectedRoute";
import { DomainRedirect } from "./components/DomainRedirect";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import PricingPage from "./pages/PricingPage";
import ConnectPage from "./pages/ConnectPage";
import AccessPage from "./pages/AccessPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LinkedInSalesNavPage from "./pages/dashboard/linkedin-sales-nav/LinkedInSalesNavPage";
import BuyCreditsPage from "./pages/dashboard/BuyCreditsPage";
import ComingSoonPage from "./pages/dashboard/ComingSoonPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>
              {/* Public Marketing Routes - Only on main domain */}
              <Route path="/" element={<DomainRedirect type="marketing"><HomePage /></DomainRedirect>} />
              <Route path="/product" element={<DomainRedirect type="marketing"><ProductPage /></DomainRedirect>} />
              <Route path="/pricing" element={<DomainRedirect type="marketing"><PricingPage /></DomainRedirect>} />
              <Route path="/connect" element={<DomainRedirect type="marketing"><ConnectPage /></DomainRedirect>} />
              
              {/* Auth Routes - Only on app subdomain */}
              <Route path="/access" element={<DomainRedirect type="app"><AccessPage /></DomainRedirect>} />
              <Route path="/verify-email" element={<DomainRedirect type="app"><VerifyEmailPage /></DomainRedirect>} />
              
              {/* Protected Dashboard Routes - Only on app subdomain */}
              <Route 
                path="/dashboard" 
                element={
                  <DomainRedirect type="app">
                    <ProtectedRoute>
                      <DashboardHomePage />
                    </ProtectedRoute>
                  </DomainRedirect>
                } 
              />
            <Route 
              path="/dashboard/sales-navigator" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/buy-credits" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <BuyCreditsPage />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/url-enrichment"
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="URL Enrichment" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/email-finder" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Email Finder" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/email-verifier" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Email Verifier" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/credits" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Credits" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/team" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Team" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/api" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="API" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/account" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Account" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />

            {/* B2B Lead Finder Products */}
            <Route 
              path="/dashboard/linkedin-sales-nav-scraper" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <LinkedInSalesNavPage />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/email-enricher" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Email Enricher" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/domain-enricher" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Domain Enricher" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/bulk-linkedin-profile-enricher" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Bulk LinkedIn Profile Enricher" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/apollo-scraper" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Apollo Scraper" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/zoominfo-scraper" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Zoominfo Scraper" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/crunchbase-scraper" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Crunchbase Scraper" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/lemlist-scraper" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Lemlist Scraper" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />

            {/* Data Scraper Products */}
            <Route 
              path="/dashboard/linkedin-company-scraper" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="LinkedIn Sales Nav Company Scraper" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/yelp-scraper" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Yelp Scraper" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/google-map-scraper" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Google Map Scraper" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/restaurant-directories" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Restaurant Directories" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/realestate-directories" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="RealEstate Directories" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/b2b-databases" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Scrape Companies from B2B Databases" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
  </QueryClientProvider>
);

export default App;
