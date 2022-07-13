import { Entity, Column, CreateDateColumn, PrimaryColumn, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Player } from "./Player";

@Entity("tickets")
export class Match {

    @PrimaryColumn()
    id: string;

    @Column()
    player_id: string;

    @OneToOne(() => Player)
    @JoinColumn({name: "player_id"})
    player: Player;
    
    @Column()
    player_points: number;
    
    @Column()
    opponent_id: string;
    
    @OneToOne(() => Player)
    @JoinColumn({name: "opponent_id"})
    opponent: Player;
    
    @Column()
    opponent_points: number;
    
    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {}
        this.id = uuid();
    }
}
