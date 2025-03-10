# Sticky Notes React

Drag & Drop sticky notes App built with React JS and FastAPI GraphQL.

### Features

-   Drag and Drop notes anywhere on screen
-   Save note data, position and color in database
-   Change note color at anytime
-   Autogrow note size as data is input
-   Autosave notes as you add data.

### Setup instructions

-   Clone repo: `git clone <REPO URL>`
-   Install dependencies and run server: `cd front` + `npm i` + `npm run dev`
-   Setup FastAPI backend with database: `cd api`
-   Create and activate venv
-   Install requirements
-   Lunch backend: `uvicorn src.main:app --reload`
-   Create `.env` file (use `.env.example` as a reference) and update appwrite credentials
