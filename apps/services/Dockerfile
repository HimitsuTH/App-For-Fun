# Builder
FROM node:18-alpine as base
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=services --docker

# RUN ls -la /app/out && cat /app/out/package.json || echo "No package.json"


# Installer
FROM base AS installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=base /app/yarn.lock ./yarn.lock
COPY --from=base /app/package.json ./package.json
RUN yarn install

COPY --from=base /app/out/full/ .
COPY ./turbo.json ./turbo.json
COPY .sequelizerc ./
RUN yarn turbo run build --filter=services...

# Runner
FROM base AS runner
WORKDIR /app
COPY --from=installer /app .

WORKDIR /app/apps/services
# RUN yarn mg:up

EXPOSE 8000
CMD [ "yarn", "start" ]
