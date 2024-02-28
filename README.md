
# GraphQL Project Demo

This project demonstrates how to interact with a GraphQL server using Apollo Client in a Node.js environment. It includes examples of queries and mutations, demonstrating the setup with environment variables for security and configurability.

## Getting Started

### Prerequisites

You need to have Node.js (v18 or later) installed on your machine. npm is also required for managing the project's dependencies.

### Installation

Follow these steps to get your development environment set up:

1. **Clone the repository**

   ```bash
   git clone <your_repository_url>
   cd your_project_directory
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory of the project and specify your GraphQL server's URL and your API token:

   ```plaintext
   API_TOKEN=your_api_token_here
   GRAPHQL_SERVER_URL=your_graphql_server_url_here
   ```

   Replace `your_api_token_here` and `your_graphql_server_url_here` with the actual values to configure the project correctly.

### Running the Demos

This project includes several demo scripts to showcase its functionality. To run a specific demo, use the corresponding npm script defined in `package.json`.

For example, to run the `discount` demo:

```bash
npm run demo-discount
```

To run the `shopcart` demo:

```bash
npm run demo-shopcart
```

### Adding New Demos

To add a new demo, create a corresponding file in the `demo` folder and update the `package.json` with a new script entry:

```json
"scripts": {
  "demo-yourNewDemo": "cross-env DEMO_ENV='YOUR_NEW_DEMO' nodemon"
}
```

Replace `yourNewDemo` and `YOUR_NEW_DEMO` with the appropriate names for your new demo script. This setup allows for flexible expansion and testing of different functionalities within the project.

## Contributing

Please feel free to contribute to this project. Pull requests are welcome for bug fixes, features, and documentation improvements.

## License

This project is licensed under the [MIT License](LICENSE.md).
