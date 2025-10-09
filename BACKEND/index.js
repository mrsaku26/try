const express = require('express')
const app = express()
const port = 3000
const path=require('path')
const mongoose=require('mongoose')
const multer=require('multer')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const { type } = require('os')
const { use } = require('react')
const { error } = require('console')

app.use(express.json())
app.use(cors())

try {
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

// Mongoose Schema

const productSchema=new mongoose.Schema({
  id:{
    type:Number,
    require:true
  },
  name:{
    type:String,
    require:true
  },
  image:{
    type:String,
    require:true
  },
  category:{
    type:String,
    require:true
  },
  new_price:{
    type:Number,
    require:true
  },
  old_price:{
    type:Number,
    require:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  avilable:{
    type:Boolean,
    default:true
  }
})

// Creating Model

const Products=mongoose.model('Product',productSchema)

app.post('/addproduct',async(req,res)=>{
  try {
    let products= await Products.find({})
    let id=products.length>0 ?products[products.length-1].id+1:1

    const product=new Products({
      id:id,
      name:req.body.name,
      image:req.body.image,
      category:req.body.category,
      new_price:req.body.new_price,
      old_price:req.body.old_price
    })

    await product.save()
    console.log("Saved")

    res.json({
      success:true,
      name:req.body.name
    })
  } catch (error) {
    console.error(error)
  }
})

// Deleting Products

app.post('/deleteproduct',async(req,res)=>{
  await Products.findOneAndDelete({id:req.body.id})
  console.log('Delte')

  res.json({
    success:true,
    name:req.body.name
  })
})

// Show allProducts

app.get('/allproduct',async(req,res)=>{
  let products=await Products.find({})
  console.log(products)
  res.send(products)
})

// Creating Users

const Users=new mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true
  },
  password:{
    type:String
  },
  cartData:{
    type:Object
  },
  date:{
    type:Date,
    default:Date.now()
  }
})

const User=mongoose.model('User',Users)

app.post('/signup',async(req,res)=>{
  let check= await User.findOne({email:req.body.email})
  
  if(check) {
    return res.status(400).json({success:false},)
  }
  let cart={};
  for(let i=0;i<=300;i++){
    cart[i]=0
  }

  let user=new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    cartData:cart
  })

  await user.save()

  const data={
    user:{
      id:user._id
    }
  }

  const token=jwt.sign(data,'secret')
  res.json({success:true,token})

})

//Login Check

app.post('/login',async(req,res)=>{
  try {
    let user=await User.findOne({email:req.body.email})

    if(user){
      const passCompare=req.body.password===user.password
       if(passCompare){
         const data={
    user:{
      id:user._id
    }
  }

  const token=jwt.sign(data,'secret')
  res.json({success:true,token})
       }
       else{
        res.json({success:false,error:"Wrong Password"})
       }
    }
    else{
      res.json({success:false,error:"Wrong Email id"})
    }
  } catch (error) {
    console.error(error)
  }
})

// Endpoint for newcollection

app.get('/newcollection', async(req, res) => {
  let find=await Products.find({})
  let newcollection=find.slice(1).slice(-8)
  res.send(newcollection)
})

// Endpoint for Popular in women

app.get('/popularinwomen', async(req, res) => {
  let find=await Products.find({category:'women'})
  let popular=find.slice(0).slice(4)
  res.send(popular)
})


// Checking the user

const checkUser=async(req,res,next)=>{
    const token=req.header('user-token')
  if(!token){
    res.status(401).send({error:"Please enter valide token"})
  }
  else{
    try {
    const data=jwt.verify(token,'secret')
    req.user=data.user
    next()
    } catch (error) {
      console.error(error)
    }
    }
}

// ENdpoint for Addtocart

app.post('/addtocart', checkUser, async (req, res) => {
  const userData=await User.findOne({_id:req.user.id})
  userData.cartData[req.body.itemid]+=1
  await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  console.log(req.body,req.user)
})

// Endpoint for Remove to cart


app.post('/removetocart', checkUser, async (req, res) => {
  const userData=await User.findOne({_id:req.user.id})
  if(userData.cartData[req.body.itemid]>0)
  userData.cartData[req.body.itemid]-=1
  await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
  console.log('removed');
  
})

// Endpoint for Show cartdata

app.post('/getcartdata',checkUser,async(req,res)=>{
  console.log('getcart' )
  let user= await User.findOne({_id:req.user.id})
  res.json(user.cartData)
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
