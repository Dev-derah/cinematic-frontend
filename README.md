# Cinematic AI - AI-Powered Movie Recommendations

Cinematic AI is an AI-powered web application built with Next.js, Clerk for authentication, and TMDB API integration to provide personalized movie and TV show recommendations. This project leverages cutting-edge technologies to offer a seamless user experience with features such as user authentication, dynamic navigation, and mobile responsiveness.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites
Make sure you have the following installed:

- Node.js (version 16 or higher)
- npm, yarn, or pnpm (for package management)
- Bun (optional, if you prefer Bun for development)

## Installation
 Clone the repository:
```sh
git clone https://github.com/your-username/cinematic-ai.git
cd cinematic-ai
```

## Install dependencies:

#### Configure environment variables:
- Create a .env.local file in the root directory.
- Add the following environment variables:
```sh
NEXT_PUBLIC_TMDB_API_KEY=<your_tmdb_api_key>
NEXT_PUBLIC_CLERK_FRONTEND_API=<your_clerk_frontend_api_key>
NEXT_PUBLIC_BACKEND_URL=<your_backend_api_url> # Optional
```

### Running the Development Server
To start the development server, run:
```sh
npm run dev
 or
yarn dev
 or
pnpm dev
 or
bun dev
```

Open http://localhost:3000 in your browser to view the app.

### Building for Production
To build the app for production:
```sh
npm run build
or
yarn build
To preview the production build locally:

npm run start
or
yarn start
```
### Features

User Authentication: Powered by Clerk, allowing users to sign up, log in, and manage their profiles.
Personalized Recommendations: Uses AI to analyze user preferences and recommend movies and TV shows.
TMDB Integration: Fetches real-time movie and TV show data.
Mobile-Responsive UI: Fully responsive design for seamless use on desktop and mobile devices.
Dynamic Navigation: Intuitive navigation bar with dropdowns for quick access to features.
Interactive Chat Interface: Engage with AI to discover tailored recommendations.
Dark Theme: Sleek, modern design with a focus on readability and aesthetics.
Technologies Used

### Frontend:
- Next.js (React Framework)
- Tailwind CSS (Styling)
- React Icons (Iconography)
- React Typed (Dynamic Typing Animation)
- Authentication:
- Clerk (User Authentication and Management)
- Backend API:
- TMDB API (Movie and TV Show Data)
- Deployment:
- Vercel (Hosting and CI/CD)


### Development Workflow

##### Authentication Setup:
Ensure the Clerk frontend API key is configured in .env.local.

##### TMDB API Integration:
Add your TMDB API key to fetch movie and TV data.

##### Component Development:
Reuse modular components like Dropdown and UserInfo to maintain DRY principles.

##### Testing:
Test your app in various screen sizes to ensure mobile responsiveness.

##### Deployment:
Deploy the app to Vercel using the command:
vercel

### Contact

For questions or support, please contact:

Email: derah.dev@gmail.com
