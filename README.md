# 🗒️ Post-it App

Drag & Drop sticky notes application built with React JS and FastAPI GraphQL.

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

### More about the Post-it App

Welcome to the Post-it App! This is a simple yet powerful drag-and-drop sticky notes application built with React JS and FastAPI using GraphQL for managing the backend. Whether you're jotting down quick ideas, to-do lists, or reminders, this app lets you create and organize your notes with ease.

With features like note color customization, auto-growing sizes, and auto-save, it’s designed to be both fun and functional. The app is fully responsive, so you can use it on any device, and your notes will stay safe with the backend database.

Before diving into the code, check out how the app works in the video below!
[Click here to watch the demo video](https://raw.githubusercontent.com/Skypouk/Post-it-Application/main/front/src/assets/postit_demo_video.mp4)

![Overview](https://raw.githubusercontent.com/Skypouk/Post-it-Application/main/front/src/assets/postit_overview.png)
