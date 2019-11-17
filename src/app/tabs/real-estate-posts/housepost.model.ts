import { PlaceLocation } from 'src/app/shared/location.module';

export class HousePost {
    constructor(
        public user_id: string,
        public catalog: string,
        public title: string,
        public content: string,
        public price: number,
        public area: number,  
        public thumbnail: string,
        public image_url: string,
        public city: string,
        public district: string,
        public address: string,
        public location: string,
        public bedroom: number,
        public restroom: number,
        public floor: number,
        public certification: string,
        public direction: string,
        public rating: number,
        public house_level: string
    ) {}
}