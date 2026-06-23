#!/bin/bash
# Comprehensive verification script for all Nozle templates

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

TEMPLATES=("flat-subscription" "saas-usage" "compute" "credit-based")

echo -e "${BLUE}════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Nozle Templates - Verification Script${NC}"
echo -e "${BLUE}════════════════════════════════════════════${NC}"
echo ""

# Function to check dependencies
check_deps() {
  local template=$1
  echo -e "${YELLOW}Checking dependencies for $template...${NC}"

  cd "$template"

  # Check if node_modules exists
  if [ ! -d "node_modules" ]; then
    echo -e "${RED}  ✗ node_modules missing${NC}"
    return 1
  fi

  # Check key packages
  local checks=0
  [ -d "node_modules/next" ] && ((checks++)) || echo -e "${RED}  ✗ next missing${NC}"
  [ -d "node_modules/react" ] && ((checks++)) || echo -e "${RED}  ✗ react missing${NC}"
  [ -d "node_modules/tailwindcss" ] && ((checks++)) || echo -e "${RED}  ✗ tailwindcss missing${NC}"
  [ -d "node_modules/@tailwindcss/postcss" ] && ((checks++)) || echo -e "${RED}  ✗ @tailwindcss/postcss missing${NC}"

  cd ..

  if [ $checks -eq 4 ]; then
    echo -e "${GREEN}  ✓ All key dependencies present${NC}"
    return 0
  else
    return 1
  fi
}

# Function to build template
build_template() {
  local template=$1
  echo -e "${YELLOW}Building $template...${NC}"

  cd "$template"

  if npm run build > /tmp/build-$template.log 2>&1; then
    echo -e "${GREEN}  ✓ Build successful${NC}"
    cd ..
    return 0
  else
    echo -e "${RED}  ✗ Build failed${NC}"
    echo -e "${YELLOW}  Last 10 lines of error:${NC}"
    tail -10 /tmp/build-$template.log | sed 's/^/    /'
    cd ..
    return 1
  fi
}

# Function to check file structure
check_files() {
  local template=$1
  echo -e "${YELLOW}Checking file structure for $template...${NC}"

  local missing=0

  # Check key files
  [ -f "$template/package.json" ] || { echo -e "${RED}  ✗ package.json missing${NC}"; ((missing++)); }
  [ -f "$template/postcss.config.mjs" ] || { echo -e "${RED}  ✗ postcss.config.mjs missing${NC}"; ((missing++)); }
  [ -f "$template/app/globals.css" ] || { echo -e "${RED}  ✗ app/globals.css missing${NC}"; ((missing++)); }
  [ -f "$template/lib/auth-context.tsx" ] || { echo -e "${RED}  ✗ lib/auth-context.tsx missing${NC}"; ((missing++)); }
  [ -f "$template/lib/session.ts" ] || { echo -e "${RED}  ✗ lib/session.ts missing${NC}"; ((missing++)); }
  [ -f "$template/components/theme-toggle.tsx" ] || { echo -e "${RED}  ✗ components/theme-toggle.tsx missing${NC}"; ((missing++)); }
  [ -f "$template/middleware.ts" ] || { echo -e "${RED}  ✗ middleware.ts missing${NC}"; ((missing++)); }

  if [ $missing -eq 0 ]; then
    echo -e "${GREEN}  ✓ All key files present${NC}"
    return 0
  else
    echo -e "${RED}  ✗ $missing files missing${NC}"
    return 1
  fi
}

# Function to check package versions
check_versions() {
  local template=$1
  echo -e "${YELLOW}Checking versions for $template...${NC}"

  cd "$template"

  local next_version=$(grep '"next":' package.json | sed 's/.*"\^*\([0-9.]*\)".*/\1/')
  local react_version=$(grep '"react":' package.json | sed 's/.*"\^*\([0-9.]*\)".*/\1/')
  local tw_version=$(grep '"tailwindcss":' package.json | sed 's/.*"\^*\([0-9.]*\)".*/\1/')

  echo "  Next.js: $next_version"
  echo "  React: $react_version"
  echo "  Tailwind: $tw_version"

  # Check if versions are at least what we expect
  if [[ "$next_version" == 16* ]] && [[ "$react_version" == 19* ]] && [[ "$tw_version" == 4* ]]; then
    echo -e "${GREEN}  ✓ All versions up to date${NC}"
    cd ..
    return 0
  else
    echo -e "${RED}  ✗ Some versions need updating${NC}"
    cd ..
    return 1
  fi
}

# Main verification loop
echo "Starting verification..."
echo ""

success=0
failed=0

for template in "${TEMPLATES[@]}"; do
  echo -e "${BLUE}═══ Verifying: $template ═══${NC}"

  if [ ! -d "$template" ]; then
    echo -e "${RED}✗ Template directory not found${NC}"
    ((failed++))
    echo ""
    continue
  fi

  # Run checks
  checks_passed=0
  checks_total=4

  check_versions "$template" && ((checks_passed++))
  check_files "$template" && ((checks_passed++))
  check_deps "$template" && ((checks_passed++))
  build_template "$template" && ((checks_passed++))

  echo ""

  if [ $checks_passed -eq $checks_total ]; then
    echo -e "${GREEN}✓ $template: ALL CHECKS PASSED ($checks_passed/$checks_total)${NC}"
    ((success++))
  else
    echo -e "${RED}✗ $template: SOME CHECKS FAILED ($checks_passed/$checks_total)${NC}"
    ((failed++))
  fi

  echo ""
done

# Final summary
echo -e "${BLUE}════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Verification Complete${NC}"
echo -e "${BLUE}════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}✓ Passed: $success${NC}"
echo -e "${RED}✗ Failed: $failed${NC}"
echo ""

if [ $failed -eq 0 ]; then
  echo -e "${GREEN}🎉 All templates verified successfully!${NC}"
  exit 0
else
  echo -e "${RED}⚠️  Some templates failed verification${NC}"
  exit 1
fi
