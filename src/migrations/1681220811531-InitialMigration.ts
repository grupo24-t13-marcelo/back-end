import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1681220811531 implements MigrationInterface {
    name = 'InitialMigration1681220811531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(46) NOT NULL, "brand" character varying(26) NOT NULL, "model" character varying(26) NOT NULL, "year" integer NOT NULL, "fuel" character varying(16) NOT NULL, "mileage" integer NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "coverUrl" character varying NOT NULL, "bellowFipe" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(26) NOT NULL, "email" character varying(72) NOT NULL, "cpf" character varying(24) NOT NULL, "number" integer NOT NULL, "dateBirth" character varying(14) NOT NULL, "description" character varying NOT NULL, "isAdvertiser" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_20f139b9d79f917ef735efacb00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_20f139b9d79f917ef735efacb00"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
