import { MigrationInterface, QueryRunner } from "typeorm";

export class addContrainUniqueFieldUserTokenInUser1682515648326 implements MigrationInterface {
    name = 'addContrainUniqueFieldUserTokenInUser1682515648326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_8baa199ead92bc72423e7dc533d" UNIQUE ("userToken")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_8baa199ead92bc72423e7dc533d"`);
    }

}
