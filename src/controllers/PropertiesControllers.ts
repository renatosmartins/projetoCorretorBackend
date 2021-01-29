import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Immobile from '../models/Properties';
import propertiesView from '../views/properties_view';
import * as Yup from 'yup';

export default {
    async index( request: Request, response: Response) {
        const propertiesRepository = getRepository(Immobile);
        const properties = await propertiesRepository.find({
            relations: ['images']
        });

        return response.json(propertiesView.renderMany(properties));
    },

    async show( request: Request, response: Response) {
        const { id } = request.params;
        
        const propertiesRepository = getRepository(Immobile);

        const immobile = await propertiesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(propertiesView.render(immobile));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const immobileRepository = getRepository(Immobile);

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images,
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(1200),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                path: Yup.string().required()
            })),
        })

        await schema.validate(data, {
            abortEarly: false, 
        })
    
        const immobile = immobileRepository.create(data);
    
        await immobileRepository.save(immobile);
    
        return response.status(201).json(immobile);
    }
};