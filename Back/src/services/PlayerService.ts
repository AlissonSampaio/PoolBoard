import { AppDataSource } from "../database/data-source";
import { Player } from "../entities/Player";
type PlayerRequest = {
    id?: string;
    name: string;
    url_image: string;
}

export class PlayerService {
    async create({name, url_image}: PlayerRequest): Promise<Player | Error> {
        const repo = AppDataSource.getRepository(Player);

        if(await repo.findOneBy({name})){
            return new Error("Player already exists");
        }

        const player = repo.create({
            name,
            url_image
        })

        await repo.save(player);

        return player;
    }

    async getAll(){
        const repo = AppDataSource.getRepository(Player);

        const player = await repo.find();

        return player;
    }

    async get(id: string){
        const repo = AppDataSource.getRepository(Player);
 
        const player = await repo.findOneBy({id});

        if(!player){
            return new Error("Event does not exists!");
        };

        return player;
    }

    async update({id, name, url_image}: PlayerRequest){
        const repo = AppDataSource.getRepository(Player);

        const player = await repo.findOneBy({id});

        if(!player){
            return new Error("Player does not exists!");
        }

        player.name = name ? name : player.name;
        player.url_image = url_image ? url_image : player.url_image;

        await repo.save(player);

        return player;
    }

    async delete(id: string){
        const repo = AppDataSource.getRepository(Player);
    
        if(!await repo.findOneBy({id})){
            return new Error("Player does not exists!");
        }

        await repo.delete(id);

    }
}