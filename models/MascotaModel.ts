import { connectorMongoDB } from "../config/connectors.ts";
import { DataTypes, Database, Model }  from "https://deno.land/x/denodb@v1.0.40/mod.ts"; 

const mongoDB =  new Database(connectorMongoDB);  

class MascotaModel extends Model { 
    static table = "mascota"; 
    static fields = { 
        _id: {
            primaryKey: true,
          },

        id: { 
            type: DataTypes.INTEGER, 
            unique: true,
        }, 
        nombre: {
            type: DataTypes.STRING,
            length: 100,
            allowNull: false,
        },
        fechaNacimiento: { 
            type: DataTypes.STRING,
            length: 100,
            allowNull: false,
        },
        especie: {
            type: DataTypes.STRING,
            length: 500,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            length: 500,
            allowNull: false,
        }
    };

    _id!: string;
    id!: number; 
    nombre!: string; 
    fechaNacimiento!: string; 
    especie!: string; 
    descripcion!: string; 

}

mongoDB.link([MascotaModel]); 
mongoDB.sync();

export { MascotaModel }; 