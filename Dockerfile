FROM node:18.2-alpine AS build

# create & set working directory
RUN mkdir /app
WORKDIR /app

# copy source files
COPY . /app

# install dependencies
RUN yarn

# start app
RUN yarn build

# CMD npm run start
EXPOSE 3000
CMD yarn start
