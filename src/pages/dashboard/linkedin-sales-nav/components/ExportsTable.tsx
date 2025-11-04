import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Export } from "../types";
import { getStatusColor } from "../utils/getStatusColor";

interface ExportsTableProps {
  exports: Export[];
}

export function ExportsTable({ exports }: ExportsTableProps) {
  return (
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
            exports.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell>
                  <Badge className={getStatusColor(exp.status)}>
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
  );
}
