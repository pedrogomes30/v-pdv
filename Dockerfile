# Defina a imagem base do Node.js com a versão desejada (por exemplo, 14)
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (ou yarn.lock se estiver usando Yarn) para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Exponha a porta que o servidor do Vue.js irá escutar (porta padrão é 8080)
EXPOSE 8080

# Comando para iniciar a aplicação Vue.js em modo de desenvolvimento
CMD ["npm", "run", "serve"]
