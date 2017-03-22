import knex from '../utils/db';

const songSummaryFields = [
  'songs.id',
  'songs.title',
  'songs.type',
  'songs.bookId',
  'songs.page',
  'books.title as bookName',
  'books.imageUrl',
  'books.primaryColor',
];

const songDetailedFields = [
  'songs.id',
  'songs.title',
  'songs.type',
  'songs.lyrics',
  'songs.pre',
  'songs.post',
  'songs.bookId',
  'songs.page',
  'books.title as bookName',
  'books.imageUrl',
  'books.primaryColor',
];

export const dbGetSongs = (filter) => {
  let q = knex('songs')
    .select(songSummaryFields)
    .leftJoin('books', 'songs.bookId', 'books.id');

  if (filter) {
    q = q.whereRaw("LOWER(songs.title) LIKE '%' || LOWER(?) || '%'", filter);
  }

  return q;
};

export const dbGetSong = id => (
  knex('songs')
    .first(songDetailedFields)
    .where('songs.id', id)
    .leftJoin('books', 'songs.bookId', 'books.id')
);

export const dbUpdateSong = (id, fields) => (
  knex('songs')
    .update({ ...fields })
    .where({ id })
);

export const dbDelSong = id => (
  knex('songs')
    .where({ id })
    .del()
);

export const dbCreateSong = fields => (
  knex('songs')
    .insert(fields)
    .then(results => dbGetSong(results[0].id))
);
