import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1681881107373 implements MigrationInterface {
    name = 'InitialMigration1681881107373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "photourl" character varying NOT NULL, "vehicleId" uuid, CONSTRAINT "PK_60d73e2714a914f2cf23e026014" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "commenttext" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "vehicleidId" uuid, "owneridId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zip_code" character varying(9) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(26) NOT NULL, "street" character varying(26) NOT NULL, "number" character varying(11) NOT NULL, "complement" character varying(26), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "owneridId" uuid, CONSTRAINT "REL_361f9426c7b169d6ec967fab43" UNIQUE ("owneridId"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Photos" ADD CONSTRAINT "FK_0c8e1243478e1ddb12c67e2badf" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_f533caa878518ccb3ad3f21639c" FOREIGN KEY ("vehicleidId") REFERENCES "vehicles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_324454c5f049890ab78b4fe22f5" FOREIGN KEY ("owneridId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_361f9426c7b169d6ec967fab437" FOREIGN KEY ("owneridId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_361f9426c7b169d6ec967fab437"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_324454c5f049890ab78b4fe22f5"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_f533caa878518ccb3ad3f21639c"`);
        await queryRunner.query(`ALTER TABLE "Photos" DROP CONSTRAINT "FK_0c8e1243478e1ddb12c67e2badf"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "Photos"`);
    }

}
