# Dockerfile para Next.js (producción)
FROM node:22-alpine AS base

# Dependencias
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build con variables de entorno en build time
ARG NEXT_PUBLIC_WAGTAIL_URL
ARG NEXT_PUBLIC_SITE_HOSTNAME

ENV NEXT_PUBLIC_WAGTAIL_URL=$NEXT_PUBLIC_WAGTAIL_URL
ENV NEXT_PUBLIC_SITE_HOSTNAME=$NEXT_PUBLIC_SITE_HOSTNAME

RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
