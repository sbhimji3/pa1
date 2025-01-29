import express from 'express';
import db from './db.js';
import NewsAPI from 'newsapi';

const app = express();
app.use(express.json());

const newsapi = new NewsAPI('0f35ff4efc994e1ea640beae9eda2d7d');

app.get('/name', (req, res) => {
  res.json({ name: 'Saim' });
});

app.get('/recent-searches', async (req, res) => {
  const namesRef = db.ref('names').limitToLast(5); // Limit to last 5 names

  try {
    const snapshot = await namesRef.once('value');

    if (snapshot.exists()) {
      const names = snapshot.val();
      return res.status(200).json({ names });
    } else {
      return res.status(200).json({ names: [] });
    }
  } catch (error) {
    console.error('Error fetching recent searches:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/search', async (req, res) => {
  const { name } = req.body;

  const namesRef = db.ref('names');

  try {
    const snapshot = await namesRef.once('value');

    let names = [];
    if (snapshot.exists()) {
      names = snapshot.val(); 

      
      if (!names.includes(name)) {
        names.push(name);
        await namesRef.set(names)
      } else {
        return res.status(200).json({ message: `${name} already exists in the database.`, names });
      }
    } else {
      
      names.push(name);
      await namesRef.set(names); 
    }

    // Respond with the updated list of names
    return res.status(200).json({ message: `Added ${name} to the database.`, names });
  } catch (error) {
    console.error('Error storing names:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});






app.get('/news', async (req, res) => {
  const { text } = req.query;

  newsapi.v2
    .everything({
      q: text,
      sources:
        'fox-sports, espn, bleacher-report, bbc-sport, four-four-two, nfl-news',
      from: '2025-01-25',
      language: 'en',
    })
    .then((response) => {
      console.log(response);
      res.json(response);
    });
});

app.listen(8080, () => {
  console.log(
    'Server is running on port 8080. Check the app on http://localhost:8080'
  );
});
