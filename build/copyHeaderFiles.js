const fs = require("fs");
const path = require("path");

const rootDir = path.normalize(path.join(__dirname, "..")),
  distDir = path.join(rootDir, "dist");

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

// copy all files from src/favicons to dist/favicons
fs.readdirSync(path.join(rootDir, "src/favicons")).forEach(f =>
  fs.copyFileSync(
    path.join(rootDir, "src/favicons", f),
    path.join(distDir, f)
  )
);

const filesInRoot = ["browserconfig.xml", "site.webmanifest"];

filesInRoot.forEach(f =>
  fs.copyFileSync(path.join(rootDir, "src", f), path.join(distDir, f))
);
