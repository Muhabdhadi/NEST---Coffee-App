import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1790312975431 implements MigrationInterface {
    name = 'SchemaSync1790312975431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "country" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "country"`);
    }

}
