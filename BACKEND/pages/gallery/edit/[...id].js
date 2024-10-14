
import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { router } from "next/router";
import Photo from "@/components/photo";
import { useSession } from "next-auth/react";
import LoginLayout from "@/components/LoginLayout";

export default function EditPhoto() {


    // const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/photos?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id])



    return <>
        <LoginLayout>
            <Head>
                <title>Обновить фото</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Изменить <span>{productInfo?.title}</span></h2>
                        <h3>АДМИНИСТРИРОВАНИЕ</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span><span>Изменить фото</span>
                    </div>
                </div>
                <div className="mt-3">
                    {
                        productInfo && (
                            <Photo {...productInfo} />
                        )
                    }
                </div>
            </div>
        </LoginLayout>


    </>
}