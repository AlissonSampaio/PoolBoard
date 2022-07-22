import { Request, Response } from "express";
import { PlayerService } from "../services/PlayerService";

export class PlayerController{
    async create(request: Request, response: Response){
        const { name, url_image } = request.body;

        const service = new PlayerService();

        const result =  await service.create({ name, url_image });

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.status(200).json("Player created with sucess!");
    }

    async getAll(request: Request, response: Response) {
        const service = new PlayerService();

        const player = await service.getAll();

        return response.json(player);
    }

    async get(request: Request, response: Response){
        const { id } = request.params;

        const service = new PlayerService();

        const player = await service.get(id);

        if(!player) {
            return response.status(400).json("Player does not exists!");
        }

        return response.json(player);
    }

    async update(request: Request, response: Response){
        const { id} = request.params; 
        const { name, url_image } = request.body

        const service = new PlayerService();

        const result = await service.update({id, name, url_image});

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }

        return response.status(200).json("Player updated!");
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;

        const service = new PlayerService();

        const result = await service.delete(id);

        if(result instanceof Error){
            return response.status(400).json(result.message);
        }
        
        return response.status(200).end();
    }
}