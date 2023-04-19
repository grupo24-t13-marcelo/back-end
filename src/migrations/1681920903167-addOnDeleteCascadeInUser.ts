import { MigrationInterface, QueryRunner } from "typeorm";

export class addOnDeleteCascadeInUser1681920903167 implements MigrationInterface {
    name = 'addOnDeleteCascadeInUser1681920903167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_361f9426c7b169d6ec967fab437"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_361f9426c7b169d6ec967fab437" FOREIGN KEY ("owneridId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_361f9426c7b169d6ec967fab437"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_361f9426c7b169d6ec967fab437" FOREIGN KEY ("owneridId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
