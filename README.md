# Challenge-Simpli

A Full-Stack application designed to manage brands and their product offerings.

## Requirements

- Node.js v16 or higher
- Docker

## Installation and Execution

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your_username/challenge-simpli.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd challenge-simpli
   ```

3. **Start the MongoDB Container with Docker:**

   ```bash
   docker-compose up -d
   ```

   This step not only creates a database from scratch within a Docker container but also preloads it with default data for immediate use.

4. **Install Dependencies:**

   ```bash
   npm install / yarn install
   ```

5. **Run the Application Locally:**

   ```bash
   npm run dev
   ```

6. **Execute Tests:**

   ```bash
   npm run test
   ```

   This command runs all tests, covering database connections and various use cases, including edge cases, for the application's endpoints.

## Development Journey

This project aimed to fulfill the following requirements:

**Mandatory**

- Develop a responsive web application and a supporting REST API.

**Expected Features**

- Product and Accessory Listing:
  This section displays a product list using cards. Each card includes a product image, name or model, and price. Clicking on a card redirects users to the product detail page. The product list supports pagination.

- Product Details:
  This section provides detailed information about a product, including images, name, description, price, and a call-to-action (CTA) button.

- CTA Functionality:
  Clicking the CTA button opens a modal or a new page to collect user information regarding the product. This information is saved in the database as a "Lead."

- Endpoint Creation:

  Develop endpoints for:
  - Listing, paginating, and filtering products.
  - Storing leads.

**Development Workflow**

- Project Initialization:

  Set up the project using Next.js and TypeScript.
  Configure essential dependencies and tools, including ESLint and Prettier.

- Model and Schema Definitions:

  Create TypeScript models based on the defined structures.
  Define Mongoose schemas for data handling.

- MongoDB Configuration:

  Install Mongoose and configure the MongoDB connection.

- Endpoint Implementation:

- Frontend Development:

  Develop the frontend by creating components, pages, and other user interface elements. Connect these elements to your endpoints through API calls.

- Testing:

  Implement tests incrementally, covering typical scenarios as well as edge cases.

- Optimizations and Finalization:

  Implement any additional optimizations, such as Server-Side Rendering (SSR), to enhance SEO and performance.

## Final Considerations

This project presented a rewarding challenge, prompting me to quickly learn and implement technologies like Jest and Docker. It allowed me to take complete ownership of a project from inception to completion. While I aimed for precision throughout, there is always room for improvement.
