import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1611338514037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
  
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'immobile_id',
            type: 'integer',
          }
        ],

        foreignKeys: [
          {
            name: 'ImageImmobile',
            columnNames: ['immobile_id'], 
            referencedTableName: 'properties',
            referencedColumnNames:  ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('images');
    }

}
