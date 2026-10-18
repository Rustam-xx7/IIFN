# IIFN Project Workplan

> **Indian Institute of Fitness & Nutrition (IIFN)**
> Next.js 16 web application — production deployed on Vercel
> Last updated: October 2026

---

## 1. Project Overview

**IIFN** is the official website for the **Indian Institute of Fitness & Nutrition**, a premier online fitness certification and nutrition education institute based in India. The platform serves students, candidates, and administrators across courses including Certified Personal Trainer, Certified Nutritionist & Dietetics, Diploma programs, and Clinical Dietetics.

### Business Contact
- WhatsApp: `+91 7001625285`
- Admin Email: `admin@iifn.com`
- Certificate Verification: https://www.ncbsdskillindia.com/student-result.php

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16.2.9** (App Router) |
| Styling | **TailwindCSS v4** (via `@tailwindcss/postcss`) |
| Database | **Firebase Firestore** |
| Auth | **Firebase Auth** (email/password) |
| File Storage | **Firebase Storage** (legacy) + **Cloudinary CDN** (active) |
| Analytics | **@vercel/analytics** |
| Image Upload API | Cloudinary v2 SDK via server-side API route |
| Deployment | **Vercel** (production) |
| Language | JavaScript (no TypeScript) |
| Font Loading | Google Fonts CDN via `<link>` in `layout.js` (NOT `next/font/google` — see known issues) |

---

## 3. Environment Variables (`.env`)

