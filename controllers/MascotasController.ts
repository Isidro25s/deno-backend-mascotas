// deno-lint-ignore-file no-explicit-any
import mascotaService  from "../services/MascotaService.ts";
import { Status } from "https://deno.land/std@0.140.0/http/http_status.ts";

export const getMascotas = async ({ request, response }: { request: any, response: any },) => {
    const pageParameter =  parseInt(request.url.searchParams.get("page")) || 1;
    const sizeParameter =  parseInt(request.url.searchParams.get("size")) || 50;

    const page = pageParameter < 1 ? 1 : pageParameter; 
    const size = sizeParameter < 5 ? 5 : sizeParameter; 

    const mascotas = await mascotaService.getMascotas(page, size);

    response.status = Status.OK;
    response.body = {
        success: true,
        message: "Retrive list mascotas",
        data: mascotas,
    };
};

export const getMascota = async ({ params, response }: { params: { id: string }; response: any }) => {

    const mascota = await mascotaService.getMascota(
        Number(params.id),
    );

    if (mascota.length) {
        response.status = Status.OK;
        response.body = {
            success: true,
            message: "mascota",
            data: mascota,
        };
        return;
    }
    response.status = Status.BadRequest;
    response.body = {
        success: false,
        message: `Mascota with id: ${params.id} not found`,
        data: [],
    }
};

export const addMascota = async ({ request, response }: { request: any, response: any },) => {
    if (request.body()) {
        const data = await request.body().value;
        if (data.nombre && data.fechaNacimiento && data.especie && data.descripcion) {
            const mascota = await mascotaService.createMascota(data);
            response.status = Status.Created;
            response.body = {
                success: true,
                message: "save mascota successfull", 
                data: [mascota],
            };
            return;
        }
    }

    response.status = Status.BadRequest;
    response.body = {
        success: false,
        message: "The request must have the nombre, fecha de nacimiento, especie and descripcion.",
        data: [],
    };
}

export const updateMascota = async({ params, request, response }: { params: { id: string }; request: any; response: any; },) => {

    const currentMascota = await mascotaService.getMascota(
        Number(params.id),
    );

    if (currentMascota.length){
        const data = await request.body().value;

        if (data.nombre || data.fechaNacimiento || data.especie || data.descripcion ) {
            const updatedMascota = await mascotaService.updateMascota(
                Number(params.id),
                { "id":Number(params.id,), 
                  "nombre": data.nombre,
                  "fechaNacimiento": data.fechaNacimiento,
                  "especie": data.especie,
                  "descripcion": data.descripcion
                 },
            );
            if (updatedMascota) {
                response.status = Status.OK;
                response.body = {
                    success: true,
                    message: `Update for mascota with id ${params.id} was successful`,
                    data: updateMascota, 
                };
                return;
            }

            response.status = Status.InternalServerError;
            response.body = {
                success: false,
                message: `Update for quote with id ${params.id} failed`,
                data: [], 
            };
            return; 
        }
        response.status = Status.BadRequest;
        response.body = {
            success: false,
            message: "The request must have the citation or author.",
            data: [], 
        };
        return;
    }
    response.status = Status.NotFound;
    response.body = {
        success: false,
        message: `Quote with id: ${params.id} not found`,
        data: [], 
    };
};

export const deleteMascota = async ({ params, response }: { params: { id: string }; response: any }) => {
    const mascota = await mascotaService.deleteMascota(
        Number(params.id),
    );

    const message = !mascota.length ? "Mascota not found": "Mascota removed";
    
    response.body = {
        success: mascota.length !== 0,
        message: message,
        data: mascota,
    };
    
};