import ImageKit from "imagekit";

const imagekit = new ImageKit({
   publicKey : process.env.IMAGE_PUBLIC_KEY,
   privateKey: process.env.IMAGE_PRIVATE_KEY,
   urlEndpoint : process.env.IMAGE_URL_KEY
})

export default imagekit;