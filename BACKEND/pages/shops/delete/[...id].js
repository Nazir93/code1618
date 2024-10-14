import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsPostcard } from "react-icons/bs";
import { router } from "next/router";
import LoginLayout from "@/components/LoginLayout";

export default function DeleteShops() {


    // const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/shops?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id]);

    function goback() {
        router.push('/shops');
    }

    async function deleteProduct() {
        await axios.delete('/api/shops?id=' + id)
        toast.success('Deleted Sucessfully!')
        goback();
    }
    return <>
        <LoginLayout>


            <Head>
                <title>Удалить контент</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Удалить <span>{productInfo?.title}</span></h2>
                        <h3>АДМИНИСТРИРОВАНИЕ</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span><span>удалить проект</span>
                    </div>
                </div>
                <div className="deletesec flex flex-center wh_100">
                    <div class="deletecard">
                        <svg
                            viewBox="0 0 24 24"
                            fill="red"
                            height="6em"
                            width="6em"
                        >
                            <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2M6 9v10h8V9H6m7.5-5H17v2H3V4h3.5l1-1h5l1 1M19 17v-2h2v2h-2m0-4V7h2v6h-2z" />
                        </svg>
                        <p class="cookieHeading">вы уверены?</p>
                        <p class="cookieDescription">Если вы удалите содержимое этого веб-сайта, это приведет к необратимому удалению вашего контента.</p>

                        <div class="buttonContainer">
                            <button onClick={deleteProduct} class="acceptButton">удалить</button>
                            <button onClick={goback} class="declineButton">отмена</button>
                        </div>
                    </div>
                </div>

            </div>

        </LoginLayout>
    </>
}