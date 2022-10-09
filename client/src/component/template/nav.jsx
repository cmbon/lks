import React, { Component, useState } from "react";
import authService from "../../service/auth.service";
import tagsService from "../../service/tags.service";
import './nav.css'
const user = JSON.parse(localStorage.getItem('user'));

function Input() {
    const [value, setValue] = useState("");
    const [data, setData] = useState("");
    const onChange = (event) => {
        setValue(event.target.value);
        if (event.target.value !== "") {
            tagsService.get(event.target.value).then(isi => {
                console.log(isi)
                setData(isi.data)
            })
        } else {
            setData("")
        }
    };

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        setData("")

        // our api to fetch the search result
    };

    const onGetSearch = (search) => {
        window.location.href = "tags/" + search
    }

    return (
        <div className="App">
            {console.log(value)}
            <div className="search-inner">
                <input className="d-input" type="text" value={value} onChange={onChange} />
                <button onClick={() => onGetSearch(value)}> Search </button>
            </div>
            <div className="d">
                {data ? data
                    .slice(0, 10)
                    .map((item) => (
                        <div
                            onClick={() => onSearch(item.name)}
                            className="d-row"
                            key={item.name}
                        >
                            {item.name}
                        </div>
                    )) : ""}
            </div>
        </div>
    );
}


class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: "",
        }
        this.Logout = this.Logout.bind(this)
    }

    Logout(e) {
        authService.logout()
        window.location.href = '/'
    }

    render() {
        return (
            <>
                <nav className="
                        w-full
                        flex flex-wrap
                        items-center
                        justify-between
                        py-3
                        navbar navbar-expand-lg navbar-light
                    ">
                    <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                        <button className="
                                navbar-toggler
                                border-0
                                hover:shadow-none hover:no-underline
                                py-2
                                px-2.5
                                bg-transparent
                                focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
                            " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
                                className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
                                </path>
                            </svg>
                        </button>
                        <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
                            <a className="
                                    flex
                                    items-center
                                    text-gray-900
                                    hover:text-gray-900
                                    focus:text-gray-900
                                    mt-2
                                    lg:mt-0
                                    mr-1
                                " href="!#">

                            </a>
                            <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
                                <li className="nav-item rounded-2xl my-2 lg:p-4 lg:mx-0 lg:my-3">
                                    <a className="nav-link font-mono p-4 text-lg hover:text-gray-700 focus:text-gray-700" href="!#">Dashboard</a>
                                </li>
                                <li className="nav-item rounded-2xl my-2 lg:px-6 lg:p-4 lg:mx-0 lg:my-3">
                                    <Input />
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center relative">
                            <div className="dropdown mr-5 relative">
                                <a className="dropdown-toggle flex items-center hidden-arrow" href="!#" id="dropdownMenuButton2" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://mdbootstrap.com/img/new/avatars/2.jpg" className="rounded-full"
                                        style={{ height: "30px", width: "30px" }} alt="" loading="lazy" />
                                </a>
                                {user && (
                                    <ul className="
                                            dropdown-menu
                                            min-w-max
                                            absolute
                                            bg-white
                                            text-base
                                            z-50
                                            float-left
                                            py-2
                                            list-none
                                            text-left
                                            rounded-lg
                                            shadow-lg
                                            mt-1
                                            hidden
                                            m-0
                                            bg-clip-padding
                                            border-none
                                            left-auto
                                            right-0
                                        " aria-labelledby="dropdownMenuButton2">
                                        <li>
                                            <a className="
                                                    dropdown-item
                                                    text-sm
                                                    py-2
                                                    px-4
                                                    font-normal
                                                    block
                                                    w-full
                                                    whitespace-nowrap
                                                    bg-transparent
                                                    text-gray-700
                                                    hover:bg-gray-100
                                                " href="/!#">Profile</a>
                                        </li>
                                        <li>
                                            <a className="
                                                    dropdown-item
                                                    text-sm
                                                    py-2
                                                    px-4
                                                    font-normal
                                                    block
                                                    w-full
                                                    whitespace-nowrap
                                                    bg-transparent
                                                    text-gray-700
                                                    hover:bg-gray-100
                                                " href="/#!">About us</a>
                                        </li>
                                        <li>
                                            <button onClick={this.Logout} className="
                                                    dropdown-item
                                                    text-sm
                                                    py-2
                                                    px-4
                                                    font-normal
                                                    block
                                                    w-full
                                                    whitespace-nowrap
                                                    bg-transparent
                                                    text-gray-700
                                                    hover:bg-gray-100
                                                ">Logout</button>
                                        </li>
                                    </ul>
                                )}
                                {!user && (
                                    <ul className="
                                            dropdown-menu
                                            min-w-max
                                            absolute
                                            bg-white
                                            text-base
                                            z-50
                                            float-left
                                            py-2
                                            list-none
                                            text-left
                                            rounded-lg
                                            shadow-lg
                                            mt-1
                                            hidden
                                            m-0
                                            bg-clip-padding
                                            border-none
                                            left-auto
                                            right-0
                                        " aria-labelledby="dropdownMenuButton2">
                                        <li>
                                            <a className="
                                                    dropdown-item
                                                    text-sm
                                                    py-2
                                                    px-4
                                                    font-normal
                                                    block
                                                    w-full
                                                    whitespace-nowrap
                                                    bg-transparent
                                                    text-gray-700
                                                    hover:bg-gray-100
                                                " href="/login">login</a>
                                        </li>
                                        <li>
                                            <a className="
                                                    dropdown-item
                                                    text-sm
                                                    py-2
                                                    px-4
                                                    font-normal
                                                    block
                                                    w-full
                                                    whitespace-nowrap
                                                    bg-transparent
                                                    text-gray-700
                                                    hover:bg-gray-100
                                                " href="/register">sign up</a>
                                        </li>
                                        <li>
                                            <a className="
                                                    dropdown-item
                                                    text-sm
                                                    py-2
                                                    px-4
                                                    font-normal
                                                    block
                                                    w-full
                                                    whitespace-nowrap
                                                    bg-transparent
                                                    text-gray-700
                                                    hover:bg-gray-100
                                                " href="!#">about us</a>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default Nav;