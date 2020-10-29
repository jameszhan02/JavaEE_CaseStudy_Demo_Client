import { OrderItem } from './order-item';
export interface Order {
    id: number;
    vendorid: number;
    amount: number;
    podate: string;
    items: OrderItem[];
}
