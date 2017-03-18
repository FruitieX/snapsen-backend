import songs from './tf.json';
const fixtureFactory = require('fixture-factory');

const book = {
  title: 'TF:s Nya Sångbok',
  imageUrl: 'https://fruitiex.org/files/tf_logo.png',
}

const categories = {
  3: 'Fosterländsk Sång',
  4: 'Akademisk Sång',
  5: 'Teknologvisa',
  6: 'Snapsvisa',
  7: 'Vinvisa',
  8: 'Annan Dryckesvisa',
  9: 'Punschvisa',
  10: 'Finsk Visa',
  11: 'Övrig Sång',
};

exports.seed = knex => (
  knex('books')
    .insert(book).returning('id')
    .then((bookIds) => {
      return knex.batchInsert('songs', songs.map((song) => ({
        title: song.name,
        lyrics: song.lyrics,
        pre: song.pre,
        post: song.post,

        type: categories[song.category_id],
        bookId: bookIds[0]
      })));
    })
);
