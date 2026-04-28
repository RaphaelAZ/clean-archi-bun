import { Member } from '../entities/Member';

export interface MemberRepository {
    save(member: Member): Promise<void>;
    getAll(): Promise<Member[]>;
}