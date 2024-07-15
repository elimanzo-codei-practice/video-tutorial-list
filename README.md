### Prompt

Video Tutorial List

Design and implement a React frontend application that fetches and displays a list of video tutorials from a REST API. Each video tutorial item should display a thumbnail, title, and a brief description. Implement a search functionality to filter the list of tutorials based on the title.

### Feedback / Response

### Stack: React, Material UI { using ts(x) }

1. React app bootstrapped with CRA
2. Material UI using emotion for style composition
3. SSL support + SSL setup for local dev
4. Auth0 integration for SSO authentication
5. Navigation tree setup
6. Respect system's dark/light mode

### Getting started

1. Generate SSL cert (don't self sign) using `mkcert`
2. `brew install mkcert`
3. `mkcert --install` [GH](https://github.com/FiloSottile/mkcert)
4. `npm i`
5. `npm run start`
6. Add Auth0 keys to `.env.development.local` file
