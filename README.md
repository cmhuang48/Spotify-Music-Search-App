# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

### Go to Spotify Developer and Register App

#### Add Redirect URL: http://localhost:3000/redirect

#### Copy Client ID

### Open VS Code

#### Create .env file in client folder with following:

`REACT_APP_CLIENT_ID = 'SPOTIFY_CLIENT_ID' <-- (Paste Client ID here)`
`REACT_APP_AUTHORIZE_URL = https://accounts.spotify.com/authorize`
`REACT_APP_REDIRECT_URL = http://localhost:3000/redirect`

## Available Scripts

### In CLI server folder:

`npm i`
`npm run start:dev`

### In CLI client folder:

`npm i`
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
