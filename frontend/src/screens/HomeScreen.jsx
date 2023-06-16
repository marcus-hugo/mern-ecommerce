import { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import axios from "axios"

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  // Will run once and set state with fetched data, even though state hase not changed.
  // - on load? or on the homeScreeen?
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("api/products")
        setProducts(data)
        console.log("use effect ran")
      } catch (e) {
        console.log(e)
      }
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
