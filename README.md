# Globetrotter Game - Full-Stack Web Application

Welcome to **Globetrotter Game**, an interactive travel guessing game that presents users with cryptic clues about famous destinations. Users need to guess the correct destination based on the given clues, and once they guess correctly, they unlock fun facts and trivia about the destination!

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [How to Seed Data](#how-to-seed-data)
- [Run the Application](#run-the-application)
- [Testing](#testing)
- [License](#license)

---

## Features

1. **Travel Guessing Game**: Players get cryptic clues about a destination and select from a list of options.
2. **Feedback & Fun Facts**: Immediate feedback is provided with funky animations and destination trivia.
3. **Score Tracker**: Tracks user scores across correct and incorrect answers.
4. **Challenge a Friend**: Players can challenge their friends by sharing a dynamic invite link.
5. **AI Integration**: Uses AI tools to generate and expand the dataset of destinations.
6. **Extensibility**: The game is designed to scale with additional features like timed gameplay, image-based clues, etc.

---

## Tech Stack

- **Frontend**:

  - React.js
  - Next.js 15+
  - Tailwind CSS
  - Framer Motion
  - Lottie for animations
  - Sonner for notifications
  - Axios for API calls

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose for database interactions
  - Seed data from `cities.json`
  <!-- - **Development Tools**:
  - Jest for testing
  - Postman for API testing
  - ESLint, Prettier for code formatting -->

---

## Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dontdude/Globetrotter-Challenge.git
   cd Globetrotter-Challenge
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `client` directory and configure it with your MongoDB connection string and other necessary environment variables (e.g., API keys).

   Example:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
   NEXT_PUBLIC_CLOUDINARY_NAME=your-cloudinary-name
   NEXT_PUBLIC_BASE_IMAGE_ID=your-cloudinary-image-id
   ```

   - `NEXT_PUBLIC_API_BASE_URL`: The base URL for your backend API.
   - `NEXT_PUBLIC_CLOUDINARY_NAME`: Your Cloudinary cloud name.
   - `NEXT_PUBLIC_BASE_IMAGE_ID`: The base image ID for your Cloudinary images.

4. Run the frontend in development mode:

   ```bash
   npm run dev
   ```

5. The application will be available at `http://localhost:3000`.

---

## Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. **Database Configuration**: Update the `.env` file with your MongoDB connection details:
   ```
   MONGO_URI=your_mongo_connection_string
   ```

---

## How to Seed Data

The `seedData.js` script is used to populate the MongoDB database with initial data. It reads the `cities.json` file and inserts the data into the database.

To run the seed command:

1. Navigate to the `server` directory if you're not already there:

   ```bash
   cd server
   ```

2. Run the seed data script:
   ```bash
   npm run seed
   ```

This command will:

- Connect to your MongoDB database using the connection string defined in the `.env` file.
- Read the data from the `cities.json` file located in the `server/data` folder.
- Insert the cities and their corresponding clues into the `City` collection in the database.

Once the seed data is populated, the backend is ready to serve the game data to the frontend.

---

## Run the Application

1. **Start the Backend Server**:
   In the `server` folder, run the following command to start the backend:

   ```bash
   npm run dev
   ```

2. **Frontend**:
   In the `client` folder, run the following command to start the frontend:
   ```bash
   npm run dev
   ```

Now, you can access the application by visiting `http://localhost:3000`.

---

<!-- ## Testing

1. **Frontend Tests**:
   - Run the following command to run unit tests for the frontend:
     ```bash
     npm run test
     ```

2. **Backend Tests**:
   - In the `server` directory, run the following command to run the backend tests:
     ```bash
     npm run test
     ```

--- -->

## License

This project is licensed under the MIT License.
