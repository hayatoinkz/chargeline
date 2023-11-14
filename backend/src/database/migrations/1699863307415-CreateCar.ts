import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCar1699863307415 implements MigrationInterface {
  name = 'CreateCar1699863307415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "type_car" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8b91ffb27112a00a777f2c2ab66" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car" ("id" SERIAL NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "licensePlate" character varying NOT NULL, "capacity" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, "typeId" integer, "statusId" integer, CONSTRAINT "UQ_376f481e04705afcf4a2bc0aa9b" UNIQUE ("licensePlate"), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fdeddf84bb7b13b2d07acd15f8" ON "car" ("brand") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b269a137f817c6417e45e8542d" ON "car" ("model") `,
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_0ce22aa5546598aa201d512c79b" FOREIGN KEY ("typeId") REFERENCES "type_car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_2bf97eb481e92c46ad5a92a9573" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car" DROP CONSTRAINT "FK_2bf97eb481e92c46ad5a92a9573"`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" DROP CONSTRAINT "FK_0ce22aa5546598aa201d512c79b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" DROP CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b269a137f817c6417e45e8542d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fdeddf84bb7b13b2d07acd15f8"`,
    );
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TABLE "type_car"`);
  }
}
