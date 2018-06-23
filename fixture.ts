export default class SomeComponent {
    constructor(
        private diComponent: any,
    ) {
    }

    async aMethod(id: string, version: string) {
        return this.diComponent.aMethod(id, version);
    }

    private async bMethod(id: string, version: string) {
        return this.diComponent.bMethod(id, version);
    }

    public async cMethod(id: string, tag: string): Promise<string> {
        return this.diComponent.cMethod(id, tag);
    }

    *dMethod(id: string) {
        return this.diComponent.dMethod(id);
    }
}