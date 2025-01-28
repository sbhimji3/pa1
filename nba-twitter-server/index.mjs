import express from 'express';
import db from './db.js';

const app = express();
app.use(express.json());
app.get('/name', (req, res) => {
  res.json({ name: 'Saim' });
});

app.post('/visit', async (req, res) => {
  const { name } = req.body;

  const visitsRef = db.ref(`visits/${name}`);
  const snapshot = await visitsRef.once('value');

  try {
    const visitsRef = db.ref(`visits/${name}`); // Reference to the `visits` node
    const snapshot = await visitsRef.once('value'); // Retrieve the current data

    if (snapshot.exists()) {
      const currentVisits = snapshot.val(); // Get the current visits count
      await visitsRef.set(currentVisits + 1); // Increment the visit count
      return res.status(200).json({
        name: name,
        visits: currentVisits + 1,
      });
    } else {
      // If the name doesn't exist, create a new entry
      await visitsRef.set(1);
      return res.status(200).json({
        name: name,
        visits: 1,
      });
    }
  } catch (error) {
    console.error('Error updating visits:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/test', (req, res) => {
  // Log the body of the request
  console.log('Received data:', req.body);

  // Send a JSON response back
  res.status(200).json({
    message: 'Test endpoint hit successfully',
    receivedData: req.body,
  });
});

app.listen(8080, () => {
  console.log(
    'Server is running on port 8080. Check the app on http://localhost:8080'
  );
});
