import Boom from 'boom';

import {
  dbGetSongs,
  dbGetSong,
  dbDelSong,
  dbUpdateSong,
  dbCreateSong,
} from '../models/songs';

export const getSongs = (request, reply) => dbGetSongs().then(reply);
export const getSong = (request, reply) => dbGetSong(request.params.songId).then(reply);
export const createSong = (request, reply) => dbCreateSong(request.params).then(reply);
export const updateSong = async (request, reply) => dbUpdateSong(request.params).then(reply);
export const delSong = (request, reply) => dbDelSong(request.params.songId).then(reply);
