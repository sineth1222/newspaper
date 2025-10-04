import React from 'react'
import { TrashIcon } from '@heroicons/react/24/solid';

const SubTableItem = ({email,date,id,deleteEmail}) => {

    // Format the date to YYYY-MM-DD
  const formattedDate = date ? new Date(date).toDateString().split('T')[0] : '12 Aug 2025';
  const emaildate = new Date(date);


  return (
    <tr className='bg-white border-b hover:bg-gray-100 '>
        <th scope='row' className='items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
            {email?email:"no email"}
        </th>
        <td className='hidden px-6 py-4 sm:block'>{emaildate.toDateString()}</td>
        <td className='px-6 py-4 cursor-pointer'>
            <TrashIcon
                className='w-5 h-5 hover:text-red-600'
                onClick={() => deleteEmail(id)}
                aria-label='Delete email' // Accessibility
            />
        </td>
      
    </tr>
  )
}

export default SubTableItem
