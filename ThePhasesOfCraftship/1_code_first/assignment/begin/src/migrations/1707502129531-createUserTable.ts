import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1707502129531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR(250) NOT NULL UNIQUE,
                "email" VARCHAR(250) NOT NULL UNIQUE,
                "first_name" VARCHAR(250) NOT NULL,
                "last_name" VARCHAR(250) NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
