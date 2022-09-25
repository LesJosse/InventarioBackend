FROM node:16
#el FROM nos dice la version de NodeJs que será instalada
WORKDIR /usr/src/app
#WORKDIR va a crear un directorio y se para la app al momento de instalar los paquetes
#holaajs 
COPY package*.json ./
#copia los archivos en la imagen
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]