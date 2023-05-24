
import { CartState } from './CartProvider';
import { ICartProduct } from '@/interfaces';

type CartActionType =
| { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
| { type: '[Cart] - Add Product | storage', payload: ICartProduct }

export const cartReducer = ( state: CartState, action: CartActionType ): CartState => {

    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
            }
        default:
            return state;
    }

}