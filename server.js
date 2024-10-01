const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/preferences', (req, res) => {
  res.render('preferences');
});

app.post('/itinerary', async (req, res) => {
  const { location, preferences, budget, radius } = req.body;

  try {
    const selectedPreferences = Array.isArray(preferences) ? preferences : [preferences];
    const places = {};

    for (const preference of selectedPreferences) {
      if (preference === 'event') {
        places['event'] = await getEvents(location);
      } else {
        places[preference] = await getNearbyPlace(location, preference);
      }
    }

    res.render('itinerary', { location, preferences: selectedPreferences, places });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred');
  }
});

async function getEvents(location) {
  const now = new Date();
  const startDateTime = now.toISOString().split('.')[0] + 'Z';
  const endDateTime = new Date(now.setDate(now.getDate() + 1)).toISOString().split('.')[0] + 'Z';

  const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
    params: {
      apikey: '7QWr1kBaO0qojRvnhyEV4UImcgPA8oAP',
      latlong: location,
      radius: 50,  
      unit: 'miles',
      startDateTime: startDateTime,
      endDateTime: endDateTime
    }
  });

  return response.data._embedded ? response.data._embedded.events[0] : null;
}


// async function getEvents(location) {
//     const now = new Date();
//     const startDateTime = now.toISOString().split('.')[0] + 'Z'; // Format: YYYY-MM-DDTHH:mm:ssZ
//     const endDateTime = new Date(now.setDate(now.getDate() + 1)).toISOString().split('.')[0] + 'Z'; // Format: YYYY-MM-DDTHH:mm:ssZ
  
//     const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
//       params: {
//         apikey: '7QWr1kBaO0qojRvnhyEV4UImcgPA8oAP',
//         latlong: location,
//         radius: 50,
//         unit: 'miles',
//         startDateTime: startDateTime,
//         endDateTime: endDateTime
//       }
//     });
  
//     return response.data._embedded ? response.data._embedded.events[0] : null;
//   }
  
async function getNearbyPlace(location, type) {
  const params = {
    location: location,
    radius: 15 * 1609.34,  // Convert miles to meters for the Google Places API
    type: type,
    key: 'AIzaSyD-EGHLxfwmmjD9ng1VqFIerokP61ku5GA'
  };

  if (type === 'restaurant' && budget) {
    params.minprice = 0;
    params.maxprice = budget - 1;
  }

  const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', { params });
  return response.data.results[0];
}


async function getNearbyPlace(location, type, budget = null) {
  const params = {
    location: location,
    radius: 5000,
    type: type,
    key: 'AIzaSyD-EGHLxfwmmjD9ng1VqFIerokP61ku5GA'
  };

  if (type === 'restaurant' && budget) {
    params.minprice = 0;
    params.maxprice = budget - 1;
  }

  const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, { params });
  return response.data.results[0];
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
