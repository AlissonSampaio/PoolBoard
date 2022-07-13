import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateMatches1657629306537 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "matches",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "player_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "player_points",
                        type: "numeric",
                        isNullable: false
                    },
                    {
                        name: "opponent_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "opponent_points",
                        type: "numeric",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_matches_player",
                        columnNames: ["player_id"],
                        referencedTableName: "players",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_matches_opponent",
                        columnNames: ["opponent_id"],
                        referencedTableName: "players",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("matches");
    }
}
