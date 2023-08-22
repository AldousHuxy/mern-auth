import { Col, Row } from 'react-bootstrap';
import gameItems from '../data/games.json';
import { StoreItem } from '../components/StoreItem';

export const Store = () => {
    return (
        <>
            <h1>Store</h1>
            <Row lg={3} md={2} xs={1} className="g-3">
                {gameItems.map(item => (
                    <Col key={item.id}><StoreItem {...item} /></Col>
                ))}
            </Row>
        </>
    )
}