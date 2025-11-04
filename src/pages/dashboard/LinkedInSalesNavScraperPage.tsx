import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { DashboardLayout } from "./components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Cookie } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Export {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  name: string;
  file: string;
  leads: number;
  emails: number;
  url: string;
  date: string;
}

// Mock data
const mockExports: Export[] = [
  {
    id: "1",
    status: "completed",
    name: "Tech Leads Q4",
    file: "tech-leads-q4.csv",
    leads: 150,
    emails: 142,
    url: "https://linkedin.com/...",
    date: "2024-01-15",
  },
];

export default function LinkedInSalesNavScraperPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [exports] = useState<Export[]>(mockExports);

  const getStatusColor = (status: Export["status"]) => {
    const colors = {
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      completed: "bg-green-500/10 text-green-500 border-green-500/20",
      failed: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return colors[status];
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Sales Navigator Export - Daddy Leads</title>
        <meta name="description" content="LinkedIn Sales Navigator scraper and export management" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold">Sales Navigator Export</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Cookie className="h-4 w-4" />
            LinkedIn Cookie
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Export
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary hover:bg-primary">
                <TableHead className="text-primary-foreground font-semibold">Status</TableHead>
                <TableHead className="text-primary-foreground font-semibold">Name</TableHead>
                <TableHead className="text-primary-foreground font-semibold">File</TableHead>
                <TableHead className="text-primary-foreground font-semibold">Leads</TableHead>
                <TableHead className="text-primary-foreground font-semibold">Emails</TableHead>
                <TableHead className="text-primary-foreground font-semibold">URL</TableHead>
                <TableHead className="text-primary-foreground font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No exports yet. Click "New Export" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                exports
                  .filter((exp) =>
                    exp.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((exp) => (
                    <TableRow key={exp.id}>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(exp.status)}>
                          {exp.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{exp.name}</TableCell>
                      <TableCell className="text-muted-foreground">{exp.file}</TableCell>
                      <TableCell>{exp.leads}</TableCell>
                      <TableCell>{exp.emails}</TableCell>
                      <TableCell>
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate block max-w-[200px]"
                        >
                          {exp.url}
                        </a>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{exp.date}</TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
