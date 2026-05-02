# 🌟 BrightFlix — MERN Stack E-Commerce Website

**Premium Home Appliances for Modern India**  
Built with: MongoDB · Express.js · React.js · Node.js

---

## 🎬 Features
- **Intro Video Animation** — Plays on first page load, auto-fades into homepage
- **Exact Theme Match** — Orange (#F47F1F) + Yellow (#FFD700) + White, dot patterns, matching layout
- **Navbar** — Logo, nav links (Home, Products, About, Services, Contact Us), Search, Cart, User icons
- **Hero Slider** — Auto-rotating with arrows and dot indicators
- **Categories Grid** — 8 appliance categories
- **Products Grid** — With badges, ratings, prices, discounts, Add to Cart
- **Offer Banner** — Sale section with gradient background
- **Testimonials** — Customer reviews section
- **Full Footer** — Links, contact info, social icons
- **Products Page** — Category filter sidebar, price range slider, search, sort
- **Product Detail** — Full detail page with qty selector
- **Auth** — Register/Login with JWT
- **Cart** — Context-based cart with count badge
- **All Pages** — Home, Products, ProductDetail, About, Services, Contact, Cart, Login

---

## 📁 Project Structure
```
brightflix/
├── server/                  # Express + MongoDB backend
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── auth.js
│   │   └── cart.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   │   └── intro-video.mp4  ← PUT YOUR VIDEO HERE
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js + .css
│   │   │   ├── Footer.js + .css
│   │   │   ├── ProductCard.js + .css
│   │   │   └── VideoIntro.js + .css
│   │   ├── pages/
│   │   │   ├── Home.js + .css
│   │   │   ├── Products.js + .css
│   │   │   ├── ProductDetail.js
│   │   │   ├── About.js + .css
│   │   │   ├── Services.js
│   │   │   ├── Contact.js
│   │   │   ├── Cart.js
│   │   │   └── Login.js + .css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── package.json             # Root — run both together
└── README.md
```

---

## 🚀 Setup & Run

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Step 1: Add Your Video
Copy your `Brightflix-Intro.mp4` to:
```
client/public/intro-video.mp4
```

### Step 2: Install Dependencies
```bash
# Install backend
cd server
npm install

# Install frontend
cd ../client
npm install

# Or from root (requires concurrently):
npm install
npm run install-all
```

### Step 3: Configure Environment
Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/brightflix
JWT_SECRET=your_secret_key
```

For MongoDB Atlas:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/brightflix
```

### Step 4: Seed Sample Products (optional)
```bash
curl -X POST http://localhost:5000/api/products/seed
```

### Step 5: Run
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm start
```

Or from root with concurrently:
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🎨 Theme Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Orange | `#F47F1F` | Buttons, accents, active states |
| Primary Dark | `#D96B00` | Hover states |
| Yellow | `#FFD700` | Logo gradient, highlights |
| Off White | `#FFF8F0` | Backgrounds |
| Text Dark | `#1A1A1A` | Headings |

---

## 📺 Video Intro
- Place `intro-video.mp4` in `client/public/`
- The video plays automatically on first visit (muted, fullscreen)
- Skip button available bottom-right
- After video ends (or is skipped), fades into homepage
- Session-based: won't replay on page navigation (only on fresh browser visit)

---

## 🔌 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| POST | `/api/products/seed` | Seed sample data |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get profile (auth) |
| GET | `/api/cart` | Get cart (auth) |
| POST | `/api/cart/add` | Add to cart (auth) |
| DELETE | `/api/cart/:id` | Remove from cart (auth) |

---

Made with ❤️ for BrightFlix — BharatSolarNetworkLimited
