import { useParams, Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap"
import Rating from "../components/Rating"
import { useGetProductDetailsQuery } from "../slices/productsApiSlice"

const ProductScreen = () => {
  const { id: productId } = useParams() // get dynamic params from a url
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.error || error.error}</div>
      ) : (
        <Row>
          <Col md={5}>
            <Card.Img src={product.image} alt={product.name} />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={product.numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text as="h2">${product.price}</Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text>{product.description}</Card.Text>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>{product.countInStock > 0 ? `${product.countInStock} in stock` : "Out of stock"}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
