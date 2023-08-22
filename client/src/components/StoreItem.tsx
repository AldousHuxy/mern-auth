import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemProps = {
    id: number
    title: string
    release: string
    publisher: string
    developer: string
    genre: string
    description: string
    price: number
    image: string
}

export const StoreItem = ({ id, title, release, publisher, developer, genre, description, price, image }: StoreItemProps) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity: number = getItemQuantity(id)
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={image} height="500px" />
            <Card.Body>
                <Card.Title
                    className="d-flex justify-content-between align-items-baseline mb-4"
                >
                    <span className="fs-5">{title}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <Card.Text
                    className="d-flex justify-content-between align-items-baseline mb-4"
                >
                    <span className="fs-6">{publisher}</span>
                    <span className="fs-6">{release}</span>
                </Card.Text>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add to Cart</Button>
                    ) : <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                        <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                        <div>
                            <span className="fs-3">{quantity}</span> in cart
                        </div>
                        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <div className="d-flex align-item-center justify-content-center" style={{ gap: ".5rem" }}>
                            <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
                        </div>
                    </div> }
                </div>
            </Card.Body>
        </Card>
    )
}
