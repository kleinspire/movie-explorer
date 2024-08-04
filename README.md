# Installing

- `yarn install` or `npm install`

The app doesn't make requests to the TMDB api directly, but to the local api server running on https://localhost:4000 which forwards requests to the TMDB api server and it uses the api key set as an environment variable to do it. It's not a good idea to expose sensitive information in the version control so you'll have to create .env file in the root directory and put your TMDB_API_KEY=Your_Api_Key in there.

# Development

- `yarn dev` or `npm run dev`
- Open [http://localhost:5173](http://localhost:45173)

# Linting and testing

- `yarn lint` or `npm run lint`
- `yarn test` or `npm test`
- `yarn coverage` or `npm run coverage`

# Building and previewing production version

- `yarn build` or `npm run build`
- `yarn preview` or `npm run preview`
- Open [http://localhost:4173](http://localhost:4173)

# Generating and viewing documentation

- `yarn build:docs` or `npm run build:docs`
- Use your browser to open index.html in the docs folder
