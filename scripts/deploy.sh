#!/bin/bash

set -e

echo "🚀 Deploying nozle-templates to demo server..."

# Configuration
REMOTE_USER="${DEPLOY_USER:-nozle}"
REMOTE_HOST="${DEPLOY_HOST:-34.93.213.182}"
REMOTE_DIR="/var/www/demos"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/nozle-docs}"

# Colors for output
GREEN='\033[0.32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Sync code to server
log_info "Syncing code to server..."
rsync -azv --delete \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='out' \
    --exclude='.git' \
    --exclude='.turbo' \
    -e "ssh -i $SSH_KEY" \
    ./ $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/
log_success "Code synced successfully"

# Step 2: Build and restart Docker containers on server
log_info "Building Docker images on server..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST << 'ENDSSH'
    cd /var/www/demos

    # Stop and remove old containers
    echo "Stopping old containers..."
    docker compose down --remove-orphans

    # Build all images
    echo "Building Docker images..."
    docker compose build --no-cache

    # Start containers
    echo "Starting containers..."
    docker compose up -d

    # Wait for containers to be healthy
    echo "Waiting for containers to start..."
    sleep 20

    # Check container status
    RUNNING=$(docker compose ps --services --filter "status=running" | wc -l)
    echo "Running containers: $RUNNING/4"

    if [ "$RUNNING" -eq 4 ]; then
        echo "✅ All 4 containers are running"
    else
        echo "⚠️  Only $RUNNING/4 containers running"
        docker compose ps
        exit 1
    fi
ENDSSH

log_success "Docker containers deployed"

# Step 3: Setup nginx (if not already set up)
log_info "Checking nginx configuration..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST << 'ENDSSH'
    if [ ! -f /etc/nginx/sites-enabled/template.nozle.dev.conf ]; then
        echo "Setting up nginx..."
        cd /var/www/demos
        bash scripts/setup-nginx.sh
    else
        echo "Nginx already configured"
    fi
ENDSSH

# Step 4: Health check
log_info "Running health checks..."
ssh -i $SSH_KEY $REMOTE_USER@$REMOTE_HOST << 'ENDSSH'
    for template in flat-subscription saas-usage compute credit-based; do
        port=$((3000 + $(echo "flat-subscription saas-usage compute credit-based" | tr ' ' '\n' | grep -n "^$template$" | cut -d: -f1) - 1))
        if curl -sf http://localhost:$port/$template >/dev/null 2>&1; then
            echo "✅ $template is healthy on port $port"
        else
            echo "❌ $template health check failed on port $port"
        fi
    done
ENDSSH

log_success "Deployment completed!"
echo ""
echo "📊 Templates are live at:"
echo "  • https://template.nozle.dev/ (flat-subscription)"
echo "  • https://template.nozle.dev/flat-subscription"
echo "  • https://template.nozle.dev/saas-usage"
echo "  • https://template.nozle.dev/compute"
echo "  • https://template.nozle.dev/credit-based"
