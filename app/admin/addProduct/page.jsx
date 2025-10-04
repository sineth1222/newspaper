'use client'

import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

    const [image, setimage] = useState(false);
    const [authorImage, setauthorImage] = useState(false);
    const [data, setdata] = useState({
        title: '',
        description: '',
        category: 'Other',
        author: '',
        //authorImage: '',
    })

    const onChangehandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata(data => ({ ...data, [name]: value }))
        console.log(data);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        //formData.append('authorImg', data.authorImage); 
        formData.append('authorImg', authorImage);
        const response = await axios.post('/api/blog', formData);
        if(response.data.success){
            toast.success("Blog Added Successfully");
            setimage(false);
            setdata({
                title: '',
                description: '',
                category: 'Other',
                author: '',
                //authorImage: '',
            });
        }
        else{
            toast.error("Error in adding blog");
        }
    }


  return (
    <>
    <form onSubmit={submitHandler} className='px-5 pt-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload thumbnail</p>
        <label htmlFor='image'>
            <Image className='mt-4' src={!image?assets.upload_area:URL.createObjectURL(image)} alt='upload' width={140} height={70} />
        </label>
        <input onChange={(e) => setimage(e.target.files[0])} hidden required type="file" name="upload" id="image" />
        <p className='mt-4 text-xl'>Blog title</p>
        <input name='title' onChange={onChangehandler} value={data.title} type='text' required placeholder='Type here' className='w-full sm:w-[500px] border mt-4 px-4 py-3' />
        <p className='mt-4 text-xl'>Blog Description</p>
        <textarea name='description' onChange={onChangehandler} value={data.description} type='text' rows={6} required placeholder='Write content here' className='w-full sm:w-[500px] border mt-4 px-4 py-3' />
        <p className='mt-4 text-xl'>Blog category</p>
        <select name='category' onChange={onChangehandler} value={data.category} className='w-full sm:w-[500px] border mt-4 px-4 py-3' required>
            <option value='Politics'>Politics</option>
            <option value='Sport'>Sport</option>
            <option value='Local'>Local</option>
            <option value='International'>International</option>
            <option value='Other'>Other</option>
        </select>
        <p className='mt-4 text-xl'>Upload author image</p>
        <label htmlFor='authorImage'>
            <Image className='mt-4' src={!authorImage?assets.upload_area:URL.createObjectURL(authorImage)} alt='authorImage' width={140} height={70} />
        </label>
        <input onChange={(e) => setauthorImage(e.target.files[0])} hidden required type="file" name="authorImage" id="authorImage" />
        <p className='mt-4 text-xl'>Author Name</p>
        <input name='author' onChange={onChangehandler} value={data.author} type='text' required placeholder='Type here' className='w-full sm:w-[500px] border mt-4 px-4 py-3' />
        <br />
        <button type='submit' className='w-40 h-12 mt-8 font-medium text-white bg-black hover:bg-gray-800'>Submit</button>
    </form>
      
    </>
  )
}

export default page
