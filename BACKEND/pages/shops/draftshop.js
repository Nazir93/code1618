
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Dataloading from "@/components/Dataloading";
import LoginLayout from "@/components/LoginLayout";

export default function draftshop() {



    // pagination blogs
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(4);
    const { alldata, loading } = useFetchData('/api/shops');

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastblog = currentPage * perPage;
    const indexOfFirstblog = indexOfLastblog - perPage;
    const currentblogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

    // Filtering draft blogs
    const draftblogs = currentblogs.filter(ab => ab.status === "draft");


    const allblog = alldata.length; // Total number of blogs

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }




    return <>
        <LoginLayout>


            <div className="draftblogspage">
                {/* title dashboard */}
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Черновик <span>проектов</span></h2>
                        <h3>Администрирование</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <IoSettingsOutline /> <span>/</span><span>Незавершенный проект</span>
                    </div>
                </div>

                <div className="draftblogs">
                    <div className="blogstable">
                        <table className="table table-styling">
                            <thead data-aos="fade-up">
                                <tr>
                                    <th>#</th>
                                    <th>изображение</th>
                                    <th>название</th>
                                    <th>изменить / удалить</th>
                                </tr>
                            </thead>

                            <tbody data-aos="fade-up">
                                {loading ? <>
                                    <tr>
                                        <td>
                                            <Dataloading />
                                        </td>
                                    </tr>
                                </> : <>
                                    {draftblogs.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center">нет доступных проектов</td>
                                        </tr>
                                    ) : (
                                        draftblogs.map((blog, index) => (
                                            <tr key={blog._id}>
                                                <td>{index + 1}</td>
                                                <td><img src={blog.images[0]} width={180} /></td>
                                                <td><h3>{blog.title}</h3></td>
                                                <td>
                                                    <div className='flex gap-2 flex-center'>
                                                        <Link href={'/shops/edit/' + blog._id}><button title='edit'><FaEdit />изменить</button></Link>
                                                        <Link href={'/shops/delete/' + blog._id}><button title='delete'><RiDeleteBin6Fill />удалить</button></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </>
                                }

                            </tbody>
                        </table>
                        {draftblogs.length === 0 ? (
                            ""
                        ) : (
                            <div className='blogpagination'>
                                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>назад</button>
                                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`${currentPage === number ? 'active' : ''}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button onClick={() => paginate(currentPage + 1)} disabled={currentblogs.length < perPage}>вперед</button>
                            </div>
                        )
                        }

                    </div>
                </div>
            </div>
        </LoginLayout>
    </>
}