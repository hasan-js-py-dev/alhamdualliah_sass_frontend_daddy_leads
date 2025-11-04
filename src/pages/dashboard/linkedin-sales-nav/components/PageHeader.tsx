import { Button } from "@/components/ui/button";
import { Plus, Cookie } from "lucide-react";

interface PageHeaderProps {
  onLinkedInCookieClick?: () => void;
  onNewExportClick?: () => void;
}

export function PageHeader({ onLinkedInCookieClick, onNewExportClick }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-2xl">⚡</span>
        </div>
        <h1 className="text-3xl font-bold">Sales Navigator Export</h1>
      </div>
      
      <div className="flex gap-3">
        <Button 
          className="gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 border-0"
          onClick={onLinkedInCookieClick}
        >
          <Cookie className="h-4 w-4" />
          LinkedIn Cookie
        </Button>
        <Button 
          className="gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 border-0"
          onClick={onNewExportClick}
        >
          <Plus className="h-4 w-4" />
          New Export
        </Button>
      </div>
    </div>
  );
}
