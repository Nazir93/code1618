import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { router } from "next/router";
import LoginLayout from "@/components/LoginLayout";

export default function Contactview() {


    // const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/contacts?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id]);


    const createdAtDate = productInfo?.createdAt ? new Date(productInfo.createdAt) : null;

    // Function to format the date as "20 May 2024 14:11 pm"
    const formatDate = (date) => {
        // Check if date is valid
        if (!date || isNaN(date)) {
            return ''; // or handle the error as needed
        }

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Use 12-hour format
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    // Usage example:
    const formattedDate = formatDate(createdAtDate);
    console.log(formattedDate); // Outputs something like "20 May 2024 14:11 pm" if createdAtDate is valid



    return <>
        <LoginLayout>



            <Head>
                <title>Просмотр контактов</title>
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Контакт: <span>{productInfo?.email}</span></h2>
                        <h3>АДМИНИСТРИРОВАНИЕ</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span><span>Контакт</span>
                    </div>
                </div>
                <div className="contactinfo">
                    <h2>Имя: <span>{productInfo?.name}</span></h2>
                    <h2>Фамилия: <span>{productInfo?.lname}</span></h2>
                    <h2>Email: <span>{productInfo?.email}</span></h2>
                    <h2>Компания: <span>{productInfo?.company}</span></h2>
                    <h2>Телефон: <span>{productInfo?.phone}</span></h2>
                    <h2>Страна: <span>{productInfo?.country}</span></h2>
                    <h2>Проект: <span>{productInfo?.project.join(', ')}</span></h2>
                    <h2>Цена: <span>{productInfo?.price}</span></h2>
                    <h2>Описание: <span>{productInfo?.description}</span></h2>
                    <h2>Дата: <span>{formatDate(createdAtDate)}</span></h2>
                </div>

            </div>
        </LoginLayout>

    </>


}