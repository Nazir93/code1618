import Head from "next/head";
import Link from "next/link";

export default function gallery() {
    return <>
        <Head>
            <title>CODE 1.618: КОМАНДА</title>
        </Head>
        <div className="gallerypage">
            <div className="container">
                
            </div>
            <div className="gallerybtmphotos" id="galleryimages">
                <div className="container">
                    <div className="gbtmtitles text-center">
                        <h1>КОМАНДА</h1>
                        
                    </div>
                    <div className="gallery_image_grid" >
                        <div className="image-item" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                            <img src="/img/nazir.jpg"
                                alt="Image 1" />
                            <div className="galeryimgiteminfo">
                                <h2>Назир</h2>
                                <p>Fullstack Разработчик</p>
                            </div>
                        </div>
                        <div className="image-item" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                            <img src="/img/sergey.jpg"
                                alt="Image 5" />
                            <div className="galeryimgiteminfo">
                                <h2>Сергей</h2>
                                <p>Разработчик фронтенда</p>
                            </div>
                        </div>
                        <div className="image-item" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                            <img src="/img/dima.jpg"
                                alt="Image 2" />
                            <div className="galeryimgiteminfo">
                                <h2>Дмитрий</h2>
                                <p>Специалист по тестированию</p>
                            </div>
                        </div>
                        <div className="image-item" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                            <img src="/img/anna.jpg"
                                alt="Image 3" />
                            <div className="galeryimgiteminfo">
                                <h2>Альбина</h2>
                                <p>Дизайнер по продуктам</p>
                            </div>
                        </div>
                        <div className="image-item" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                            <img src="/img/elena.jpg"
                                alt="Image 4" />
                            <div className="galeryimgiteminfo">
                                <h2>Елена</h2>
                                <p>Ведущий UX/UI дизайнер</p>
                            </div>
                        </div>
                        <div className="image-item" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                            <img src="/img/yriu.jpg"
                                alt="Image 6" />
                            <div className="galeryimgiteminfo">
                                <h2>Юрий</h2>
                                <p>Fullstack Разработчик</p>
                            </div>
                        </div>
                        <div className="image-item" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                            <img src="/img/liza.jpg"
                                alt="Image 6" />
                            <div className="galeryimgiteminfo">
                                <h2>Елизавета</h2>
                                <p>UX/UI дизайнер</p>
                            </div>
                        </div>
                        <div className="image-item" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                            <img src="/img/philip.jpg"
                                alt="Image 6" />
                            <div className="galeryimgiteminfo">
                                <h2>Кондрат</h2>
                                <p>Маркетолог</p>
                            </div>
                        </div>
                        <div className="image-item" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                            <img src="/img/push.jpg"
                                alt="Image 6" />
                            <div className="galeryimgiteminfo">
                                <h2>Андрей</h2>
                                <p>Разработчик бэкенда</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}