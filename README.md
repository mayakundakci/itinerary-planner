# Itinerary Planner - Full Stack Application

This project is a Node.js-based web application that helps users create personalized travel itineraries by combining user preferences, location data, and external APIs for events and nearby places.

## Features

- **Landing Page**: A welcoming interface with navigation to begin planning your itinerary.
- **Dynamic Itinerary Generation**: Combines user preferences, location data, and API results.
- **Event and Place Recommendations**:
  - **Nearby Places**: Fetch restaurants, cafes, shopping centers, parks, and more.
  - **Local Events**: Suggest live events using Ticketmaster API.
- **Interactive Web Interface**: User-friendly forms to gather preferences and display results.

## API Usage

- **Google Places API**: Retrieves nearby attractions based on location and type.
- **Ticketmaster Discovery API**: Suggests live events within a given radius.

## Prerequisites

1. Install **Node.js** (version 14 or higher).
2. Obtain API keys:
   - **Google Places API Key** from [Google Cloud Console](https://console.cloud.google.com/).
   - **Ticketmaster API Key** from [Ticketmaster Developer Portal](https://developer.ticketmaster.com/).

Update the placeholders in the code:
```
key: 'YOUR_GOOGLE_PLACES_API_KEY'
apikey: 'YOUR_TICKETMASTER_API_KEY'''
```

## Installation and Setup
Clone the repository:

```
bash
git clone https://github.com/mayakundakci/itinerary-planner.git
cd itinerary-planner
```

Install dependencies:
```
bash
npm install
```

Start the server:
```
bash
node server.js
```

Open your browser and visit: http://localhost:3000

## Application Structure

- **Landing Page**:
  - File: index.ejs
  - Purpose:Introduces the application and provides a link to start planning.
- **Preferences Page**:
  - File: preferences.ejs
  - Purpose: Collects user input for Location (autofilled via Geolocation API) and Preferences (e.g., restaurants, parks, events)
- **Itinerary Page**:
  - File: itinerary.ejs
  - Purpose: Displays a personalized itinerary with recommendations for the selected preferences


## Troubleshooting

- **Geolocation Issues**:
  - Ensure the browser allows location access
  - For deployment, serve the site over HTTPS (except for localhost)
- **API Key Problems**:
Check if the API keys are valid and have the correct permissions
- **Empty Results**:
Ensure your location has attractions or events within the specified search radius.
