FROM node:12.2.0-alpine as builder
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run-script build

FROM node:12.2.0-alpine
COPY --from=builder ./ ./