import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "../components/DashboardLayout";
import { PageHeader } from "./components/PageHeader";
import { ExportsTable } from "./components/ExportsTable";
import { Export } from "./types";
import { mockExports } from "./data/mockExports";

export default function LinkedInSalesNavPage() {
  const [exports] = useState<Export[]>(mockExports);

  const handleLinkedInCookieClick = () => {
    // TODO: Implement LinkedIn cookie dialog
    console.log("LinkedIn Cookie clicked");
  };

  const handleNewExportClick = () => {
    // TODO: Implement new export dialog
    console.log("New Export clicked");
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Sales Navigator Export - Daddy Leads</title>
        <meta name="description" content="LinkedIn Sales Navigator scraper and export management" />
      </Helmet>

      <div className="space-y-6">
        <PageHeader 
          onLinkedInCookieClick={handleLinkedInCookieClick}
          onNewExportClick={handleNewExportClick}
        />
        <ExportsTable exports={exports} />
      </div>
    </DashboardLayout>
  );
}
