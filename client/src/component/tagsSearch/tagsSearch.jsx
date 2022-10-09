import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import menuService from "../../service/menu.service";
import Nav from "../template/nav";

function Data() {
    const { cat } = useParams();
    const [data, setData] = useState("");


    const handleDetai = (e) => {
        let data = e.target.dataset.slug
        let id = e.target.dataset.id
        window.location.href = '/detail/' + btoa(id) + '/' + btoa(data)
    }

    useEffect(() => {
        const data = () => {
            menuService.getTag(cat).then(isi => {
                let a = isi.data
                const b = a.map((val, i) => 
                <div key={i} className="flex justify-center">
                    <div className="block p-6 rounded-lg shadow-lg bg-slate-100 w-72">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{val.name}</h5>
                        <div className="h-40">
                            <p className="text-gray-700 text-base mb-4">
                                {val.description}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <p className="text-green-600">$ {val.price}</p>
                            <div className="flex">
                                <i className="fa fa-star mt-[3px] text-yellow-600"></i>
                                <i className="fa fa-star mt-[3px] text-yellow-600"></i>
                                <i className="fa fa-star mt-[3px] text-yellow-600"></i>
                                <i className="fa fa-star mt-[3px] text-yellow-600"></i>
                                <i className="fa fa-star mt-[3px] text-yellow-600"></i>
                                <p className="ml-3 mb-2">{Number(val.rating).toFixed(2)}</p>
                            </div>
                        </div>
                        <hr className="border-black" />
                        <input type="button" data-id={val.id} data-slug={val.description} onClick={handleDetai} className="mt-6 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" value="Button" />
                    </div>
                </div>
        )
        setData(b) 
            })
        }
        data()
    }, [cat])
    return (
        <>
            {data}
        </>
    )
}


class App extends Component {
    render() {
        return (
            <>
                <Nav />
                <Data />
            </>
        )
    }
}

export default App;