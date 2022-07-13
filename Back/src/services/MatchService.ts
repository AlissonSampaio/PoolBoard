import { AppDataSource } from "../database/data-source";
import { Match } from "../entities/Match";
import { Player as player } from "../entities/Player";
type MatchRequest = {
    id?: string;
    name: string;
    player_id: string;
    player_points: number;
    opponent_id: string;
    opponent_points: number;
}

export class MatchService {
    async create({ player_id, opponent_id }: MatchRequest) : Promise<Error | Match>{
        const repo = AppDataSource.getRepository(Match);
        const Player = await AppDataSource.getRepository(player).findOneBy({id: player_id});
        const Opponent = await AppDataSource.getRepository(player).findOneBy({id: opponent_id});

        if(!Player) {
            return new Error("Player does not exist");
        }

        if(!Opponent) {
            return new Error("Opponent does not exist");
        }
        
        const match = repo.create({player_id, opponent_id});
        await repo.save(match);

        return match;
    }

    async get(id: string){
        const repo = AppDataSource.getRepository(Match);
 
        const match = await repo.findOneBy({id});

        if(!match){
            return new Error("match does not exists!");
        };

        return match;
    }

    async update({ player_id, opponent_id}){
        const repo = AppDataSource.getRepository(Match);
        const Player = await AppDataSource.getRepository(player).findOneBy({id: player_id});
        const Opponent = await AppDataSource.getRepository(player).findOneBy({id: opponent_id});
        
        const match = await repo.findOneBy({player_id: player_id, opponent_id: opponent_id});

        if(!match){
            return new Error("Partida não encontrada");
        }

        if(!Player) {
            return new Error("Player does not exist");
        }

        if(!Opponent) {
            return new Error("Opponent does not exist");
        }
        
        ticket.name = name ? name : ticket.name;
        ticket.user_id = user_id ? user_id : ticket.user_id;
        ticket.ticket_type_id = ticket_type_id ? ticket_type_id : ticket.ticket_type_id;

        await repo.save(ticket);

        return ticket;

    }
}