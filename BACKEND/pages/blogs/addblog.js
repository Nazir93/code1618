import Blog from "@/components/Blog";
import LoginLayout from "@/components/LoginLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Addblog() {



    return <>
        <LoginLayout>


            <div className="addblogspage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Добавить <span>новость</span></h2>
                        <h3>Администрирование</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <MdOutlineAddPhotoAlternate /> <span>/</span><span>Добавить новость</span>
                    </div>
                </div>
                <div className="blogsadd">
                    <Blog />
                </div>
            </div>
        </LoginLayout>
    </>
}