export type DuckColor = 'Red' | 'Green' | 'Yellow' | 'Black';
export type DuckSize = 'XLarge' | 'Large' | 'Medium' | 'Small' | 'XSmall';

export interface Duck {
    id: number;
    color: DuckColor;
    size: DuckSize;
    price: number;
    quantity: number;
    deleted: boolean;
}