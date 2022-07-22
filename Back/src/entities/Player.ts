import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("players")
export class Player {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    url_image: string;

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}
