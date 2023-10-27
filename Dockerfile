FROM node:16.19.1

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the port your API will be listening on
EXPOSE 3030

# Start the FeatherJS API
CMD [ "npm", "start" ]
