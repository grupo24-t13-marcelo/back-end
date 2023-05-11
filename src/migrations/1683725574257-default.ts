import { MigrationInterface, QueryRunner } from "typeorm";

export class default1683725574257 implements MigrationInterface {
    name = 'default1683725574257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "title" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "brand" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "model" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "fuel"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "fuel" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "fuel"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "fuel" character varying(16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "model" character varying(26) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "brand" character varying(26) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "title" character varying(46) NOT NULL`);
    }

}
