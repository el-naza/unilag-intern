FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Bake all environment variables as build args
ARG AUTH_TRUST_HOST
ARG AUTH_URL
ARG DATABASE_URI
ARG EMAIL_USER
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_SERVER_URL
ARG PAYLOAD_SECRET
ARG RESEND_API_KEY
ARG S3_ACCESS_KEY_ID
ARG S3_BUCKET
ARG S3_REGION
ARG S3_SECRET_ACCESS_KEY

# Bake them into the image as environment variables
ENV AUTH_TRUST_HOST=$AUTH_TRUST_HOST
ENV AUTH_URL=$AUTH_URL
ENV DATABASE_URI=$DATABASE_URI
ENV EMAIL_USER=$EMAIL_USER
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV RESEND_API_KEY=$RESEND_API_KEY
ENV S3_ACCESS_KEY_ID=$S3_ACCESS_KEY_ID
ENV S3_BUCKET=$S3_BUCKET
ENV S3_REGION=$S3_REGION
ENV S3_SECRET_ACCESS_KEY=$S3_SECRET_ACCESS_KEY

COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]