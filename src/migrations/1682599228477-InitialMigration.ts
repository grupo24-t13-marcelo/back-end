import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1682599228477 implements MigrationInterface {
    name = 'InitialMigration1682599228477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "color" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "bellowFipe" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "bellowFipe" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "color"`);
    }

}
