import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import {writeFile} from 'fs/promises';
//import { buffer } from "stream/consumers";

const fs = require('fs');

const LoadDB = async () => {
    await connectDB();
}

LoadDB();

export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get('id');
    if(blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json({blog});
    }
    else{
        const blogs = await BlogModel.find({});
        return NextResponse.json({blogs});
        //console.log("Blog GET Hit");
        //return NextResponse.json({ message: "API Working" }); 
    }
       
}

export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
    //console.log(imgUrl);

    const authorImage = formData.get('authorImg');
    const authorimageByteData = await authorImage.arrayBuffer();
    const authorbuffer = Buffer.from(authorimageByteData);
    const aothorpath = `./public/${timestamp}_${authorImage.name}`;
    await writeFile(aothorpath, authorbuffer);
    const aouthrimgUrl = `/${timestamp}_${authorImage.name}`;

        const blogData = {
            title: `${formData.get('title')}`,
            description: `${formData.get('description')}`,
            category: `${formData.get('category')}`,
            author: `${formData.get('author')}`,
            image: `${imgUrl}`,
            authorImg: `${aouthrimgUrl}`
            //authorImg: `${formData.get('authorImg')}`
        }

        await BlogModel.create(blogData);
        console.log("Blog Created");

    return NextResponse.json({success: true, message: "Blog Added Successfully"});
    //return NextResponse.json({imgUrl});
}


export async function DELETE(request) {
    const blogId = await request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(blogId);
    fs.unlink(`./public/${blog.image}`, () => {});
    fs.unlink(`./public/${blog.authorImg}`, () => {});
    await BlogModel.findByIdAndDelete(blogId);
    return NextResponse.json({message: "Blog Deleted Successfully"});
}
