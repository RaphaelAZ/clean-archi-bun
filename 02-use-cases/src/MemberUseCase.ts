import { Member } from "entities";
import { type MemberRepository } from "./MemberRepository";
import { randomUUIDv7 } from "bun";

export class MemberUseCase {
    constructor(private readonly memberRepository: MemberRepository) {}

    async createMember(name: string, email: string): Promise<void> {
        const uuid = randomUUIDv7();
        const member = new Member(uuid, name, email);   
        await this.memberRepository.save(member);
    }

    getAll = async (): Promise<Member[]> => await this.memberRepository.getAll();
}