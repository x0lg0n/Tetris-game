# Verifying Backend Server Setup and API Connectivity

This guide provides steps to verify that your backend server is set up correctly and that basic API connectivity is working.

## 1. Run the Backend Server

Open your terminal and navigate to the `Backend` directory of your project.
Use the following command to start the server:

```bash
bun run index.ts
```

This command is typically found in the `scripts` section of your `Backend/package.json` file.

## 2. Confirm Successful Server Start

After running the command, look for a console message indicating that the server has started successfully. This message might vary slightly depending on your specific server implementation, but it will generally look something like this:

```
🚀 AI Tools API server running on port 3001
```

The key is to see a message confirming the server is "running" and noting the "port" number it's listening on (commonly 3001, 3000, or 8080).

## 3. Test API Connectivity

Once the server is running, you can perform a simple test to ensure basic API connectivity. You can use `curl` in your terminal or simply open a web browser.

**Using `curl` (recommended for API testing):**

Open a new terminal window (leaving the server running in the other) and execute the following command:

```bash
curl http://localhost:3001/api/health
```

*   **Note:** If your server is running on a different port, replace `3001` with the correct port number identified in the server start message.

**Using a Web Browser:**

Open your web browser (e.g., Chrome, Firefox, Safari) and enter the following URL in the address bar:

```
http://localhost:3001/api/health
```

*   **Note:** Again, adjust the port number if necessary.

## 4. Verify Successful Response

If the server is running correctly and the `/api/health` endpoint is functional, you should receive a JSON response indicating a healthy status.

**Expected Successful Response:**

```json
{
  "status": "OK"
}
```

If you see this response (either in your terminal output from `curl` or displayed in your web browser), it means your backend server is running and the basic API connectivity to the `/api/health` endpoint is working as expected.

## Troubleshooting

*   **Command not found (`bun`):** If your terminal says `bun: command not found`, you need to install Bun. Refer to the official Bun installation guide: [https://bun.sh/docs/installation](https://bun.sh/docs/installation)
*   **Port already in use:** If the server fails to start and mentions "port already in use" or "EADDRINUSE", it means another application is using the specified port. You can either stop the other application or configure your backend server to use a different port.
*   **Connection refused:** If `curl` or your browser says "connection refused", ensure the server is actually running and that you're using the correct port number. Check for any error messages in the server console.
*   **No JSON response / Different response:** If you get a response but it's not the expected JSON `{"status": "OK"}`, there might be an issue with the `/api/health` endpoint logic in your backend code. Review the server logs for any errors.

By following these steps, you can confidently verify your backend server setup and ensure basic API communication.
