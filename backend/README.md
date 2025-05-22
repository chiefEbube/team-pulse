# TeamPulse Backend

TeamPulse is a lightweight internal web app to help companies manage team status updates and availability. This repository contains the NestJS backend API.

## Features

- Authentication with Supabase Auth
- Role-based access control (Admin and Team Member roles)
- Team management
- Status updates tracking
- User invitations

## Tech Stack

- NestJS (REST API)
- TypeScript
- Supabase (PostgreSQL Database and Auth)
- JWT Authentication

## Project Structure

```
src/
├── auth/                  # Authentication related code
│   ├── decorators/        # Custom decorators
│   ├── guards/            # Auth guards for routes
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
├── common/                # Shared code
│   ├── models/            # TypeScript interfaces for data models
├── status/                # Status feature module
│   ├── dto/               # Data Transfer Objects
│   ├── status.controller.ts
│   ├── status.module.ts
│   └── status.service.ts
├── team/                  # Team feature module
│   ├── dto/
│   ├── team.controller.ts
│   ├── team.module.ts
│   └── team.service.ts
├── user/                  # User feature module
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.service.ts
├── supabase/              # Supabase connection
│   ├── supabase.module.ts
│   └── supabase.service.ts
├── app.module.ts
└── main.ts
```

## API Endpoints

### Authentication
The application uses Supabase Auth for authentication. JWT tokens from Supabase are used to authenticate API requests.

### Status Endpoints
- `POST /status` - Create/update user status
- `GET /team/:id/statuses` - Get statuses for a team

### Team Endpoints
- `POST /team` - Create a new team (admin only)
- `POST /team/invite` - Invite a user to a team (admin only)

### User Endpoints
- `GET /user/me` - Get current user profile
- `GET /user/teams` - Get teams for current user

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Supabase account

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-service-key
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
PORT=3000
NODE_ENV=development
```

### Database Setup
1. Create a new Supabase project
2. Run the SQL migrations from the `supabase/migrations` folder in the Supabase SQL editor

### Installation
```bash
# Install dependencies
npm install

# Run the development server
npm run start:dev

# Build for production
npm run build
npm run start:prod
```

## Token Handling
The backend validates JWT tokens issued by Supabase Auth. It extracts the user ID and role from the token to authorize requests based on the user's permissions.

## Testing
```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e
```