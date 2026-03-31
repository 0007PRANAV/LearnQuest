#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${GREEN}🎮 LearnQuest - Full Stack Application${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
  echo -e "${RED}❌ Node.js not found!${NC}"
  echo "Install Node.js with: sudo apt install nodejs npm -y"
  exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}📦 Installing dependencies...${NC}"
  npm install --silent
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
  else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
  fi
else
  echo -e "${GREEN}✓ Dependencies already installed${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${GREEN}🚀 Starting LearnQuest Server...${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""

# Start the server
npm start
 
sleep 2
xdg-open http://localhost:3000 >/dev/null 2>&1 || google-chrome http://localhost:3000 >/dev/null 2>&1 || chromium-browser http://localhost:3000 >/dev/null 2>&1
echo "LearnQuest started in Chrome at http://localhost:3000"
wait
