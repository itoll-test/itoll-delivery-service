import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveConsginmentMigration1687166548196
  implements MigrationInterface
{
  name = 'RemoveConsginmentMigration1687166548196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "origin_location" TYPE geography(Point)`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "destination_location" TYPE geography(Point)`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "current_location" TYPE geography(Point)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "current_location" TYPE geography(Point,4326)`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "destination_location" TYPE geography(Point,4326)`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "origin_location" TYPE geography(Point,4326)`,
    );
  }
}
