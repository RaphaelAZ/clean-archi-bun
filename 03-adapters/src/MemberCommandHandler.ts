import { CartUseCase } from 'use-cases';

export class CartCommandHandler {
    constructor(private readonly cartUseCase: CartUseCase) {}

    async add(productName: string, quantity: number, unitPrice: number): Promise<void> {
        try {
            await this.cartUseCase.addItem(productName, quantity, unitPrice);
            console.log(`Added ${quantity} x ${productName} to the cart.`);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    }

    async list(): Promise<void> {
        try {
            const cart = await this.cartUseCase.getCart();
            const items = cart.getItems();

            if (items.length === 0) {
                console.log('Cart is empty.');
                return;
            }

            console.log(`Cart #${cart.getUuid()}`);

            for (const item of items) {
                console.log(`- ${item.getProductName()} | qty: ${item.getQuantity()} | unit: ${item.getUnitPrice()} | total: ${item.getTotalPrice()}`);
            }

            console.log(`Total: ${cart.getTotal()}`);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    async clear(): Promise<void> {
        try {
            await this.cartUseCase.clearCart();
            console.log('Cart cleared.');
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }
}