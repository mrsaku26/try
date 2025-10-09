import React, { useState } from "react";
import "./Bloglist.css";
import { blog_data, blogCategories } from "../../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "../blogCard/blogCard";
import { useAppContext } from "../../context/AppContext";

const Bloglist = () => {
  const [menu, setMenu] = useState("All");
  const{blogs,input} =useAppContext()

 const filterBlogs = () => {
  if ( input === '') {
    return blogs;
  }

  return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
};

  return (
    <div className="blog">
      <div className="item">
        {blogCategories.map((item) => (
          <div key={item}>
            <motion.button
              onClick={() => setMenu(item)}
              className={menu === item ? "actives" : ""}
              whileHover={{ scale: 1.09 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, }}
            >
              {item}
            </motion.button>
          </div>
        ))}
      </div>
      <div className="bloglist">
        {
          filterBlogs().filter((blog)=> menu === 'All'?true :blog.category===menu).map((blog)=> <BlogCard key={blog._id} blog={blog}/>)
        }
      </div>
    </div>
  );
};

export default Bloglist;
