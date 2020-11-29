# Stake Limit Service Api
RESTful API made for job application

## Features
- **CRUD manipulation for STake Limit Service (SLS)**
- **Create and Read manipulation for tickets (SLS)**

# Routes with features explained
***Public routes***
> /api/v1/sls
- **Create Sls** - Creates Sls for the given device
- **Read all Sls** - Reads all Sls from the database.

> /api/v1/sls/:id
- **Read SLs** - Reads Sls for the given device 
- **Update Sls** - Updates Sls for the given device
- **Delete Sls** - Deletes Sls with the given id of device
 
> /api/v1/tickets
- **Create Ticket** - Creates ticket for the given device
- **Get Tickets** - Reads all tickets from the database.

> /api/v1/tickets/:id
- **Read Ticket** - Reads ticket with the given id

# Technologies
- NodeJs
- PGAdmin (POSTGRESQL)
- Swagger
- Docker
- Jest

# How to start the app


# Running the software
- Clone the repo by using ```git clone```.
- Run ```npm install``` on the cloned directory.
- ``` node app.js``` or ```nodemon``` for simple setup.
