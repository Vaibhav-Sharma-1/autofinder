import Head from "next/head"
import { Navbar, Container, Nav } from "react-bootstrap"
import Link from "next/link"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>AutoFinder</title>
        <meta name="description" content="Discover your perfect ride" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar bg="white" expand="lg" className="py-3 shadow-sm">
        <Container>
          <Link href="/" passHref legacyBehavior>
            <Navbar.Brand className="font-weight-bold">
              <span className="text-primary">Auto</span>Finder
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link className="mx-3">Home</Nav.Link>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <Nav.Link className="mx-3">About</Nav.Link>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <Nav.Link className="mx-3">Contact</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="py-5">
        <Container>

          {children}
        </Container>
      </main>
      <footer className="bg-light py-4 mt-5">
        <Container className="text-center">
          <p>&copy; 2025 AutoFinder. All rights reserved.</p>
        </Container>
      </footer>
    </>
  )
}

