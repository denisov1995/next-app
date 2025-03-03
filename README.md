# Project Setup

## Prerequisites
### Before you begin, make sure you have the following installed on your machine:

- **Node.js (v14 or higher recommended)**
- **npm (usually comes with Node.js)**
- **Prisma CLI (will be installed as a dependency)**

### Navigate to the project's root directory and run the following command to install all the necessary dependencies:

- **npm install**
This will install all the packages listed in the package.json file.

## Generate Prisma Client
### After installing the dependencies, you need to generate the Prisma Client. Run the following command:

- **npx prisma generate**
This command reads your Prisma schema and generates the Prisma Client, which is used to interact with your database.

## Set Up Environment Variables

The project requires certain environment variables to be set for proper functioning. These variables typically include database connection strings, API keys, and other sensitive information.

- **Copy and paste .env.local file in the root directory of the project.**

## Run the Project

- **npm run dev**
This will start the application, and you should be able to access it via the specified port (usually http://localhost:3000).

