import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function Shop() {
    const { alldata, loading } = useFetchData('/api/shops');

    // Мемоизация данных с фильтрацией только опубликованных
    const publishdata = useMemo(() => alldata.filter(ab => ab.status === 'publish'), [alldata]);

    const [selectedTag, setSelectedTag] = useState('Все');
    const [filteredShops, setFilteredShops] = useState([]);

    // Обновление списка фильтрованных магазинов при изменении выбранного тега
    useEffect(() => {
        if (selectedTag === 'Все') {
            setFilteredShops(publishdata);
        } else {
            setFilteredShops(publishdata.filter(pro => pro.tags.includes(selectedTag)));
        }
    }, [selectedTag, publishdata]);

    // Извлечение всех уникальных тегов для кнопок фильтров
    const allTags = useMemo(() => ['Все', ...new Set(publishdata.flatMap(pro => pro.tags))], [publishdata]);

    return (
        <>
            <Head>
                <title>ШАБЛОНЫ САЙТОВ</title>
            </Head>
            <div className="projectpage">
                <section className="projects">
                    <div className="container">
                        <div className="project_titles">
                            <h2 data-aos="fade-up">ШАБЛОНЫ ПОД ВАШ БИЗНЕС</h2>
                            <p data-aos="fade-up">
                                Ознакомьтесь с готовыми решениями, которые помогут вашему бизнесу
                                быстро и эффективно выйти на рынок с качественным сайтом.
                            </p>
                        </div>
                        <div
                            className="project_buttons"
                            data-aos="fade-zoom-in"
                            data-aos-easing="ease-in-back"
                            data-aos-delay="300"
                            data-aos-offset="0"
                        >
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    className={selectedTag === tag ? 'active' : ''}
                                    onClick={() => setSelectedTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        <div className="projects_cards">
                            {loading ? (
                                <Spinner />
                            ) : filteredShops.length === 0 ? (
                                <h1 className="w-100 flex flex-center mt-3">Нет шаблонов</h1>
                            ) : (
                                filteredShops.slice(0, 20).map((pro) => (
                                    <Link
                                        href={`/shop/${pro.slug}`}
                                        key={pro._id}
                                        className="procard"
                                        data-aos="flip-left"
                                        data-aos-easing="ease-out-cubic"
                                        data-aos-duration="2000"
                                    >
                                        <div className="proimgbox">
                                            <img src={pro.images[0]} alt={pro.title} />
                                        </div>
                                        <div className="procontentbox">
                                            <h2>{pro.title}</h2>
                                            <GoArrowUpRight />
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
