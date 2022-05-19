const express = require('express');
const cors = require('cors');
const lyricsFinder = require('lyrics-finder');

const app = express();

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/lyrics', async (req, res) => {
  try {
    const lyrics = await lyricsFinder(req.query.artist, req.query.track) || "No Lyrics Found";
    res.json({ lyrics });
  } catch(ex) {
    console.log(ex);
  }
});

const init = async () => {
  try {
    const port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch(ex) {
    console.log(ex);
  }
};

init();