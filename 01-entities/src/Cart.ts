export class CartItem {
    constructor(
        public readonly productName: string,
        public quantity: number,
        public readonly unitPrice: number
    ) {}

    getTotalPrice = () => this.quantity * this.unitPrice;

    increaseQuantity(amount: number): void {
        if (amount <= 0) {
            throw new Error('Quantity must be greater than 0.');
        }

        this.quantity += amount;
    }
}

export class Cart {
    constructor(
        public readonly uuid: string,
        public readonly items: CartItem[] = []
    ) {}

    addItem(productName: string, quantity: number, unitPrice: number): void {
        if (!productName.trim()) {
            throw new Error('Product name is required.');
        }

        if (quantity <= 0) {
            throw new Error('Quantity must be greater than 0.');
        }

        if (unitPrice < 0) {
            throw new Error('Unit price cannot be negative.');
        }

        const existingItem = this.items.find((item) => item.productName === productName);

        if (existingItem) {
            existingItem.increaseQuantity(quantity);
            return;
        }

        this.items.push(new CartItem(productName, quantity, unitPrice));
    }

    removeItem(productName: string): void {
        const filteredItems = this.items.filter((item) => item.productName !== productName);
        this.items.splice(0, this.items.length, ...filteredItems);
    }

    clear(): void {
        this.items.splice(0, this.items.length);
    }

    getTotal = () => this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
}