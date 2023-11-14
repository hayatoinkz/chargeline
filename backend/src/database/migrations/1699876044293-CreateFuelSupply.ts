import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFuelSupply1699876044293 implements MigrationInterface {
    name = 'CreateFuelSupply1699876044293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fuel_supply" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "price" numeric NOT NULL DEFAULT '0', "totalPrice" numeric NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "carId" integer, "typeId" integer, CONSTRAINT "PK_cb8fd3256decd50f337debae81f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fuel_supply" ADD CONSTRAINT "FK_eb7e62167e8870748a7fb20701d" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fuel_supply" ADD CONSTRAINT "FK_7155f12acc3a5996d83a82cff89" FOREIGN KEY ("typeId") REFERENCES "type_fuel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fuel_supply" DROP CONSTRAINT "FK_7155f12acc3a5996d83a82cff89"`);
        await queryRunner.query(`ALTER TABLE "fuel_supply" DROP CONSTRAINT "FK_eb7e62167e8870748a7fb20701d"`);
        await queryRunner.query(`DROP TABLE "fuel_supply"`);
    }

}
