# Sweet Shop Management System

## Overview

This is a comprehensive Sweet Shop Management System built with modern web technologies. The application allows users to browse, purchase, and manage a candy inventory through both customer and administrative interfaces. The system features a React frontend with shadcn/ui components, an Express.js backend, and PostgreSQL database integration through Drizzle ORM. The application supports user authentication, shopping cart functionality, favorites management, and complete inventory administration for shop owners.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: shadcn/ui components built on top of Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design system featuring Material Design principles
- **State Management**: TanStack Query for server state management and React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Animations**: Framer Motion for smooth page transitions and micro-interactions

### Backend Architecture
- **Runtime**: Node.js with TypeScript for type safety
- **Framework**: Express.js for RESTful API endpoints
- **Database ORM**: Drizzle ORM for type-safe database operations and migrations
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage
- **Development**: tsx for TypeScript execution and hot reloading

### Database Design
- **Database**: PostgreSQL (via Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **User Management**: Users table with username/password authentication
- **Connection**: Neon serverless driver with WebSocket support for optimal performance

### Component Architecture
- **Design System**: Consistent component library with proper TypeScript interfaces
- **Layout System**: Sidebar navigation with responsive mobile support
- **Theme Support**: Light/dark mode theming with CSS custom properties
- **Loading States**: Skeleton components and loading indicators for better UX
- **Modal System**: Dialog components for cart, product details, and admin operations

### Data Flow
- **API Layer**: RESTful endpoints with proper error handling and logging middleware
- **Type Safety**: Shared TypeScript interfaces between frontend and backend
- **Validation**: Zod schemas for runtime type validation
- **Error Handling**: Comprehensive error boundaries and toast notifications

### Authentication System
- **Session-based**: Server-side sessions with HTTP-only cookies
- **User Roles**: Basic user and admin role differentiation
- **Storage Interface**: Abstracted storage layer for easy testing and database switching

### Development Features
- **Hot Reloading**: Vite HMR for instant development feedback
- **Type Checking**: Strict TypeScript configuration across the entire stack
- **Path Aliases**: Clean import paths using TypeScript path mapping
- **Development Banner**: Replit integration for development environment detection

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query
- **Backend Framework**: Express.js with TypeScript support (tsx)
- **Database**: Neon PostgreSQL serverless, Drizzle ORM, connect-pg-simple

### UI and Styling
- **Component Library**: Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion for page transitions
- **Fonts**: Google Fonts (Roboto) for typography

### Development Tools
- **Build Tool**: Vite for fast development and optimized production builds
- **TypeScript**: Full TypeScript support with strict configuration
- **Linting**: ESBuild for production bundling
- **Development**: Replit plugins for cartographer and error overlay

### Utility Libraries
- **Date Handling**: date-fns for date manipulation
- **Styling Utilities**: clsx and tailwind-merge for conditional styling
- **Validation**: Zod for schema validation and type inference
- **Class Variants**: class-variance-authority for component variant management

### Third-party Integrations
- **Neon Database**: Serverless PostgreSQL hosting
- **WebSocket Support**: ws package for Neon WebSocket connections
- **Session Storage**: PostgreSQL-backed session management
- **Development Environment**: Replit-specific tooling and banner integration