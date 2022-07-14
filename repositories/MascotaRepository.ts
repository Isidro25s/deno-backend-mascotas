import { Mascota } from "../interfaces/Mascota.ts";
import { MascotaModel } from "../models/MascotaModel.ts";

class MascotaRepository {

    async getMascotas(page: number, size: number)  { 
        const mascotas = await MascotaModel.skip((page-1) * size).take(page*size).get();
        return  mascotas; 
    } 

    async getMascota(id: number) { 
        return  await MascotaModel.where("id", id ).get();
    } 

    async addMascota(mascota: Mascota) { 
        const newMascota = new MascotaModel(); 
        newMascota.id = mascota.id;
        newMascota.nombre = mascota.nombre;
        newMascota.fechaNacimiento = mascota.fechaNacimiento;
        newMascota.especie = mascota.especie;
        newMascota.descripcion = mascota.descripcion;
        return await newMascota.save();
    }

    async updateMascota(id: number, mascota: Mascota) { 

        const mascotaUpdated = await MascotaModel.where("id", id ).update(
            {
                id: mascota.id, 
                nombre: mascota.nombre,
                fechaNacimiento: mascota.fechaNacimiento,
                especie: mascota.especie,
                descripcion: mascota.descripcion
            }
        );
        return mascotaUpdated;
    }

    async deleteMascota(id: number) {    
        const mascota = await this.getMascota(id) ;
        await MascotaModel.where("id", id ).delete();
        return mascota;
    }
}

export default new MascotaRepository();