# Usando uma imagem base do Node.js
FROM node:20

# Instala o Chromium e outras dependências
RUN apt-get update && apt-get install -y chromium

# Define o diretório de trabalho
WORKDIR /project

# Copia os arquivos de configuração do projeto
COPY package*.json ./backend

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Exponha a porta que seu aplicativo usará
EXPOSE 3005

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
