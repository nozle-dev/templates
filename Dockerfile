FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

FROM base AS deps
WORKDIR /app

# Copy all necessary files for dependency installation
COPY package.json pnpm-workspace.yaml ./
COPY shared ./shared
COPY flat-subscription/package.json ./flat-subscription/package.json
COPY saas-usage/package.json ./saas-usage/package.json
COPY compute/package.json ./compute/package.json
COPY credit-based/package.json ./credit-based/package.json

# Install dependencies
RUN pnpm install --no-frozen-lockfile

FROM base AS builder
WORKDIR /app

# Build arguments
ARG TEMPLATE_NAME
ARG BASE_PATH
ENV BASE_PATH=${BASE_PATH}
ENV NEXT_TELEMETRY_DISABLED=1
# Set dummy API key for build (required by nozle-client initialization)
ENV NOZLE_API_KEY=nzl_build_dummy_key_12345

# Copy node_modules from deps stage (pnpm workspaces)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/flat-subscription/node_modules ./flat-subscription/node_modules
COPY --from=deps /app/saas-usage/node_modules ./saas-usage/node_modules
COPY --from=deps /app/compute/node_modules ./compute/node_modules
COPY --from=deps /app/credit-based/node_modules ./credit-based/node_modules

# Copy source code
COPY . .

# Build the specific template using Next.js directly
WORKDIR /app/${TEMPLATE_NAME}
RUN npx next build

FROM base AS runner
WORKDIR /app

# Build arguments for runtime
ARG TEMPLATE_NAME
ARG PORT=3000
ENV NODE_ENV=production
ENV PORT=${PORT}
ENV NEXT_TELEMETRY_DISABLED=1

# Set BASE_PATH at runtime
ARG BASE_PATH
ENV BASE_PATH=${BASE_PATH}

# Install wget for healthcheck
RUN apk add --no-cache wget

# Copy built application from standalone output
# Note: Next.js standalone mode creates nested structure: .next/standalone/{template_name}/
COPY --from=builder /app/${TEMPLATE_NAME}/.next/standalone .
COPY --from=builder /app/${TEMPLATE_NAME}/.next/static ./${TEMPLATE_NAME}/.next/static
COPY --from=builder /app/${TEMPLATE_NAME}/public ./${TEMPLATE_NAME}/public

WORKDIR /app/${TEMPLATE_NAME}

EXPOSE ${PORT}

# Start the server
CMD ["node", "server.js"]
