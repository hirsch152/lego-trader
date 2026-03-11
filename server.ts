import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("lego_trader.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    condition TEXT NOT NULL,
    image_url TEXT,
    contact_info TEXT NOT NULL,
    set_number TEXT,
    trade_availability TEXT,
    has_box INTEGER DEFAULT 0,
    has_instructions INTEGER DEFAULT 0,
    is_complete INTEGER DEFAULT 0,
    piece_count INTEGER,
    year_released INTEGER,
    watching_count INTEGER DEFAULT 0,
    is_verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get("/api/listings", (req, res) => {
    const { category, search } = req.query;
    let query = "SELECT * FROM listings";
    const params: any[] = [];

    if (category || search) {
      query += " WHERE";
      const conditions = [];
      if (category) {
        conditions.push(" category = ?");
        params.push(category);
      }
      if (search) {
        conditions.push(" (title LIKE ? OR description LIKE ?)");
        params.push(`%${search}%`, `%${search}%`);
      }
      query += conditions.join(" AND");
    }

    query += " ORDER BY created_at DESC";
    const listings = db.prepare(query).all(...params);
    res.json(listings);
  });

  app.get("/api/listings/:id", (req, res) => {
    const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(req.params.id);
    if (listing) {
      res.json(listing);
    } else {
      res.status(404).json({ error: "Listing not found" });
    }
  });

  app.post("/api/listings", (req, res) => {
    const { 
      title, description, price, category, condition, image_url, contact_info, 
      set_number, trade_availability, has_box, has_instructions, is_complete, 
      piece_count, year_released, watching_count, is_verified 
    } = req.body;
    
    if (!title || !description || !price || !category || !condition || !contact_info) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const info = db.prepare(`
      INSERT INTO listings (
        title, description, price, category, condition, image_url, contact_info, 
        set_number, trade_availability, has_box, has_instructions, is_complete, 
        piece_count, year_released, watching_count, is_verified
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, description, price, category, condition, image_url, contact_info, 
      set_number, trade_availability, 
      has_box ? 1 : 0, 
      has_instructions ? 1 : 0, 
      is_complete ? 1 : 0, 
      piece_count, year_released, 
      watching_count || Math.floor(Math.random() * 20) + 1,
      is_verified ? 1 : 0
    );

    res.status(201).json({ id: info.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
