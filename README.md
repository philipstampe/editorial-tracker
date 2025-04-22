# editorial-tracker

## **Overview**

This monorepo contains both the frontend and backend of the application. The project consists of a Node + Express backend, consumed by a Next.js application on the frontend.

Start the backend before the frontend, as the Next.js app depends on the API.

---

## **Start backend**

Change to the backend folder `cd backend`
Followed by these commands:

```
npm install
npm run build
npm start
```

This will start a server and API on `http://localhost:3001`

---

## **Start frontend**

Change to the fronend folder `cd frontend`
Followed by these commands:

```
npm install
npm run build
npm start
```

This will start a server and API on `http://localhost:3000`

---

## **Considerations**

The project architecture is set up as a headless solution, consisting of an API service and a client that consumes it. This design choice decouples the API from the frontend, making it reusable for other clients in the future.

## **Notes**

The data is mocked in JavaScript objects and only exists in memory. Any changes (additions or edits) will be lost when the server restarts.

Mock data is located in:

`/src/data/content.ts`
`/src/data/users.ts`

To sign in, use one of the two users below:

| Username | Password | Role        |
| -------- | -------- | ----------- |
| John     | 123      | Editor      |
| Jane     | 321      | Contributor |
