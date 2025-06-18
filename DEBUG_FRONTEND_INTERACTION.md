# Debugging Frontend API Interactions

This guide provides advice on how to debug issues related to the frontend's interaction with the backend API.

## 1. Frontend API Code (`Frontend/src/api.ts`)

A review of the code in `Frontend/src/api.ts` suggests that the functions for making API calls to the backend (e.g., `fetchTools`, `addFavorite`, `removeFavorite`, `fetchCategories`, `fetchFavorites`) are correctly defined in principle. They are structured to interact with the endpoints specified by the backend.

However, issues can still arise during the actual interaction between the live frontend and the running backend. These issues could stem from incorrect data being passed, unexpected responses being received, or problems in how the frontend processes these responses.

## 2. Using Browser Developer Tools

When you encounter issues in the frontend where data is not displaying correctly, actions don't seem to work, or errors appear, the browser's built-in developer tools are your primary resource for debugging.

To open them, right-click anywhere on the page in your browser (e.g., Chrome, Firefox, Edge) and select "Inspect" or "Inspect Element". This will open a panel, usually at the bottom or side of your browser window.

### Network Tab

The **Network** tab is crucial for debugging API interactions.
*   **What it does:** It records all network requests made by the page, including API calls to your backend.
*   **How to use it:**
    1.  Open the Developer Tools and select the "Network" tab.
    2.  Perform the action in the frontend that is causing issues (e.g., clicking a button to fetch tools, adding a favorite).
    3.  You will see a list of requests. Find the relevant API call (e.g., a request to `/api/tools` or `/api/favorites`).
    4.  Click on that request to see details:
        *   **Headers:** View the request URL, HTTP method (GET, POST, DELETE), request headers (like `Content-Type`), and status code of the response.
        *   **Payload/Request Body (for POST/PUT):** Inspect the data sent from the frontend to the backend. For example, when adding a favorite, check if the `toolId` is being sent correctly in the JSON payload.
        *   **Preview/Response:** View the raw JSON data received from the backend.
*   **What to check:**
    *   **Request URL:** Is it the correct endpoint as defined in `Backend/index.ts` and tested in `TEST_API_ENDPOINTS.md`?
    *   **Request Method:** Is it the correct HTTP method (e.g., `POST` for adding a favorite, `DELETE` for removing)?
    *   **Request Body:** If sending data (like for `POST /api/favorites`), is the JSON body correctly formatted and does it contain the expected data?
    *   **Status Code:** What is the HTTP status code of the response? (e.g., `200 OK`, `201 Created`, `404 Not Found`, `400 Bad Request`, `500 Internal Server Error`).
    *   **Response Body:** What data did the backend actually return? Does it match what you expect based on your `TEST_API_ENDPOINTS.md` guide? For example, if you expect a list of tools, are you getting it? If you expect an error message, is it there and does it make sense?

    **Compare the actual request/response details with the expected behavior documented in `TEST_API_ENDPOINTS.md`.** Discrepancies here are strong indicators of the problem's source.

### Console Tab

The **Console** tab is essential for spotting JavaScript errors and debugging messages.
*   **What it does:** It displays errors thrown by your frontend JavaScript code, warnings, and any messages you explicitly log using `console.log()`.
*   **How to use it:**
    1.  Open the Developer Tools and select the "Console" tab.
    2.  Perform the action in the frontend.
    3.  Look for:
        *   **Red error messages:** These often indicate critical issues in your JavaScript code that might be preventing API calls from being made correctly or responses from being processed. The error message and the accompanying stack trace can point you to the problematic line of code in your frontend files.
        *   **Warnings:** These might indicate potential issues or deprecated practices.
        *   **`console.log()` output:** If you've added `console.log()` statements in `Frontend/src/api.ts` or your component files to trace data or execution flow, their output will appear here. This can be very helpful to understand what's happening with your data before an API call is made or after a response is received.

## 3. Backend Tests vs. Frontend Behavior

If you have thoroughly tested your backend API endpoints using `curl` as described in `TEST_API_ENDPOINTS.md` and all those tests pass, it strongly suggests that your backend is functioning correctly.

In such cases, issues experienced in the frontend are likely due to:
*   The frontend sending incorrect data or malformed requests (check Network tab > Payload/Request Body).
*   The frontend not correctly interpreting the backend's response (check Network tab > Response, and Console tab for errors during processing).
*   Logic errors in your frontend components that misuse the functions from `Frontend/src/api.ts`.
*   Client-side routing issues or state management problems that affect how and when API calls are made.

The browser's developer tools (Network and Console tabs) are your best allies in pinpointing these frontend-specific problems. By carefully inspecting the requests, responses, and any client-side errors, you can effectively diagnose and resolve issues in how your frontend interacts with the backend API.
