import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTenantTable1739880336737 implements MigrationInterface {
  name = 'CreateTenantTable1739880336737';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tenant" ("type" character varying, "domain" character varying, "name" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "tenantId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_685bf353c85f23b6f848e4dcded" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_685bf353c85f23b6f848e4dcded"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tenantId"`);
    await queryRunner.query(`DROP TABLE "tenant"`);
  }
}
