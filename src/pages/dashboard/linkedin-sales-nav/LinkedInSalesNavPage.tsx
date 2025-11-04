import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "../components/DashboardLayout";
import { PageHeader } from "./components/PageHeader";
import { ExportsTable } from "./components/ExportsTable";
import { NewExportDialog } from "./components/NewExportDialog";
import { LinkedInCookieDialog } from "./components/LinkedInCookieDialog";
import { Export } from "./types";
import { mockExports } from "./data/mockExports";

export default function LinkedInSalesNavPage() {
  const [exports] = useState<Export[]>(mockExports);
  const [newExportOpen, setNewExportOpen] = useState(false);
  const [cookieDialogOpen, setCookieDialogOpen] = useState(false);

  const handleLinkedInCookieClick = () => {
    setCookieDialogOpen(true);
  };

  const handleNewExportClick = () => {
    setNewExportOpen(true);
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

      <NewExportDialog 
        open={newExportOpen}
        onOpenChange={setNewExportOpen}
      />

      <LinkedInCookieDialog
        open={cookieDialogOpen}
        onOpenChange={setCookieDialogOpen}
      />
    </DashboardLayout>
  );
}
