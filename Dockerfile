# Etapa de construcción
FROM node:20 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto Angular
COPY . .

# Construye la aplicación Angular
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos construidos de la aplicación Angular
COPY --from=build /app/dist/shop/browser /usr/share/nginx/html

# Expone el puerto 80 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 80

# Comando para iniciar Nginx cuando se inicie el contenedor
CMD ["nginx", "-g", "daemon off;"]


