/**
 * Podcasts Module
 * Exports all podcast-related functionality
 */

import Podcast from './models/Podcast.js';
import podcastController from './controllers/podcastController.js';
import podcastRoutes from './routes/podcastRoutes.js';
import podcastService from './services/podcastService.js';
import * as podcastValidation from './middleware/validation.js';

export {
  Podcast,
  podcastController,
  podcastRoutes,
  podcastService,
  podcastValidation
};

export default {
  model: Podcast,
  controller: podcastController,
  routes: podcastRoutes,
  service: podcastService,
  validation: podcastValidation
};
