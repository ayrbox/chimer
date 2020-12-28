FROM node:14.15.3-alpine3.10

RUN apk --no-cache add bash g++ gcc libgcc make python chromium

ENV NODE_ENV production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CHROME_EXECUTABLE_PATH='/usr/bin/chromium-browser'

WORKDIR "/app"

COPY ./package*.json ./

RUN npm install

# Assuming ts file has been already transpiled on host machine manually or by CI/CD runner
# Else 2 stage building of docker image is recommended
COPY ./lib ./

CMD ["npm", "run", "start"]
