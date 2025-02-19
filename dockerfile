FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json (if you have one)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm cli

# Copy the rest of your code
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]