> These are set in `.env` locally and must be added to Vercel environment variables for deployment.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAeIBmJZJT4CTSoh5FPHQoLzu4SCChFJko
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=iifn-61950.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=iifn-61950
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=iifn-61950.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=677907617490
NEXT_PUBLIC_FIREBASE_APP_ID=1:677907617490:web:7701f00980621898b27f0b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-15D90K3T5W

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=sqqauykx
CLOUDINARY_API_KEY=828574937654187
CLOUDINARY_API_SECRET=vEMGj5F0G9LX9qeB5S7goi9ENr8
CLOUDINARY_URL=cloudinary://828574937654187:vEMGj5F0G9LX9qeB5S7goi9ENr8@sqqauykx
```

---

## 4. Project Structure

```
d:\CODING\IIFN\
├── public/
│   ├── affilations/         ← Partner logos & JPEG images for Partnerships section
│   │   ├── ihfaissa.jpeg
│   │   ├── onlinePlatforms.jpeg
│   │   ├── partnerWith.jpeg
│   │   ├── placementPartner.jpeg
│   │   ├── nsdc.jpeg           ← Added Oct 2026
│   │   ├── iifnposter1.jpeg    ← Added Oct 2026
│   │   ├── MSME-Logo.png.webp
│   │   ├── NSDC-Logo.png.webp
│   │   ├── StartupIndia-Logo.png.webp
│   │   ├── iso-1/2/3.png.webp
│   │   ├── medhavi.png.webp
│   │   ├── rlss.png.webp
│   │   ├── skill-india.png.webp
│   │   └── spfl.png.webp
│   ├── alumni/              ← Logo webps for alumni marquee
│   ├── candidates/          ← Static fallback candidate images (jgym*.jpeg)
│   ├── press/               ← Press/media logo webps
│   ├── poster1.png
│   ├── poster2.png
│   ├── IIFN_Brochure.pdf
│   └── iifn_legal_policies.pdf
├── src/
│   ├── app/
│   │   ├── layout.js            ← Root layout; fonts loaded via Google CDN link tag
│   │   ├── globals.css          ← TailwindCSS v4 theme tokens + custom CSS classes
│   │   ├── page.js              ← Homepage (main landing page)
│   │   ├── about/page.js        ← About IIFN page
│   │   ├── courses/page.js      ← All 4 courses with syllabus, enrollment form
│   │   ├── contact/page.js      ← Contact page
│   │   ├── gym/page.js          ← Physical gym page (Unit 1 & Unit 2)
│   │   ├── dietition/page.js    ← Dietitian profile page (DT. Jewel Roy)
│   │   ├── login/page.js        ← Login with Firebase Auth
│   │   ├── signup/page.js       ← Signup with Firebase Auth
│   │   ├── admin/page.js        ← Admin portal (protected, role: admin)
│   │   └── api/
│   │       └── candidates/upload/route.js  ← Cloudinary upload/delete API handler
│   ├── components/
│   │   ├── Navbar.jsx           ← Responsive navbar with auth state
│   │   ├── Footer.jsx           ← Full footer with links
│   │   ├── AdminSidebar.jsx     ← Sidebar for admin portal
│   │   └── LoadingScreen.jsx    ← Intro loading screen on homepage
│   ├── lib/
│   │   └── firebase.js          ← Firebase app init (db, auth, storage, analytics)
│   └── service/
│       ├── firestore.service.js     ← All Firestore CRUD functions
│       └── firebaseAuth.service.js  ← Firebase Auth (signup, login, logout)
├── .env                     ← Local env variables (gitignored)
├── next.config.mjs
├── package.json
└── workplan.md              ← THIS FILE
```

---

## 5. Pages & Features

### 5.1 Homepage (`/`) — `src/app/page.js`
- **Hero section**: Full-width hero with background image, tagline, CTA buttons
- **Media Marquee**: Auto-scrolling press logos (ANI, Zee5, The Telegraph, etc.)
- **Global Affiliations**: Auto-scrolling affiliation logos marquee
- **How It Works**: 6-step process cards
- **Course Highlights**: 3 featured course cards linking to `/courses`
- **Official Partnerships & Recognitions**: 6 sections (2-column grid), each with:
  - Text title, tag badge, description
  - Partner name badge chips (extracted text keywords)
  - Full image (frameless, rounded)
  - **Sections**: IHFA & ISSA, Work From Home Platforms, Global Partnered Orgs, Placement Partner Gyms, NSDC & Skill India, IIFN Excellence Ecosystem
- **Why Choose IIFN**: 6 feature cards
- **Alumni Brands Marquee**: Partner gym/chain logos
- **Statistics Section**: 15K+ Certified, 94% Placement, 25+ Partners, 4.9/5 Rating
- **Testimonials**: 3 static testimonial cards (scrollable)
- **Certificate Verification**: CTA to NCBSD Skill India portal
- **Candidate Gallery**: 3-row side-scrollable grid of certified professionals with left/right nav buttons
- **Student Reviews**: Dynamically loaded from Firestore (only `approved: true`)
- **Enquiry Form**: Saves to Firestore `enquiry` collection + opens WhatsApp
- **FAQ Accordion**: 4 common questions

### 5.2 Courses (`/courses`) — `src/app/courses/page.js`
**4 courses** with full syllabus:

| Course | Price | Duration |
|---|---|---|
| Certified Personal Trainer | ₹5,999/- | 1–3 Months |
| Certified Nutritionist & Dietetics | ₹5,999/- | 1–3 Months |
| Diploma in Personal Trainer & Dietetics | ₹9,999/- | 2–4 Months |
| Clinical Dietetics (Special Population) | ₹5,999/- | 1–3 Months |

**Online Live Classes Schedule:**
- Saturday: 6:30–8:00 PM
- Sunday: 2:30–5:00 PM
- Live + Recorded | Doubt-Clearing Support | English & Hindi

Each course card has **expandable syllabus** and an **Enroll Now** button that scrolls to the enrollment form.

Enrollment saves to Firestore `enrollment` collection + opens WhatsApp.

### 5.3 Admin Portal (`/admin`) — `src/app/admin/page.js`
- **Protected**: Only accessible with `role: admin` in localStorage session (`iifn_user`)
- **Session check**: `localStorage.getItem("iifn_user")` → JSON parse → check role
- **Admin email**: `admin@iifn.com`

**Tabs:**
| Tab | Collection | Notes |
|---|---|---|
| Enquiries | `enquiry` | Read-only view |
| Enrollments | `enrollment` | Read-only view |
| Reviews | `reviews` | Can approve/reject + delete |
| Users | `users` | Read-only (name/email) |
| Candidates | `candidates` | Upload, view, delete images |

**Candidate Management:**
- Upload image via `POST /api/candidates/upload` → Cloudinary CDN
- Stores `{ name, src (Cloudinary HTTPS URL), publicId, createdAt }` in Firestore
- Delete: calls `DELETE /api/candidates/upload` with `publicId` → Cloudinary destroy + Firestore delete

### 5.4 Dietitian Profile (`/dietition`) — `src/app/dietition/page.js`
- Profile page for **DT. Jewel Roy**
- Showcases credentials, specializations
- Contains testimonials from dietitian clients
- CTA to contact for diet consultations

### 5.5 Gym Page (`/gym`) — `src/app/gym/page.js`
- Physical gym locations (Unit 1 - Gangpur, Unit 2)
- Gym features, membership tiers
- Enquiry form saves to Firestore `enquiry` collection

### 5.6 Other Pages
- **About** (`/about`): Institute history, statistics, affiliations table (15 government bodies)
- **Contact** (`/contact`): Contact info, social links, contact form
- **Login** (`/login`): Firebase Auth login
- **Signup** (`/signup`): Firebase Auth registration

---

## 6. Firebase / Firestore Collections

| Collection | Fields | Notes |
|---|---|---|
| `enquiry` | name, email, phone, city, course, role, createdAt | From homepage & gym forms |
| `enrollment` | name, email, phone, occupation, experience, course, investment, userId?, role, createdAt | From courses page |
| `users` | name, email, phone, course, role, createdAt | Managed by Firebase Auth |
| `reviews` | name, email, phone, rating, comment, approved, createdAt | approved=false by default |
| `candidates` | name, src, publicId, createdAt | Candidate gallery images |

**Auth system**: Uses **Firebase Auth** (not Firestore password storage). Login uses `signInWithEmailAndPassword`. After login, user doc is fetched from `users/{uid}` Firestore for `role` field.

**Session storage**: `localStorage.setItem("iifn_user", JSON.stringify({id, name, email, role}))` — checked on every protected page.

---

## 7. Cloudinary — Candidate Image Upload Architecture

**Why Cloudinary**: The previous approach used Firebase Storage, which caused `EROFS: read-only file system` errors on Vercel serverless because of attempted local disk writes.

**Flow:**
1. Admin selects image + name in Admin Portal
2. Admin Portal sends `FormData` (file) via `POST` to `/api/candidates/upload`
3. Server-side route handler (`src/app/api/candidates/upload/route.js`) streams the buffer to Cloudinary via `v2.uploader.upload_stream`
4. Returns `{ url: secure_url, publicId }` to client
5. Admin Portal calls `addCandidate(name, url, publicId)` in Firestore
6. Homepage fetches candidates from Firestore and renders images using `<img src={candidate.src} />`

**Deletion Flow:**
1. Admin clicks delete on a candidate row
2. If `candidate.publicId` exists → `DELETE /api/candidates/upload` with `{ publicId }` → `cloudinary.v2.uploader.destroy(publicId)`
3. Then `deleteCandidate(candidate.id)` in Firestore
4. State updated to remove from UI

**Cloudinary folder**: `iifn_candidates`

---

## 8. Design System & Styling Preferences

### Color Palette (TailwindCSS v4 custom tokens in `globals.css`)
| Token | Value | Usage |
|---|---|---|
| `secondary-container` | `#E00600` (red) | Primary accent, CTAs, highlights |
| `secondary` | `#ffb4a8` | Light accent |
| `background` | `#131313` | Dark background |
| `surface-container-low` | `#1c1b1b` | Cards, panels |
| `on-surface` | `#e5e2e1` | Primary text |
| `on-surface-variant` | `#cfc4c5` | Secondary text |

