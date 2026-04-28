import { describe, it, expect } from "bun:test";
import { generateServer } from "../src/server";
import supertest from "supertest";
import { InMemoryMemberRepository } from "adapters/src/in-memory-repository/InMemoryMemberRepository";

describe("Server Initialization and Routes", () => {
    const member = {
        name: "John Doe",
        email: "toto@gmail.com"
    };
    const app = generateServer(new InMemoryMemberRepository());

    it('should launch the server successfully', async () => {
        expect(app).toBeDefined();
    });

    it('should add member', async (done) => {
        supertest(app)
            .post('/members')
            .send(member)
            .set('Accept', 'application/json')
            .expect(200)
            .end((res) => {
                expect(res.body.email).toEqual('toto@gmail.com');
                expect(res.body.name).toEqual('John Doe');
                done();
            });
    });

    it('should get all members', async (done) => {
        const agent = supertest(app);
        agent
            .get('/members')
            .set('Accept', 'application/json')
            .expect(200)
            .end((res) => {
                expect(Array.isArray(res.body)).toBe(true);
                expect(res.body.length).toBeGreaterThan(0);
                const member = res.body.find((m: any) => m.email === 'toto@gmail.com');
                expect(member).toBeDefined();
                expect(member.name).toEqual('John Doe');
                done();
            });
    });
});
