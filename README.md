# Football Team Builder

[A web application for searching and filtering football players, and building custom teams with specific formations.]

## Live Demo

You can view a live demo of the application here:
[https://football-team-builder-sigma.vercel.app/](https://football-team-builder-sigma.vercel.app/)

## Features

- Player searching with debounced input
- Filter players by: position, country, club, age, and market value
- Create custom teams with selectable formations
- Example: Select players for your team
- Example: View team statistics
- Example: Save/load teams

## Tech Stack

- React.js
- Vite
- Material UI (MUI)
- Tailwind CSS

## Repository

[https://github.com/hassanmehedi1/Football-Team-Builder](https://github.com/hassanmehedi1/Football-Team-Builder)

## Running Locally

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/hassanmehedi1/Football-Team-Builder.git
    cd Football-Team-Builder
    ```

2.  **Install dependencies:**
    Make sure you have Node.js and npm (or yarn) installed.
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory of the project.
    Copy the contents of `.env.example` into your new `.env` file.
    ```bash
    cp .env.example .env
    ```
    Fill in the required API keys and other environment variables in the `.env` file. You will need accounts/keys for:
    - API-Football (for player data)
    - RapidAPI (for Transfermarkt data)

4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    This will usually start the app on `http://localhost:5173` (Vite's default) or similar. Check your terminal output for the exact address.

5.  **Build for production:**
    ```bash
    npm run build
    # or
    # yarn build
    ```
    This creates a `dist` folder with the optimized production build.
