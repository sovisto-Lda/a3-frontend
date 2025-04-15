# FROM node:18-alpine AS builder
# WORKDIR /app

# # 1. Copia e instala dependências
# COPY package*.json .
# RUN npm install

# # 2. Copia todo o projeto (incluindo src/assets)
# COPY . .

# # 3. Ajusta permissões ANTES do build (aqui você adiciona)
# RUN chown -R node:node /app/src/assets

# # 4. Executa o build
# RUN npm run build

# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]