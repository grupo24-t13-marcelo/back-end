import { MigrationInterface, QueryRunner } from "typeorm";

export class addFieldUserTokenInUser1682510068897 implements MigrationInterface {
    name = 'addFieldUserTokenInUser1682510068897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "userToken" text`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "bellowFipe" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "bellowFipe" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userToken"`);
    }

}
