'use client'

import BlogTableItem from '@/Component/AdminComponnet/BlogTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {

    const [blogs, setblogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        //const data = await response.json();
        //setblogs(data.blogs);
        setblogs(response.data.blogs);
        //console.log(data.blogs);
    }

    const deleteBlog = async (id) => {
        const response = await axios.delete(`/api/blog?id=${id}`);
        //console.log(response.data);
        toast.success("Blog Deleted Successfully");
        fetchBlogs();
    }

    useEffect(()=>{
        fetchBlogs();
    },[])

  return (
    <div className='flex-1 px-5 pt-5 sm:pt-12 sm:pl-16'>
        <h1 className='text-3xl font-semibold'>All Blogs</h1>
        <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
            <table className='w-full text-sm text-gray-500 '>
                <thead className='text-sm text-left text-gray-700 uppercase bg-gray-500 '>
                    <tr>
                        <th scope='col' className='hidden px-6 py-3 sm:block'>Author name</th>
                        <th scope='col' className='px-6 py-3'>Blog Title</th>
                        <th scope='col' className='px-6 py-3'>Date</th>
                        <th scope='col' className='px-6 py-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((item, index)=>{
                        return <BlogTableItem key={index} id={item._id} author={item.author} title={item.title} date={item.date} deleteBlog={deleteBlog}/>
                    })}
                </tbody>
                </table>
        </div>     
    </div>
  )
}

export default page
