
# Nexter API

## Introduction
The Nexter API is a RESTful web service that provides CRUD (Create, Read, Update, Delete) operations for houses that are listed for sale, as well as CRUD operations for users.

## Getting Started

### Prerequisites
Node.js (v12.0.0 or higher)

npm package manager

MongoDB (v4.0.0 or higher)

## Installation
Clone the repository.

Install dependencies using npm install.

Set up your MongoDB database and update the connection string in config.js.

Start the server with npm start.

## Endpoints
### Houses
GET /houses: Get a list of all houses.

GET /houses/:id: Get details of a specific house by ID.

POST /houses: Create a new house listing.

PATCH /houses/:id: Update the details of a specific house.

DELETE /houses/:id: Delete a house listing.

## Authentication
POST /users/sigin: Sigin new User

POST /users/login: Login into your account.

## Usage
Ensure you have a valid JWT token for authentication.

Make requests to the specified endpoints using an HTTP client (e.g., Postman, cURL).

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of invalid requests or server errors.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request.
