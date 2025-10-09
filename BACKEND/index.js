const express = require('express')
const app = express()
const port = 3000
const mongoose=require('mongoose')
const multer=require('multer')


try {
   mongoose.connection.on('connected',()=> console.log('Database Connected'))
   mongoose.connect('mongodb+srv://mrsaku26:practice@cluster0.kejy0mm.mongodb.net/practice')

} catch (error) {
   console.error(error)
}



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening onport ${port}`)
})
