import { Entity, Column, CreateDateColumn, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Player } from "./Player";

@Entity("matches")
export class Match {

    @PrimaryColumn()
    id: string;

    @Column()
    player_id: string;

    @ManyToOne(() => Player, { cascade: true })
    @JoinColumn({name: "player_id"})
    player: Player;
    
    @Column()
    player_points: number;
    
    @Column()
    opponent_id: string;
    
    @ManyToOne(() => Player, { cascade: true })
    @JoinColumn({name: "opponent_id"})
    opponent: Player;
    
    @Column()
    opponent_points: number;
    
    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}
