import { CartProductProps } from '@/app/interface/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set) => ({
            cart: {},
            totalProducts: 0,
            removeFromCart: (vendorId: string, productId: string) =>
                set((state: { cart: any; totalProducts: number }) => {
                    const updatedCart = { ...state.cart };

                    updatedCart[vendorId] = Object.values(
                        updatedCart[vendorId]
                    ).reduce((acc: any, product: any) => {
                        if (product.id !== productId) {
                            acc[product.id] = product;
                        }
                        return acc;
                    }, {});

                    // Check if the updated cart for this vendor is empty and delete it if necessary
                    if (Object.keys(updatedCart[vendorId]).length === 0) {
                        delete updatedCart[vendorId];
                    }

                    const newTotalProducts = Object.values(updatedCart).reduce(
                        (acc: number, vendorCart: any) =>
                            acc + Object.keys(vendorCart).length,
                        0
                    );

                    return {
                        cart: updatedCart,
                        totalProducts: newTotalProducts,
                    };
                }),

            addToCart: (vendorId: string, product: CartProductProps) =>
                set((state: { cart: any; totalProducts: number }) => {
                    const updatedVendorCarts = { ...state.cart };

                    if (updatedVendorCarts[vendorId]) {
                        const existingProduct =
                            updatedVendorCarts[vendorId][product.id];
                        if (existingProduct) {
                            updatedVendorCarts[vendorId][product.id] = {
                                ...existingProduct,
                                quantity:
                                    product.quantity > 1 ||
                                    product.quantity === 1
                                        ? product.quantity +
                                          existingProduct.quantity
                                        : existingProduct.quantity - 1,
                            };
                        } else {
                            updatedVendorCarts[vendorId][product.id] = {
                                ...product,
                            };
                        }
                    } else {
                        updatedVendorCarts[vendorId] = {
                            [product.id]: { ...product },
                        };
                    }

                    // Update total products
                    const newTotalProducts = Object.values(
                        updatedVendorCarts
                    ).reduce((acc: any, vendorCart: any) => {
                        return (
                            acc +
                            Object.values(vendorCart).reduce(
                                (acc, product: any) => acc + product.quantity,
                                0
                            )
                        );
                    }, 0);

                    return {
                        cart: updatedVendorCarts,
                        totalProducts: newTotalProducts,
                    };
                }),
            clearVendorCart: (vendorId: string) =>
                set((state: { cart: any; totalProducts: number }) => {
                    const updatedCart = { ...state.cart };

                    delete updatedCart[vendorId];

                    const newTotalProducts = Object.values(updatedCart).reduce(
                        (acc: number, vendorCart: any) =>
                            acc + Object.keys(vendorCart).length,
                        0
                    );

                    return {
                        cart: updatedCart,
                        totalProducts: newTotalProducts,
                    };
                }),
        }),
        {
            name: 'cart-storage',
        }
    )
);

export default useCartStore;
