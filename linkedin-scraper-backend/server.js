import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'linkedin-scraper-backend' });
});

// Routes
app.use('/api/scraper', (req, res) => {
  res.json({ message: 'LinkedIn Scraper API' });
});

app.listen(PORT, () => {
  console.log(`LinkedIn Scraper Backend running on port ${PORT}`);
});
