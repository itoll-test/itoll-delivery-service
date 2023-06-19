import { MigrationInterface, QueryRunner } from "typeorm";

export class DeliveryEnumMigration1687181462588 implements MigrationInterface {
    name = 'DeliveryEnumMigration1687181462588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "sender_location" TYPE geography(Point)`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "reciever_location" TYPE geography(Point)`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "current_location" TYPE geography(Point)`);
        await queryRunner.query(`ALTER TYPE "public"."delivery_state_enum" RENAME TO "delivery_state_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."delivery_state_enum" AS ENUM('NOT_ACCPTED_BY_COURIER', 'ACCPTED_BY_COURIER', 'RECIEVED_BY_COURIER', 'TOWARD_DESTINATION', 'DELIVERD', 'CANCLED')`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "state" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "state" TYPE "public"."delivery_state_enum" USING "state"::"text"::"public"."delivery_state_enum"`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "state" SET DEFAULT 'NOT_ACCPTED_BY_COURIER'`);
        await queryRunner.query(`DROP TYPE "public"."delivery_state_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."delivery_state_enum_old" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "state" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "state" TYPE "public"."delivery_state_enum_old" USING "state"::"text"::"public"."delivery_state_enum_old"`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "state" SET DEFAULT '0'`);
        await queryRunner.query(`DROP TYPE "public"."delivery_state_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."delivery_state_enum_old" RENAME TO "delivery_state_enum"`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "current_location" TYPE geography(Point,4326)`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "reciever_location" TYPE geography(Point,4326)`);
        await queryRunner.query(`ALTER TABLE "delivery" ALTER COLUMN "sender_location" TYPE geography(Point,4326)`);
    }

}
