#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

console.log("Generating app screenshots for web manifest...");

// Paths
const PUBLIC_PATH = path.join(__dirname, "../client/public");
const SCREENSHOT_PATH = path.join(PUBLIC_PATH, "screenshot1.png");

// Check if screenshot already exists
if (fs.existsSync(SCREENSHOT_PATH)) {
  console.log("Screenshot already exists, skipping generation.");
  process.exit(0);
}

// Create a placeholder screenshot canvas
const width = 1280;
const height = 720;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, "#1976d2");
gradient.addColorStop(1, "#064884");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Draw app name
ctx.font = "bold 48px Arial";
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.fillText("Product Database", width / 2, height / 2 - 50);

// Draw app description
ctx.font = "24px Arial";
ctx.fillText("Comprehensive Product Management System", width / 2, height / 2);

// Draw border elements
ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
ctx.lineWidth = 5;
ctx.strokeRect(50, 50, width - 100, height - 100);

// Save the canvas to a file
try {
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(SCREENSHOT_PATH, buffer);
  console.log(`Screenshot generated at ${SCREENSHOT_PATH}`);
} catch (err) {
  console.error(`Error saving screenshot: ${err.message}`);
  console.warn(
    'If you see a "canvas" module error, you may need to install it:'
  );
  console.warn("npm install canvas");
  process.exit(1);
}

console.log("Screenshot generation complete!");
