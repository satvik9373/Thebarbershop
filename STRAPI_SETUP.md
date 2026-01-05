# Strapi CMS Setup Guide

## Prerequisites
- Node.js 18+ installed
- Separate directory for Strapi backend

## 1. Create Strapi Project

```bash
npx create-strapi-app@latest barbershop-cms --quickstart
cd barbershop-cms
```

## 2. Create Collection Types

### Hero (Single Type)
1. Go to Content-Type Builder
2. Create Single Type: `hero-media`
3. Add fields:
   - `tagline` (Text - Short text)
   - `title` (Text - Short text)
   - `titleHighlight` (Text - Short text)
   - `description` (Text - Long text)
   - `primaryButtonText` (Text - Short text)
   - `primaryButtonLink` (Text - Short text)
   - `secondaryButtonText` (Text - Short text)
   - `secondaryButtonLink` (Text - Short text)
   - `media` (Media - Single media)

### Services (Single Type)
1. Create Single Type: `services`
2. Add fields:
   - `tagline` (Text - Short text)
   - `title` (Text - Short text)
   - `titleHighlight` (Text - Short text)
   - `items` (Component - Repeatable)
     - Create new component: `service-item`
     - Fields in component:
       - `title` (Text - Short text)
       - `subtitle` (Text - Short text)
       - `description` (Text - Long text)
       - `media` (Media - Single media)

### Gallery (Single Type)
1. Create Single Type: `gallery`
2. Add fields:
   - `tagline` (Text - Short text)
   - `title` (Text - Short text)
   - `titleHighlight` (Text - Short text)
   - `items` (Media - Multiple media)

## 3. Configure Permissions

1. Go to Settings → Users & Permissions Plugin → Roles → Public
2. Enable permissions for:
   - **hero-media**: `find`
   - **services**: `find`
   - **gallery**: `find`

## 4. Add Content

1. Go to Content Manager
2. Fill in Hero content and upload media
3. Fill in Services with items and images
4. Fill in Gallery with images/videos

## 5. Configure CORS (for development)

Edit `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:5173', 'http://localhost:4173'],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

## 6. Run Strapi

```bash
npm run develop
```

Access admin panel at: http://localhost:1337/admin

## 7. Update Frontend Environment

In your frontend project, update `.env`:

```
VITE_STRAPI_URL=http://localhost:1337
```

For production, update Vercel environment variables:
```
VITE_STRAPI_URL=https://your-strapi-backend.com
```

## 8. Deploy Strapi (Optional)

Deploy Strapi to:
- Railway (free tier)
- Render (free tier)
- Heroku
- DigitalOcean

Update VITE_STRAPI_URL with production URL.

## Usage

All content is now editable from Strapi admin dashboard at http://localhost:1337/admin
- Upload images/videos directly
- Update text content
- Changes reflect immediately on frontend
