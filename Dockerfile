FROM node:23-alpine3.19

# Set the working directory
# RUN mkdir /usr/src/app
WORKDIR /usr/src/app
RUN ls

# Copy package files and install dependencies
COPY package.json package-lock.json /usr/src/app/
RUN npm install && npm cache clean --force

# Copy the rest of the application code
COPY . /usr/src/app/
RUN ls

# Expose the port your application listens on
EXPOSE 8882

RUN ls
# Define the command to run your application
CMD ["node", "./dist/index.js"]
