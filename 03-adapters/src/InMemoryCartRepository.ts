import { Cart } from 'entities';
import type { CartRepository } from 'use-cases';

export class InMemoryCartRepository implements CartRepository {
    protected currentCart: Cart | null = null;

    async save(cart: Cart): Promise<void> {
        this.currentCart = cart;
    }

    async getCurrentCart(): Promise<Cart | null> {
        return this.currentCart;
    }
}