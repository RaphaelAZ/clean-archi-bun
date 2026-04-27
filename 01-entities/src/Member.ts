export class Member {
    constructor(
        private readonly uuid: string,
        private readonly name: string,
        private readonly email: string
    ) {}

    getUuid = () => this.uuid;
    getName = () => this.name;
    getEmail = () => this.email;
}