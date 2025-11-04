export interface Export {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  name: string;
  file: string;
  leads: number;
  emails: number;
  url: string;
  date: string;
}
