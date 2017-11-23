import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import userRoutes from './users/routes';

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  api.use('/facets', facets({ config, db }));

  // perhaps expose some API metadata at the root
  api.use('/', userRoutes);

  return api;
};
