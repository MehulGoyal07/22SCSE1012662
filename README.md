# URL Shortener Microservice - Full Stack Implementation

## Overview
A full-stack URL shortener application with:
- Backend microservice (Node.js/Express)
- Frontend web app (React with Vanilla CSS)
- Custom logging middleware integrated throughout

## Features
### Backend
- Create short URLs with optional custom shortcodes
- Set custom validity period (default: 30 minutes)
- Redirect to original URL when shortcode is accessed
- Detailed analytics for each short URL
- Comprehensive error handling

### Frontend
- Create up to 5 shortened URLs simultaneously
- View statistics for all created URLs
- Responsive design for mobile and desktop
- Client-side validation

## Technical Stack
- **Backend**: Node.js, Express
- **Frontend**: React, Vanilla CSS
- **Database**: In-memory storage (can be replaced with persistent DB)
- **Logging**: Custom middleware integrated with evaluation service

## Installation

### Backend
```bash
cd backend
npm install
npm start