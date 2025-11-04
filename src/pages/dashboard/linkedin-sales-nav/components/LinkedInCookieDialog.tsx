import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Minimize2, Save, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { scraperService } from "@/services/scraperService";

interface LinkedInCookieDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMinimize?: () => void;
}

export function LinkedInCookieDialog({ open, onOpenChange, onMinimize }: LinkedInCookieDialogProps) {
  const [cookie, setCookie] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveCookie = async () => {
    if (!cookie.trim()) {
      toast({
        title: "Cookie is required",
        description: "Please paste your LinkedIn cookie",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const result = await scraperService.saveCookie(cookie);

      if (result.success) {
        toast({
          title: "Cookie saved",
          description: "LinkedIn cookie has been saved successfully",
        });
        setCookie("");
        onOpenChange(false);
      } else {
        toast({
          title: "Failed to save cookie",
          description: result.message || "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save cookie. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
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
            disabled={isSaving}
            className="w-full h-12 text-base gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 border-0 disabled:opacity-50"
            size="lg"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Cookie
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
