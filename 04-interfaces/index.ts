import { InMemoryCartRepository, CartCommandHandler } from 'adapters';
import { CartUseCase } from 'use-cases';

const repository: InMemoryCartRepository = new InMemoryCartRepository();
const cartUseCase: CartUseCase = new CartUseCase(repository);
const cartCommandHandler: CartCommandHandler = new CartCommandHandler(cartUseCase);

const command = Bun.argv[2];

if (command === '--list') {
    await cartCommandHandler.list();
}

if (command === '--add') {
    const productName = Bun.argv[3];
    const quantity = Number(Bun.argv[4]);
    const unitPrice = Number(Bun.argv[5]);

    if (!productName || Number.isNaN(quantity) || Number.isNaN(unitPrice)) {
        console.error('Product name, quantity and unit price are required to add an item.');
        process.exit(1);
    }

    await cartCommandHandler.add(productName, quantity, unitPrice);
    process.exit(0);
}

if (command === '--clear') {
    await cartCommandHandler.clear();
    process.exit(0);
}
