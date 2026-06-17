# Aura Ecommerce 🌿

Aura is a state-of-the-art, production-grade enterprise ecommerce platform built with **Next.js 15**, **TypeScript**, **TailwindCSS**, and **Supabase**. It is designed to mirror the scalability, performance, and features of leading ecommerce giants like Shopify and Amazon.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript (Strict Typing)
- **Styling**: TailwindCSS, custom UI components inspired by shadcn/ui
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security)
- **Payments**: Stripe Checkout & Webhooks
- **Emails**: Resend API
- **State Management**: React Context API, React Query
- **Data Visualization**: Recharts
- **Form Validation**: Zod, React Hook Form
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)

---

## 🌟 Comprehensive Feature List

### 1. Storefront & UI Architecture
- **Responsive Design**: Mobile-first architecture scaling seamlessly up to ultra-wide desktop monitors.
- **Dynamic Homepage**: Features an immersive Hero Section, animated Flash Sales countdowns, trending product carousels, and a Newsletter subscription block.
- **Product Listing Page (PLP)**: 
  - Advanced sidebar filtering (Category, Price Range, Colors, Ratings).
  - Search indexing with debounced inputs.
  - Pagination system.
  - Toggle between Grid and List view layouts.
- **Product Detail Page (PDP)**:
  - Interactive image galleries with thumbnail selection.
  - Accordion menus for specifications, shipping, and return policies.
  - Skeleton loading states for smooth data transitions.
  - Beautiful typographic hierarchy utilizing `next/font`.

### 2. Authentication & User Management
- **Supabase Auth Integration**: Secure JWT-based authentication.
- **Complete Auth Flow**: Beautiful UI pages for Sign Up, Log In, and Password Recovery.
- **Global Auth Context**: React Provider seamlessly tracking user sessions.
- **Role-Based Access Control (RBAC)**: Secure route protection segregating generic `customers` from `admins`.
- **Customer Profile**: User dashboard to view account details and track order history.

### 3. Cart & Wishlist Ecosystem
- **Cloud-Synced Cart**: Authenticated users have their cart synced directly to the Supabase database.
- **Guest Fallbacks**: Non-authenticated users can utilize the cart, leveraging local memory.
- **Wishlist System**: Bookmark favorites securely to user profiles.
- **Slide-out Cart Drawer**: Manage quantities, remove items, and view live subtotal calculations from anywhere on the site.

### 4. Checkout & Order Fulfillment
- **Multi-Step Checkout Flow**: Dedicated `/checkout` route collecting user data.
- **Zod Address Validation**: Strict client-side validation for complex shipping address forms.
- **Stripe Payments**: Full integration with Stripe Checkout Sessions via secure Next.js API Routes.
- **Stripe Webhooks**: Serverless functions listening for `checkout.session.completed` events to securely automate back-office operations.
- **Buy Now Feature**: Single-click purchasing bypassing the cart entirely via URL parameters.
- **Coupon System**: Client-side validation of discount codes mapping directly to Stripe payment modifiers.
- **Order Tracking**: Visual status timeline tracking orders from `Pending` → `Processing` → `Shipped` → `Delivered`.
- **Transactional Emails**: Automated HTML email confirmations sent upon successful payment via the Resend API.

### 5. Admin Dashboard & Operations (Shopify-style)
- **Persistent Admin Layout**: Features a collapsible Sidebar and an interactive Topbar with notification drop-downs and a global search.
- **Analytics Overview**: Top-level metric cards (`Total Revenue`, `Total Orders`, `Out of Stock`) mapping real-time database calculations, complete with percentage trend indicators.
- **Recharts Data Visualization**: Interactive Gradient Area Charts modeling revenue growth over time, and dual-axis Bar charts comparing Sales vs Order Volume.
- **Order Management CRM**: Robust data tables allowing admins to filter by Order ID and instantly update `Order Status` or `Payment Status` via inline dropdowns.
- **Inventory Management**: Color-coded badges indicating `In Stock`, `Low Stock`, and `Out of Stock`. Features rapid-entry fields to update stock quantities.
- **Product & Category Control**: Dashboards built to edit product metadata, upload image arrays, and route products to relational categories.
- **Customer CRM**: Tracking customer lifetime value, join dates, total orders, and contact metadata.
- **Report & Settings Architecture**: Placeholders for comprehensive CSV exports and store-wide settings control (currency, timezone, automated fulfillments).

### 6. Enterprise Features & Scalability
- **Product Reviews & Ratings**: Authenticated users can leave 1-5 star ratings with rich text. Features aggregate review calculations and "Verified Buyer" badges.
- **AI Recommendations**: Algorithmic "Frequently Bought Together" rendering logic based on relational category matching to increase Average Order Value (AOV).
- **Recently Viewed Edge-Caching**: Frictionless tracking of the last 10 viewed items stored securely in edge `localStorage` to reduce database hits.
- **Product Comparison Matrix**: Dynamic side-by-side feature, price, stock, and rating analyzer utilizing array-based URL querying.
- **Saved Addresses Book**: Dedicated profile panel letting users create, edit, delete, and set default shipping locations to accelerate checkout speeds.
- **SEO & Metadata Optimization**: Enterprise Root layout injections featuring comprehensive Open Graph data, dynamic Twitter Cards, theme colors, and Manifest mapping.
- **Progressive Web App (PWA) Foundation**: Configured `manifest.json` enabling mobile "Add to Home Screen" standalone app capabilities.
- **Automated Inventory Reduction**: Webhooks automatically execute stock-subtraction loops upon successful order verification to prevent overselling.

---

## 🛠️ Folder Structure

```text
src/
├── app/                  # Next.js 15 App Router pages & API routes
│   ├── (shop)            # Storefront views (Products, Cart, Checkout, Profile)
│   ├── admin/            # Secure Admin Dashboard routes
│   ├── api/              # Serverless handlers (Stripe Webhooks, Checkout Sessions)
│   ├── auth/             # Authentication flows
├── components/           # Modular React components
│   ├── admin/            # Admin widgets (Charts, Sidebar, Data Tables)
│   ├── checkout/         # Forms, Coupon UI, Stripe Buttons
│   ├── product/          # Product Cards, Reviews, Recommendations, Image Galleries
│   ├── ui/               # Reusable primitive elements (Buttons, Inputs, Skeletons)
├── context/              # Global State (AuthContext, CartContext)
├── hooks/                # Custom React Hooks (useOrders, useProducts)
├── lib/                  # Services & Utilities (Supabase client, Stripe init, Fetchers)
├── types/                # Strict TypeScript Interface definitions
```

---

## 🔒 Security Practices
- **Row Level Security (RLS)**: Supabase tables restricted so users can only access/modify their personal cart, wishlist, and profile data.
- **Server-Side Validation**: All checkout totals, inventory levels, and Stripe price conversions occur securely on the backend, bypassing client manipulation.
- **Environment Variable Protection**: All API keys (Stripe, Resend, Supabase Service Role) safely secluded inside `.env.local`.

---

*Architected and developed as a premium, highly scalable Full-Stack Ecommerce Application.*
