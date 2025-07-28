# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.17.0
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Install dependencies with cache mounts, bind mounts
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Fix permissions: give ownership of node_modules to 'node' user
RUN chown -R node:node /usr/src/app/node_modules

# Switch to non-root user
USER node

# Copy rest of the app source files
COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "start"]
