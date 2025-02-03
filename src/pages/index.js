import { useState, useEffect, useCallback } from "react"
import { Row, Col, Card, Form, Button, Pagination, Spinner } from "react-bootstrap"
import Link from "next/link"
import Layout from "../components/Layout"

export default function Home() {
  const [cars, setCars] = useState([])
  const [totalCars, setTotalCars] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMake, setFilterMake] = useState("")
  const [filterYear, setFilterYear] = useState("")
  const [sortBy, setSortBy] = useState("price")
  const [sortOrder, setSortOrder] = useState("asc")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCars = useCallback(
    async (page, search = "") => {
      setIsLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({
          page,
          limit: 10,
          make: filterMake,
          year: filterYear,
          sortBy,
          sortOrder,
          search,
        })
        const res = await fetch(`/api/cars?${params}`)
        if (!res.ok) {
          throw new Error("Failed to fetch cars")
        }
        const data = await res.json()
        setCars(data.cars)
        setTotalCars(data.totalCars)
        setCurrentPage(data.currentPage)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError("An error occurred while fetching cars. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
    [filterMake, filterYear, sortBy, sortOrder],
  )

  useEffect(() => {
    fetchCars(1, searchTerm)
  }, [fetchCars, searchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    fetchCars(pageNumber, searchTerm)
  }

  return (
    <Layout>
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">Discover Your Perfect Ride</h1>
        <p className="lead text-muted">Browse our extensive collection of quality vehicles</p>
      </div>
      <Row className="mb-4 g-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={handleSearch}
            className="shadow-sm rounded-pill"
          />
        </Col>
        <Col md={2}>
          <Form.Select
            value={filterMake}
            onChange={(e) => setFilterMake(e.target.value)}
            className="shadow-sm rounded-pill"
            style={{cursor: "pointer"}}
          >
            <option value="">Filter by Make</option>
            {Array.from(new Set(cars.map((car) => car.make))).map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="shadow-sm rounded-pill"
            style={{cursor: "pointer"}}
          >
            <option value="">Filter by Year</option>
            {Array.from(new Set(cars.map((car) => car.year)))
              .sort((a, b) => b - a)
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="shadow-sm rounded-pill" style={{cursor: "pointer"}}>
            <option value="price">Sort by Price</option>
            <option value="year">Sort by Year</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="shadow-sm rounded-pill"
            style={{cursor: "pointer"}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Col>
      </Row>
      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          <Row className="g-4">
            {cars.map((car) => (
              <Col key={car.id} sm={6} md={4} lg={3}>
                <Card className="h-100 border-0 shadow-sm hover-shadow transition-all">
                  <div className="card-img-wrapper">
                    <Card.Img variant="top" src={car.image} alt={`${car.make} ${car.model}`} className="card-img" />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-3 fw-bold">{`${car.make} ${car.model}`}</Card.Title>
                    <Card.Text className="text-muted mb-3">
                      <strong>Year:</strong> {car.year}
                      <br />
                      <strong>Price:</strong> ${car.price.toLocaleString()}
                    </Card.Text>
                    <Link href={`/car/${car.id}`} passHref legacyBehavior>
                      <Button variant="outline-primary" className="mt-auto rounded-pill">
                        View Details
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination className="justify-content-center mt-5">
            <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </>
      )}
    </Layout>
  )
}

