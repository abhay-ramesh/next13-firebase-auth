This is a Next.js 13(App Dir.) template for Firebase Auth.

## Getting Started

### Things to know
- Both Firebase Auth(Client Side) and Firebase Admin(Server Side in SSR/API) is Used
- Will be using the app directory for all the pages.
- Built with Typescript
- Added Tailwindcss
---
### App Dir. Folder Structure
*Other Detailed routes are not mentioned to keep it simple.*
- app/
  - (app)/        \# Here we will have our main protected route for authenticated users.
    - dashboard/
      - page.tsx
    - layout.tsx  \# Checking if authenticated else redirect to signin
  - (auth)/       \# For sigin, signup, reset-password...
    - sigin/
      - page.tsx
    - layout.tsx
  - (marketing)   \# Main Place for public Website content (SEO)
    - contactUs/
      - page.tsx
    - layout.tsx
    - page.tsx
---
### Files
layout.tsx in app, auth route groups will be used to check if authenticated or not

You can move (auth) grouped route inside (app) grouped route by nesting as per your prefrence

\<GoogleOneTap/> Is also used for google one tap signin inside (marketing) and in (auth) for just the button
