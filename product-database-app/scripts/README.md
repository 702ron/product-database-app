# Product Database App Scripts

This directory contains utility scripts for the Product Database application.

## Web App Manifest Tools

The following scripts help manage the Progressive Web App (PWA) manifest:

### create-manifest.js

The main script that creates or updates the web app manifest (`manifest.json`) with the recommended fields for optimal PWA experience. It also attempts to generate screenshots and validate the manifest file.

```bash
# Run from the scripts directory
npm run manifest
```

### validate-manifest.js

Validates an existing manifest file against PWA requirements and checks if all referenced resources (icons, screenshots) exist.

```bash
# Run from the scripts directory
npm run validate
```

### generate-screenshot.js

Generates a placeholder screenshot image for the PWA installation experience if one doesn't already exist.

```bash
# Run from the scripts directory
npm run screenshot
```

## Requirements

These scripts require Node.js and npm, plus the following npm packages:

- chalk (for colored console output)
- canvas (for generating image assets)

## Installation

```bash
cd scripts
npm install
```

## Usage

After installation, you can run the scripts with:

```bash
# Create or update the manifest file (recommended)
npm run manifest

# Just validate the manifest
npm run validate

# Only generate screenshots
npm run screenshot
```

## Manifest Features

The generated manifest includes:

- Basic PWA metadata (name, icons, etc.)
- App shortcuts for quick actions
- Screenshots for installation experience
- Maskable icon support
- Language and orientation settings
