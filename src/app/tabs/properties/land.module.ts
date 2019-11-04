export class Land {
    constructor(
        public landId: string,
        public title: string,
        public area: number,
        public certification: string,
        public direction: string,
        public status: string,
        public address: string
    ) {}
}