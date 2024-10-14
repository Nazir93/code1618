
import LoginLayout from "@/components/LoginLayout";
import Photo from "@/components/photo";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function addphoto() {



    return <>
        <LoginLayout>

            <div className="addblogspage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Добавить <span>фото</span></h2>
                        <h3>Администрирование</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <MdOutlineAddPhotoAlternate /> <span>/</span><span>Добавить фото</span>
                    </div>
                </div>
                <div className="blogsadd">
                    <Photo />
                </div>
            </div>
        </LoginLayout>
    </>


}