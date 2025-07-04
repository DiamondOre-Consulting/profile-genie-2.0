# Profile Genie 2.0 - Complete Developer Documentation

> 🚀 A comprehensive digital portfolio and catalogue management platform built with modern web technologies

## 📋 Table of Contents

- [🏗️ Project Architecture](#project-architecture)
- [⚡ Quick Start](#quick-start)
- [🔐 Authentication System](#authentication-system)
- [👤 Portfolio Management](#portfolio-management)
- [🛍️ Catalogue Management](#catalogue-management)
- [📊 Admin Dashboard](#admin-dashboard)
- [🏷️ Metadata Management](#metadata-management)
- [📱 WhatsApp Integration](#whatsapp-integration)
- [🗄️ Database Schema](#database-schema)
- [🛠️ API Endpoints](#api-endpoints)
- [🔧 Development Setup](#development-setup)
- [📦 Deployment](#deployment)
- [🤝 Contributing](#contributing)

## 🏗️ Project Architecture

Profile Genie 2.0 follows a **microservices architecture** with clear separation of concerns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Client      │    │     Admin       │    │ Catalogue Admin │
│   (Frontend)    │    │   Dashboard     │    │   Dashboard     │
│                 │    │                 │    │                 │
│  React + Vite   │    │  React + Vite   │    │  React + Vite   │
│  TypeScript     │    │  TypeScript     │    │  TypeScript     │
│  TailwindCSS    │    │  TailwindCSS    │    │  TailwindCSS    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                         ┌─────────────────┐
                         │     Server      │
                         │   (Backend)     │
                         │                 │
                         │   Node.js       │
                         │   Express.js    │
                         │   MongoDB       │
                         │   Socket.IO     │
                         └─────────────────┘
```

### Tech Stack Overview

| Component | Technology | Version | Purpose |
|-----------|------------|---------|----------|
| **Frontend** | React | 19.0.0 | UI Framework |
| **Language** | TypeScript | 5.7.2 | Type Safety |
| **Styling** | TailwindCSS | 4.0.6 | Styling Framework |
| **Build Tool** | Vite | 6.1.0 | Fast Build Tool |
| **State Management** | Redux Toolkit | 2.5.1+ | Global State |
| **Backend** | Node.js + Express | 18.14.2 | Server Framework |
| **Database** | MongoDB + Mongoose | 8.10.1 | Database & ODM |
| **File Storage** | Cloudinary | 2.5.1 | Media Management |
| **Email Service** | Nodemailer | 6.10.0 | Email Delivery |
| **Real-time** | Socket.IO | 4.8.1 | Live Updates |

## ⚡ Quick Start

### Prerequisites
- Node.js (v18.14.2+)
- MongoDB (v5.0+)
- npm/pnpm
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd profile-genie2.0

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

# Install admin dependencies
cd ../admin && npm install

# Install catalogue admin dependencies
cd ../catalogueAdmin && npm install

# Setup environment variables
cp server/.env.example.js server/.env
# Edit server/.env with your configuration

# Start all services
npm run dev:all
```

### Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=5500

# Database
MONGO_URI=mongodb://localhost:27017/profile-genie

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRY=7d
JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary (Media Storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration
SMPT_HOST=smtp.gmail.com
SMPT_PORT=587
SMPT_USERNAME=your_email@gmail.com
SMPT_PASSWORD=your_app_password
SMPT_FROM_EMAIL=noreply@profilegenie.in

# OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URLs
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
CATALOGUE_ADMIN_URL=http://localhost:5175
```

## 🔐 Authentication System

### Features
- **Multi-role Authentication**: USER, CATALOGUE_OWNER, SUPERADMIN
- **JWT Token Management**: Access & Refresh tokens with automatic renewal
- **OAuth Integration**: Google authentication with Passport.js
- **Password Security**: bcrypt hashing with salt rounds
- **Password Reset**: Secure token-based password recovery
- **Session Management**: Persistent login with refresh tokens

### User Roles

| Role | Permissions | Access |
|------|-------------|--------|
| **USER** | Basic user access | Limited features |
| **CATALOGUE_OWNER** | Catalogue management | Catalogue Admin Dashboard |
| **SUPERADMIN** | Full system access | Admin Dashboard + All features |

### API Endpoints

#### Authentication Routes (`/api/v1/auth`)

```http
# User Registration
POST /register
Content-Type: multipart/form-data

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "USER"
}

# User Login
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

# Password Reset Request
POST /forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}

# Password Reset Confirmation
POST /reset-password/:token
Content-Type: application/json

{
  "password": "newSecurePassword123"
}

# Get User Profile (Protected)
GET /profile
Authorization: Bearer <access_token>

# Refresh Access Token
GET /refresh-token
Cookie: refreshToken=<refresh_token>

# Logout (Protected)
GET /logout
Authorization: Bearer <access_token>

# Google OAuth
GET /google
GET /google/callback
```

### Authentication Flow

```typescript
// Login Response Structure
{
  "success": true,
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "USER",
    "isVerified": true,
    "loginType": "email"
  },
  "message": "User logged in successfully!"
}
```

## 👤 Portfolio Management

### Core Features
- **Multi-template Support**: Multiple professional portfolio templates
- **Media Management**: Profile images, background images, logos via Cloudinary
- **Content Sections**: About, Services, Products, Testimonials, Contact
- **View Analytics**: Monthly view tracking with detailed statistics
- **SEO Optimization**: Meta tags, descriptions, favicon support
- **Recycle Bin**: Soft delete with restore functionality
- **Status Management**: Active/Inactive and Paid/Unpaid status
- **Statistics Dashboard**: OTP-protected view statistics

### Portfolio Structure

```typescript
interface Portfolio {
  _id: string;
  fullName: string;
  userName: string; // Unique identifier
  email: string;
  phoneNumber: number;
  tagline: string;
  template: string; // template1, template2, etc.
  isActive: boolean;
  isPaid: boolean;
  isRecycled: boolean;
  views: number;
  monthlyViews: Map<string, number>; // "january2024": 150
  paidDate?: Date;
  
  // Media Assets
  image: { url: string; publicId: string };
  backgroundImage: { url: string; publicId: string };
  logo: { url: string; publicId: string };
  
  // Content
  about: {
    head: string;
    body: string;
  };
  shortDescription?: string;
  
  // Emergency Contacts
  SOS: Array<{
    phoneNumber: number;
    fullName: string;
  }>;
  
  // Relations
  contactData: ObjectId; // PortfolioContact
  otherDetails: ObjectId; // PortfolioDetail
  metaDetails: ObjectId; // MetaData
}
```

### API Endpoints

#### Portfolio Routes (`/api/v1/portfolio`)

```http
# Create Portfolio (Protected)
POST /
Content-Type: multipart/form-data
Authorization: Bearer <access_token>

FormData:
- formData: JSON string with portfolio data
- template: "template1"
- files[]: Multiple files (image, backgroundImage, logo)

# Update Portfolio (Protected)
PUT /:id
Content-Type: multipart/form-data
Authorization: Bearer <access_token>

# Get All Portfolios (Protected)
GET /
Authorization: Bearer <access_token>
Query Parameters:
- search: string (search by name, username)
- filter: "active" | "inactive" | "unpaid"

# Get Single Portfolio (Public)
GET /:userName
Query Parameters:
- admin: boolean (skip view counting)

# Delete Portfolio (Protected)
DELETE /:id
Authorization: Bearer <access_token>

# Recycle Portfolio (Protected)
PUT /recycle/:id
Authorization: Bearer <access_token>

# Restore Portfolio (Protected)
PUT /restore/:id
Authorization: Bearer <access_token>

# Get Recycled Portfolios (Protected)
GET /recycle/all-portfolio
Authorization: Bearer <access_token>

# Update Status (Protected)
PUT /update-active-status/:id
PUT /update-paid-status/:id
Authorization: Bearer <access_token>

# Portfolio Statistics (OTP Protected)
GET /:userName/send-otp
POST /:userName/verify-otp
{
  "email": "owner@example.com",
  "otp": "1234"
}
```

### Portfolio Details Management

#### Portfolio Detail Structure

```typescript
interface PortfolioDetail {
  portfolio: ObjectId;
  
  brands: {
    tagline: string;
    brandList: Array<{
      uniqueId: string;
      brandName: string;
      image: { url: string; publicId: string };
    }>;
  };
  
  services: {
    tagline: string;
    serviceList: Array<{
      uniqueId: string;
      title: string;
      detail: string;
      image: { url: string; publicId: string };
    }>;
  };
  
  products: {
    tagline: string;
    productList: Array<{
      uniqueId: string;
      title: string;
      detail: string;
      image: { url: string; publicId: string };
    }>;
  };
  
  bulkLink: {
    tagline: string;
    bulkLinkList: Array<{
      uniqueId: string;
      linkName: string;
      link: string;
      image: { url: string; publicId: string };
    }>;
  };
}
```

#### Portfolio Contact Structure

```typescript
interface PortfolioContact {
  portfolio: ObjectId;
  
  // Contact Information
  whatsappNo: number;
  mapLink: string;
  emailList: Array<{ email: string }>;
  phoneList: Array<{ phone: number }>;
  address: Array<{
    title: string;
    detail: string;
  }>;
  
  // Social Media
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
    googleLink: string;
    otherSocialList: Array<{
      uniqueId: string;
      link: string;
      img: { url: string; publicId: string };
    }>;
  };
  
  // Testimonials
  testimonial: {
    tagline: string;
    testimonialList: Array<{
      uniqueId: string;
      name: string;
      detail: string;
      star: number;
    }>;
  };
  
  // Additional
  brochureLink: {
    tagline: string;
    link: string;
  };
  contactCSV: string;
}
```

#### Detail Management Routes

```http
# Update Portfolio Details (Protected)
PUT /others/:id
Content-Type: multipart/form-data
Authorization: Bearer <access_token>

FormData:
- data: JSON string with details
- brands[]: Brand images
- services[]: Service images
- products[]: Product images
- bulkLink[]: Bulk link images

# Update Contact Details (Protected)
PUT /contact/:id
Content-Type: multipart/form-data
Authorization: Bearer <access_token>

FormData:
- data: JSON string with contact data
- otherSocial[]: Social media images
```

## 🛍️ Catalogue Management

### Core Features
- **Product Catalogue Creation**: Comprehensive product management system
- **Category Management**: Dynamic product categorization
- **Owner Management**: Catalogue owner profiles with authentication
- **Product Management**: Full CRUD operations for products
- **Quotation System**: Customer inquiry and quotation management
- **HSN Code Support**: Product classification with HSN codes
- **Image Galleries**: Multiple images per product
- **Status Management**: Active/Inactive and Paid/Unpaid status
- **Recycle Bin**: Soft delete with restore functionality

### Catalogue Structure

```typescript
interface Catalogue {
  _id: string;
  name: string;
  userName: string; // Unique identifier
  tagline: string;
  description: string;
  
  // Styling
  backgroundColor: string;
  textColor: string;
  
  // Media
  logo: { url: string; publicId: string };
  heroImage: { url: string; publicId: string };
  
  // Status
  isActive: boolean;
  isPaid: boolean;
  isRecycled: boolean;
  paidDate?: Date;
  
  // Categories
  category: Array<{
    id: string;
    text: string;
  }>;
  
  // Relations
  product: ObjectId[]; // CatalogueProduct
  catalogueOwner: ObjectId; // CatalogueOwner
  metaDetails: ObjectId; // MetaData
}

interface CatalogueOwner {
  _id: string;
  authAccount: ObjectId; // User
  
  // Contact Information
  mapLink: string;
  whatsappNo: number;
  emailList: Array<{ email: string }>;
  phoneList: Array<{ phone: number }>;
  address: Array<{
    title: string;
    detail: string;
  }>;
}

interface CatalogueProduct {
  _id: string;
  name: string;
  HSNCode: string; // Unique per owner
  price: number;
  moq: string; // Minimum Order Quantity
  stock: boolean;
  description: string;
  owner: string; // CatalogueOwner ID
  
  // Categories
  category: Array<{
    id: string;
    text: string;
  }>;
  
  // Images
  image: Array<{
    uniqueId: string;
    url: string;
    publicId: string;
  }>;
}
```

### API Endpoints

#### Catalogue Routes (`/api/v1/catalogue`)

```http
# Create Catalogue Owner
POST /owner
Content-Type: application/json

{
  "fullName": "Business Owner",
  "email": "owner@business.com",
  "password": "securePassword123",
  "mapLink": "https://maps.google.com/...",
  "emailList": [{"email": "contact@business.com"}],
  "phoneList": [{"phone": 1234567890}],
  "address": [{
    "title": "Main Office",
    "detail": "123 Business Street, City"
  }],
  "whatsappNo": 1234567890
}

# Create Catalogue (Protected)
POST /create-catalogue
Content-Type: multipart/form-data

FormData:
- formData: JSON string with catalogue data
- files[]: Images (logo, heroImage)

# Edit Catalogue (Protected)
PUT /edit-catalogue/:id
Content-Type: multipart/form-data

# Get All Catalogues (Protected)
GET /owner
Query Parameters:
- search: string
- filter: "active" | "inactive" | "unpaid"

# Get Single Catalogue (Public)
GET /single/:userName

# Add Product (Protected)
POST /add-product
Content-Type: multipart/form-data

FormData:
- formData: JSON string with product data
- image[]: Product images (up to 30)

# Edit Product (Protected)
PUT /edit-product/:id
Content-Type: multipart/form-data

# Delete Product (Protected)
DELETE /delete-product/:id

# Get Product (Public)
GET /single-product/:id

# Get Categorised Products (Public)
GET /all-products/:userName

# Get Categories (Public)
GET /category/:id

# Send Quotation (Public)
POST /quotations/:id
Content-Type: application/json

{
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "1234567890",
  "message": "Inquiry message",
  "products": [
    {
      "name": "Product Name",
      "quantity": 10,
      "price": 100
    }
  ]
}

# Recycle/Restore Operations (Protected)
PUT /recycle/:id
PUT /restore/:id
GET /recycle/all-catalogue

# Status Management (Protected)
PUT /update-active-status/:id
PUT /update-paid-status/:id

# Delete Catalogue (Protected)
DELETE /delete-catalogue/:id

# Edit Category (Protected)
PUT /category/:userName
Content-Type: application/json

{
  "id": "category_id",
  "name": "New Category Name"
}
```

### Product Management Flow

1. **Create Catalogue Owner** → Register business owner
2. **Create Catalogue** → Setup catalogue with branding
3. **Add Categories** → Define product categories
4. **Add Products** → Add products with images and details
5. **Manage Orders** → Handle quotations and inquiries

## 📊 Admin Dashboard

### Features
- **Analytics Dashboard**: Comprehensive system statistics
- **Portfolio Management**: View and manage all portfolios
- **Email Marketing**: Send custom emails to users
- **System Health Monitoring**: API uptime, response time, SEO scores
- **User Management**: Handle user accounts and permissions
- **Real-time Updates**: Socket.IO integration for live data

### Dashboard Statistics

```typescript
interface DashboardStats {
  stats: Array<{
    title: string;
    count: number | string;
    difference: number | string;
    percentageChange: number | string;
  }>;
  top5Portfolio: Array<{
    _id: string;
    fullName: string;
    userName: string;
    email: string;
    views: number;
  }>;
}
```

### API Endpoints

#### Admin Routes (`/api/v1/admin`)

```http
# Get Dashboard Data (Protected)
GET /admin-dashboard
Authorization: Bearer <access_token>

Response:
{
  "success": true,
  "top5Portfolio": [...],
  "stats": [
    {
      "title": "Total Portfolio",
      "count": 150,
      "difference": "+5",
      "percentageChange": 3.4
    },
    {
      "title": "Total Views",
      "count": 25000,
      "difference": "+1200",
      "percentageChange": 5.2
    }
  ]
}

# Send Custom Email (Protected)
POST /send-custom-mail
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "email": "specific@user.com", // Optional: if not provided, sends to all
  "mailSubject": "Important Update",
  "mailBody": "<p>HTML email content</p>"
}
```

### System Health Monitoring

The admin dashboard includes real-time system health monitoring:

- **API Uptime**: Monitors server availability
- **Response Time**: Tracks API response performance
- **SEO Scores**: Google PageSpeed Insights integration
- **Memory Usage**: Server memory consumption
- **Error Rates**: Application error tracking

## 🏷️ Metadata Management

### Features
- **SEO Optimization**: Title, description, keywords management
- **Favicon Support**: Custom favicon upload for portfolios/catalogues
- **Canonical URLs**: SEO-friendly URL management
- **Social Media Tags**: Open Graph and Twitter Card support

### Metadata Structure

```typescript
interface MetaData {
  _id: string;
  portfolio: ObjectId; // Portfolio or Catalogue ID
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  favIcon: {
    url: string;
    publicId: string;
  };
}
```

### API Endpoints

#### Metadata Routes

```http
# Create Metadata (Protected)
POST /api/v1/catalogue/meta/:id
Content-Type: multipart/form-data
Authorization: Bearer <access_token>

FormData:
- formData: JSON string with metadata
- favIcon: Favicon image file

# Update Portfolio Metadata (Protected)
PUT /api/v1/portfolio/meta/:id
Content-Type: multipart/form-data
Authorization: Bearer <access_token>

# Update Catalogue Metadata (Protected)
PUT /api/v1/catalogue/meta/:id
Content-Type: multipart/form-data
Authorization: Bearer <access_token>
```

## 🗄️ Database Schema

### Collections Overview

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| **users** | User authentication | email, password, role, OAuth data |
| **portfolios** | Portfolio data | userName, template, views, status |
| **portfoliocontacts** | Contact information | social, phone, email, testimonials |
| **portfoliodetails** | Portfolio content | services, products, brands |
| **catalogues** | Catalogue data | userName, categories, styling |
| **catalogueowners** | Catalogue owner info | contact details, business info |
| **catalogueproducts** | Product data | HSN code, price, stock, images |
| **metadatas** | SEO metadata | title, description, favicon |
| **templates** | WhatsApp templates | components, status, approval |

### Indexes

```javascript
// Portfolio Search Index
portfolioSchema.index({
  phoneNumber: "text",
  userName: "text",
  fullName: "text",
  email: "text"
});

// User Authentication
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });

// Portfolio Performance
portfolioSchema.index({ userName: 1 }, { unique: true });
portfolioSchema.index({ isRecycled: 1, isActive: 1 });

// Catalogue Optimization
catalogueSchema.index({ userName: 1 }, { unique: true });
catalogueSchema.index({ catalogueOwner: 1 });
```

## 🌐 Frontend Routes & URLs

### Application URLs

| Application | Local URL | Production URL | Port |
|-------------|-----------|----------------|----- |
| **Main Client** | http://localhost:5173 | https://profilegenie.in | 5173 |
| **Admin Dashboard** | http://localhost:5174 | https://admin.profilegenie.in | 5174 |
| **Catalogue Admin** | http://localhost:5175 | https://catalogue.profilegenie.in | 5175 |

### 🏠 Main Client Routes (`/`)

#### Public Routes

```http
# Homepage
GET /
https://profilegenie.in
Description: Main landing page with features, testimonials, and contact
Component: Home

# Portfolio Templates
GET /profile/1/:username
Description: Template 2 portfolio view (main template)
Component: Template2
Example: https://profilegenie.in/profile/1/UM99

GET /profile/9510/:username
Description: Template 1 portfolio view (alternative template)
Component: Template1
Example: https://profilegenie.in/profile/9510/UM99
In Development

# Portfolio Statistics (OTP Protected)
GET /profile/1/:username/stats
Description: Portfolio analytics dashboard with OTP verification
Component: UserStats
Example: https://profilegenie.in/profile/1/UM99/stats

# Template Preview
GET /template3
Description: Template 3 preview page
Component: Template3
In Development
```

#### Catalogue Routes

```http
# Main Catalogue Dashboard
GET /catalogue/1/:userName/*
Description: Dynamic catalogue system with nested routes
Component: Catalogue1Dashboard
Example: https://profilegenie.in/catalogue/1/business_name

# Nested Catalogue Routes (within /catalogue/1/:userName)
GET /catalogue/1/:userName/
Description: Catalogue homepage with products
Component: Catalogue1

GET /catalogue/1/:userName/cart
Description: Shopping cart page
Component: Catalogue1Cart

GET /catalogue/1/:userName/product/:productId
Description: Individual product detail page
Component: ProductDetail
Example: https://profilegenie.in/catalogue/1/business_name/product/product123
```

#### Legacy Dynamic Catalogue Routes (iFrame)

```http
# Niyor Perfumes Demo Catalogue
GET /dynamic-catalogue/1/Ishan_Niyor_Perfumes
Description: External catalogue demo via iframe
Source: https://profile-genie-2-0-niyor.onrender.com/1/Ishan_Niyor_Perfumes

# Niyor Admin Login
GET /dynamic-catalogue/admin-login/1
Description: External admin login via iframe
Source: https://profile-genie-2-0-niyor.onrender.com/admin-login/1

# Niyor Admin Dashboard
GET /dynamic-catalogue/admin/1/Ishan_Niyor_Perfumes
Description: External admin dashboard via iframe
Source: https://profile-genie-2-0-niyor.onrender.com/admin/1/Ishan_Niyor_Perfumes
```

### 🛡️ Admin Dashboard Routes (`/admin`)

#### Authentication Routes

```http
# Admin Login
GET /login
Description: Admin login page
Component: Login
Access: Public

# Password Reset Request
GET /forgot-password
Description: Request password reset
Component: ForgotPassword
Access: Public

# Password Reset Form
GET /reset-password/:token/:email/:expiry
Description: Reset password with token
Component: ResetPassword
Access: Public
Example: /reset-password/abc123/admin@example.com/2024-01-01T00:00:00Z
```

#### Protected Admin Routes

```http
# Main Dashboard
GET /
Description: Admin dashboard with analytics
Component: Dashboard
Access: SUPERADMIN

# Portfolio Management
GET /select-template
Description: Choose portfolio template
Component: SelectTemplate
Access: SUPERADMIN

GET /add-portfolio/:template
Description: Create new portfolio
Component: AddPortfolio
Access: SUPERADMIN
Example: /add-portfolio/template1

GET /all-portfolio
Description: View all portfolios
Component: AllPortfolio
Access: SUPERADMIN

GET /edit-portfolio/:username
Description: Edit existing portfolio
Component: EditPortfolio
Access: SUPERADMIN
Example: /edit-portfolio/john_doe

GET /portfolio-recycle-bin
Description: View recycled portfolios
Component: RecycledPortfolio
Access: SUPERADMIN

# Catalogue Management
GET /add-catalogue
Description: Create new catalogue
Component: AddCatalogue
Access: SUPERADMIN

GET /all-catalogue
Description: View all catalogues
Component: AllCatalogue
Access: SUPERADMIN

GET /edit-catalogue/:username
Description: Edit existing catalogue
Component: EditCatalogue
Access: SUPERADMIN
Example: /edit-catalogue/business_name

GET /catalogue-recycle-bin
Description: View recycled catalogues
Component: RecycledCatalogue
Access: SUPERADMIN

# Portfolio Preview
GET /portfolio/preview/template1/:username
Description: Preview portfolio template
Component: Template1
Access: SUPERADMIN
Example: /portfolio/preview/template1/john_doe

# Settings
GET /other-settings
Description: System settings and configuration
Component: Settings
Access: SUPERADMIN

# 404 Handler
GET /*
Description: Page not found
Component: PageNotFound
Access: SUPERADMIN
```

### 🛍️ Catalogue Admin Routes (`/catalogue-admin`)

#### Authentication Routes

```http
# Catalogue Owner Login
GET /login
Description: Catalogue owner login page
Component: Login
Access: Public

# Password Reset Request
GET /forgot-password
Description: Request password reset
Component: ForgotPassword
Access: Public

# Password Reset Form
GET /reset-password/:token/:email/:expiry
Description: Reset password with token
Component: ResetPassword
Access: Public
```

#### Protected Catalogue Admin Routes

```http
# Dashboard
GET /
Description: Catalogue owner dashboard
Component: Dashboard
Access: CATALOGUE_OWNER

# Catalogue Management
GET /catalogue/*
Description: Catalogue editing interface (nested routes)
Component: EditCatalogue
Access: CATALOGUE_OWNER

# 404 Handler
GET /*
Description: Page not found
Component: PageNotFound
Access: CATALOGUE_OWNER
```

### 🔗 URL Pattern Examples

#### Portfolio URLs

```bash
# Production Portfolio URLs
https://profilegenie.in/profile/1/john_doe          # Template 2
https://profilegenie.in/profile/9510/jane_smith     # Template 1
https://profilegenie.in/profile/1/john_doe/stats    # Statistics

# Local Development
http://localhost:5173/profile/1/john_doe
http://localhost:5173/profile/1/john_doe/stats
```

#### Catalogue URLs

```bash
# Production Catalogue URLs
https://profilegenie.in/catalogue/1/business_name              # Catalogue home
https://profilegenie.in/catalogue/1/business_name/cart         # Shopping cart
https://profilegenie.in/catalogue/1/business_name/product/123  # Product detail

# Local Development
http://localhost:5173/catalogue/1/business_name
http://localhost:5173/catalogue/1/business_name/cart
http://localhost:5173/catalogue/1/business_name/product/123
```

#### Admin URLs

```bash
# Production Admin URLs
https://admin.profilegenie.in/login                    # Admin login
https://admin.profilegenie.in/                         # Dashboard
https://admin.profilegenie.in/all-portfolio            # Portfolio management
https://admin.profilegenie.in/edit-portfolio/john_doe  # Edit portfolio

# Local Development
http://localhost:5174/login
http://localhost:5174/
http://localhost:5174/all-portfolio
```

#### Catalogue Admin URLs

```bash
# Production Catalogue Admin URLs
https://catalogue.profilegenie.in/login       # Catalogue owner login
https://catalogue.profilegenie.in/            # Dashboard
https://catalogue.profilegenie.in/catalogue/  # Catalogue editing

# Local Development
http://localhost:5175/login
http://localhost:5175/
http://localhost:5175/catalogue/
```

### 🎯 Route Protection

#### Public Routes
- Homepage (`/`)
- Demo page (`/demo`)
- Portfolio views (`/profile/**`)
- Catalogue views (`/catalogue/**`)
- Login pages (`/login`)
- Password reset (`/forgot-password`, `/reset-password/**`)

#### Protected Routes
- **Admin Dashboard**: Requires SUPERADMIN role
- **Catalogue Admin**: Requires CATALOGUE_OWNER role
- **Portfolio Statistics**: Requires OTP verification

#### Route Guards

```typescript
// Example of route protection
interface ProtectedRouteProps {
  requiredRole?: 'USER' | 'CATALOGUE_OWNER' | 'SUPERADMIN';
  requireOTP?: boolean;
}

// Admin routes are protected by ProtectedRoute component
<Route element={<ProtectedRoute />}>
  <Route path="/" element={<Dashboard />} />
  <Route path="/all-portfolio" element={<AllPortfolio />} />
  // ... other protected routes
</Route>
```

### 🔄 Navigation Flow

#### User Journey - Portfolio
1. **Discovery**: `/` → Browse homepage
2. **View Portfolio**: `/profile/1/:username` → View portfolio
3. **View Statistics**: `/profile/1/:username/stats` → OTP verification → Analytics

#### User Journey - Catalogue
1. **Browse Catalogue**: `/catalogue/1/:userName` → Product listing
2. **View Product**: `/catalogue/1/:userName/product/:id` → Product details
3. **Add to Cart**: Continue shopping or checkout
4. **View Cart**: `/catalogue/1/:userName/cart` → Review items

#### Admin Journey
1. **Login**: `/login` → Authentication
2. **Dashboard**: `/` → System overview
3. **Manage Content**: `/all-portfolio` or `/all-catalogue` → Content management
4. **Edit Content**: `/edit-portfolio/:username` → Content editing

## 🛠️ API Endpoints

### Base URL
```
Local: http://localhost:5500/api/v1
Production: https://server.profilegenie.in/api/v1
```

### Authentication Headers

```http
# For protected routes
Authorization: Bearer <access_token>

# For file uploads
Content-Type: multipart/form-data

# For JSON data
Content-Type: application/json
```

### Response Format

All API responses follow a consistent format:

```typescript
interface APIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Success Response
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* response data */ }
}

// Error Response
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description"
}
```

### Error Codes

| Status Code | Description | Common Causes |
|-------------|-------------|---------------|
| **200** | OK | Successful operation |
| **201** | Created | Resource created successfully |
| **400** | Bad Request | Invalid input data |
| **401** | Unauthorized | Missing or invalid token |
| **403** | Forbidden | Insufficient permissions |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Duplicate resource (username, email) |
| **429** | Too Many Requests | Rate limiting (OTP requests) |
| **500** | Internal Server Error | Server-side error |

## 🔧 Development Setup

### Project Structure

```
profile-genie2.0/
├── admin/                 # Admin Dashboard (React + TypeScript)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── Pages/         # Page components
│   │   ├── Redux/         # State management
│   │   ├── Templates/     # Portfolio templates
│   │   └── validations/   # Form validation schemas
│   ├── package.json
│   └── vite.config.ts
├── catalogueAdmin/        # Catalogue Admin Dashboard
│   └── (similar structure to admin)
├── client/                # Main Client Application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── Pages/         # Page components
│   │   ├── Templates/     # Portfolio templates
│   │   ├── Catalogue/     # Catalogue components
│   │   └── Redux/         # State management
│   └── package.json
├── server/                # Backend API Server
│   ├── controller/        # API controllers
│   ├── model/            # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   ├── config/           # Configuration files
│   ├── uploads/          # File uploads directory
│   ├── app.js            # Express app setup
│   ├── server.js         # Server entry point
│   └── package.json
└── README.md             # This file
```

### Development Scripts

```bash
# Server
cd server
npm run dev          # Start with nodemon
npm start            # Production start

# Client Applications
cd client
npm run dev          # Development server (port 5173)
npm run build        # Production build
npm run preview      # Preview production build

cd admin
npm run dev          # Development server (port 5174)

cd catalogueAdmin
npm run dev          # Development server (port 5175)

# All at once (from root)
npm run dev:all      # Start all services
npm run build:all    # Build all applications
```

### Code Quality

```bash
# Linting
npm run lint         # ESLint
npm run lint:fix     # Auto-fix ESLint issues

# Type Checking
npm run type-check   # TypeScript compilation check

# Unused Code Detection (Admin only)
npm run check-unused # Find unused TypeScript code
```

## 📦 Deployment

### Production Environment Variables

```env
# Production Settings
NODE_ENV=production
PORT=5500

# Database (MongoDB Atlas)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/profilegenie

# JWT Secrets (Generate strong random strings)
JWT_SECRET=your_production_jwt_secret
JWT_ACCESS_SECRET=your_production_access_secret
JWT_REFRESH_SECRET=your_production_refresh_secret

# Cloudinary Production
CLOUDINARY_CLOUD_NAME=production_cloud_name
CLOUDINARY_API_KEY=production_api_key
CLOUDINARY_API_SECRET=production_api_secret

# Production URLs
FRONTEND_URL=https://profilegenie.in
ADMIN_URL=https://admin.profilegenie.in
CATALOGUE_ADMIN_URL=https://catalogue.profilegenie.in

# Email Production (SMTP)
SMPT_HOST=smtp.gmail.com
SMPT_PORT=587
SMPT_USERNAME=production_email@domain.com
SMPT_PASSWORD=production_app_password

# Google Analytics (Optional)
PSI_API_KEY=google_pagespeed_insights_api_key
```

### Deployment Options

#### Option 1: Render (Recommended)

```yaml
# render.yaml
services:
  - type: web
    name: profile-genie-server
    env: node
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      # Add other environment variables

  - type: web
    name: profile-genie-client
    env: static
    buildCommand: cd client && npm install && npm run build
    staticPublishPath: client/dist

  - type: web
    name: profile-genie-admin
    env: static
    buildCommand: cd admin && npm install && npm run build
    staticPublishPath: admin/dist
```

#### Option 2: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY server/package*.json ./server/
COPY client/package*.json ./client/
COPY admin/package*.json ./admin/

# Install dependencies
RUN cd server && npm ci --only=production
RUN cd client && npm ci && npm run build
RUN cd admin && npm ci && npm run build

# Copy source code
COPY server/ ./server/
COPY client/dist/ ./client/dist/
COPY admin/dist/ ./admin/dist/

EXPOSE 5500

CMD ["node", "server/server.js"]
```

### Performance Optimization

- **Database Indexing**: Proper indexes for search and filtering
- **Image Optimization**: Cloudinary automatic optimization
- **Caching**: Redis for session management (optional)
- **CDN**: Cloudinary CDN for media delivery
- **Compression**: gzip compression for API responses
- **Rate Limiting**: Prevent API abuse

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run type-check
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Create a Pull Request**

### Commit Message Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages
- **Component Structure**: Functional components with hooks
- **API Design**: RESTful principles
- **Error Handling**: Comprehensive error management

---

**Profile Genie 2.0** - Empowering Digital Presence

Made with ❤️ by [Akash Kumar Singh](https://github.com/webakash1806)

📧 Contact: [contact@profilegenie.in](mailto:contact@profilegenie.in)  
🌐 Website: [https://profilegenie.in](https://profilegenie.in)  
📱 Admin: [https://admin.profilegenie.in](https://admin.profilegenie.in)
