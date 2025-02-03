import fs from "fs"
import path from "path"

export default function handler(req, res) {
  const { id } = req.query

  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "cars.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const data = JSON.parse(fileContents)

    const car = data.cars.find((c) => c.id === Number.parseInt(id))

    if (car) {
      res.status(200).json(car)
    } else {
      res.status(404).json({ message: "Car not found" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

