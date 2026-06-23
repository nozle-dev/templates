#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SHARED_DIR="$ROOT_DIR/shared"

TEMPLATES=(
  "flat-subscription"
  "saas-usage"
  "compute"
  "credit-based"
)

echo "🔄 Syncing shared code to all templates..."

for template in "${TEMPLATES[@]}"; do
  TEMPLATE_DIR="$ROOT_DIR/$template"

  if [ ! -d "$TEMPLATE_DIR" ]; then
    echo "⚠️  Skipping $template (doesn't exist)"
    continue
  fi

  echo "📦 Syncing to $template..."

  # Copy lib files
  mkdir -p "$TEMPLATE_DIR/lib"
  cp "$SHARED_DIR/lib/nozle-client.ts" "$TEMPLATE_DIR/lib/" 2>/dev/null || true
  cp "$SHARED_DIR/lib/utils.ts" "$TEMPLATE_DIR/lib/" 2>/dev/null || true
  cp "$SHARED_DIR/lib/mock-data.ts" "$TEMPLATE_DIR/lib/" 2>/dev/null || true
  cp "$SHARED_DIR/lib/db.ts" "$TEMPLATE_DIR/lib/" 2>/dev/null || true
  cp "$SHARED_DIR/lib/auth.ts" "$TEMPLATE_DIR/lib/" 2>/dev/null || true
  cp "$SHARED_DIR/lib/api-response.ts" "$TEMPLATE_DIR/lib/" 2>/dev/null || true

  # Copy API service layer
  mkdir -p "$TEMPLATE_DIR/api"
  cp -r "$SHARED_DIR/api/"* "$TEMPLATE_DIR/api/" 2>/dev/null || true

  # Copy constants
  mkdir -p "$TEMPLATE_DIR/constants"
  cp -r "$SHARED_DIR/constants/"* "$TEMPLATE_DIR/constants/" 2>/dev/null || true

  # Copy db folder
  mkdir -p "$TEMPLATE_DIR/db"
  cp -r "$SHARED_DIR/db/"* "$TEMPLATE_DIR/db/" 2>/dev/null || true

  # Copy styles
  cp "$SHARED_DIR/styles/globals.css" "$TEMPLATE_DIR/app/" 2>/dev/null || true

  # Copy configs
  cp "$SHARED_DIR/config/postcss.config.mjs" "$TEMPLATE_DIR/" 2>/dev/null || true
  
  # Copy .env.example
  cp "$SHARED_DIR/.env.example" "$TEMPLATE_DIR/" 2>/dev/null || true

  echo "  ✅ Synced all shared code"
done

echo ""
echo "✨ Sync complete! All templates are self-contained."
