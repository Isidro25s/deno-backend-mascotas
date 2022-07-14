import { Mascota } from '../interfaces/Mascota.ts';
import { default as mascotaRepository } from '../repositories/MascotaRepository.ts';

class MascotaService {

    getMascotas  =  async(page: number, size: number) => {
        return await mascotaRepository.getMascotas(page, size);
    };

    getMascota = async (id: number) => {
        return await mascotaRepository.getMascota(id);
    }

    createMascota = async (mascota: Mascota) => {
        return await mascotaRepository.addMascota(mascota);
    }

    updateMascota = async (id: number, mascota: Mascota, ) => {
        return  await mascotaRepository.updateMascota(id, mascota);
    };

    deleteMascota = async (id: number) => {
        return await mascotaRepository.deleteMascota(id);
    };
}

export default new MascotaService();