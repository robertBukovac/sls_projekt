const app = require('./app')
require('dotenv-flow').config();

const port = process.env.APP_PORT || 8001; 
app.listen(port,() => console.log(`Server started on port ${port}`))

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message} `);
    // Close server & exit process
    server.close(() => process.exit(1));
});
