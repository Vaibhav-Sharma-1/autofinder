import fs from "fs"
import path from "path"

export default function handler(req, res) {
  if (req.method === "GET") {
    const { page = 1, limit = 10, make, year, sortBy, sortOrder, search } = req.query
    const filePath = path.join(process.cwd(), "data", "cars.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)

    let filteredCars = data.cars

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase()
      filteredCars = filteredCars.filter(
        (car) =>
          car.make.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower) ||
          car.year.toString().includes(searchLower),
      )
    }

    // Apply filters
    if (make) {
      filteredCars = filteredCars.filter((car) => car.make === make)
    }
    if (year) {
      filteredCars = filteredCars.filter((car) => car.year.toString() === year)
    }

    // Apply sorting
    if (sortBy && sortOrder) {
      filteredCars.sort((a, b) => {
        if (sortBy === "price") {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price
        } else if (sortBy === "year") {
          return sortOrder === "asc" ? a.year - b.year : b.year - a.year
        }
        return 0
      })
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedCars = filteredCars.slice(startIndex, endIndex)

    res.status(200).json({
      cars: paginatedCars,
      totalCars: filteredCars.length,
      currentPage: Number.parseInt(page),
      totalPages: Math.ceil(filteredCars.length / limit),
    })
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

