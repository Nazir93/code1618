import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function projects() {

    const { alldata, loading } = useFetchData('/api/projects');

    const publishedData = alldata.filter(ab => ab.status === "publish");

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        // Filter projects based on selectedCategory
        if (selectedCategory === 'All') {
            setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
        } else {
            setFilteredProjects(alldata.filter(pro => pro.projectcategory[0] === selectedCategory && pro.status === 'publish'));
        }
    }, [selectedCategory, alldata]);

    return <>
        <Head>
            <title>Project</title>
        </Head>
        <div className="projectpage">
            <section className="projects">
                <div className="container">
                    <div className="project_titles">
                        <h2 data-aos="fade-up">Портфолио </h2>
                        <p data-aos="fade-up">Примеры сайтов, которые разработала наша команда, смотрите в портфолио. Занимаемся веб-разработкой более 10 лет, создали 250+ сайтов. Специализируемся на проектах для малого и среднего бизнеса, производителей и поставщиков.</p>
                    </div>
                    <div className="project_buttons" data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="300"
                        data-aos-offset="0">
                        <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => setSelectedCategory('All')}>Все</button>
                        <button className={selectedCategory === 'Корпоративный сайт' ? 'active' : ''} onClick={() => setSelectedCategory('Корпоративный сайт')}>Корпоративный сайт</button>
                        <button className={selectedCategory === 'Приложение' ? 'active' : ''} onClick={() => setSelectedCategory('Приложение')}>Приложение</button>
                        <button className={selectedCategory === 'Лендинг' ? 'active' : ''} onClick={() => setSelectedCategory('Лендинг')}>Лендинг</button>
                        <button className={selectedCategory === 'Портфолио' ? 'active' : ''} onClick={() => setSelectedCategory('Портфолио')}>Портфолио</button>
                        <button className={selectedCategory === 'Блог' ? 'active' : ''} onClick={() => setSelectedCategory('Блог')}>Блог</button>
                        <button className={selectedCategory === 'Порталы' ? 'active' : ''} onClick={() => setSelectedCategory('Порталы')}>Порталы</button>
                    </div>
                   
                    <div className="projects_cards">
                        {loading ? <Spinner /> : (
                            filteredProjects.length === 0 ? (
                                <h1 className="w-100 flex flex-center mt-3">Нет проектов</h1>
                            ) : (
                                filteredProjects.slice(0, 20).map((pro) => (
                                    <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard" data-aos="flip-left"
                                        data-aos-easing="ease-out-cubic"
                                        data-aos-duration="2000">
                                        <div className="proimgbox">
                                            <img src={pro.images[0]} alt={pro.title} />
                                        </div>
                                        <div className="procontentbox">
                                            <h2>{pro.title}</h2>
                                            {/* <p>{pro.description}</p> */}
                                            <GoArrowUpRight />
                                        </div>
                                    </Link>
                                ))
                            )
                        )}

                    </div>
                </div>
            </section>
        </div>
    </>
}