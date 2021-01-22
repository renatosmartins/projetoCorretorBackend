import Immobile from '../models/Properties';
import imagesView from './images_view';

export default {
    render(immobile: Immobile) {
        return {
            id: immobile.id,
            name: immobile.name,
            latitude: immobile.latitude,
            longitude: immobile.longitude,
            about: immobile.about,
            instructions: immobile.instructions,
            opening_hours: immobile.opening_hours,
            open_on_weekends: immobile.open_on_weekends,
            image: imagesView.renderMany(immobile.images),
        };
    },

    renderMany(properties: Immobile[]) {
        return properties.map(immobile => this.render(immobile));
    }
};