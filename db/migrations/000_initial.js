exports.up = knex => (
  knex.schema
    .createTableIfNotExists('users', (table) => {
      table.increments('id').primary();
      table.enum('scope', ['admin', 'user']).notNullable();
      table.text('email').notNullable().unique();
      table.text('password').notNullable();
      table.text('description');
      table.binary('image');
    })
    .createTableIfNotExists('books', (table) => {
      table.increments('id').primary();
      table.text('title').notNullable();
    })
    .createTableIfNotExists('songs', (table) => {
      table.increments('id').primary();
      table.text('title').notNullable();
      table.text('lyrics').notNullable();
      table.integer('bookId').references('id').inTable('books');
      table.integer('page');
    })
);

exports.down = knex => (
  knex.schema
    .dropTableIfExists('users')
);
