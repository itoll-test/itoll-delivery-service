import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1687013009793 implements MigrationInterface {
  name = 'NewMigration1687013009793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consignment" ALTER COLUMN "location" TYPE geography(Point)`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "origin_location" TYPE geography(Point)`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "destination_location" TYPE geography(Point)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "destination_location" TYPE geography(Point,4326)`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "origin_location" TYPE geography(Point,4326)`,
    );
    await queryRunner.query(
      `ALTER TABLE "consignment" ALTER COLUMN "location" TYPE geography(Point,4326)`,
    );
  }
}
