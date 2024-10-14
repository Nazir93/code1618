import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Head from "next/head";
import useFetchData from "@/hooks/useFetchData";

export default function shopslug() {
    const router = useRouter();
    const { slug } = router.query;
    const { alldata, loading } = useFetchData(`/api/shops?slug=${slug}`);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (alldata && alldata[0]?.images?.length > 0) {
            setSelectedImage(alldata[0]?.images[0]);
        }
    }, [alldata]);

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
                            {selectedImage ? (
                                <img src={selectedImage} alt={alldata && alldata[0]?.title} />
                            ) : (
                                <p>Загрузка изображения...</p>
                            )}
                        </div>
                        <div className="projectsluginfo">
                            <div className="leftmainproinfo">
                                <h1>{alldata && alldata[0]?.title}</h1>
                                <a target="_blank" href={alldata && alldata[0]?.afilink}>ЗАКАЗАТЬ</a>
                            </div>
                            <div className="rightmainproinfo">
                                <div>
                                    <h3>Цена</h3>
                                    <h2>{alldata && alldata[0]?.price}</h2>
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
                                        <img
                                            src={image}
                                            alt="project"
                                            onClick={() => setSelectedImage(image)}
                                            style={{ cursor: 'pointer' }}
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
                            <h2>Описание проекта</h2>
                            <div className="blogcontent">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: Code,
                                    }}
                                >
                                    {alldata && alldata[0]?.description}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
