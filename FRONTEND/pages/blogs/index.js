import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { FreeMode } from 'swiper/modules';
import Head from 'next/head';
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import Blogsearch from '@/components/Blogsearch';
import Link from 'next/link';
import useFetchData from '@/hooks/useFetchData';
import Spinner from '@/components/Spinner';

export default function blogs() {

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');

    const { alldata, loading } = useFetchData('/api/blogs');

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allblog = alldata.length; // Total number of blogs
    // Filter all data based on search query
    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Calculate index of the first blog displayed on the current page
    const indexOfFirstblog = (currentPage - 1) * perPage;
    const indexOfLastblog = currentPage * perPage;

    // Get the current page's blogs
    const currentBlogs = filteredBlogs.slice(indexOfFirstblog, indexOfLastblog);

    // publish blogs
    const publishedData = currentBlogs.filter(ab => ab.status === "publish");

    const sliderpubdata = alldata.filter(ab => ab.status === "publish");

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }


    const [searchInput, setSearchInput] = useState(false);

    const handleSearchOpen = () => {
        setSearchInput(!searchInput);
    }

    const handleSearchClose = () => {
        setSearchInput(false);
    }



    return <>
        <Head>
            <title>Новости</title>
        </Head>
        <div className="blogpage">
            <section className="tophero">
                <div className="container">
                    <div className="toptitle">
                        <div className="toptitlecont flex">
                            <h1 data-aos="fade-right">Добро пожаловать<span> в наш блог</span></h1>
                            <p data-aos="fade-right">Будьте в курсе последних новостей нашей студии!  </p>
                            <div className="subemail" data-aos="fade-up">
                                <form action="#" className="flex">
                                    <input onClick={handleSearchOpen} type="text" placeholder="Искать новости..." />
                                    <button type="submit">ПОИСК</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="featured">
                        <div className="container">
                            <div className="border"></div>
                            <div className="featuredposts">
                                <div className="fetitle flex">
                                    <h3 data-aos="fade-up">Избранные посты :</h3>
                                </div>
                                <div className="feposts flex">
                                    <Swiper
                                        slidesPerView={'auto'}
                                        freeMode={true}
                                        spaceBetween={30}
                                        className="mySwiper"
                                        modules={[FreeMode]}
                                    >
                                        {loading ? <Spinner /> : <>
                                            {sliderpubdata.slice(0, 6).map((blog) => {
                                                return <SwiperSlide key={blog._id}>
                                                    <div className="fpost" key={blog._id}>
                                                        <Link href={`/blogs/${blog.slug}`}>
                                                            <img src={blog.images[0]} alt={blog.title} />
                                                        </Link>
                                                        <div className="fpostinfo">
                                                            <div className="tegs flex">
                                                                {blog.blogcategory.map((cat) => {
                                                                    return <Link href={`/blogs/category/${cat}`} className="ai"><span></span>{cat}</Link>
                                                                })}
                                                            </div>
                                                            <h2><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h2>
                                                            <div className="fpostby flex">
                                                                <img src="/img/me.png" alt="" />
                                                                <p>code 1.618</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            })}
                                        </>}


                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="populartegssec">
                <div className="container">
                    <div className="border"></div>
                    <div className="populartegsdata">
                        <div className="fetitle">
                            <h3>Категории</h3>
                        </div>
                        <div className="poputegs">
                            <Link href="/blogs/category/Интернет магазины" className="pteg" data-aos="fade-right">
                                <img src="img/nextjs.png" alt="" />
                                <div className="tegs">
                                    <div className="apps"><span></span>Интернет магазины</div>
                                </div>
                            </Link>
                            <Link href="/blogs/category/Корпоративные сайты" className="pteg" data-aos="fade-right">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-sqAjIvOtpXI%2FXYoCmqOyMwI%2FAAAAAAAAJig%2FCowR8wgEauEs-RXN2IPmLYkC7NHoHuA3gCLcBGAsYHQ%2Fs1600%2Fnode-js-logo.png&f=1&nofb=1&ipt=150fc0483e4465a22a3e277c4648396630b73d7dd21249b50e0f27b5753e8e4f&ipo=images" alt="" />
                                <div className="tegs">
                                    <div className="ai"><span></span>Корпоративные сайты</div>
                                </div>
                            </Link>
                            <Link href="/blogs/category/Лендинги" className="pteg" data-aos="fade-right">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2FeNAsjO55tPbgaor7ma%2Fsource.gif&f=1&nofb=1&ipt=1b6c2d1f4493f3ac96918899cd5c25eeec185ba33f30d800552d9b6a6655a8c7&ipo=images" alt="" />
                                <div className="tegs">
                                    <div className="vr"><span></span>Лендинги</div>
                                </div>
                            </Link>
                            <Link href="/blogs/category/Приложения" className="pteg" data-aos="fade-left">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bandt.com.au%2Finformation%2Fuploads%2F2016%2F06%2Fwhat-is-digital-marketing.jpg&f=1&nofb=1&ipt=656563f849714c46144b621537bf85f7ac8acb506678f5b0679879dd602bb9b4&ipo=images" alt="" />
                                <div className="tegs">
                                    <div className="apple"><span></span>Приложения</div>
                                </div>
                            </Link>
                            <Link href="/blogs/category/Порталы" className="pteg" data-aos="fade-left">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fscholar.fidahasan.com%2Fwp-content%2Fuploads%2F2019%2F11%2Fflutter-logo.png&f=1&nofb=1&ipt=2ea4dd59087272499663573c42b9fce58916ac50f20c7186946de0ffc23acfe1&ipo=images" alt="" />
                                <div className="tegs">
                                    <div className="google"><span></span>Порталы</div>
                                </div>
                            </Link>
                            <Link href="/blogs/category/Скрипты" className="pteg" data-aos="fade-left">
                                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd6f6d0kpz0gyr.cloudfront.net%2Fuploads%2Fimages%2F_1200x630_crop_center-center_82_none%2Ftailwind-thumb.jpg%3Fmtime%3D1609771799&f=1&nofb=1&ipt=7905bdb27cec8eef124c91d0809bea12a463ac5d375240e052349785be22fbb9&ipo=images" alt="" />
                                <div className="tegs">
                                    <div className="fintech"><span></span>Скрипты</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="latestpostssec">
                <div className="container">
                    <div className="border"></div>
                    <div className="latestpostsdata">
                        <div className="fetitle">
                            <h3>Последние новости :</h3>
                        </div>
                        <div className="latestposts">
                            {loading ? <Spinner /> : <>
                                {publishedData.map((blog) => {
                                    return <div className="lpost" data-aos="flip-right" key={blog._id}>
                                        <div className="lpostimg">
                                            <Link href={`/blogs/${blog.slug}`}><img src={blog.images[0]} alt={blog.title} /></Link>
                                            <div className="tegs">
                                                {blog.blogcategory.map((cat) => {
                                                    return <Link href={`/blogs/category/${cat}`} className="ai"><span></span>{cat}</Link>
                                                })}
                                            </div>
                                        </div>
                                        <div className="lpostinfo">
                                            <h3><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                                            </h3>
                                            <p></p>
                                            <h4 className="flex"><img src="img/me.png" alt="" /><span>code 1.618</span></h4>
                                        </div>
                                    </div>
                                })}
                            </>}

                        </div>
                    </div>
                    
                    {publishedData.length === 0 ? (
                        ""
                    ) : (
                        <div className='blogspaginationbtn flex flex-center mt-3'>
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Назад</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`${currentPage === number ? 'active' : ''}`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Вперед</button>
                        </div>
                    )}
                </div>
            </section>


            {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}


        </div>
    </>
}