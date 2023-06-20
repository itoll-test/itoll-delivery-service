import { MigrationInterface, QueryRunner } from "typeorm";

export class BusinessCourierDeletionMigration1687290878644 implements MigrationInterface {
    name = 'BusinessCourierDeletionMigration1687290878644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery" DROP CONSTRAINT "FK_430eb33f87c84c37faca02f6e5f"`);
        await queryRunner.query(`ALTER TABLE "delivery" DROP CONSTRAINT "FK_8f21ed3b35441707dfd15d69e84"`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "sender_location" TYPE geography(Point)`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "reciever_location" TYPE geography(Point)`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "current_location" TYPE geography(Point)`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "courier_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "courier_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "current_location" TYPE geography(Point,4326)`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "reciever_location" TYPE geography(Point,4326)`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "sender_location" TYPE geography(Point,4326)`);
        await queryRunner.query(`ALTER TABLE "delivery" ADD CONSTRAINT "FK_8f21ed3b35441707dfd15d69e84" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery" ADD CONSTRAINT "FK_430eb33f87c84c37faca02f6e5f" FOREIGN KEY ("courier_id") REFERENCES "courier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
