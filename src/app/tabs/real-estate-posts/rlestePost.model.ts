import { PlaceLocation } from 'src/app/shared/location.module';

export class RealEstatePost {
    constructor(
        public postId: string,
        public realEstateId: string,
        public cata: string,
        public title: string,
        public content: string,
        public price: number,
        public thumbnailUrl: string,
        public city: string,
        public district: string,
        public address: string,
        public location: PlaceLocation,
        public imagesUrl: string,
        public rating: number,

    ) {}
}