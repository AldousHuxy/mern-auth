import { ReactNode, createContext, useContext, useState } from 'react'
import { ShoppingCart } from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('GAME', [])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const cartQuantity: number = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const getItemQuantity = (id: number): number => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: number): void => {
        setCartItems(curr => {
            if (curr.find(item => item.id === id) == null) {
                return [...curr, { id, quantity: 1 }]
            } else {
                return curr.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number): void => {
        setCartItems(curr => {
            if (curr.find(item => item.id === id)?.quantity == 1) {
                return curr.filter(item => item.id !== id)
            } else {
                return curr.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number): void => {
        setCartItems(curr => {
            return curr.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider 
            value={{ 
                openCart,
                closeCart,
                getItemQuantity, 
                increaseCartQuantity, 
                decreaseCartQuantity, 
                removeFromCart,
                cartQuantity,
                cartItems
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}