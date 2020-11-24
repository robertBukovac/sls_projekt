# Image
FROM node:15.2-slim

# Set working base directory
WORKDIR /home/node/app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /home/node/app/node_modules/.bin:$PATH

# Copy the content
COPY package*.json ./

# Install deps
RUN npm install

# Bundle app source
COPY . .

# Port meta
EXPOSE 8001

# Run commands
CMD [ "npm", "start" ]
