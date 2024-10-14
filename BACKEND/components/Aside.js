import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react'
import { useSession } from "next-auth/react";

export default function Aside({ asideOpen }) {
    const router = useRouter();
    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/');

    const handleClick = () => {
        setClicked(!clicked);
    };

    const handleLinkClick = (link) => {
        setActiveLink(prevActive => (prevActive === link ? null : link));
        setClicked(false);
    };

    useEffect(() => {
        // Update active link state when the page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname]);

    // const [asideOpen, setAsideOpen] = useState(false);

    // const handleAsideOpen = () => {
    //     setAsideOpen(!asideOpen);
    // }

    const { data: session } = useSession();
    if (session) {
        return <>

            <aside className={asideOpen ? 'asideleft active' : 'asideleft'}>
                <ul>
                    <Link href="/">
                        <li className={activeLink === '/' ? 'navactive' : ''}
                            onClick={() => handleLinkClick('/')}>
                            <IoHome />
                            <span>Кабинет</span>
                        </li>
                    </Link>

                    <li className={activeLink === '/blogs' ? 'navactive flex-col flex-left' : 'flex-col flex-left'}
                        onClick={() => handleLinkClick('/blogs')} >
                        <div className="flex gap-1">
                            <BsPostcard />
                            <span>Новости</span>
                        </div>
                        {activeLink === '/blogs' && (<ul>
                            <Link href='/blogs'><li>Все новости</li></Link>
                            <Link href='/blogs/draft'><li>Черновик</li></Link>
                            <Link href='/blogs/addblog'><li>Добавить новость</li></Link>
                        </ul>)}
                    </li>

                    <li className={activeLink === '/projects' ? 'navactive flex-col flex-left' : 'flex-col flex-left'}
                        onClick={() => handleLinkClick('/projects')} >
                        <div className="flex gap-1">
                            <BsPostcard />
                            <span>Проекты</span>
                        </div>
                        {activeLink === '/projects' && (<ul>
                            <Link href='/projects'><li>Все проекты</li></Link>
                            <Link href='/projects/draftprojects'><li>Черновик</li></Link>
                            <Link href='/projects/addproject'><li>Добавить проект</li></Link>
                        </ul>)}
                    </li>

                    <li className={activeLink === '/shops' ? 'navactive flex-col flex-left' : 'flex-col flex-left'}
                        onClick={() => handleLinkClick('/shops')} >
                        <div className="flex gap-1">
                            <BsPostcard />
                            <span>Магазин</span>
                        </div>
                        {activeLink === '/shops' && (<ul>
                            <Link href='/shops'><li>Все проекты</li></Link>
                            <Link href='/shops/draftshop'><li>Черновик</li></Link>
                            <Link href='/shops/addproduct'><li>Добавить проект</li></Link>
                        </ul>)}
                    </li>

                    <li className={activeLink === '/gallery' ? 'navactive flex-col flex-left' : 'flex-col flex-left'}
                        onClick={() => handleLinkClick('/gallery')} >
                        <div className="flex gap-1">
                            <BsPostcard />
                            <span>Галерея</span>
                        </div>
                        {activeLink === '/gallery' && (<ul>
                            <Link href='/gallery'><li>Все фото</li></Link>
                            <Link href='/gallery/addphoto'><li>Добавить фото</li></Link>
                        </ul>)}
                    </li>


                    <Link href="/contacts">
                        <li className={activeLink === '/contacts' ? 'navactive' : ''}
                            onClick={() => handleLinkClick('/contacts')}>
                            <MdOutlineAddPhotoAlternate />
                            <span>Контакты</span>
                        </li>
                    </Link>
                    <Link href="/setting">
                        <li className={activeLink === '/setting' ? 'navactive' : ''}
                            onClick={() => handleLinkClick('/setting')}>
                            <IoSettingsOutline />
                            <span>Настройки</span>
                        </li>
                    </Link>
                </ul>
            </aside>

        </>
    }

}