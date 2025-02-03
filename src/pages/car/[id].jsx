import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Row, Col, Carousel, Button, Table, Badge, Tabs, Tab, ListGroup } from "react-bootstrap"
import { FaCar, FaGasPump, FaCogs, FaTachometerAlt } from "react-icons/fa"
import Layout from "../../components/Layout"

export default function CarDetails() {
  const [car, setCar] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      fetch(`/api/cars/${id}`)
        .then((res) => res.json())
        .then((data) => setCar(data))
    }
  }, [id])

  if (!car) {
    return (
      <Layout>
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Button variant="link" onClick={() => router.back()} className="mb-4 text-decoration-none">
        &larr; Back to Listings
      </Button>
      <Row>
        <Col lg={8}>
          <Carousel className="mb-4 shadow-sm rounded">
            {car.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 rounded"
                  src={image || "/placeholder.svg"}
                  alt={`${car.make} ${car.model}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col lg={4}>
          <div className="sticky-top" style={{ top: "2rem" }}>
            <h1 className="mb-3">{`${car.make} ${car.model}`}</h1>
            <h2 className="text-primary mb-4">${car.price.toLocaleString()}</h2>
            <Badge bg="secondary" className="mb-3 px-3 py-2">
              Year: {car.year}
            </Badge>
            <p className="lead mb-4">{car.description}</p>
            <Button variant="primary" size="md" className="w-100  rounded-pill">
              Contact Seller
            </Button>
           
          </div>
        </Col>
      </Row>
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Tab eventKey="overview" title="Overview">
          <Row className="g-4">
            <Col md={3}>
              <div className="d-flex align-items-center">
                <FaCar className="text-primary me-3" size={24} />
                <div>
                  <h6 className="mb-0">Body Type</h6>
                  <p className="mb-0">{car.specifications.bodyType || "N/A"}</p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex align-items-center">
                <FaGasPump className="text-primary me-3" size={24} />
                <div>
                  <h6 className="mb-0">Fuel Type</h6>
                  <p className="mb-0">{car.specifications.fuelType || "N/A"}</p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex align-items-center">
                <FaCogs className="text-primary me-3" size={24} />
                <div>
                  <h6 className="mb-0">Transmission</h6>
                  <p className="mb-0">{car.specifications.transmission || "N/A"}</p>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex align-items-center">
                <FaTachometerAlt className="text-primary me-3" size={24} />
                <div>
                  <h6 className="mb-0">Mileage</h6>
                  <p className="mb-0">
                    {car.specifications.mileage ? `${car.specifications.mileage.toLocaleString()} miles` : "N/A"}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="specifications" title="Specifications">
          <Table striped bordered hover className="shadow-sm">
            <tbody>
              {Object.entries(car.specifications).map(([key, value]) => (
                <tr key={key}>
                  <td className="fw-bold">{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="features" title="Features">
          <ListGroup variant="flush">
            {car.features &&
              car.features.map((feature, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center">
                  <span className="me-3">✓</span> {feature}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Tab>
      </Tabs>
    </Layout>
  )
}

