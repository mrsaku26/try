import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import adminRouter from './Routes/adminRoutes.js';
import blogRouter from './Routes/blogRoutes.js';

const app = express()
const port =  5000;

await connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {   res.send('Hello My Frinends!') })
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


export default app;