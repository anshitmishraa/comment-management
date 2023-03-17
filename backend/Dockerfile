FROM node:14-alpine

# Create app directory
WORKDIR /backend

# Install app dependencies
COPY ./backend/package.json ./
RUN npm install

# Bundle app source
COPY backend/ .

# Build Node JS
RUN npm start

# Set environment variables
ENV PORT=5000
ENV MONGODB_URI=mongodb+srv://akshit:akshit@cluster0.uhcdy.mongodb.net/?retryWrites=true&w=majority

# Expose port and start the app
EXPOSE $PORT
CMD [ "npm", "start" ]
