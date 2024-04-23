# blogging-vite-ts-frontend

React + Typescript frontend for blog websites, created with vite
Designed to work with blogging-api: https://github.com/PiraTechnics/blogging-api

## Tech & Package Details

Vite.js
React
Typescript (.tsx files)
TailwindCSS

## Setup & Local Development

Prerequisites:

- .env local variable: `VITE_API_URL`

See Vite Docs for more on env requirements: https://vitejs.dev/guide/env-and-mode

Setup & Installation:

1. Clone/Fork repository and cd into directory
2. run `npm install` to install all dependencies
3. Create .env file `touch .env` and fill in local variables
4. Run application with `npm run dev` (default uri:port is http://localhost:5173/)

## Acknowledgements

Written for Project: Blog API, _The Odin Project_: https://www.theodinproject.com/lessons/nodejs-blog-api

Thanks to the tireless community of developers and teachers for all you do.

### Known Issues/Bugs

1. User stays logged in after token expires server-side. This is undesirable and causes strange behavior when attempting to access protected routes
2. Viewing and/or editing of drafts not yet implemented. Will 404 instead
3. Routes are not currently nested, leading to inconsistent error behavior
4. Posts cannot currently be deleted (no UI/handling yet implemented)
