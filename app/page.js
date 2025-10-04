"use client";

import Blog_list from "@/Component/Blog_list";
import Footer from "@/Component/Footer";
import Header from "@/Component/Header";
import BusinessBlogList from "@/Component/LocalNews";
import NewspaperButton from "@/Component/NewspaperButton";
import Wizard from "@/Component/Wizard";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  return (
    < >
      <ToastContainer theme='light'/>
      <Header />
      <Blog_list />
      <BusinessBlogList />
      <Wizard />
      <NewspaperButton />
      <Footer />
    </>
  );
}
