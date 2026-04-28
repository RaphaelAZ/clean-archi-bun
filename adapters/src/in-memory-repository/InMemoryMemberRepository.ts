import { Member, type MemberRepository } from 'core';

export class InMemoryMemberRepository implements MemberRepository {
    protected readonly members = new Map<string, Member>();

    async save(member: Member): Promise<void> {
        this.members.set(member.getUuid(), member);
    }

    async getAll(): Promise<Member[]> {
        return Array.from(this.members.values());
    }
}