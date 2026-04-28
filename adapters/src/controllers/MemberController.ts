import { type MemberRepository, Member } from "core";

export default class MemberController implements MemberRepository {
    private members = new Map<string, Member>()

    async save(member: Member): Promise<void>
    {
        this.members.set(member.uuid, member)
    }

    async getAll(): Promise<Member[]>
    {
        return this.members.values().toArray()
    }
}