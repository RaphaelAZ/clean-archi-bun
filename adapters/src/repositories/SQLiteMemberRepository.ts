import { Member, type MemberRepository } from 'core';
import { Database } from 'bun:sqlite';
import { join } from 'path';

const dbPath = join(process.cwd(), 'members.db');

export class SQLiteMemberRepository implements MemberRepository {
    private db: Database;

    constructor() {
        this.db = new Database(dbPath, { create: true });
        this.initializeDatabase();
    }

    private initializeDatabase(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS members (
                uuid TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL
            )
        `);
    }

    async save(member: Member): Promise<void> {
        const stmt = this.db.prepare(
            'INSERT OR REPLACE INTO members (uuid, name, email) VALUES (?, ?, ?)'
        );
        stmt.run(member.uuid, member.name, member.email);
    }

    async getAll(): Promise<Member[]> {
        const stmt = this.db.prepare('SELECT uuid, name, email FROM members');
        const rows = stmt.all() as Array<{ uuid: string; name: string; email: string }>;
        return rows.map(row => new Member(row.uuid, row.name, row.email));
    }
}