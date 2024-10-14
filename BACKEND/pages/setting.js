import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Setting() {

    const { data: session, status } = useSession();

    if (status === "loading") {
        // Loading state, loader or any other indicator
        return <div className='full-h flex flex-center'>
            <div className="loading-bar">Загрузка</div>
        </div>;
    }
    const router = useRouter();
    if (!session) {
        router.push('/login')
        return null;
    }

    if (session) {
        return (
            <div className="settingpage">
                {/* title dashboard */}
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Админ <span>настройки</span></h2>
                        <h3>АДМИНИСТРИРОВАНИЕ</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <IoSettingsOutline /> <span>/</span><span>настройки</span>
                    </div>
                </div>

                <div className="profilesettings">
                    <div className="leftprofile_details flex">
                        <img src="/img/coder.png" alt="coder" data-aos="fade-left" />
                        <div className="w-100" data-aos="fade-up">
                            <div className='flex flex-sb flex-left mt-2'>
                                <h2>Мой профиль:</h2>
                                <h3>CODE 1.618 <br /> Студия разработки</h3>
                            </div>
                            <div className="flex flex-sb mt-2">
                                <h3>телефон:</h3>
                                <input type="text" defaultValue="+91-0123456789" />
                            </div>
                            <div className="mt-2">
                                <input type="email" defaultValue="Youremailaddress@gmail.com" />
                            </div>
                            <div className="flex flex-center w-100 mt-2">
                                <button>сохранить</button>
                            </div>
                        </div>

                    </div>
                    <div className="rightlogoutsec" data-aos="fade-left">
                        <div className="topaccoutnbox">
                            <h2 className="flex flex-sb">Мой аккаунт <MdOutlineAccountCircle /></h2>
                            <hr />
                            <div className="flex flex-sb mt-1">
                                <h3>Активный аккаунт <br /> <span>Email</span></h3>
                                <button onClick={() => signOut()}>выйти</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}
