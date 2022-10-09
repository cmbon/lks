import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import menuService from "../../service/menu.service";
import commentService from "../../service/comment.service";
import Nav from "../template/nav";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './detail.css'
import moment from 'moment'
const log = JSON.parse(localStorage.getItem('user'));

const MySwal = withReactContent(Swal)
function Val() {
    const { data, slug } = useParams();
    const [star, setStar] = useState("")
    const [isi, setData] = useState("");
    const [comment, setComment] = useState("");
    const [dataComment, setDataComment] = useState("")
    const [validComment, setValidComment] = useState(false);
    const handlestar1 = () => {
        setStar(1)
        setValidComment(true)
    }

    const handlestar2 = () => {
        setStar(2)
        setValidComment(true)
    }

    const handlestar3 = () => {
        setStar(3)
        setValidComment(true)
    }

    const handlestar4 = () => {
        setStar(4)
        setValidComment(true)
    }

    const handlestar5 = () => {
        setStar(5)
        setValidComment(true)
    }

    const handleComment = (e) => {
        setValidComment(true)
        setComment(e.target.value)
    }

    const getData = () => {
        menuService.getDetail(atob(data), atob(slug)).then(result => {
            let a = result.data
            setData(a)
        })
        let form = new FormData();
        form.append("user", log.user.idUser);
        form.append("menu", atob(data));
        commentService.getCommentdata(form).then(isi => {
            let c = isi.data
            if ((c[0])) {
                setComment(c[0].comment)
                setStar(c[0].rating)
            } else {
                console.log('a')
            }
        })
        commentService.getidComment(atob(data)).then(result => {
            setDataComment(result.data)
        })
    }

    const handleCommentSubmit = (e) => {
        let form = new FormData();
        form.append("user", log.user.idUser);
        form.append("menu", atob(data));
        form.append("rating", star);
        form.append("comment", comment);
        commentService.postComment(form).then(isi => {
            MySwal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your comment has been saved',
                showConfirmButton: false,
                timer: 1800
            })
            setValidComment(false)
            getData()
        })
    }
    useEffect(() => {
        const getData = () => {
        menuService.getDetail(atob(data), atob(slug)).then(result => {
            let a = result.data
            setData(a)
        })
        let form = new FormData();
        form.append("user", log.user.idUser);
        form.append("menu", atob(data));
        commentService.getCommentdata(form).then(isi => {
            let c = isi.data
            if ((c[0])) {
                setComment(c[0].comment)
                setStar(c[0].rating)
            } else {
                console.log('a')
            }
        })
        commentService.getidComment(atob(data)).then(result => {
            setDataComment(result.data)
        })
    }
        getData()
    }, [data, slug])
    return (<>

        <div className="container-2xl mx-auto">
            <Nav />
            <div className="flex justify-center">
                <div className="mb-6 block p-6 rounded-lg shadow-lg bg-white max-w-6xl">
                    <a href="/">
                        <i className="fa fa-arrow-left" />
                    </a>
                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{isi.name}</h5>
                    <div className="h-[130px]">
                        <p className="text-gray-700 text-base mb-4">
                            {isi.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <p className="text-green-600">$ {isi.price}</p>
                        <div className="flex">
                            <i className="fa fa-star mt-[3px] text-xl text-yellow-600"></i>
                            <p className="ml-3 mb-2">{Number(isi.rating).toFixed(2)}</p>
                        </div>
                    </div>
                    <hr className="border-black" />
                    <div className="ml-4">
                        <div class="mb-3 xl:w-96">
                            <label class="form-label inline-block mt-3 mb-2 text-gray-700"
                            >Comment:</label>
                            <input onChange={handleComment}
                                value={comment}
                                type="text"
                                class="insert-comment"
                                placeholder="Add a comment..." />
                        </div>
                        <p className="">Add a rating: </p>
                        <button onClick={handlestar1}><i className={` ${star === 1 || star === 2 || star === 3 || star === 4 || star === 5 ? "text-yellow-600 fa fa-star" : "fa fa-star-o"
                            } mb-4 text-2xl mt-[3px]`}></i></button>
                        <button onClick={handlestar2}><i className={` ${star === 2 || star === 3 || star === 4 || star === 5 ? "text-yellow-600 fa fa-star" : "fa fa-star-o"
                            } text-2xl mt-[3px]`}></i></button>
                        <button onClick={handlestar3}><i className={` ${star === 3 || star === 4 || star === 5 ? "text-yellow-600 fa fa-star" : "fa fa-star-o"
                            } text-2xl mt-[3px]`}></i></button>
                        <button onClick={handlestar4}><i className={` ${star === 4 || star === 5 ? "text-yellow-600 fa fa-star" : "fa fa-star-o"
                            } text-2xl mt-[3px]`}></i></button>
                        <button onClick={handlestar5}><i className={` ${star === 5 ? "text-yellow-600 fa fa-star" : "fa fa-star-o"
                            } text-2xl mt-[3px]`}></i></button>
                    </div>
                    {validComment && (
                        <input type="button" onClick={handleCommentSubmit} className="btn-comment" value="Submit" />
                    )}
                    {console.log(dataComment)}
                    {dataComment && (
                        <>
                            <hr className="border-black" />
                            {dataComment.map(isi =>
                                <>
                                    <div className="flex">
                                        <p className="text-xl px-4 font-bold">{isi.nickname}</p>
                                        <p className="pt-1">{moment(isi.created_at).fromNow()}</p>
                                    </div>
                                    {(isi.created_at !== isi.updated_at) && (
                                        <p className="ml-4 text-slate-600">edited</p>
                                    )}
                                    <p className="ml-8 py-3 text-lg">{isi.comment}</p>

                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    </>)
}

class App extends Component {
    constructor(props) {
        super(props)
        if (!(log)) {
            window.location.href = '/login'
        }
    }

    render() {
        return (
            <Val />
        )
    }
}

export default App;