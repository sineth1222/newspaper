import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'
import { TrashIcon } from '@heroicons/react/24/solid';

const BlogTableItem = ({authorImg, title, author, date, deleteBlog, id}) => {

    // Format the date to YYYY-MM-DD
  const formattedDate = date ? new Date(date).toDateString().split('T')[0] : '12 Aug 2025';

  return (
    <tr className='bg-white border-b hover:bg-gray-100 '>
        <th scope='row' className='items-center hidden gap-3 px-6 py-4 font-medium text-gray-900 sm:flex whitespace-nowrap '>
            <Image width={40} height={40} src={authorImg?authorImg:assets.profile_icon} alt="author" className='object-cover w-10 h-10 rounded-full'/>
            <p>{author?author:"No author"}</p>
        </th>
        <td className='px-6 py-4 '>{title?title:"no title"}</td>
        <td className='px-6 py-4'>{formattedDate}</td>
        {/*<td onClick={() => deleteBlog(id)} className='px-6 py-4 cursor-pointer'>X</td>*/}
        <td className='px-6 py-4 cursor-pointer'>
        <TrashIcon
          className='w-5 h-5 hover:text-red-600'
          onClick={() => deleteBlog(id)}
          aria-label='Delete blog' // Accessibility
        />
      </td>
      
    </tr>
  )
}

export default BlogTableItem
