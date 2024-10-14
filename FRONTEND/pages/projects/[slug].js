import Head from "next/head";
import { useRouter } from "next/router"
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import useFetchData from "@/hooks/useFetchData";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useState, useEffect } from 'react';

export default function projectslug() {
    const router = useRouter();
    const { slug } = router.query;
    const { alldata, loading } = useFetchData(`/api/projects?slug=${slug}`);
    
    // Создаем состояние для выбранного изображения
    const [selectedImage, setSelectedImage] = useState(null);

    // Когда данные загружаются, устанавливаем первое изображение в selectedImage
    useEffect(() => {
        if (alldata && alldata[0]?.images?.length > 0) {
            setSelectedImage(alldata[0]?.images[0]); // Устанавливаем первое изображение
        }
    }, [alldata]);

    // Функция для форматирования даты
    const createdAtDate = alldata && alldata[0]?.createdAt ? new Date(alldata && alldata[0]?.createdAt) : null;
    const formatDate = (date) => {
        if (!date || isNaN(date)) return '';
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour12: true };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const formattedDate = formatDate(createdAtDate);

    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        return inline ? (
            <code>{children}</code>
        ) : match ? (
            <SyntaxHighlighter style={a11yDark} language={match[1]} PreTag="pre" {...props}>
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className="md-post-code" {...props}>
                {children}
            </code>
        );
    };

    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>

            <div className="projectslug">
                <div className="projectslugimg">
                    <div className="container">
                        <div className="proslugimg">
                            {/* Отображаем выбранное изображение, если оно существует */}
                            {selectedImage ? (
                                <img src={selectedImage} alt={alldata && alldata[0]?.title} />
                            ) : (
                                <p>Загрузка изображения...</p> // Можно показать индикатор загрузки
                            )}
                        </div>

                        <div className="projectsluginfo">
                            <div className="leftmainproinfo">
                                <h1>{alldata && alldata[0]?.projectcategory}</h1>
                                <p></p>
                                <a target="_blank" href={alldata && alldata[0]?.livepreview}>СМОТРЕТЬ САЙТ</a>
                            </div>
                            <div className="rightmainproinfo">
                                {/* <div>
                                    <h3>Категория</h3>
                                    <h2>{alldata && alldata[0]?.projectcategory}</h2>
                                </div> */}
                                <div>
                                    <h3>Клиент</h3>
                                    <h2>{alldata && alldata[0]?.client}</h2>
                                </div>
                                <div>
                                    <h3>Дизайн</h3>
                                    <h2>Code 1.618</h2>
                                </div>
                            </div>
                        </div>

                        <div className="projectslugsliderimg">
                            <Swiper
                                slidesPerView={'auto'}
                                spaceBetween={30}
                                freeMode={true}
                                grabCursor={true}
                                modules={[FreeMode]}
                                className="mySwiper"
                            >
                                {alldata && alldata[0]?.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        {/* При клике на миниатюру обновляем основное изображение */}
                                        <img
                                            src={image}
                                            alt="project"
                                            onClick={() => setSelectedImage(image)} // Обновляем выбранное изображение
                                            style={{ cursor: 'pointer' }} // Добавляем стиль курсора
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="projectslugdescription">
                    <div className="container">
                        <div className="psdescri">
                            <h2>О проекте</h2>
                            <div className="blogcontent">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: Code,
                                    }}
                                >
                                    {alldata[0]?.description}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
