const fixtureFactory = require('fixture-factory');

// 'foobar'
const dummyPassword = '$2a$10$jqtfUwulMw6xqGUA.IsjkuAooNkAjPT3FJ9rRiUoSTsUpNTD8McxC';

fixtureFactory.register('user', {
  email: 'internet.email',
  password: dummyPassword,
  description: 'lorem.sentences',
  scope: 'user',
});

fixtureFactory.register('book', {
  title: 'TF:s Sångbok',
});

fixtureFactory.register('song', {
  title: 'lorem.words',
  lyrics: 'lorem.paragraphs',
  bookId: 1,
  page: 'random.number',
});

// Generate one test admin user
const testUser = Object.assign({}, fixtureFactory.generateOne('user'), {
  email: 'foo@bar.com',
  scope: 'admin',
});

exports.seed = knex => (
  knex('users')
    .insert(testUser)
    .then(() => (
      knex.batchInsert('users', fixtureFactory.generate('user', 10))
    ))
    .then(() => (
      knex.batchInsert('books', fixtureFactory.generate('book', 1))
    ))
    .then(() => (
      knex.batchInsert('songs', fixtureFactory.generate('song', 50))
    ))
);
