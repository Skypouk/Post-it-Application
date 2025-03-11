# 🗒️ Sticky Notes React

Drag & Drop sticky notes App built with React JS and FastAPI GraphQL.

### Features

-   🏷️ Drag and Drop notes anywhere on screen
-   💾 Save note data, position, and color in the database
-   🎨 Change note color at any time
-   🔍 Auto-grow note size as data is input
-   🔄 Auto-save notes as you add data.

### Setup Instructions

-   📌 Clone repo:
    ```
    git clone <REPO URL>
    ```

-   📄 Create `.env` files in both `api/` and `front/` repositories (use `.env.example` as a reference) and update credentials.
-   📂 Install dependencies and run the frontend server:
    ```sh
    cd front
    npm i
    npm run dev
    ```
-   ⚡ Set up the FastAPI backend with the database:
    ```sh
    cd api
    ```
-   🛠️ Create and activate a virtual environment
-   📦 Install requirements
-   🚀 Launch backend:
    ```sh
    uvicorn src.main:app --reload
    ```