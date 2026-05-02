import { randomUUIDv7 } from 'bun';
import { Cart } from 'entities';
import { type CartRepository } from './CartRepository';

export class CartUseCase {
    constructor(private readonly cartRepository: CartRepository) {}

    private async getOrCreateCart(): Promise<Cart> {
        const existingCart = await this.cartRepository.getCurrentCart();

        if (existingCart) {
            return existingCart;
        }

        return new Cart(randomUUIDv7());
    }

    async addItem(productName: string, quantity: number, unitPrice: number): Promise<void> {
        const cart = await this.getOrCreateCart();
        cart.addItem(productName, quantity, unitPrice);
        await this.cartRepository.save(cart);
    }

    async removeItem(productName: string): Promise<void> {
        const cart = await this.getOrCreateCart();
        cart.removeItem(productName);
        await this.cartRepository.save(cart);
    }

    async clearCart(): Promise<void> {
        const cart = await this.getOrCreateCart();
        cart.clear();
        await this.cartRepository.save(cart);
    }

    getCart = async (): Promise<Cart> => await this.getOrCreateCart();
}