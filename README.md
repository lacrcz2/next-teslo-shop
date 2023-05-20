# Next.js Teslo Shop

Para correr localmente, se necesita la basede datos
```
docker-compose up -d
```
* El -d, significa __detached__


## Configurar las variablesde entorno
Renombrar el archivo __.env.template__ a __.env__

* MongoD URL Local:
```
MONGO_URL=mongodb://localhost:27017/teslodb
```


* Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```


## Llenar la base de datos con información de pruebas

Llamar a:
```
    http://localhost:3000/api/seed
```