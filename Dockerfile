FROM node:20-alpine

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat

# Definir diretório de trabalho
WORKDIR /app

# Expor porta
EXPOSE 3000

# Comando padrão
CMD ["npm", "run", "dev"] 