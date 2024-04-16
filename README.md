# Travel Tracker

Travel Tracker is a web application that allows users to track the countries they have visited.

## Table of Contents
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Setup Instructions](#setup-instructions)
* [Usage](#usage)
* [Contributing](#contributing)

## Features

- Add countries to your visited list.
- See the total number of countries you have visited.
- Visual indication of visited countries on the map.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- HTML
- CSS
- JavaScript

## Setup Instructions

* Clone the repository:
   ```bash
   git clone https://github.com/JigarHingu/Travel-Tracker

## Navigate to the project directory:

* cd travel-tracker

## Install dependencies:

* npm install

## Set up the environment variables:

* Create a '.env' file in the root directory.
* Define the following variables in the '.env' file:

- PORT=3000
- DB_USER=<your-database-username>
- DB_HOST=<your-database-host>
- DB_DATABASE=<your-database-name>
- DB_PASSWORD=<your-database-password>
- DB_PORT=<your-database-port>

## Set up the database:

* Ensure PostgreSQL is installed and running.
* Create a database with the name specified in 'DB_DATABASE'.
* Run the SQL script provided in'database.sql' to set up the necessary tables.

## Usage

* nodemon sever.js
* Open your web browser and navigate to 'http://localhost:3000'.

* Enter a country name in the input field and click the "Add" button to add it to your visited list.

* View the total number of countries you have visited and see visual indications of visited countries on the map.

## Contributing

* Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or create a pull request.