### Fonts
Loaded via Google Fonts CDN `<link>` in `layout.js`:
- **Montserrat** (`font-display`): 400, 600, 700, 800, 900 — headings, display text
- **Inter** (`font-body`): 400, 500, 600, 700 — body text, labels
- **Material Symbols Outlined** — icons throughout

> ⚠️ **DO NOT use `next/font/google`** — it caused `Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'` errors on Vercel deployment. Fonts are intentionally loaded via `<link>` in `layout.js` instead.

### Design Aesthetic
- **Dark mode only** — black/dark background throughout
- **Red accent** (`#E00600`) for primary actions, borders, highlights
- **Glass morphism** effects for panels (`.glass-panel` class)
- **Uppercase typography** for headings and labels
- **Micro-animations**: hover scale, marquee scrolling, fadeIn
- **Font classes**: `font-display` (Montserrat), `font-body` (Inter)
- Custom utility classes in `globals.css`: `.red-glow`, `.red-glow-hover`, `.red-heat-glow`, `.glass-nav`, `.glass-panel`, `.custom-scrollbar`, `.animate-marquee`

---

## 9. Completed Work History

### Phase 1 — Core Build
- [x] Built full Next.js 16 App Router structure
- [x] Implemented TailwindCSS v4 with custom dark theme
- [x] Created all major pages: Home, Courses, About, Contact, Gym, Dietitian, Login, Signup
- [x] Firebase integration (Firestore, Auth, Storage)
- [x] Navbar with auth state awareness
- [x] Footer with full links
- [x] LoadingScreen intro animation on homepage

