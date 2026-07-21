# Build from the REPO ROOT so the deck files are in context:
#   docker build -f server/Dockerfile -t hrone-deck-gate .
FROM node:20-alpine
WORKDIR /app

# 1) Install server deps (own layer for caching)
COPY server/package.json server/package-lock.json* ./
RUN npm install --omit=dev

# 2) Server code
COPY server/server.js ./

# 3) The deck → served (gated) from /app/public
COPY . ./public
# Strip anything that isn't deck content so it can never be served
RUN rm -rf ./public/server ./public/.git ./public/.claude ./public/node_modules

ENV NODE_ENV=production
ENV STATIC_DIR=/app/public
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
