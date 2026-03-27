const { execSync } = require("child_process");

try {
  const { execSync } = require("child_process");

  console.log("Generating typedoc...");

  execSync(`
    npx typedoc \
    --tsconfig /app/frontend/tsconfig.doc.json \
    --entryPoints /app/frontend/src \
    --entryPointStrategy expand \
    --out /app/docs-site/static/typedoc
  `, { stdio: "inherit" });

  console.log("Typedoc done!");

  console.log("Generating phpdoc...");

  execSync(`
    vendor/bin/phpdoc \
    -d /var/www/backend/app \
    -t /app/docs-site/static/phpdoc
  `, { stdio: "inherit" });

  console.log("Phpdoc done!");
} catch (e) {
  console.error(e);
  process.exit(1);
}