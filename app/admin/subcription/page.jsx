'use client'

import SubTableItem from '@/Component/AdminComponnet/SubTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {

  const [emails, setEmails] = useState([]);

  const fetchemails = async () => {
    const response = await axios.get('/api/email');
    //const data = await response.json();
    setEmails(response.data.emails);
    //console.log(data.emails);
  }

  useEffect(()=>{
    fetchemails();
  },[])

  const deleteEmail = async (id) => {
    const response = await axios.delete(`/api/email`,{params:{id:id}});
    if (response.data.success) {
      toast.success("Email Deleted Successfully");
      fetchemails();
    }
    else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className='flex-1 px-5 pt-5 sm:pt-12 sm:pl-16'>
      <h1 className='text-3xl font-semibold'>All Subcription</h1>
      <div className='relative max-w-[800px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500 '>
            <thead className='text-sm text-left text-gray-700 uppercase bg-gray-500 '>
                <tr>
                    <th scope='col' className='px-6 py-3'>Email</th>
                    <th scope='col' className='hidden px-6 py-3 sm:block'>Date</th>
                    <th scope='col' className='px-6 py-3'>Action</th>
                </tr>
            </thead>
            <tbody>
            {emails.map((item, index)=>{
                return <SubTableItem key={index} id={item._id} email={item.email} date={item.date} deleteEmail={deleteEmail}/>
            })}
            </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default page
