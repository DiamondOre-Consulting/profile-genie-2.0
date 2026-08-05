# Run the SSR client with Docker

From the `client` directory, build and start the production SSR client:

```sh
docker compose up --build -d
```

The client is available at `http://localhost:3000` and restarts automatically unless explicitly stopped.

Set these optional environment variables before starting Docker Compose:

```sh
HOST_PORT=3000
SSR_API_URL=http://host.docker.internal:8000/api/v1
PUBLIC_ORIGIN=http://localhost:3000
```

Use `host.docker.internal` for `SSR_API_URL` when the API runs in Docker Compose from the separate `server` directory on Docker Desktop. In production, point `SSR_API_URL` to the public API URL and set `PUBLIC_ORIGIN` to the public client domain.
