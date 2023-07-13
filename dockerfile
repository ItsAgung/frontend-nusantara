# Fetching the latest node image on alpine linux
FROM node:18.14-alpine

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying all the files in our project
COPY . .
RUN npm run build

# Port
EXPOSE 3000

# Starting our application
CMD ["npm", "start"]
