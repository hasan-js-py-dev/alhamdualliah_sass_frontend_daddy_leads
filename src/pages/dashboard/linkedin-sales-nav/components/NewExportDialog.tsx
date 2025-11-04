import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minimize2, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface NewExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMinimize?: () => void;
}

export function NewExportDialog({ open, onOpenChange, onMinimize }: NewExportDialogProps) {
  const [url, setUrl] = useState("");
  const [listName, setListName] = useState("");

  const handleRunScraper = () => {
    if (!url || !listName) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
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
            onClick={handleRunScraper}
            className="w-full h-12 text-base gap-2 bg-[#FFDBCC] text-black hover:bg-[#FFDBCC]/90"
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
