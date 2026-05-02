import { Cart } from 'entities';

export interface CartRepository {
    save(cart: Cart): Promise<void>;
    getCurrentCart(): Promise<Cart | null>;
}