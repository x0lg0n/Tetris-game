# Testing API Endpoints with cURL

This guide provides `curl` commands to test each of the API endpoints defined in `Backend/index.ts`. Ensure your backend server is running before executing these commands. The default URL used is `http://localhost:3001`. If your server runs on a different port, please adjust the port number in the commands.

## 1. Health Check

**Purpose:** Verify that the API is running and accessible.
**Endpoint:** `GET /api/health`

**Command:**
```bash
curl http://localhost:3001/api/health
```

**Expected Response:**
*   **Status Code:** `200 OK`
*   **JSON Body:**
    ```json
    {
      "status": "OK",
      "message": "AI Tools API is running",
      "timestamp": "YYYY-MM-DDTHH:mm:ss.sssZ", // The timestamp will vary
      "stats": {
        "totalTools": 20, // This number may vary based on data.ts
        "favoriteCount": 0 // This number will vary based on tested favorite operations
      }
    }
    ```
    *(Note: The `timestamp` and `stats.favoriteCount` will vary. `stats.totalTools` depends on the initial data.)*

## 2. Get Categories

**Purpose:** Retrieve a list of all unique AI tool categories.
**Endpoint:** `GET /api/categories`

**Command:**
```bash
curl http://localhost:3001/api/categories
```

**Expected Response:**
*   **Status Code:** `200 OK`
*   **JSON Body:** An array of strings (category names), sorted alphabetically.
    ```json
    [
      "Audio",
      "Coding",
      "Design",
      "Image Generation",
      "Productivity",
      "Research",
      "Video",
      "Writing"
    ]
    ```
    *(Note: The exact list of categories depends on the `data.ts` file.)*

## 3. Get Tools

**Purpose:** Retrieve AI tools, either all or filtered by category.
**Endpoint:** `GET /api/tools`

### Test 3.1: Get all tools

**Command:**
```bash
curl http://localhost:3001/api/tools
```

**Expected Response:**
*   **Status Code:** `200 OK`
*   **JSON Body:** A JSON array of all AI tool objects defined in `data.ts`.
    ```json
    [
      { "id": 1, "name": "ChatGPT", "category": "Writing", ... },
      { "id": 2, "name": "Claude", "category": "Writing", ... },
      ...
    ]
    ```

### Test 3.2: Get tools by a valid category

**Command (using "Writing" as an example):**
```bash
curl http://localhost:3001/api/tools?category=Writing
```

**Expected Response:**
*   **Status Code:** `200 OK`
*   **JSON Body:** A JSON array of AI tool objects belonging to the "Writing" category.
    ```json
    [
      { "id": 1, "name": "ChatGPT", "category": "Writing", ... },
      { "id": 2, "name": "Claude", "category": "Writing", ... },
      { "id": 7, "name": "Grammarly", "category": "Writing", ... },
      ...
    ]
    ```
    *(Note: The exact tools returned will depend on `data.ts`.)*

### Test 3.3: Get tools by a non-existent category

**Command:**
```bash
curl http://localhost:3001/api/tools?category=NonExistentCategory
```

**Expected Response:**
*   **Status Code:** `200 OK`
*   **JSON Body:** An empty JSON array.
    ```json
    []
    ```

## 4. Add to Favorites

**Purpose:** Add a specific AI tool to the user's favorites list.
**Endpoint:** `POST /api/favorites`

### Test 4.1: Add a valid tool ID

**Command (using tool ID 1, "ChatGPT", as an example):**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"toolId": 1}' http://localhost:3001/api/favorites
```

**Expected Response:**
*   **Status Code:** `201 Created`
*   **JSON Body:**
    ```json
    {
      "message": "ChatGPT added to favorites!",
      "toolId": 1
    }
    ```

### Test 4.2: Add the same tool ID again

**Command (assuming tool ID 1 is already a favorite):**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"toolId": 1}' http://localhost:3001/api/favorites
```

**Expected Response:**
*   **Status Code:** `409 Conflict`
*   **JSON Body:**
    ```json
    {
      "error": "Tool is already in favorites",
      "message": "ChatGPT is already in your favorites!"
    }
    ```

### Test 4.3: Add a non-existent tool ID

**Command (using tool ID 999 as an example):**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"toolId": 999}' http://localhost:3001/api/favorites
```

**Expected Response:**
*   **Status Code:** `404 Not Found`
*   **JSON Body:**
    ```json
    {
      "error": "Tool not found"
    }
    ```

### Test 4.4: Add with an invalid toolId (e.g., not a number)

**Command:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"toolId": "abc"}' http://localhost:3001/api/favorites
```

**Expected Response:**
*   **Status Code:** `400 Bad Request`
*   **JSON Body:**
    ```json
    {
      "error": "Valid toolId is required"
    }
    ```

## 5. Get Favorites

**Purpose:** Retrieve the list of AI tools that have been added to favorites.
**Endpoint:** `GET /api/favorites`

**Command:**
```bash
curl http://localhost:3001/api/favorites
```

**Expected Response:**
*   **Status Code:** `200 OK`
*   **JSON Body:** A JSON array of AI tool objects that are in the favorites list. If tool ID 1 was successfully added in Test 4.1 and not yet removed, it should appear here.
    ```json
    [
      { "id": 1, "name": "ChatGPT", "category": "Writing", ... }
      // ... other favorited tools
    ]
    ```
    If no tools are favorited, an empty array `[]` is expected.

## 6. Remove from Favorites

**Purpose:** Remove a specific AI tool from the user's favorites list.
**Endpoint:** `DELETE /api/favorites/:id`

### Test 6.1: Delete an existing favorite

**Command (assuming tool ID 1, "ChatGPT", is currently a favorite):**
```bash
curl -X DELETE http://localhost:3001/api/favorites/1
```

**Expected Response:**
*   **Status Code:** `200 OK`
*   **JSON Body:**
    ```json
    {
      "message": "ChatGPT removed from favorites",
      "toolId": 1
    }
    ```

### Test 6.2: Delete a non-existent favorite

**Command (e.g., tool ID 1 again after it's been removed, or an ID like 999 that was never a favorite):**
```bash
curl -X DELETE http://localhost:3001/api/favorites/1
```
or
```bash
curl -X DELETE http://localhost:3001/api/favorites/999
```

**Expected Response:**
*   **Status Code:** `404 Not Found`
*   **JSON Body:**
    ```json
    {
      "error": "Tool not found in favorites"
    }
    ```

### Test 6.3: Delete with an invalid ID format

**Command:**
```bash
curl -X DELETE http://localhost:3001/api/favorites/abc
```

**Expected Response:**
*   **Status Code:** `400 Bad Request`
*   **JSON Body:**
    ```json
    {
      "error": "Valid tool ID is required"
    }
    ```

---

Run these `curl` commands in your terminal while your backend server is running. Compare your actual responses to the expected outcomes to verify your API endpoints. Note any discrepancies for troubleshooting.
Remember that the favorites list is in-memory and will reset if you restart the server. Therefore, perform favorite-related tests (add, get, delete) within the same server session for accurate results.
