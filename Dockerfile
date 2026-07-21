# Use Microsoft's official Playwright image
FROM mcr.microsoft.com/playwright:v1.61.1-noble

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Default command
CMD ["npx", "playwright", "test"]