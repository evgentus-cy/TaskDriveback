# ---- Base Node ----
FROM node:10.15.0-alpine AS base
WORKDIR /test-task-counter
COPY package.json .
# Before apt install
RUN rm -rf /var/lib/apt/lists/*

# ---- Dependencies ----
FROM base AS dependencies
COPY .babelrc .
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules
RUN npm install

# ---- Builder ----
FROM dependencies as builder
# TODO: add tests
COPY src ./src
RUN npm run build

# ---- Release ----
FROM base AS release
COPY --from=dependencies /test-task-counter/prod_node_modules ./node_modules
COPY --from=builder /test-task-counter/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]