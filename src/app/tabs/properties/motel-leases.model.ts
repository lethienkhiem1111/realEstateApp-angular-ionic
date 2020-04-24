export class MotelLeaases {
    constructor(
        public motelId: string,
        public name: string,
        public thumbnailUrl: string,
        public address: string,
        public monPrice: number,
        public dayPrice: number,
        public restroom: number,
        public bedroom: number,
        public floor: number,
        public status: string
    ) {}
}