### Phase 2 — Candidate Gallery
- [x] Added 3-row side-scrollable candidate gallery on homepage
- [x] Uses `getCandidates()` from Firestore, falls back to seeding static images on first load
- [x] Static candidate images stored in `public/candidates/` (jgym*.jpeg files)
- [x] Candidate images display with `object-contain` to maintain actual aspect ratio

### Phase 3 — Admin Portal
- [x] Full admin dashboard with sidebar navigation
- [x] Tabs: Enquiries, Enrollments, Reviews, Users, Candidates
- [x] Review moderation (approve/reject/delete)
- [x] Candidate image upload & management (originally Firebase Storage)
- [x] Search across all collections

### Phase 4 — Cloudinary Integration (fixing EROFS deployment error)
- [x] Installed `cloudinary` (v2 SDK) and `next-cloudinary`
- [x] Created server-side API route: `src/app/api/candidates/upload/route.js`
  - `POST`: Streams uploaded image to Cloudinary CDN (folder: `iifn_candidates`)
  - `DELETE`: Destroys Cloudinary asset by `publicId`
- [x] Updated `addCandidate(name, src, publicId)` in Firestore service to store `publicId`
- [x] Updated Admin Portal to use Cloudinary API instead of Firebase Storage for new uploads
- [x] Backward compatible: old Firebase Storage URLs still handled in delete flow

### Phase 5 — Course Improvements
- [x] Updated all 4 courses with full syllabus content
- [x] Added Online Live Classes schedule banner (Sat 6:30–8PM, Sun 2:30–5PM)
- [x] Added expandable syllabus per course card

### Phase 6 — Partnerships Section
- [x] Added 6-section Partnerships grid with extracted text keywords as badge chips
- [x] Images displayed frameless (no gray background box) with `object-contain`
- [x] Added `nsdc.jpeg` (NSDC & Skill India Accreditation section)
- [x] Added `iifnposter1.jpeg` (IIFN Career & Excellence Ecosystem section)

### Phase 7 — Font Fix (Deployment)
- [x] Replaced `next/font/google` with Google Fonts CDN `<link>` tag in `layout.js`
- [x] Updated `globals.css` to use hardcoded font family strings (`'Montserrat'`, `'Inter'`)
- [x] Resolved `Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'` deployment error

### Phase 8 — Analytics & Reviews
- [x] Integrated `@vercel/analytics` in `layout.js`
- [x] Student Reviews section fetches approved reviews from Firestore dynamically
- [x] Admin can approve/reject/delete reviews

---

## 10. Known Issues & Gotchas

1. **DO NOT use `next/font/google`** — causes Vercel Turbopack deployment failure. Use Google Fonts CDN link instead.

2. **EROFS error on file upload**: Never write to local filesystem in API routes. All file uploads must be streamed directly to Cloudinary (or another CDN). `public/` folder is read-only in Vercel serverless.

3. **Firestore `candidates` seeding**: On first homepage load, if Firestore `candidates` collection is empty, the page auto-seeds it with 20 static images from `public/candidates/`. This happens once. After that, all candidates come from Firestore.

