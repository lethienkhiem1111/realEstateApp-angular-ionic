export class House {
    constructor(
        public houseId: string,
        public title: string,
        public area: number,
        public bedroom: number,
        public restroom: number,
        public floor: number,
        public certification: string,
        public direction: string,
        public address: string,
        public home_level: number,
        public home_status: string,
    ) {

    }
}