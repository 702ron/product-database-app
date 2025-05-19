#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

console.log(chalk.blue("========================================"));
console.log(chalk.blue("   Web App Manifest Creation Utility"));
console.log(chalk.blue("========================================"));

// Paths
const MANIFEST_PATH = path.join(__dirname, "../client/public/manifest.json");
const PUBLIC_PATH = path.join(__dirname, "../client/public");

// Default manifest template
const defaultManifest = {
  short_name: "Product DB",
  name: "Product Database Manager",
  icons: [
    {
      src: "favicon.svg",
      sizes: "64x64",
      type: "image/svg+xml",
    },
    {
      src: "logo192.svg",
      type: "image/svg+xml",
      sizes: "192x192",
    },
    {
      src: "logo512.svg",
      type: "image/svg+xml",
      sizes: "512x512",
    },
    {
      src: "logo192.png",
      type: "image/png",
      sizes: "192x192",
      purpose: "any maskable",
    },
    {
      src: "logo512.png",
      type: "image/png",
      sizes: "512x512",
      purpose: "any maskable",
    },
  ],
  start_url: "./",
  scope: "/",
  display: "standalone",
  theme_color: "#1976d2",
  background_color: "#ffffff",
  description:
    "A comprehensive product management system for inventory tracking and management",
  orientation: "any",
  categories: ["productivity", "business"],
  shortcuts: [
    {
      name: "Add Product",
      short_name: "Add",
      description: "Add a new product to the database",
      url: "/products/add",
      icons: [{ src: "logo192.png", sizes: "192x192" }],
    },
    {
      name: "Search Products",
      short_name: "Search",
      description: "Search for products in the database",
      url: "/products/search",
      icons: [{ src: "logo192.png", sizes: "192x192" }],
    },
  ],
  screenshots: [
    {
      src: "screenshot1.png",
      sizes: "1280x720",
      type: "image/png",
    },
  ],
  lang: "en-US",
  dir: "ltr",
  prefer_related_applications: false,
};

// Create or update manifest
function createManifest() {
  console.log(chalk.yellow("Creating/updating web app manifest..."));

  let existingManifest = {};

  // Check if manifest already exists
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      const manifestContent = fs.readFileSync(MANIFEST_PATH, "utf8");
      existingManifest = JSON.parse(manifestContent);
      console.log(chalk.green("✓ Existing manifest found, updating..."));
    } catch (err) {
      console.error(
        chalk.red(`Error reading existing manifest: ${err.message}`)
      );
      console.log(chalk.yellow("Creating new manifest file..."));
    }
  } else {
    console.log(
      chalk.yellow("No existing manifest found. Creating new file...")
    );
  }

  // Merge with defaults (existing values take precedence)
  const updatedManifest = {
    ...defaultManifest,
    ...existingManifest,
    // Ensure critical fields are updated
    icons: [
      ...(existingManifest.icons || []),
      // Add any icons from default that don't exist in current manifest
      ...defaultManifest.icons.filter(
        (defaultIcon) =>
          !(existingManifest.icons || []).some(
            (icon) =>
              icon.src === defaultIcon.src && icon.sizes === defaultIcon.sizes
          )
      ),
    ],
    // Ensure shortcuts and screenshots are present
    shortcuts: existingManifest.shortcuts || defaultManifest.shortcuts,
    screenshots: existingManifest.screenshots || defaultManifest.screenshots,
  };

  // Save updated manifest
  try {
    fs.writeFileSync(
      MANIFEST_PATH,
      JSON.stringify(updatedManifest, null, 2),
      "utf8"
    );
    console.log(chalk.green("✓ Manifest file saved successfully!"));
  } catch (err) {
    console.error(chalk.red(`Error saving manifest: ${err.message}`));
    process.exit(1);
  }
}

// Run the creation process
createManifest();

// Now call our other scripts for screenshots and validation
console.log(chalk.blue("\nChecking for screenshot generation..."));
try {
  require("./generate-screenshot");
} catch (err) {
  console.error(
    chalk.yellow(`Warning: Couldn't generate screenshots: ${err.message}`)
  );
  console.log(
    'You may need to install the "canvas" package: npm install canvas'
  );
}

console.log(chalk.blue("\nValidating manifest..."));
try {
  require("./validate-manifest");
} catch (err) {
  console.error(
    chalk.yellow(`Warning: Couldn't validate manifest: ${err.message}`)
  );
}

console.log(chalk.green("\n✓ Manifest creation process complete!"));
console.log(chalk.blue("\nNext steps:"));
console.log(
  chalk.white("1. Test your PWA using Lighthouse in Chrome DevTools")
);
console.log(
  chalk.white("2. Ensure your service worker is registered properly")
);
console.log(
  chalk.white("3. Deploy your app and test installation on various devices")
);
