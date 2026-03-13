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
    city TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Add initial mock data if table is empty
const count = db.prepare("SELECT COUNT(*) as count FROM listings").get() as { count: number };
if (count.count === 0) {
  const mockListings = [
    {
      title: "Star Wars Millennium Falcon (75192)",
      description: "Ultimate Collector Series. Complete with all pieces and box.",
      price: 850,
      category: "Star Wars",
      condition: "Like New",
      image_url: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800",
      contact_info: "masterbuilder@example.com",
      set_number: "75192",
      trade_availability: "Available for Trade",
      has_box: 1,
      has_instructions: 1,
      is_complete: 1,
      piece_count: 7541,
      year_released: 2017,
      watching_count: 24,
      is_verified: 1,
      city: "London, UK"
    },
    {
      title: "Technic Lamborghini Sián FKP 37",
      description: "Beautiful display piece. Built once and displayed.",
      price: 320,
      category: "Technic",
      condition: "Excellent",
      image_url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800",
      contact_info: "speedster@example.com",
      set_number: "42115",
      trade_availability: "Trade + Cash",
      has_box: 1,
      has_instructions: 1,
      is_complete: 1,
      piece_count: 3696,
      year_released: 2020,
      watching_count: 12,
      is_verified: 0,
      city: "New York, US"
    },
    {
      title: "Ninjago City Gardens",
      description: "Massive set with tons of minifigures. Sealed in box.",
      price: 350,
      category: "Ninjago",
      condition: "New (Sealed)",
      image_url: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800",
      contact_info: "ninja_fan@example.com",
      set_number: "71741",
      trade_availability: "For Sale Only",
      has_box: 1,
      has_instructions: 1,
      is_complete: 1,
      piece_count: 5685,
      year_released: 2021,
      watching_count: 45,
      is_verified: 1,
      city: "London, UK"
    }
  ];

  const insert = db.prepare(`
    INSERT INTO listings (
      title, description, price, category, condition, image_url, contact_info, 
      set_number, trade_availability, has_box, has_instructions, is_complete, 
      piece_count, year_released, watching_count, is_verified, city
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const l of mockListings) {
    insert.run(
      l.title, l.description, l.price, l.category, l.condition, l.image_url, l.contact_info,
      l.set_number, l.trade_availability, l.has_box, l.has_instructions, l.is_complete,
      l.piece_count, l.year_released, l.watching_count, l.is_verified, l.city
    );
  }
}

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
      piece_count, year_released, watching_count, is_verified, city
    } = req.body;
    
    if (!title || !description || !price || !category || !condition || !contact_info) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const info = db.prepare(`
      INSERT INTO listings (
        title, description, price, category, condition, image_url, contact_info, 
        set_number, trade_availability, has_box, has_instructions, is_complete, 
        piece_count, year_released, watching_count, is_verified, city
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, description, price, category, condition, image_url, contact_info, 
      set_number, trade_availability, 
      has_box ? 1 : 0, 
      has_instructions ? 1 : 0, 
      is_complete ? 1 : 0, 
      piece_count, year_released, 
      watching_count || Math.floor(Math.random() * 20) + 1,
      is_verified ? 1 : 0,
      city
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
