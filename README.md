---

# GPT-based Chat Application

## Backend (Express Server)

### 1. Overview
The backend, built with Express, serves as an intermediary between the frontend and Longshot.ai API. Utilizes MongoDB for storing chat history.

### 2. Dependencies
- **express:** Handles HTTP requests and responses.
- **mongoose:** ODM library for MongoDB interaction.
- **node-fetch:** Enables fetching data from Longshot.ai API.
- **cors:** Manages Cross-Origin Resource Sharing.
- **dotenv:** Loads environment variables.

### 3. Database Setup
Connects to MongoDB Atlas using the mongoose library. On successful connection, logs a success message; on an error, logs the error message. The application uses the ChatMessage model based on a predefined schema to interact with the database.

### 4. Endpoints
- **/api/chat-history (GET):** Retrieves chat history from the MongoDB database.
- **/api/delete-chat-history (DELETE):** Deletes a specific chat message based on the provided _id. Updates the local chat history array (if applicable).
- **/api/add-message (POST):** Adds a new message to the chat history in the MongoDB database.
- **/api/chat (POST):** Sends user input to the Longshot.ai API. Adds the generated assistant message to the chat history in the MongoDB database.
- **/api/title (POST):** Generates a title using Longshot.ai based on the provided input.
- **/ (GET):** A simple route returning "Hello World."

### 5. Environment Variables
Utilizes environment variables for configurations such as PORT, MONGODB_URI, and LONGSHOT_API_KEY.

### 6. MongoDB Schema
Defines a ChatMessage schema to structure the chat messages stored in the database.

### 7. Error Handling
Logs errors and returns appropriate HTTP responses for better error traceability.

### 8. Longshot API Integration
Utilizes the Longshot.ai API to generate responses and titles.

### 9. Port Configuration
Listens on the provided port or defaults to 8080.

### 10. Logging
Utilizes console logging for key events such as successful MongoDB connections and errors.

## Frontend (React)

### 1. Overview
Built using React, a JavaScript library for building user interfaces.

### 2. Components
- **Chat Component:** Manages user input, chat history, and interactions with the backend. Displays chat messages and titles.

### 3. User Interaction
Users can type messages in the input field and send them to the backend. Clicking on examples populates the input field. Users can delete entries from the chat history.

### 4. Fetching Data
`fetchChatHistory` retrieves chat history from the server on component mount. Data is fetched from the backend on user input and deletion actions.

### 5. Sending Messages
User messages are sent to the backend using the /api/chat endpoint. Generated assistant messages are displayed in the chat.

### 6. Generating Titles
Titles are generated using the /api/title endpoint and added to the chat history.

### 7. Periodic Updates
The frontend periodically fetches chat history to keep it updated.

## Conclusion
This chat application seamlessly integrates a React frontend with an Express backend, providing a user-friendly interface for interacting with the Longshot.ai API. The modular structure and use of local storage ensure data persistence and a smooth user experience. Error handling and periodic updates contribute to the application's robustness and reliability.

---
