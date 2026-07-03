#!/bin/bash

set -e

echo "🔧 Setting up nginx configuration..."

# Copy nginx config
sudo cp /var/www/demos/nginx/template.nozle.dev.conf /etc/nginx/sites-available/

# Create symlink if it doesn't exist
if [ ! -L /etc/nginx/sites-enabled/template.nozle.dev.conf ]; then
    sudo ln -s /etc/nginx/sites-available/template.nozle.dev.conf /etc/nginx/sites-enabled/
    echo "✅ Nginx site enabled"
else
    echo "ℹ️  Nginx site already enabled"
fi

# Test nginx configuration
echo "🧪 Testing nginx configuration..."
sudo nginx -t

# Reload nginx
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx

echo "✅ Nginx setup complete!"
echo ""
echo "📝 Templates are now available at:"
echo "  • https://template.nozle.dev/ (flat-subscription)"
echo "  • https://template.nozle.dev/flat-subscription"
echo "  • https://template.nozle.dev/saas-usage"
echo "  • https://template.nozle.dev/compute"
echo "  • https://template.nozle.dev/credit-based"
