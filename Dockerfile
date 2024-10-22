FROM node:20 AS server

WORKDIR /app

# Install http-server
RUN npm install -g http-server

# Copy HTML files to /html
COPY html /html

# Expose the port
EXPOSE 8080

# Start the server
CMD ["http-server", "/html", "-p", "8080"]