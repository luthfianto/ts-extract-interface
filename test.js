const { extractInterface } = require("./extract-interface")

async function print() {
    const expected = `
export interface ISomeComponent {
    aMethod(id: string, version: string);
    cMethod(id: string, tag: string): Promise<string>;
    dMethod(id: string)
}`.trim()

    const parsedInterface = await extractInterface(`
export default class SomeComponent extends Component {
    constructor(
        private diComponent: any;
    ) {
        super();
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
}`);

    return parsedInterface === expected;
}

print().then(res => console.log(res));