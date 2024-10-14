import Link from "next/link";
import { FaVk , FaWhatsapp , FaTelegram } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
    return <>
        <footer className="footer">
            <div className="footersec flex flex-center flex-col gap-2">
                <div className="logo">
                    <img src="/img/logo.png" alt="" />
                </div>
                <ul className="flex gap-2">
                    <li><Link href='/services'>СЕРВИС</Link></li>
                    <li><Link href='/projects'>ПОРФОЛИО</Link></li>
                    <li><Link href='/blogs'>НОВОСТИ</Link></li>
                    <li><Link href='/gallery'>КОМАНДА</Link></li>
                    <li><Link href='/shop'>ШАБЛОНЫ</Link></li>
                    <li><Link href='/contact'>КОНТАКТЫ</Link></li>
                </ul>
                <ul className="hero_social">
                  <li><a target="_blank" href="https://www.instagram.com/code1.618?igsh=MXh6bmo2cDNxb3V1NA=="><FaInstagram /></a></li>
                  <li><a target="_blank" href="https://vk.com/id864566726"><FaVk /></a></li>
                  <li><a target="_blank" href="https://api.whatsapp.com/send?phone=79886515173"><FaWhatsapp /></a></li>
                  <li><a target="_blank" href="https://t.me/code_1618"><FaTelegram /></a></li>
                </ul>
                <div className="copyrights">&copy; ВСЕ ПРАВА ЗАЩИЩЕННЫ <span>CODE 1.618</span></div>
            </div>
        </footer>
    </>
}