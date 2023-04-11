import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1681221017846 implements MigrationInterface {
    name = 'InitialMigration1681221017846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "fipe" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "fipe"`);
    }

}
