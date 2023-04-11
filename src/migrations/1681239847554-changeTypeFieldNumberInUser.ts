import { MigrationInterface, QueryRunner } from "typeorm";

export class changeTypeFieldNumberInUser1681239847554 implements MigrationInterface {
    name = 'changeTypeFieldNumberInUser1681239847554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "number" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_aa517eb9a603fc94080a45ae983" UNIQUE ("number")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_aa517eb9a603fc94080a45ae983"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "number" integer NOT NULL`);
    }

}
