import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1682521493782 implements MigrationInterface {
    name = 'InitialMigration1682521493782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Photos" DROP CONSTRAINT "FK_0c8e1243478e1ddb12c67e2badf"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_f533caa878518ccb3ad3f21639c"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_324454c5f049890ab78b4fe22f5"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_20f139b9d79f917ef735efacb00"`);
        await queryRunner.query(`ALTER TABLE "Photos" ADD CONSTRAINT "FK_0c8e1243478e1ddb12c67e2badf" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_f533caa878518ccb3ad3f21639c" FOREIGN KEY ("vehicleidId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_324454c5f049890ab78b4fe22f5" FOREIGN KEY ("owneridId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_20f139b9d79f917ef735efacb00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_20f139b9d79f917ef735efacb00"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_324454c5f049890ab78b4fe22f5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_f533caa878518ccb3ad3f21639c"`);
        await queryRunner.query(`ALTER TABLE "Photos" DROP CONSTRAINT "FK_0c8e1243478e1ddb12c67e2badf"`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_20f139b9d79f917ef735efacb00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_324454c5f049890ab78b4fe22f5" FOREIGN KEY ("owneridId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_f533caa878518ccb3ad3f21639c" FOREIGN KEY ("vehicleidId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Photos" ADD CONSTRAINT "FK_0c8e1243478e1ddb12c67e2badf" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
