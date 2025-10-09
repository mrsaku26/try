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

// Creating multer for images

const storage = multer.diskStorage({
  destination:'./Upload/images', 
  filename (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  },

})

const upload = multer({ storage: storage })

app.use('/images',express.static('Upload/images'))

// Creating Upload Endpoint for images

app.post('/upload',upload.single('product'),(req,res)=>{
  res.json({
    success:1,
    image_url:`http://localhost:${port}/images/${req.file.filename}`
  })
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening onport ${port}`)
})
