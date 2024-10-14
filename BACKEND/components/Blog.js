import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";

export default function Blog(

    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        description: existingDescription,
        images: existingImages,
        blogcategory: existingBlogcategory,
        tags: existingTags,
        status: existingStatus,
    }

) {



    const [redirect, setRedirect] = useState(false)
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '')
    const [slug, setSlug] = useState(existingSlug || '')
    const [images, setImages] = useState(existingImages || [])
    const [blogcategory, setBlogcategory] = useState(existingBlogcategory || [])
    const [description, setDescription] = useState(existingDescription || '')
    const [tags, setTags] = useState(existingTags || [])
    const [status, setStatus] = useState(existingStatus || '')

    const [isUploading, setIsUploading] = useState(false);

    const uploadImagesQueue = [];


    async function createProduct(ev) {
        ev.preventDefault();

        if (isUploading) {
            await Promise.all(uploadImagesQueue)
        }

        const data = { title, slug, images, description, blogcategory, tags, status };

        if (_id) {
            await axios.put('/api/blogs', { ...data, _id })
            toast.success('Data Updated!')
        } else {
            await axios.post('/api/blogs', data)
            toast.success('Product Created!')
        }

        setRedirect(true);
    };

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                // Use the axios.post method and push the promise to the queue
                uploadImagesQueue.push(
                    axios.post('/api/upload', data)
                        .then(res => {
                            setImages(oldImages => [...oldImages, ...res.data.links]);
                        })
                );
            }

            // Wait for all images to finish uploading
            await Promise.all(uploadImagesQueue);

            setIsUploading(false);
            toast.success('Image uploaded')
        } else {
            toast.error('An error occurred!')
        }
    }


    if (redirect) {
        router.push('/blogs')
        return null;
    }

    function updateImagesOrder(images) {
        setImages(images)
    }

    function handleDeleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        toast.success('image deleted successfully!!')
    }

    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        // console.log("Input Value:", inputValue);

        const newSlug = inputValue
            // Replace spaces with hyphens
            .replace(/\s+/g, '-');

        console.log("New Slug:", newSlug);
        setSlug(newSlug);
    };


    return <>


        <form onSubmit={createProduct} className='addWebsiteform'>
            {/* blog title */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="title">название</label>
                <input type="text" id='title' placeholder='Введите заголовок с маленькой буквы'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>
            {/* blog slug url */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="slug">темы</label>
                <input type="text" id='slug' placeholder='Введите название темы'
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div>

            {/* blog category */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="catergory">выбрать категорию </label>
                <select onChange={(e) => setBlogcategory(Array.from(e.target.selectedOptions, option => option.value))} name="catergory" id="catergory" multiple value={blogcategory} >
                    <option value="Корпоративные сайты">Корпоративные сайты</option>
                    <option value="Лендинги">Лендинги</option>
                    <option value="Интернет магазины">Интернет магазины</option>
                    <option value="Css">Css</option>
                    <option value="Приложения">Приложения</option>
                    <option value="Порталы">Порталы</option>
                    <option value="Скрипты">Скрипты</option>
                    <option value="Database">Database</option>
                    <option value="Deployment">Deployment</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">выбрать: {Array.isArray(existingBlogcategory) && existingBlogcategory.map(category => (
                    <span key={category}>{category}</span>
                ))}</p>
            </div>

            {/* blog Images */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <div className='w-100'>
                    <label htmlFor="images">Изображения (первое изображение будет отображаться в виде миниатюры, которую вы можете перетащить)</label>
                    <input type="file" id='fileInput' className='mt-1' accept='image/*' multiple onChange={uploadImages} />
                </div>
                <div className="w-100 flex flex-left">
                    {isUploading && (
                        <Spinner />
                    )}
                </div>
            </div>

            {!isUploading && (
                <div className='flex'>
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className='flex gap-1' >
                        {images?.map((link, index) => (
                            <div key={link} className='uploadedimg'>
                                <img src={link} alt="image" className='object-cover' />
                                <div className='deleteimg'  >
                                    <button onClick={() => handleDeleteImage(index)}>
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}

            {/* markdown description */}
            <div className='description w-100 flex flex-col flex-left mb-2'>
                <label htmlFor="description">Содержимое блога (для изображения: сначала загрузите, скопируйте ссылку и вставьте в нее![альтернативный текст](ссылка) )</label>
                <MarkdownEditor
                    value={description}
                    onChange={(ev) => setDescription(ev.text)}
                    style={{ width: '100%', height: '400px' }} // You can adjust the height as needed
                    renderHTML={(text) => (
                        <ReactMarkdown components={{
                            code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');
                                if (inline) {
                                    return <code>{children}</code>;
                                } else if (match) {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <pre style={{ padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' }} {...props}>
                                                <code >{children}</code>
                                            </pre>
                                            <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={() => navigator.clipboard.writeText(children)}>
                                                Copy code
                                            </button>
                                        </div>
                                    );
                                } else {
                                    return <code {...props}>{children}</code>;
                                }
                            },
                        }}>
                            {text}
                        </ReactMarkdown>
                    )}
                />
            </div>

            {/* tags */}
            <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                <label htmlFor="tags">Теги (ctrl + щелчок левой кнопкой мыши для множественного выбора)</label>
                <select onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))} name="tags" id="tags" multiple value={tags}>
                    <option value="html">Html</option>
                    <option value="css">css</option>
                    <option value="javascript">javaScript</option>
                    <option value="Интернет магазины">Интернет магазины</option>
                    <option value="Корпоративные сайты">Корпоративные сайты</option>
                    <option value="Лендинги">Лендинги</option>
                    <option value="database">Database</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">выбрать: {existingTags && existingTags.length > 0 && (
                    <span>{existingTags.join(', ')}</span>
                )}</p>
            </div>

            {/* blog status */}
            <div className='w-100 flex flex-col flex-left mb-2' >
                <label htmlFor="status">статус</label>
                <select onChange={(e) => setStatus(e.target.value)} name="status" id="status" value={status}>
                    <option value="">нет выбора</option>
                    <option value="draft">черновик</option>
                    <option value="publish">публиковать</option>
                </select>
                <p className="existingcategory flex gap-1 mt-1 mb-1">выбрать: {existingStatus && existingStatus.length > 0 && (
                    <span>{existingStatus}</span>
                )}</p>
            </div>


            <div className='w-100 mb-2'>
                <button type='submit' className='w-100 addwebbtn flex-center'>СОХРАНИТЬ</button>
            </div>

        </form>

    </>
}

