# My Feelings Today - Emotion Tracker for Kids

## Overview

This is an interactive emotion tracking application designed for children to identify and record their feelings throughout the day. The application uses a colorful, engaging interface with emojis and animations to help kids express how they feel during different times of the day (morning, afternoon, evening). Built with React, TypeScript, and modern web technologies, it provides a safe, encouraging environment for emotional awareness and expression.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**UI Component System**: The application uses Radix UI primitives wrapped with custom styling through shadcn/ui components, providing accessible and composable UI elements. Tailwind CSS handles all styling with a custom design system defined in the config.

**State Management**: Zustand is used for global state management with three primary stores:
- `useEmotions`: Manages emotion selections, time-of-day tracking, and summary display
- `useAudio`: Controls sound effects and background music, including mute state
- `useGame`: Handles game phase states (ready, playing, ended) - appears to be legacy from a template

**Animation System**: Framer Motion powers all animations including card interactions, transitions, and positive feedback messages. The application heavily relies on spring physics and stagger animations for a playful feel.

**3D Graphics**: React Three Fiber and Drei provide 3D rendering capabilities (configured but may not be actively used in current emotion tracker functionality). GLSL shader support is available via vite-plugin-glsl.

**Design Rationale**: The component-first architecture allows for high reusability while maintaining consistency. The animation-heavy approach creates an engaging, game-like experience appropriate for the target audience (children).

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js

**Development vs Production**: 
- Development uses Vite's middleware mode with HMR for instant updates
- Production serves pre-built static assets from the dist directory
- Both modes use the same Express app configuration with different serving strategies

**API Structure**: RESTful API pattern with routes prefixed by `/api`. Currently minimal backend logic as the application is primarily client-side with local state.

**Session Management**: Infrastructure for connect-pg-simple suggests session storage capability, though not actively implemented in current routes.

**Rationale**: The lightweight backend serves primarily as a static file server with room to grow. Separating dev and production entry points allows for optimal developer experience while maintaining production performance.

### Data Storage

**ORM**: Drizzle ORM configured for PostgreSQL with schema definitions in TypeScript

**Database**: PostgreSQL via Neon serverless driver (`@neondatabase/serverless`)

**Schema Definition**: Single `users` table defined with id, username, and password fields. Schema uses Drizzle's declarative API with Zod validation schemas for type safety.

**Migration Strategy**: Drizzle Kit handles migrations with schema defined in `shared/schema.ts` and migrations output to `./migrations` directory.

**Temporary Storage**: `MemStorage` class implements in-memory storage for development/testing, mirroring the database interface without persistence.

**Rationale**: While database infrastructure exists, the current emotion tracking features rely on client-side state. The database setup suggests future features may include user accounts and persistent emotion history. The abstraction layer (`IStorage` interface) allows swapping between in-memory and database storage seamlessly.

### External Dependencies

**UI Framework**:
- React ecosystem: react, react-dom, @vitejs/plugin-react
- Radix UI: Comprehensive set of accessible component primitives
- Tailwind CSS with PostCSS for utility-first styling
- class-variance-authority and clsx for conditional styling
- Framer Motion for animations

**3D Graphics**:
- @react-three/fiber: React renderer for Three.js
- @react-three/drei: Helper components for R3F
- @react-three/postprocessing: Post-processing effects

**Database & ORM**:
- Drizzle ORM with drizzle-kit for migrations
- @neondatabase/serverless for PostgreSQL connectivity
- Zod for schema validation

**Development Tools**:
- Vite for build tooling and dev server
- TypeScript for type safety
- esbuild for production server bundling
- tsx for TypeScript execution in development

**State Management**:
- Zustand for global state with middleware support
- @tanstack/react-query for server state (configured but minimal usage)

**Utilities**:
- date-fns for date manipulation
- nanoid for unique ID generation
- cmdk for command menu functionality

**Font Loading**: @fontsource/inter provides the Inter font family locally