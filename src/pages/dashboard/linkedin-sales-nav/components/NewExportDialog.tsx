import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minimize2, Play, Cookie } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NewExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMinimize?: () => void;
}

export function NewExportDialog({ open, onOpenChange, onMinimize }: NewExportDialogProps) {
  const [url, setUrl] = useState("");
  const [listName, setListName] = useState("");
  const [cookie, setCookie] = useState("");
  const [isCookieFetched, setIsCookieFetched] = useState(false);

  const handleFetchCookie = () => {
    // TODO: Implement actual cookie fetching logic
    const mockCookie = "li_at=AQEDATxxxxxxxx; JSESSIONID=ajax:xxxxxxxx";
    setCookie(mockCookie);
    setIsCookieFetched(true);
    
    toast({
      title: "Cookie fetched",
      description: "LinkedIn cookie retrieved successfully",
    });
  };

  const handleRunScraper = () => {
    if (!url || !listName) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!isCookieFetched) {
      toast({
        title: "Cookie required",
        description: "Please fetch the cookie before running the scraper",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement scraper logic
    toast({
      title: "Scraper started",
      description: `Starting export for "${listName}"`,
    });

    // Reset form and close
    setUrl("");
    setListName("");
    setCookie("");
    setIsCookieFetched(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="relative">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">New Export</DialogTitle>
              <DialogDescription>
                Enter the LinkedIn Sales Navigator URL and list name to start scraping
              </DialogDescription>
            </div>
            {onMinimize && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMinimize}
                className="absolute right-8 -top-1"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-base">
              Sales Navigator URL <span className="text-destructive">*</span>
            </Label>
            <Input
              id="url"
              placeholder="https://www.linkedin.com/sales/search/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="listName" className="text-base">
              List Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="listName"
              placeholder="e.g., Tech CEOs Q4 2024"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="h-11"
            />
          </div>

          <Button
            onClick={handleFetchCookie}
            className="w-full h-12 text-base gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 border-0"
            size="lg"
          >
            <Cookie className="h-5 w-5" />
            Fetch Cookie
          </Button>

          {isCookieFetched && (
            <div className="space-y-2">
              <Label htmlFor="cookie" className="text-base">
                Fetched Cookie
              </Label>
              <Input
                id="cookie"
                value={cookie}
                onChange={(e) => setCookie(e.target.value)}
                className="h-11 font-mono text-sm"
                readOnly
              />
            </div>
          )}

          <Button
            onClick={handleRunScraper}
            disabled={!isCookieFetched}
            className="w-full h-12 text-base gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            <Play className="h-5 w-5" />
            Run Scraper
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
