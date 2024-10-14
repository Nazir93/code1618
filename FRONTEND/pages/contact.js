import Head from "next/head";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import { FaVk , FaTelegram } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function contact() {

    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [project, setProject] = useState([]);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [messageok, setMessageok] = useState('');

    async function createProduct(ev) {
        ev.preventDefault();

        setMessageok('Отправка...');

        const data = { name, lname, email, company, phone, country, project, price, description };

        try {
            await axios.post('/api/contacts', data);
            setMessageok('✅️ Ваша заявка отправленна');
            // Reset all form fields after successful submission
            setName('');
            setLname('');
            setEmail('');
            setCompany('');
            setPhone('');
            setCountry('');
            setProject([]);
            setPrice('');
            setDescription('');
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Серверная ошибка:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Сетевая ошибка:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Ошибка:', error.message);
            }
            setMessageok('❌ Ошибка при отправке');
        }
    }

    const handleProjectChange = (projectName) => {
        if (project.includes(projectName)) {
            setProject(project.filter(project => project !== projectName));
        } else {
            setProject([...project, projectName]);
        }
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    return <>
        <Head>
            <title>Contact us</title>
        </Head>
        <div className="contactpage">
            <div className="container">
                <div className="contactformp">
                    <div className="leftcontp">
                        <h2>Свяжитесь с нами</h2>
                        <p>Думаете о новом проекте, решении проблемы или просто хотите консультацию? Давайте сделаем это!</p>
                        <p>Используйте форму на этой странице или свяжитесь с нами другими способами.</p>
                        <p>Мы любим вопросы и обратную связь — и всегда рады помочь! <br /> Вот несколько способов, как можно с нами связаться.</p>
                        <div className="leftsociinfo">
                            <ul>
                                <li><FaPhoneVolume /> <span>Phone: <a href="tel:+79886515173" rel="nofollow" target="_blank">+7 988 651-51-73</a></span></li>
                                <li><MdAttachEmail /> <span>Email: <a href="mailto:info@code1618.ru" rel="nofollow" target="_blank">info@code1618.ru</a></span></li>
                                <li><FaVk /> <span>Vkontakte: <a href="https://vk.com/id864566726" rel="nofollow" target="_blank">id864566726</a></span></li>
                                <li><FaInstagram /> <span>Instagram: <a href="https://www.instagram.com/code1.618?igsh=MXh6bmo2cDNxb3V1NA==" rel="nofollow" target="_blank">@Code1.618</a></span></li>
                                <li><FaTelegram /> <span>Telegram: <a href="https://t.me/code_1618" rel="nofollow" target="_blank">https://t.me/code_1618</a></span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="rightcontp">
                        <form onSubmit={createProduct}>
                            <div className="rightconttitle">
                                <h2>Ваша контактная информация</h2>
                            </div>
                            <div className="rightcontinputs">
                                <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="Имя" required />
                                <input type="text" value={lname} onChange={ev => setLname(ev.target.value)} placeholder="Фамилия" />
                                <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="Почта" required />
                                <input type="text" value={company} onChange={ev => setCompany(ev.target.value)} placeholder="Название компании" />
                                <input type="text" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="Телефон" required />
                                <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} name="Страна">
                                <option value="">Выберите страну</option>
                                        <option value="Afghanistan">Афганистан</option>
                                        <option value="Åland Islands">Аландские острова</option>
                                        <option value="Albania">Албания</option>
                                        <option value="Algeria">Алжир</option>
                                        <option value="American Samoa">Американское Самоа</option>
                                        <option value="Andorra">Андорра</option>
                                        <option value="Angola">Ангола</option>
                                        <option value="Anguilla">Ангилья</option>
                                        <option value="Antarctica">Антарктида</option>
                                        <option value="Antigua and Barbuda">Антигуа и Барбуда</option>
                                        <option value="Argentina">Аргентина</option>
                                        <option value="Armenia">Армения</option>
                                        <option value="Aruba">Аруба</option>
                                        <option value="Australia">Австралия</option>
                                        <option value="Austria">Австрия</option>
                                        <option value="Azerbaijan">Азербайджан</option>
                                        <option value="Bahamas">Багамы</option>
                                        <option value="Bahrain">Бахрейн</option>
                                        <option value="Bangladesh">Бангладеш</option>
                                        <option value="Barbados">Барбадос</option>
                                        <option value="Belarus">Беларусь</option>
                                        <option value="Belgium">Бельгия</option>
                                        <option value="Belize">Белиз</option>
                                        <option value="Benin">Бенин</option>
                                        <option value="Bermuda">Бермуды</option>
                                        <option value="Bhutan">Бутан</option>
                                        <option value="Bolivia">Боливия</option>
                                        <option value="Bosnia and Herzegovina">Босния и Герцеговина</option>
                                        <option value="Botswana">Ботсвана</option>
                                        <option value="Bouvet Island">Остров Буве</option>
                                        <option value="Brazil">Бразилия</option>
                                        <option value="British Indian Ocean Territory">Британская территория в Индийском океане</option>
                                        <option value="Brunei Darussalam">Бруней-Даруссалам</option>
                                        <option value="Bulgaria">Болгария</option>
                                        <option value="Burkina Faso">Буркина-Фасо</option>
                                        <option value="Burundi">Бурунди</option>
                                        <option value="Cambodia">Камбоджа</option>
                                        <option value="Cameroon">Камерун</option>
                                        <option value="Canada">Канада</option>
                                        <option value="Cape Verde">Кабо-Верде</option>
                                        <option value="Cayman Islands">Каймановы острова</option>
                                        <option value="Central African Republic">Центральноафриканская Республика</option>
                                        <option value="Chad">Чад</option>
                                        <option value="Chile">Чили</option>
                                        <option value="China">Китай</option>
                                        <option value="Christmas Island">Остров Рождества</option>
                                        <option value="Cocos (Keeling) Islands">Кокосовые (Килинг) острова</option>
                                        <option value="Colombia">Колумбия</option>
                                        <option value="Comoros">Коморы</option>
                                        <option value="Congo">Конго</option>
                                        <option value="Congo, The Democratic Republic of The">Демократическая Республика Конго</option>
                                        <option value="Cook Islands">Острова Кука</option>
                                        <option value="Costa Rica">Коста-Рика</option>
                                        <option value="Cote D'ivoire">Кот-д'Ивуар</option>
                                        <option value="Croatia">Хорватия</option>
                                        <option value="Cuba">Куба</option>
                                        <option value="Cyprus">Кипр</option>
                                        <option value="Czech Republic">Чехия</option>
                                        <option value="Denmark">Дания</option>
                                        <option value="Djibouti">Джибути</option>
                                        <option value="Dominica">Доминика</option>
                                        <option value="Dominican Republic">Доминиканская Республика</option>
                                        <option value="Ecuador">Эквадор</option>
                                        <option value="Egypt">Египет</option>
                                        <option value="El Salvador">Сальвадор</option>
                                        <option value="Equatorial Guinea">Экваториальная Гвинея</option>
                                        <option value="Eritrea">Эритрея</option>
                                        <option value="Estonia">Эстония</option>
                                        <option value="Ethiopia">Эфиопия</option>
                                        <option value="Falkland Islands (Malvinas)">Фолклендские острова (Мальвинские)</option>
                                        <option value="Faroe Islands">Фарерские острова</option>
                                        <option value="Fiji">Фиджи</option>
                                        <option value="Finland">Финляндия</option>
                                        <option value="France">Франция</option>
                                        <option value="French Guiana">Французская Гвиана</option>
                                        <option value="French Polynesia">Французская Полинезия</option>
                                        <option value="French Southern Territories">Французские Южные территории</option>
                                        <option value="Gabon">Габон</option>
                                        <option value="Gambia">Гамбия</option>
                                        <option value="Georgia">Грузия</option>
                                        <option value="Germany">Германия</option>
                                        <option value="Ghana">Гана</option>
                                        <option value="Gibraltar">Гибралтар</option>
                                        <option value="Greece">Греция</option>
                                        <option value="Greenland">Гренландия</option>
                                        <option value="Grenada">Гренада</option>
                                        <option value="Guadeloupe">Гваделупа</option>
                                        <option value="Guam">Гуам</option>
                                        <option value="Guatemala">Гватемала</option>
                                        <option value="Guernsey">Гернси</option>
                                        <option value="Guinea">Гвинея</option>
                                        <option value="Guinea-bissau">Гвинея-Бисау</option>
                                        <option value="Guyana">Гайана</option>
                                        <option value="Haiti">Гаити</option>
                                        <option value="Heard Island and Mcdonald Islands">Острова Херд и Макдональд</option>
                                        <option value="Holy See (Vatican City State)">Святой Престол (Государство Ватикан)</option>
                                        <option value="Honduras">Гондурас</option>
                                        <option value="Hong Kong">Гонконг</option>
                                        <option value="Hungary">Венгрия</option>
                                        <option value="Iceland">Исландия</option>
                                        <option value="India">Индия</option>
                                        <option value="Indonesia">Индонезия</option>
                                        <option value="Iran, Islamic Republic of">Иран</option>
                                        <option value="Iraq">Ирак</option>
                                        <option value="Ireland">Ирландия</option>
                                        <option value="Isle of Man">Остров Мэн</option>
                                        <option value="Israel">Израиль</option>
                                        <option value="Italy">Италия</option>
                                        <option value="Jamaica">Ямайка</option>
                                        <option value="Japan">Япония</option>
                                        <option value="Jersey">Джерси</option>
                                        <option value="Jordan">Иордания</option>
                                        <option value="Kazakhstan">Казахстан</option>
                                        <option value="Kenya">Кения</option>
                                        <option value="Kiribati">Кирибати</option>
                                        <option value="Korea, Democratic People's Republic of">Корея, Корейская Народно-Демократическая Республика</option>
                                        <option value="Korea, Republic of">Корея, Республика</option>
                                        <option value="Kuwait">Кувейт</option>
                                        <option value="Kyrgyzstan">Киргизия</option>
                                        <option value="Lao People's Democratic Republic">Лаос</option>
                                        <option value="Latvia">Латвия</option>
                                        <option value="Lebanon">Ливан</option>
                                        <option value="Lesotho">Лесото</option>
                                        <option value="Liberia">Либерия</option>
                                        <option value="Libyan Arab Jamahiriya">Ливийская Арабская Джамахирия</option>
                                        <option value="Liechtenstein">Лихтенштейн</option>
                                        <option value="Lithuania">Литва</option>
                                        <option value="Luxembourg">Люксембург</option>
                                        <option value="Macao">Макао</option>
                                        <option value="Macedonia, The Former Yugoslav Republic of">Македония</option>
                                        <option value="Madagascar">Мадагаскар</option>
                                        <option value="Malawi">Малави</option>
                                        <option value="Malaysia">Малайзия</option>
                                        <option value="Maldives">Мальдивы</option>
                                        <option value="Mali">Мали</option>
                                        <option value="Malta">Мальта</option>
                                        <option value="Marshall Islands">Маршалловы острова</option>
                                        <option value="Martinique">Мартиника</option>
                                        <option value="Mauritania">Мавритания</option>
                                        <option value="Mauritius">Маврикий</option>
                                        <option value="Mayotte">Майотта</option>
                                        <option value="Mexico">Мексика</option>
                                        <option value="Micronesia, Federated States of">Микронезия</option>
                                        <option value="Moldova, Republic of">Молдова</option>
                                        <option value="Monaco">Монако</option>
                                        <option value="Mongolia">Монголия</option>
                                        <option value="Montenegro">Черногория</option>
                                        <option value="Montserrat">Монтсеррат</option>
                                        <option value="Morocco">Марокко</option>
                                        <option value="Mozambique">Мозамбик</option>
                                        <option value="Myanmar">Мьянма</option>
                                        <option value="Namibia">Намибия</option>
                                        <option value="Nauru">Науру</option>
                                        <option value="Nepal">Непал</option>
                                        <option value="Netherlands">Нидерланды</option>
                                        <option value="Netherlands Antilles">Нидерландские Антильские острова</option>
                                        <option value="New Caledonia">Новая Каледония</option>
                                        <option value="New Zealand">Новая Зеландия</option>
                                        <option value="Nicaragua">Никарагуа</option>
                                        <option value="Niger">Нигер</option>
                                        <option value="Nigeria">Нигерия</option>
                                        <option value="Niue">Ниуэ</option>
                                        <option value="Norfolk Island">Остров Норфолк</option>
                                        <option value="Northern Mariana Islands">Северные Марианские острова</option>
                                        <option value="Norway">Норвегия</option>
                                        <option value="Oman">Оман</option>
                                        <option value="Pakistan">Пакистан</option>
                                        <option value="Palau">Палау</option>
                                        <option value="Palestinian Territory, Occupied">Палестинская территория</option>
                                        <option value="Panama">Панама</option>
                                        <option value="Papua New Guinea">Папуа-Новая Гвинея</option>
                                        <option value="Paraguay">Парагвай</option>
                                        <option value="Peru">Перу</option>
                                        <option value="Philippines">Филиппины</option>
                                        <option value="Pitcairn">Питкэрн</option>
                                        <option value="Poland">Польша</option>
                                        <option value="Portugal">Португалия</option>
                                        <option value="Puerto Rico">Пуэрто-Рико</option>
                                        <option value="Qatar">Катар</option>
                                        <option value="Reunion">Реюньон</option>
                                        <option value="Romania">Румыния</option>
                                        <option value="Russian Federation">Россия</option>
                                        <option value="Rwanda">Руанда</option>
                                        <option value="Saint Helena">Остров Святой Елены</option>
                                        <option value="Saint Kitts and Nevis">Сент-Китс и Невис</option>
                                        <option value="Saint Lucia">Сент-Люсия</option>
                                        <option value="Saint Pierre and Miquelon">Сен-Пьер и Микелон</option>
                                        <option value="Saint Vincent and The Grenadines">Сент-Винсент и Гренадины</option>
                                        <option value="Samoa">Самоа</option>
                                        <option value="San Marino">Сан-Марино</option>
                                        <option value="Sao Tome and Principe">Сан-Томе и Принсипи</option>
                                        <option value="Saudi Arabia">Саудовская Аравия</option>
                                        <option value="Senegal">Сенегал</option>
                                        <option value="Serbia">Сербия</option>
                                        <option value="Seychelles">Сейшельские острова</option>
                                        <option value="Sierra Leone">Сьерра-Леоне</option>
                                        <option value="Singapore">Сингапур</option>
                                        <option value="Slovakia">Словакия</option>
                                        <option value="Slovenia">Словения</option>
                                        <option value="Solomon Islands">Соломоновы Острова</option>
                                        <option value="Somalia">Сомали</option>
                                        <option value="South Africa">Южно-Африканская Республика</option>
                                        <option value="South Georgia and The South Sandwich Islands">Южная Георгия и Южные Сандвичевы острова</option>
                                        <option value="Spain">Испания</option>
                                        <option value="Sri Lanka">Шри-Ланка</option>
                                        <option value="Sudan">Судан</option>
                                        <option value="Suriname">Суринам</option>
                                        <option value="Svalbard and Jan Mayen">Шпицберген и Ян-Майен</option>
                                        <option value="Swaziland">Свазиленд</option>
                                        <option value="Sweden">Швеция</option>
                                        <option value="Switzerland">Швейцария</option>
                                        <option value="Syrian Arab Republic">Сирийская Арабская Республика</option>
                                        <option value="Taiwan, Province of China">Тайвань</option>
                                        <option value="Tajikistan">Таджикистан</option>
                                        <option value="Tanzania, United Republic of">Танзания</option>
                                        <option value="Thailand">Таиланд</option>
                                        <option value="Timor-leste">Восточный Тимор</option>
                                        <option value="Togo">Того</option>
                                        <option value="Tokelau">Токелау</option>
                                        <option value="Tonga">Тонга</option>
                                        <option value="Trinidad and Tobago">Тринидад и Тобаго</option>
                                        <option value="Tunisia">Тунис</option>
                                        <option value="Turkey">Турция</option>
                                        <option value="Turkmenistan">Туркмения</option>
                                        <option value="Turks and Caicos Islands">Тёркс и Кайкос</option>
                                        <option value="Tuvalu">Тувалу</option>
                                        <option value="Uganda">Уганда</option>
                                        <option value="Ukraine">Украина</option>
                                        <option value="United Arab Emirates">Объединенные Арабские Эмираты</option>
                                        <option value="United Kingdom">Великобритания</option>
                                        <option value="United States">Соединенные Штаты Америки</option>
                                        <option value="Uruguay">Уругвай</option>
                                        <option value="Uzbekistan">Узбекистан</option>
                                        <option value="Vanuatu">Вануату</option>
                                        <option value="Venezuela">Венесуэла</option>
                                        <option value="Viet Nam">Вьетнам</option>
                                        <option value="Western Sahara">Западная Сахара</option>
                                        <option value="Yemen">Йемен</option>
                                        <option value="Zambia">Замбия</option>
                                        <option value="Zimbabwe">Зимбабве</option>

                                </select>
                            </div>
                            <div className="rightconttitle">
                                <h2>Какие услуги вам нужны для вашего проекта?</h2>
                            </div>
                            <div className="rightcontcheckbox">
                                {[
                                    'Веб разработка',
                                    'Мобильная разработка',
                                    'Дизайн',
                                    'Разработка портала',
                                    'Онлайн магазин',
                                    'Корпоративный сайт'
                                ].map((projectOption) => (
                                    <label key={projectOption} className="cyberpunk-checkbox-label">
                                        <input
                                            type="checkbox"
                                            className="cyberpunk-checkbox"
                                            value={projectOption}
                                            checked={project.includes(projectOption)}
                                            onChange={() => handleProjectChange(projectOption)}
                                        />
                                        {projectOption}
                                    </label>
                                ))}
                            </div>
                            <div className="rightconttitle">
                                <h2>Каков предполагаемый бюджет вашего проекта?</h2>
                            </div>
                            <div className="rightcontredio">
                                {[ '30 тыс - 80 тыс', '80 тыс - 100 тыс', 'Больше 100 тыс'].map((priceRange) => (
                                    <div key={priceRange} className="radio-button">
                                        <input
                                            type="radio"
                                            id={priceRange}
                                            name="example-radio"
                                            value={priceRange}
                                            checked={price === priceRange}
                                            onChange={handlePriceChange}
                                        />
                                        <span className="radio"></span>
                                        <label htmlFor={priceRange}>{priceRange}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="rightconttitle">
                                <h2>Расскажите нам о проекте</h2>
                            </div>
                            <div className="rightcontpera">
                                <textarea value={description} onChange={ev => setDescription(ev.target.value)} name="description" rows="4" id="" placeholder="Описание проекта"></textarea>
                            </div>
                            <hr />
                            <div className="righhcontsbtn flex gap-3">
                                <button type="submit">Отправить</button>
                                <p>{messageok}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}