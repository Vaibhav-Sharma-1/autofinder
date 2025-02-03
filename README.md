# AutoFinder - Car Listing Application

AutoFinder is a modern, responsive web application for browsing and searching car listings. Built with Next.js and React, it provides a seamless experience for users looking to explore various car options.

## Features

- Browse a comprehensive list of car listings
- Search functionality to find specific cars
- Filter cars by make, model, and year
- Sort cars by price or year
- Pagination for efficient browsing
- Detailed car information pages
- Responsive design for mobile and desktop

## Installation

To get started with AutoFinder, follow these steps:

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/autofinder.git
   cd autofinder
   \`\`\`

2. Install the dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create a \`.env.local\` file in the root directory and add any necessary environment variables.

4. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- The home page displays a list of car listings with search and filter options.
- Click on a car to view its detailed information.
- Use the search bar to find specific cars by make, model, or year.
- Use the filter and sort options to refine your search results.
- Navigate through pages using the pagination controls at the bottom of the listing.

## API Endpoints

- \`GET /api/cars\`: Fetch a list of cars with pagination, filtering, and sorting options.
  - Query parameters:
    - \`page\`: Page number (default: 1)
    - \`limit\`: Number of cars per page (default: 10)
    - \`make\`: Filter by car make
    - \`year\`: Filter by car year
    - \`sortBy\`: Sort by 'price' or 'year'
    - \`sortOrder\`: Sort order 'asc' or 'desc'
    - \`search\`: Search term for car make, model, or year

- \`GET /api/cars/[id]\`: Fetch detailed information about a specific car by ID.

## Technologies Used

- Next.js
- React
- React Bootstrap
- React Icons
- Node.js


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

