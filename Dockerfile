# Step 1: Use an official Node.js image as the base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app/aegios-website

# Step 3: Copy only package.json and package-lock.json first to leverage Docker caching
COPY ./src/aegios-website/package*.json ./

# Step 4: Install dependencies
RUN npm install --legacy-peer-deps

# Step 5: Copy the rest of the application files
COPY ./src/aegios-website /app

# Step 6: Expose the default port for the React app
EXPOSE 3000

RUN npm install

# Step 7: Start the React app
CMD ["npm", "start"]