4. **Admin authentication**: There is NO Firebase Auth for admin. Admin login uses `email/password` stored in Firestore `users` collection with `role: "admin"`. The `loginUserWithAuth()` function uses Firebase Auth to authenticate, then retrieves `role` from Firestore. Admin session is stored in `localStorage`.

5. **Password security**: User passwords go through Firebase Auth (secure). Old code had passwords stored in Firestore — this was replaced with `firebaseAuth.service.js`.

6. **Cloudinary `publicId` for old candidates**: Candidates uploaded via Firebase Storage (old system) have no `publicId` field. During deletion, the code checks `candidate.publicId` first, then falls back to Firebase Storage URL deletion.

7. **`firestore.service.js` `loginUser`**: This older function (password-based Firestore login) is likely unused now that `loginUserWithAuth` exists. Do not use it.

---

## 11. API Routes

### `POST /api/candidates/upload`
**Purpose**: Upload a candidate image to Cloudinary  
**Accepts**: `multipart/form-data` with `file` field  
**Returns**: `{ success: true, url: "https://res.cloudinary.com/...", publicId: "iifn_candidates/..." }`

### `DELETE /api/candidates/upload`
**Purpose**: Delete a candidate image from Cloudinary  
**Accepts**: `application/json` with `{ publicId: "iifn_candidates/..." }`  
**Returns**: `{ success: true, result: { ... } }`

---

## 12. Firestore Service Functions Reference

```
firestore.service.js
├── addEnquiry(data)               → enquiry collection
├── addEnrollment(data)            → enrollment collection
├── signupUser(...)                → users collection [LEGACY - use firebaseAuth instead]
├── loginUser(email, pass)         → users collection [LEGACY - use firebaseAuth instead]
├── getEnquiries()                 → fetch all enquiries
├── getEnrollments()               → fetch all enrollments
├── getUsers()                     → fetch all users (name/email only)
├── addReview(name, email, phone, rating, comment)
├── getReviews()                   → all reviews
├── getApprovedReviews()           → only approved: true reviews
├── approveReview(id, approved)    → toggle approved field
├── deleteReview(id)
├── addCandidate(name, src, publicId) → candidates collection
├── getCandidates()                → all candidates, sorted newest first
└── deleteCandidate(id)

firebaseAuth.service.js
├── signupUserWithAuth(name, email, phone, password, course)
├── loginUserWithAuth(email, password)
└── logoutUserWithAuth()
```

---

## 13. Preferences & Coding Style

- **All components are `"use client"` React components** (no Server Components in use currently)
- **No TypeScript** — pure JavaScript throughout
- **Tailwind utility classes** inline in JSX
- **Custom CSS classes** for reusable patterns (e.g., `.red-glow`, `.font-display`) in `globals.css`
- **Path alias**: `@/` maps to `src/` (configured in `jsconfig.json`)
- **Form submission pattern**: Save to Firestore → open WhatsApp with pre-filled message
- **Dark aesthetic**: Everything is dark themed, red accent, uppercase headings
- **No external UI libraries** (no shadcn, no radix) — all custom components
- **Material Symbols Outlined** for all icons (via Google Fonts link)

---

## 14. Build & Development Commands

```powershell
# Development
npm run dev

# Production build (verify before deploying)
npm run build

# Lint
npm run lint
```

> Run `npm run build` after every significant change to verify 0 errors before deploying to Vercel.

---

## 15. Future Improvements (Not Yet Done)

These features were discussed or are logical next steps:

- [ ] Student dashboard (view enrolled courses, certificates)
- [ ] Online payment gateway integration (Razorpay/Stripe)
- [ ] Certificate generation and download
- [ ] Blog / resource section
- [ ] Course progress tracking via LMS
- [ ] Mobile app (React Native or PWA)
- [ ] WhatsApp Business API integration (automated responses)
- [ ] Multi-language support (Hindi/English toggle)
- [ ] Admin analytics dashboard (charts for enrollment trends)
- [ ] Image optimization with `next/image` after resolving CDN config
