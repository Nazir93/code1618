import Head from "next/head";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

import { GoArrowUpRight } from "react-icons/go";
import { useEffect, useState } from "react";
import { LuMedal } from "react-icons/lu";
import { PiGraduationCap } from "react-icons/pi";
import { FaCalendarDays , FaVk , FaWhatsapp , FaTelegram } from "react-icons/fa6";
import Spinner from "@/components/Spinner";
import Typed from 'typed.js';

export default function Home() {


  // activeservice background color
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0); // Set the first item as active when mouse leaves
  };




  // services data
  const services = [
    {
      title: "ВЕБ РАЗРАБОТКА",
      description: "Разработка сайтов охватывает создание веб-приложений и сайтов разной сложности — от простых лендингов до сложных порталов с интеграцией с базами данных и системами управления контентом (CMS).Этот процесс начинается с проектирования интерфейса, продолжается разработкой функционала, и завершается тестированием и оптимизацией."
    },
    {
      title: "МОБИЛЬНАЯ РАЗРАБОТКА",
      description: "Мобильная разработка – это процесс создания приложений для мобильных устройств, таких как смартфоны и планшеты. Включает в себя проектирование пользовательского интерфейса, интеграцию с серверными системами и оптимизацию для работы на различных платформах (iOS, Android).Основной акцент делается на производительность, удобство использования и безопасность."
    },
    {
      title: "ЦИФРОВОЙ МАРКЕТИНГ",
      description: "Диджитал маркетинг охватывает продвижение брендов через цифровые каналы: соцсети, поисковые системы, email-маркетинг и контент-маркетинг. Основной целью является привлечение и удержание клиентов с помощью данных и аналитики для достижения максимальной эффективности."
    },
    {
      title: "РАЗРАБОТКА ПОРТАЛОВ",
      description: "Разработка порталов – это создание многофункциональных веб-сайтов или платформ для взаимодействия с пользователями. Порталы могут включать личные кабинеты, системы управления контентом, интеграции с внешними сервисами и базами данных. Основной акцент делается на удобстве навигации, безопасности и масштабируемости."
    },
    {
      title: "ГОТОВЫЕ РЕШЕНИЯ",
      description: "Мы предлагаем удобные готовые решения для вашего бизнеса. Вам нужно лишь выбрать дизайн на нашем сайте, а мы возьмём на себя весь процесс разработки. Это экономит ваше время и силы — от идеи до полностью готового проекта. Вы получаете качественный и стильный продукт, который полностью соответствует вашим потребностям."
    }
    
  ];

  const [loading, setLoading] = useState(true);
  const [alldata, setAllData] = useState([]);
  const [allwork, setAllWork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, blogsResponse] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/blogs')
        ]);

        const projectsData = await projectsResponse.json();
        const blogsData = await blogsResponse.json();

        setAllData(projectsData);
        setAllWork(blogsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter projects based on selectedCategory
    if (selectedCategory === 'All') {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish'));
    } else {
      setFilteredProjects(alldata.filter(pro => pro.status === 'publish' && pro.projectcategory[0] === selectedCategory));
    }
  }, [selectedCategory, alldata]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };



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
      hour12: true // Use 12-hour format
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.body.classList.contains('dark'));
    }
  }, []);


  // type js

  useEffect(() => {
    const options = {
      strings: ['сайтов', 'приложений', 'порталов'],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    };

    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
      const typed = new Typed(typedElement, options);

      // Clean up on unmount
      return () => {
        typed.destroy();
      };
    }
  }, []);



  return (
    <>
      <Head>
        <title>CODE 1.618 - Студия дизайна и разработки</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x="50%" y="50%" text-anchor="middle" className="animate-stroke">CODE 1.618</text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos="fade-right" >WEB СТУДИЯ CODE 1.618</span>
              <h1 className="hero_title" data-aos="fade-right" >Разработка <br /> <span className="typed-text">сайтов</span> </h1>
              <div className="hero_img_box heroimgbox" data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <img src="/img/me.jpg" alt="" />
              </div>
              <div className="lead" data-aos="fade-up"  >Мы разработываем проекты любого типа. От лендинга  до мультифункциональных информационных порталов.</div>
              <div className="hero_btn_box" data-aos="fade-up">
                <Link href='/contact' className="download_cv">ОСТАВИТЬ ЗАЯВКУ </Link>
                <ul className="hero_social">
                  <li><a href="https://www.instagram.com/code1.618?igsh=MXh6bmo2cDNxb3V1NA=="><FaInstagram /></a></li>
                  <li><a href="https://vk.com/id864566726"><FaVk /></a></li>
                  <li><a href="https://api.whatsapp.com/send?phone=79886515173"><FaWhatsapp /></a></li>
                  <li><a href="https://t.me/code_1618"><FaTelegram /></a></li>
                </ul>
              </div>
            </div>
            <div className="heroimageright" >
              <div className="hero_img_box" data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <img src='/img/me.png' alt="" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item" data-aos="fade-right">
              <h3>10+</h3>
              <h4>Лет опыта в IT <br />
              отрасли</h4>
            </div>
            <div className="funfect_item" data-aos="fade-right">
              <h3>200+</h3>
              <h4>Завершенных <br />
                проектов</h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>250+</h3>
              <h4>Довольных <br />
                клиентов</h4>
            </div>
            <div className="funfect_item" data-aos="fade-left">
              <h3>10+</h3>
              <h4>Гарантия<br />
              срока</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2 data-aos="fade-up">УСЛУГИ</h2>
            <p data-aos="fade-up">Разработка сайтов и мобильных приложений, комплексный интернет-маркетинг. </p>
          </div>
          <div className="services_menu" data-aos="fade-up">
            {services.map((service, index) => (
              <div
                key={index}
                className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles">
            <h2 data-aos="fade-up">РАБОТЫ</h2>
            <p data-aos="fade-up">Мы гордимся тем, что наши решения помогают бизнесам расти и достигать новых высот.</p>
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
                filteredProjects.slice(0, 4).map((pro) => (
                  <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard" data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000">
                    <div className="proimgbox">
                      <img src={pro.images[0]} alt={pro.title} />
                    </div>
                    <div className="procontentbox">
                      <h2>{pro.title}</h2>
                      <GoArrowUpRight />
                    </div>
                  </Link>
                ))
              )
            )}

          </div>
          <div className="flex flex-center mt-4">
          <Link href="/projects" className="download_ce">
            ВСЕ
          </Link>
        </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy">
      <div className="project_titles">
            <h2 data-aos="fade-up">ЦЕНЫ</h2>
            <p data-aos="fade-up">Наши цены отличаются от рыночных. Напишите нам, и мы предложим вам привлекательные условия, учитывая ваш бюджет.</p>
          </div>
          <div className="container flex flex-left flex-sb justify-between">
            
            <div className="experience">
              <div className="exper_cards">
                <div className="exper_card" data-aos="fade-up">
                  <h3>Разработка сайта-визитки</h3>
                  <p>Разработка сайта-визитки — это первый шаг для представления своего бизнеса в интернете, подходит для стартапа или небольшой компании. Его основная задача — познакомить аудиторию с брендом, повысить лояльность, рассказать о деятельности и укрепить имидж. </p>
                  <span>от 30 000 руб</span>
                </div>
                <div className="exper_card" data-aos="fade-up">
                  <h3>Разработка лендинга под ключ</h3>
                  <p>Хотите на одной страничке провести клиента от знакомства с продуктом до оформления заявки? Тогда заказывайте разработку landing page в Code 1.618! Мы разработаем продающую посадочную, которая обеспечит вашему бизнесу поток заявок или сбор контактов для расширения клиентской базы. </p>
                  <span>от 30 000 руб</span>
                </div>
                <div className="exper_card" data-aos="fade-up">
                  <h3>Корпоративный сайт </h3>
                  <p>Корпоративный сайт — это возможность познакомить клиентов и партнеров с вашим бизнесом, продемонстрировать преимущества сотрудничества с вами. Мы разрабатываем современные корпоративные порталы на российских CMS, которые становятся действительно эффективным инструментом продвижения компании, товаров или услуг.</p>
                  <span>от 100 000 руб</span>
                </div>
              </div>
            </div>

            <div className="experience">
              <div className="exper_cards">
                <div className="exper_card" data-aos="fade-up">
                  <h3>Разработка веб приложения</h3>
                  <p>Мобильные приложения помогают бизнесам взаимодействовать с пользователями через персонализированные и удобные решения, включая мобильные игры, банковские приложения, e-commerce и другие виды приложений, интегрируемые с внешними системами и базами данных.</p>
                  <span>от 200 000 руб</span>
                </div>
                <div className="exper_card" data-aos="fade-up">
                  <h3>Разработка интернет-магазина</h3>
                  <p>Создание интернет-магазина — это возможность расширить клиентскую базу, а значит, увеличить продажи и масштабировать бизнес. Полноценные интернет-магазины с авторским дизайном, удобной системой управления. Все проекты разрабатываются непосредственно под ваши предпочтения.</p>
                  <span>от 200 000 руб</span>
                </div>
                <div className="exper_card" data-aos="fade-up">
                  <h3>Сайты на Wordpress</h3>
                  <p>Разработка сайтов на WordPress – это отличный выбор для тех, кто хочет создать профессиональный и функциональный веб-сайт с минимальными затратами времени и ресурсов. Независимо от того, являетесь ли вы владельцем малого бизнеса, блогером или крупной корпорацией, WordPress предлагает все необходимые инструменты для реализации ваших идей.</p>
                  <span>от 50 000 руб</span>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* My Skills */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">ИНСТУМЕНТЫ</h2>
            <p data-aos="fade-up">Мы используем самые высокотехнологичные инструменты для разработки, чтобы создавать качественные и эффективные решения для наших клиентов.</p>
          </div>
          <div className="myskils_cards">
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="" />
                <h3>92%</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/firebase.svg" alt="" />
                <h3>80%</h3>
              </div>
              <p className="text-center">Firebase</p>
            </div>
            <div className="mys_card" data-aos="fade-right">
              <div className="mys_inner">
                <img src="/img/mongodb.svg" alt="" />
                <h3>98%</h3>
              </div>
              <p className="text-center">MongoDB</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/redux.svg" alt="" />
                <h3>85%</h3>
              </div>
              <p className="text-center">Redux</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">React</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/js.svg" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">JavaScript</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/nodejs.png" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">Node Js</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/wordpress.png" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">Wordpress</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/nextjs.png" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">Next Js</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/tailwind.png" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">Tailwind css</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/typescript.png" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">TypeScript</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/docker.png" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">Docker</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/graphql.png" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">GraphQL</p>
            </div>
            <div className="mys_card" data-aos="fade-left">
              <div className="mys_inner">
                <img src="/img/react.svg" alt="" />
                <h3>99%</h3>
              </div>
              <p className="text-center">React Native</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2 data-aos="fade-up">Новости</h2>
            <p data-aos="fade-up">Будьте в курсе последних новостей</p>
          </div>
          <div className="recent_blogs">
            {allwork.slice(0, 3).map((blog) => {
              return <Link href={`/blogs/${blog.slug}`} key={blog._id} className="re_blog" data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000">
                <div className="re_blogimg">
                  <img src={blog.images[0] || '/img/noimage.png'} alt={blog.title} />
                  <span>{blog.blogcategory[0]}</span>
                </div>
                <div className="re_bloginfo">
                  <div className="re_topdate flex gap-1">
                    <div className="res_date">
                      <FaCalendarDays /> <span>{formatDate(new Date(blog.createdAt))}</span>
                    </div>
                  </div>
                  <h2>{blog.title}</h2>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>

    </>
  );
}
