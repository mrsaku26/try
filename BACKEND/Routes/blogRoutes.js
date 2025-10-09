import express from 'express'
import { addBlog, addComment, deleteBlogById, generateContent, getAllBLogs, getBlogById, getblogComments, togglePublish } from '../Controllers/blogController.js'
import upload from '../Middlewares/multer.js'
import auth from '../Middlewares/auth.js'

const blogRouter = express.Router()

blogRouter.post('/add',upload.single('image'),auth,addBlog)
blogRouter.get('/all',getAllBLogs)
blogRouter.get('/:blogId',getBlogById)
blogRouter.post('/delete',auth,deleteBlogById)
blogRouter.post('/toggle-publish',auth,togglePublish)

blogRouter.post('/add-comment', addComment)
blogRouter.post('/comments', getblogComments)

blogRouter.post('/generate',auth,generateContent)

export default blogRouter;