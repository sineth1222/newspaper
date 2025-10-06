"use client";

import Blog_list from "@/Component/Blog_list";
import Chatbot from "@/Component/Chatbot";
import Footer from "@/Component/Footer";
import Header from "@/Component/Header";
import BusinessBlogList from "@/Component/LocalNews";
import NewspaperButton from "@/Component/NewspaperButton";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  return (
    < >
      <ToastContainer theme='light'/>
      <Header />
      <Blog_list />
      <BusinessBlogList />
      <Chatbot />
      <NewspaperButton />
      <Footer />
    </>
  );
}
