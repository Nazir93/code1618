

import LoginLayout from "@/components/LoginLayout";
import Shop from "@/components/Shop";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Addproduct() {

    return <>
        <LoginLayout>


            <div className="addblogspage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Добавить <span>проект</span></h2>
                        <h3>Администрирование</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <MdOutlineAddPhotoAlternate /> <span>/</span><span>Добавить проект</span>
                    </div>
                </div>
                <div className="blogsadd">
                    <Shop />
                </div>
            </div>
        </LoginLayout>
    </>
}