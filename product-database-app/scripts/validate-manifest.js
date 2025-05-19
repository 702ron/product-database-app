#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

console.log(chalk.blue("Validating Web App Manifest..."));

// Paths
const MANIFEST_PATH = path.join(__dirname, "../client/public/manifest.json");
const PUBLIC_PATH = path.join(__dirname, "../client/public");

// Validate file existence
if (!fs.existsSync(MANIFEST_PATH)) {
  console.error(chalk.red("❌ manifest.json not found!"));
  process.exit(1);
}

// Read manifest
let manifest;
try {
  const manifestContent = fs.readFileSync(MANIFEST_PATH, "utf8");
  manifest = JSON.parse(manifestContent);
  console.log(chalk.green("✓ manifest.json is valid JSON"));
} catch (err) {
  console.error(chalk.red(`❌ Error parsing manifest.json: ${err.message}`));
  process.exit(1);
}

// Validate required fields
const requiredFields = ["name", "short_name", "icons", "start_url", "display"];
const missingFields = requiredFields.filter((field) => !manifest[field]);

if (missingFields.length > 0) {
  console.error(
    chalk.red(`❌ Missing required fields: ${missingFields.join(", ")}`)
  );
  process.exit(1);
} else {
  console.log(chalk.green("✓ All required fields present"));
}

// Validate icons
if (Array.isArray(manifest.icons) && manifest.icons.length > 0) {
  console.log(chalk.green(`✓ Found ${manifest.icons.length} icon definitions`));

  // Check if icon files exist
  let missingIcons = 0;
  manifest.icons.forEach((icon) => {
    const iconPath = path.join(PUBLIC_PATH, icon.src);
    if (!fs.existsSync(iconPath)) {
      console.error(chalk.yellow(`⚠️ Icon file not found: ${icon.src}`));
      missingIcons++;
    }
  });

  if (missingIcons === 0) {
    console.log(chalk.green("✓ All icon files exist"));
  } else {
    console.warn(chalk.yellow(`⚠️ ${missingIcons} icon files are missing`));
  }
} else {
  console.error(chalk.red("❌ No icons defined in manifest"));
}

// Check screenshots
if (Array.isArray(manifest.screenshots) && manifest.screenshots.length > 0) {
  console.log(
    chalk.green(`✓ Found ${manifest.screenshots.length} screenshot definitions`)
  );

  // Check if screenshot files exist
  let missingScreenshots = 0;
  manifest.screenshots.forEach((screenshot) => {
    const screenshotPath = path.join(PUBLIC_PATH, screenshot.src);
    if (!fs.existsSync(screenshotPath)) {
      console.error(
        chalk.yellow(`⚠️ Screenshot file not found: ${screenshot.src}`)
      );
      missingScreenshots++;
    }
  });

  if (missingScreenshots > 0) {
    console.warn(
      chalk.yellow(
        `⚠️ ${missingScreenshots} screenshot files are missing. Consider adding them to enhance installation experience.`
      )
    );
  } else {
    console.log(chalk.green("✓ All screenshot files exist"));
  }
}

// Check shortcuts
if (Array.isArray(manifest.shortcuts) && manifest.shortcuts.length > 0) {
  console.log(
    chalk.green(`✓ Found ${manifest.shortcuts.length} shortcut definitions`)
  );

  // Validate shortcut structure
  const hasInvalidShortcuts = manifest.shortcuts.some((shortcut) => {
    return !shortcut.name || !shortcut.url;
  });

  if (hasInvalidShortcuts) {
    console.warn(
      chalk.yellow("⚠️ Some shortcuts are missing required fields (name, url)")
    );
  } else {
    console.log(chalk.green("✓ All shortcuts have required fields"));
  }
}

console.log(chalk.blue("Manifest validation complete!"));
