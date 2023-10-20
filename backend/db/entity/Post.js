var EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'Post',
  tableName: 'posts',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
      nullable: true,
      length: 255,
    },
    text: {
      type: 'text',
      nullable: false,
    },
    publication_date: {
      createDate: true,
    },
  },
  relations: {},
});
