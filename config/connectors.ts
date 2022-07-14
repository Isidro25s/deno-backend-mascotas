import { MySQLConnector, MongoDBConnector } from 'https://deno.land/x/denodb@v1.0.40/mod.ts';

export const connectorMariaDB = new MySQLConnector({
    database: 'mascotas',
    host: 'localhost',
    username: 'root',
    password: 'start',
    port: 3306, 
});

export  const connectorMongoDB = new MongoDBConnector({
    uri: 'mongodb://isidrosantiago:start@localhost:27017',
    database: 'mascotas',
});