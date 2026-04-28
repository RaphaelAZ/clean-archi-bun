import { Member } from 'entities';
import type { MemberRepository } from 'use-cases';

export class InMemoryMemberRepository implements MemberRepository {
    protected readonly members = new Map<string, Member>();

    async save(member: Member): Promise<void> {
        this.members.set(member.getUuid(), member);
    }

    async getAll(): Promise<Member[]> {
        return Array.from(this.members.values());
    }
}