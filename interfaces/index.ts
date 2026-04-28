import { InMemoryMemberRepository, MemberCommandHandler } from 'adapters';
import { MemberUseCase } from 'use-cases';

const repository: InMemoryMemberRepository = new InMemoryMemberRepository();
const memberUseCase: MemberUseCase = new MemberUseCase(repository);
const memberCommandHandler: MemberCommandHandler = new MemberCommandHandler(memberUseCase);

const command = Bun.argv[2];

if (command === '--list') {
    await memberCommandHandler.getAll();
}

if(command === '--create') {
    const name = Bun.argv[3];
    const email = Bun.argv[4];

    if(!name || !email) {
        console.error('Name and email are required to create a member.');
        process.exit(1);
    }

    await memberCommandHandler.save(name, email);
    process.exit(0);
}
