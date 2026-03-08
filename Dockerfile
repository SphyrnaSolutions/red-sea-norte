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
ENV NEXT_PUBLIC_WAGTAIL_URL=https://back.redsea.sphyrnasolutions.com
ENV NEXT_PUBLIC_WAGTAIL_API_URL=https://back.redsea.sphyrnasolutions.com/api/v2
ENV NEXT_PUBLIC_SITE_HOSTNAME=buceoenelmarrojo.com
ENV NEXT_PUBLIC_SITE_URL=https://buceoenelmarrojo.com
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}

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
