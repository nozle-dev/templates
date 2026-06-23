FROM node:18-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml ./
COPY shared/package.json ./shared/package.json 2>/dev/null || true
COPY flat-subscription/package.json ./flat-subscription/package.json 2>/dev/null || true
COPY saas-usage/package.json ./saas-usage/package.json 2>/dev/null || true
COPY compute/package.json ./compute/package.json 2>/dev/null || true
COPY credit-based/package.json ./credit-based/package.json 2>/dev/null || true

# Install dependencies
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

# Build arguments
ARG TEMPLATE_NAME
ARG BASE_PATH
ENV BASE_PATH=${BASE_PATH}
ENV NEXT_TELEMETRY_DISABLED=1

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the specific template
RUN pnpm --filter ${TEMPLATE_NAME} build

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

# Copy built application
COPY --from=builder /app/${TEMPLATE_NAME}/.next/standalone ./${TEMPLATE_NAME}/
COPY --from=builder /app/${TEMPLATE_NAME}/.next/static ./${TEMPLATE_NAME}/.next/static
COPY --from=builder /app/${TEMPLATE_NAME}/public ./${TEMPLATE_NAME}/public

WORKDIR /app/${TEMPLATE_NAME}

EXPOSE ${PORT}

# Start the server
CMD node server.js
