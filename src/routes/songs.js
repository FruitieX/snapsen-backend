import { merge } from 'lodash';
import Joi from 'joi';

import { getAuthWithScope } from '../utils/auth';
import {
  getSongs,
  getSong,
  createSong,
  updateSong,
  delSong,
} from '../controllers/songs';

const validateSongId = {
  validate: {
    params: {
      songId: Joi.number().integer().required(),
    },
  },
};

const songs = [
  // Get a list of all songs
  {
    method: 'GET',
    path: '/songs',
    handler: getSongs,
  },

  // Get info about a specific song
  {
    method: 'GET',
    path: '/songs/{songId}',
    config: validateSongId,
    handler: getSong,
  },

  // Create song
  {
    method: 'POST',
    path: '/songs',
    config: getAuthWithScope('admin'),
    handler: createSong,
  },

  {
    method: 'PUT',
    path: '/songs/{songId}',
    config: merge({}, validateSongId, getAuthWithScope('admin')),
    handler: updateSong,
  },

  // Delete a song, admin only
  {
    method: 'DELETE',
    path: '/songs/{songId}',
    config: merge({}, validateSongId, getAuthWithScope('admin')),
    handler: delSong,
  },
];

export default songs;

// Here we register the routes
export const routes = server => server.route(songs);
