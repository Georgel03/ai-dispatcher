FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Next.js colectează date anonime, le dezactivăm pentru viteză
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "dev"]