# Usando uma imagem base do Node.js
FROM node:20

# Instala o Chromium e outras dependências
RUN apt-get update && apt-get install -y chromium

# Define o diretório de trabalho como /project/backend
WORKDIR /project/backend

# Copia os arquivos de configuração do projeto para o diretório backend
COPY api-bot/backend/package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório backend
COPY api-bot/backend/ ./

# Exponha a porta que seu aplicativo usará
EXPOSE 3005

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
