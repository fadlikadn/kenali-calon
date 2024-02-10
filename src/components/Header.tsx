import { Navbar } from "flowbite-react"
import Link from "next/link"

const Header = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Caleg Wonosobo</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/">Beranda</Navbar.Link>
        <Navbar.Link href="/dprd-kabupaten-kota">DPRD Kabupaten</Navbar.Link>
        <Navbar.Link href="#">DPRD Provinsi</Navbar.Link>
        <Navbar.Link href="#">DPR Pusat</Navbar.Link>
        <Navbar.Link href="#">DPD</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
