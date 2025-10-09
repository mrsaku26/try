import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { assets, dashboard_data } from "../../assets/assets";
import Table from "../../Components/Table/Table";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const {axios} = useAppContext()

  const fetchDashboard = async () => {
    try {
      const {data} = await axios.get('/api/admin/dashboard')
      data.success ? setDashboardData(data.dashboardData) :toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard">
     <div className="dashboard-main">
       <div className="dashboard-data">
        <div className="dashboard-img">
          <img src={assets.dashboard_icon_1} alt="" />
          <div className="dashboard-num">
            <p className="dashboard-blog">{dashboardData.blogs}</p>
            <p className="dashboard-blogs">Blogs</p>
          </div>
        </div>
      </div>
      <div className="dashboard-data">
        <div className="dashboard-img">
          <img src={assets.dashboard_icon_2} alt="" />
          <div className="dashboard-num">
            <p className="dashboard-blog">{dashboardData.comments}</p>
            <p className="dashboard-blogs">Comments</p>
          </div>
        </div>
      </div>
      <div className="dashboard-data">
        <div className="dashboard-img">
          <img src={assets.dashboard_icon_3} alt="" />
          <div className="dashboard-num">
            <p className="dashboard-blog">{dashboardData.drafts}</p>
            <p className="dashboard-blogs">Drafts</p>
          </div>
        </div>
      </div>
     </div>
     <div className="dashboard-latest">
      <div className="latest-img">
        <img src={assets.dashboard_icon_4} alt="" />
        <p>Latest Blogs</p>
      </div>
     </div>
      <div className="dashboard-table">
        <div className="table-data">
          <p>#</p>
          <p>Blog Title</p>
          <p>Date</p>
          <p>Status</p>
          <button>Actions</button>
          <p>Delete</p>
        </div>
        {
          dashboardData.recentBlogs.map((blog,index)=>{
            return <Table key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index+1}/>
          })
        }
      </div>
    </div>
  );
};

export default Dashboard;
