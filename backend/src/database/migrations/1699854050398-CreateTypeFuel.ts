import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTypeFuel1699854050398 implements MigrationInterface {
  name = 'CreateTypeFuel1699854050398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "type_fuel" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_13d6def82644275566377467614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c63188b44558490a9a2e613084" ON "type_fuel" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c63188b44558490a9a2e613084"`,
    );
    await queryRunner.query(`DROP TABLE "type_fuel"`);
  }
}
