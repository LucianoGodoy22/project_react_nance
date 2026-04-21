# Nancé — Own Your Luxury

> **Academic Project** — Developed as part of a Full Stack Web Development course at university, exploring the integration of modern frontend frameworks with RESTful backend APIs.
---
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=flat-square)

## Features

- **Product Catalog** — Browse and filter products fetched from a Spring Boot REST API
- **Shopping Cart** — Add, remove, and update quantities with persistent local storage
- **User Authentication** — Register and login with JWT tokens, with role-based access control
- **Checkout Flow** — Multi-step order form with form validation
- **Admin Panel** — CRUD operations for products (create, read, update, delete), restricted to admin users
- **Contact Form** — Validated contact form using Zod schema validation
- **Responsive Design** — Mobile-first layout with a sticky navbar and slide-out cart drawer

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI library |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| shadcn/ui + Radix UI | Accessible component primitives |
| React Router DOM v6 | Client-side routing |
| Axios | HTTP client for API requests |
| TanStack Query | Server state management |
| React Hook Form + Zod | Form handling and validation |
| Lucide React | Icon library |
| Sonner | Toast notifications |

### Backend (separate repository)
| Technology | Purpose |
|---|---|
| Spring Boot | REST API framework |
| Spring Security + JWT | Authentication and authorization |
| JPA / Hibernate | ORM and database access |
| MySQL / H2 | Relational database |

---

## Project Structure

```
src/
├── api/              # Axios instance and interceptors
├── components/       # Reusable UI components
│   ├── ui/           # shadcn/ui base components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── CartModal.tsx
│   └── ProductCard.tsx
├── contexts/         # React context providers (Auth, Cart)
├── hooks/            # Custom hooks (useCart, useProducts)
├── pages/            # Route-level page components
│   ├── Inicio.tsx    # Home page
│   ├── Catalogo.tsx  # Product catalog
│   ├── Contacto.tsx  # Contact form
│   ├── Login.tsx     # Auth page
│   ├── Checkout.tsx  # Order checkout
│   └── Admin.tsx     # Admin dashboard
├── services/         # Auth service helpers
├── types/            # TypeScript interfaces
└── data/             # Static fallback product data
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A running instance of the [Nancé Backend API](http://localhost:8080)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nance-frontend.git
cd nance-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment

By default, the frontend points to `http://localhost:8080/api`. To change this, update the base URL in `src/api/axios.ts`:

```ts
const API_URL = 'http://localhost:8080/api';
```

---

## Authentication

| Role | Credentials | Access |
|---|---|---|
| Admin | `admin@nance.com` / (set in backend) | Full CRUD on products, admin panel |
| Client | Register via the UI | Cart, checkout, profile |

JWT tokens are stored in `localStorage` and automatically attached to all API requests via an Axios request interceptor.

---

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run build:dev  # Development build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

## Academic Context

This project was developed as part of a **Full Stack Web Development** course at university. The primary learning objectives were:

- Building a multi-page React application with TypeScript
- Consuming a RESTful API from a Spring Boot backend
- Implementing JWT authentication and protected routes
- Managing global state with React Context
- Applying component-driven UI design with accessible primitives
- Integrating form validation with Zod
- Understanding the separation of concerns between frontend and backend layers

---

## License

This project is intended for educational purposes only. All brand names, images, and content are fictional and used solely for demonstration.

---

<p align="center">Made with ❤️ as a university learning project</p>
