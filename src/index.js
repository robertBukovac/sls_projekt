const app = require('./app')

require('dotenv-flow').config();

const port = process.env.APP_PORT || 8001; 
app.listen(port,() => console.log(`Server started on port ${port}`))

