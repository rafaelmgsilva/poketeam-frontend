# ------------------------------------------------------------
# Etapa 1: build da aplicação React
# ------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Copia os arquivos de dependências primeiro para aproveitar o cache.
COPY package*.json ./

# Instala as dependências exatamente conforme o package-lock.json.
RUN npm ci

# Copia o restante do projeto.
COPY . .

# Gera os arquivos estáticos de produção.
RUN npm run build


# ------------------------------------------------------------
# Etapa 2: servidor web
# ------------------------------------------------------------
FROM nginx:alpine

# Remove o conteúdo padrão do Nginx.
RUN rm -rf /usr/share/nginx/html/*

# Copia o build React para a pasta servida pelo Nginx.
COPY --from=build /app/dist /usr/share/nginx/html

# Porta utilizada pelo Nginx.
EXPOSE 80

# Mantém o Nginx em primeiro plano.
CMD ["nginx", "-g", "daemon off;"]