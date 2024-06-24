FROM node:20.11.1
COPY dist ./dist
COPY package.json package.json
EXPOSE 8081
RUN npm install --only=production
CMD ["node", "dist/main"]