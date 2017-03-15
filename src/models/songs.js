import knex from '../utils/db';

const songSummaryFields = [
  'songs.id',
  'songs.title',
  'songs.bookId',
  'songs.page',
];

const songDetailedFields = [
  'songs.id',
  'songs.title',
  'songs.lyrics',
  'songs.bookId',
  'songs.page',
];

export const dbGetSongs = (filter) => {
  let q = knex('songs')
    .select(songSummaryFields);

  if (filter) {
    q = q.whereRaw("LOWER(title) LIKE '%' || LOWER(?) || '%'", filter);
  }

  return q;
};

export const dbGetSong = id => (
  knex('songs')
    .first(songDetailedFields)
    .where({ id })
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
    .returning(songDetailedFields)
    .then(results => results[0]) // return only first result
);
