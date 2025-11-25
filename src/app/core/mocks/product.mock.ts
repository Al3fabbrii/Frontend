import { Product } from "../models/product";

export const PRODUCTS_MOCK: Product[] = [
    { id: 'p1', title: 'T Shirt Angular',
        price: 19.99, thumbnail: 'assets/tshirt.png', 
        tags: ['tag1', 'tag2'], createdAt: '2024-01-01T10:00:00Z' },
    { id: 'p2', title: 'Mug typescript',
        price: 29.99, thumbnail: 'assets/mug.png', 
        tags: ['tag2', 'tag3'], createdAt: '2024-02-15T12:30:00Z' }
]