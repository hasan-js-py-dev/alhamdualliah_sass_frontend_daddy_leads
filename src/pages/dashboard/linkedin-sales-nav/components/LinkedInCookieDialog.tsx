import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Minimize2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LinkedInCookieDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMinimize?: () => void;
}

export function LinkedInCookieDialog({ open, onOpenChange, onMinimize }: LinkedInCookieDialogProps) {
  const [cookie, setCookie] = useState("");

  const handleSaveCookie = () => {
    if (!cookie.trim()) {
      toast({
        title: "Cookie is required",
        description: "Please paste your LinkedIn cookie",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement cookie save logic
    toast({
      title: "Cookie saved",
      description: "LinkedIn cookie has been saved successfully",
    });

    setCookie("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="relative">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">LinkedIn Cookie</DialogTitle>
              <DialogDescription>
                Paste your LinkedIn cookie to authenticate the scraper
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
            <Label htmlFor="cookie" className="text-base">
              Cookie Value <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="cookie"
              placeholder="li_at=xxxxxxxxxxxxx; JSESSIONID=xxxxxxxxxxxxx..."
              value={cookie}
              onChange={(e) => setCookie(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              To get your cookie, open LinkedIn in your browser, press F12, go to Application → Cookies, and copy the li_at value
            </p>
          </div>

          <Button
            onClick={handleSaveCookie}
            className="w-full h-12 text-base gap-2 bg-[#FFDBCC] text-black hover:bg-[#FFDBCC]/90"
            size="lg"
          >
            <Save className="h-5 w-5" />
            Save Cookie
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
