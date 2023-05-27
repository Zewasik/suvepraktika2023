FROM node:18.16-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ] 
#RUN npm run build
#
#FROM nginx:1.21.3-alpine
#
#COPY --from=builder /app/build /usr/share/nginx/html
#
#EXPOSE 80
#
#CMD ["nginx", "-g", "daemon off;"]
