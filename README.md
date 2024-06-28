# NewRelic_FE

NewRelic_FE is a React sample project designed for searching customers by first name or last name and filtering by company name. It features a user-friendly interface and allows sorting of results by clicking on column headers.
## Features
- Search Functionality: Enter a first name or last name in an input field to search the database.
- Filter by Company: Use a dropdown menu to filter search results by company.
- Sortable Table: Results are displayed in a table format that supports sorting by column headers.
- Environment Configuration: Utilizes config.js to determine the environment based on the current URL (localdev in our case).
- Integration with Backend Service: Communicates with newRelic_BE service to fetch data from the database. Includes an api_key for accessing endpoints (note: secrets are stored in code for demonstration purposes).
- 
# Installation
To run the project locally, follow these steps:
1. Clone the newRelic_FE repository to your local machine:
```bash
git clone https://github.com/macintro/newRelic_FE.git
```
2. Change into the project directory:
```bash
cd newRelic_FE
```
3. Install project dependencies using npm:
```bash
npm install
```
4.Launch the development server to start the application on localhost:3000:
```bash
npm start
```
# Project Structure
## CustomerSearchPage.jsx
This is the main web page of the application. It includes:

- An input field for entering a first name or last name to search the database.
- A dropdown menu to filter results by company.
- A sortable table that allows you to sort by clicking on the column headers.
## Configuration
In the utils folder, you'll find config.js, which determines the environment based on the URL the application is launched under. For this demo, the environment is set to localdev. The configuration also specifies the endpoint for calling the newRelic_BE service, which is responsible for retrieving data from the database.

## API Key
The config.js file contains the API key needed to call the endpoints within the newRelic_BE service. For simplicity, the secrets are included in the code. In a production application, these secrets should be securely stored in a vault.

## Services
The services.js file uses Axios to make GET requests to the different endpoints. This handles the interaction between the frontend and the backend services.

## Usage
- Search for a Customer: Enter a first name or last name in the input field.
- Filter by Company: Select a company from the dropdown menu.
- Sort Results: Click on the column headers of the table to sort the data.

# Notes
- Ensure Node.js and npm are installed on your machine before proceeding with installation.
- For production deployments, consider storing sensitive information securely, such as using a vault for secrets management.
- Modify config.js and backend service URLs as needed for different environments.
- For security and best practices in a production environment, ensure to:
- Store secrets and API keys in a secure vault.
- Review and follow security guidelines for handling sensitive information.
