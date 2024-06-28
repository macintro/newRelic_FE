# NewRelic_FE

NewRelic_FE is a React sample project designed for searching customers by first name or last name and filtering by company name. It features a user-friendly interface and allows sorting of results by clicking on column headers.
## Features
- Search Functionality: Enter a first name or last name in an input field to search the database.
- Filter by Company: Use a dropdown menu to filter search results by company.
- Sortable Table: Results are displayed in a table format that supports sorting by column headers.
- Environment Configuration: Utilizes config.js to determine the environment based on the current URL (localdev in our case).
- Integration with Backend Service: Communicates with newRelic_BE service to fetch data from the database. Includes an api_key for accessing endpoints (note: secrets are stored in code for demonstration purposes).
- 
## Installation
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

**Notes**
- Ensure Node.js and npm are installed on your machine before proceeding with installation.
- For production deployments, consider storing sensitive information securely, such as using a vault for secrets management.
- Modify config.js and backend service URLs as needed for different environments.
