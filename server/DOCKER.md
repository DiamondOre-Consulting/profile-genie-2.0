# Run the API with Docker

1. Create `server/.env` from the existing environment configuration. Do not commit it.
2. From the `server` directory, build and start the API:

   ```sh
   docker compose up --build -d
   ```

3. Confirm the container is healthy:

   ```sh
   docker compose ps
   curl http://localhost:8000/ping
   ```

The API is available at `http://localhost:8000`. Set `HOST_PORT` when you need a different host port. Docker stores files written to `uploads/` in the named `api_uploads` volume.

For production, provide secrets through your deployment platform's environment-variable manager, set `NODE_ENV=production`, and use a managed MongoDB URI. Do not mount or bake `.env` into the image.
