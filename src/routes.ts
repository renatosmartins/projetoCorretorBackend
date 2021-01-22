import { Router } from 'express';

import multer from 'multer';

import PropertiesController from './controllers/PropertiesControllers';
import uploadConfig from './config/uplolad';

const routes = Router();

const upload = multer(uploadConfig);

routes.get('/properties', PropertiesController.index);
routes.get('/properties/:id', PropertiesController.show);
routes.post('/properties', upload.array('images'), PropertiesController.create);

export default routes;