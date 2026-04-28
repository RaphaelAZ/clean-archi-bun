import { MemberUseCase } from "core"

export class MemberController {
    constructor(private readonly memberUseCase: MemberUseCase) {}

    async save(name: string, email: string): Promise<void> {
        try {
            await this.memberUseCase.createMember(name, email);
            console.log('Member created successfully');
        } catch (error) {
            console.error('Error creating member:', error);
        }
    }

    async getAll(): Promise<void> {
        try {
            const members = await this.memberUseCase.getAll();
            console.log("Current members: " + JSON.stringify(members));
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }
}