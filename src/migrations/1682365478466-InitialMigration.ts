import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1682365478466 implements MigrationInterface {
    name = 'InitialMigration1682365478466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_361f9426c7b169d6ec967fab437"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "bellowFipe" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_361f9426c7b169d6ec967fab437" FOREIGN KEY ("owneridId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_361f9426c7b169d6ec967fab437"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "bellowFipe" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_361f9426c7b169d6ec967fab437" FOREIGN KEY ("owneridId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
