var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Images',
  tableName: 'images',
  columns: {
    id: {
      primary: true,
      type: 'bigint',
      generated: true,
    },
    post_id: {
      type: 'bigint',
      nullable: true,
    },
    hash: {
      type: 'varchar',
      length: 255,
      nullable: false,
      unique: true,
    },
    file_name: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    server_id: {
      type: 'int',
      nullable: false,
      default: 1,
    },
  },
  relations: {
    post: {
      target: 'Item',
      type: 'many-to-one',
      joinColumn: true,
      cascade: true,
      onDelete: 'RESTRICT',
      onUpdate: 'cascade',
    },
  },
});
