# Understanding Favorites Storage in the Backend

This document explains how the "favorites" feature currently stores data in the backend and the implications of this approach.

## 1. In-Memory Storage

The backend server, as implemented in `Backend/index.ts`, stores the list of favorite tool IDs **in memory**.

This means that when you add a tool to your favorites, its ID is added to an array that exists only while the backend server process is running.

## 2. Consequence: Loss of Favorites on Restart

The direct and most important consequence of in-memory storage is that **if the backend server is stopped and then restarted, all previously saved favorites will be lost.**

Every time you execute `bun run index.ts` to start the server, the list of favorites is effectively reset.

## 3. Why This Happens: Code Initialization

This behavior is due to the following line in `Backend/index.ts`:

```typescript
let favorites: number[] = [];
```

This line declares a variable named `favorites` and initializes it as an empty array. This initialization occurs every single time the server script starts up. Therefore, any data stored in the `favorites` array from a previous session is not preserved.

## 4. Persistent Storage (Beyond Current Scope)

To make favorites persist across server restarts, a more permanent storage solution would be required. Common approaches include:

*   **Databases:** Using a database system like SQLite (simple, file-based), PostgreSQL (robust, relational), or MongoDB (NoSQL, document-based) to store the favorites.
*   **File Storage:** Writing the list of favorite IDs to a file on the server (e.g., a JSON file) and reading from this file when the server starts.

**Important Note:** Implementing persistent storage is a significant feature enhancement and is generally outside the scope of troubleshooting why existing API routes might not be "working fine," *unless* the user's specific issue is that they expect favorites to persist between server restarts.

If your API calls for adding, fetching, and deleting favorites are working correctly within a single server session (as verifiable with the `curl` commands in `TEST_API_ENDPOINTS.md`), then the routes themselves are likely functional. The loss of data across restarts is an expected outcome of the current in-memory storage design.
