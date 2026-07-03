# Nozle Templates Deployment Guide

## Overview
This document describes the deployment setup for the Nozle templates to `template.nozle.dev`.

## Fixed Issues

### 1. Docker Build Failures
**Problem**: GitHub Actions were failing during the "Health check endpoints" step.

**Root Causes**:
- Dockerfile had invalid shell redirection syntax (`2>/dev/null || true`) in COPY commands
- Node.js version was too old (18.x) - Next.js 16 requires >=20.9.0  
- Missing `pnpm-lock.yaml` file (using `--no-frozen-lockfile` instead)
- Incorrect TypeScript imports in `theme-provider.tsx`
- Invalid Tailwind `darkMode` configuration

**Fixes**:
- Removed shell redirection from COPY commands
- Upgraded base image from `node:18-alpine` to `node:20-alpine`
- Changed pnpm install to use `--no-frozen-lockfile`
- Fixed theme-provider to use `ComponentProps<typeof NextThemesProvider>`
- Changed Tailwind `darkMode` from `['class']` to `'class'`
- Added proper node_modules copying for pnpm workspaces

### 2. Docker Compose Configuration
**Problem**: Warning about obsolete `version` field.

**Fix**: Removed `version: '3.8'` from docker-compose.yml

### 3. Template Routing
**Requirement**: Templates should be accessible at:
- `template.nozle.dev/` → flat-subscription (default)
- `template.nozle.dev/flat-subscription`
- `template.nozle.dev/saas-usage`
- `template.nozle.dev/compute`
- `template.nozle.dev/credit-based`

**Solution**: Created nginx reverse proxy configuration in `nginx/template.nozle.dev.conf`

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│ template.nozle.dev (Nginx)                              │
├─────────────────────────────────────────────────────────┤
│ / → localhost:3000/flat-subscription                    │
│ /flat-subscription → localhost:3000                     │
│ /saas-usage → localhost:3001                            │
│ /compute → localhost:3003                               │
│ /credit-based → localhost:3004                          │
└─────────────────────────────────────────────────────────┘
         │          │          │          │
         ▼          ▼          ▼          ▼
    Docker     Docker     Docker     Docker
    (3000)     (3001)     (3003)     (3004)
```

## File Structure

```
nozle-templates/
├── Dockerfile                    # Multi-template Docker build
├── docker-compose.yml            # Container orchestration
├── nginx/
│   └── template.nozle.dev.conf  # Nginx reverse proxy config
├── scripts/
│   ├── deploy.sh                # Full deployment script
│   └── setup-nginx.sh           # Nginx setup script
├── .github/workflows/
│   └── deploy-templates.yml     # GitHub Actions CI/CD
├── flat-subscription/           # Template 1
├── saas-usage/                  # Template 2
├── compute/                     # Template 3
├── credit-based/                # Template 4
└── shared/                      # Shared components
```

## Deployment Scripts

### Automated Deployment (GitHub Actions)
Triggers on push to `main` branch:
1. Syncs code to server via rsync
2. Builds Docker images
3. Restarts containers
4. Runs health checks

### Manual Deployment
```bash
# From project root
./scripts/deploy.sh
```

This script:
1. Syncs code to remote server
2. Builds and restarts Docker containers
3. Sets up nginx (if not already configured)
4. Runs health checks

### Nginx Setup Only
```bash
ssh -i ~/.ssh/nozle-docs nozle@34.93.213.182
cd /var/www/demos
sudo bash scripts/setup-nginx.sh
```

## Environment Variables

Each template container uses:
- `DEMO_MODE=true` - Enables demo-specific features
- `BASE_PATH=/template-name` - Next.js base path
- `PORT=300X` - Container port
- `NODE_ENV=production` - Production mode

## Port Mapping

| Template          | Container Port | Host Port | BASE_PATH          |
|-------------------|----------------|-----------|-------------------|
| flat-subscription | 3000           | 3000      | /flat-subscription |
| saas-usage        | 3001           | 3001      | /saas-usage       |
| compute           | 3003           | 3003      | /compute          |
| credit-based      | 3004           | 3004      | /credit-based     |

## Health Checks

Each container has a built-in health check:
```
wget --spider -q http://localhost:PORT/BASE_PATH
```

Health checks run every 30s with:
- Timeout: 10s
- Retries: 3
- Start period: 40s

## Integration with create-nozle-app

The templates are designed to work in two modes:

1. **Self-hosted deployment** (template.nozle.dev)
   - Users can preview templates
   - Direct access to running demos

2. **CLI usage** (create-nozle-app)
   - CLI asks user to select a template
   - Configures and copies template files
   - Initializes new project

Both modes use the same template source code, ensuring consistency.

## Troubleshooting

### Containers won't start
```bash
ssh -i ~/.ssh/nozle-docs nozle@34.93.213.182
cd /var/www/demos
docker compose logs
```

### Build failures
Check the GitHub Actions logs or run locally:
```bash
docker compose build --no-cache
```

### Health checks failing
```bash
# Check if containers are running
docker compose ps

# Test health check endpoint manually
curl http://localhost:3000/flat-subscription
```

### Nginx issues
```bash
sudo nginx -t                    # Test configuration
sudo systemctl status nginx       # Check status
sudo systemctl reload nginx       # Reload config
sudo tail -f /var/log/nginx/template.nozle.dev.error.log
```

## Server Requirements

- Docker and Docker Compose installed
- Nginx installed and running
- Node.js not required (runs in containers)
- Sufficient disk space for images (~2GB per template)

## Security Notes

- All templates run in isolated Docker containers
- Nginx handles TLS termination (when SSL is set up)
- No direct container port exposure (only through nginx)
- Docker containers restart automatically on failure
- Health checks ensure availability

## Next Steps

1. ✅ Fix Docker build issues
2. ✅ Set up nginx reverse proxy
3. ⏳ Configure SSL/TLS with Let's Encrypt
4. ⏳ Set up monitoring and alerts
5. ⏳ Add automated backups
6. ⏳ Performance optimization

## Support

For issues or questions:
- Check GitHub Actions logs
- Review Docker container logs
- Check nginx error logs
- Verify DNS settings for template.nozle.dev
