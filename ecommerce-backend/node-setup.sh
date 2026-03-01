NODE_VERSION="24.13.0-alpine"

#Verificar si ya existe package.json
if [ -f "backend/package.json" ]; then
  echo "package.json ya existe, Omitiendo npm init"
else
    docker run -it --rm \
        -u $(id -u):$(id -g) \
        -v ${PWD}/backend:/app \
        -w /app \
        node:${NODE_VERSION} \
        npx @nestjs/cli new . --package-manager npm
fi

echo "Instalando dependencias..."

docker run -it --rm \
  -u $(id -u):$(id -g) \
  -v ${PWD}/backend:/app \
  -w /app \
  node:${NODE_VERSION} \
  npm install prisma @prisma/client

docker run -it --rm \
  -u $(id -u):$(id -g) \
  -v ${PWD}/backend:/app \
  -w /app \
  node:${NODE_VERSION} \
  npx prisma init


echo "Dependencias instaladas"
