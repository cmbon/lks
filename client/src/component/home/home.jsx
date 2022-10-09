import React, { Component } from "react";
import categoryService from "../../service/category.service";
import menuService from "../../service/menu.service";
import Nav from '../template/nav';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isi: "",
            bakar: "",
            menu: ""
        }
        this.handleDetai = this.handleDetai.bind(this)
    }
    gotin() {
        menuService.getMenu().then(result => {
            const myData = [].concat(result.data)
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6)
                .map((item, i) =>
                    <div key={i} className="flex justify-center">
                        <div className="block p-6 rounded-lg shadow-lg bg-slate-100 max-w-[25rem]">
                            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{item.name}</h5>
                            <div className="h-[130px]">
                                <p className="text-gray-700 text-base mb-4">
                                    {item.description}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <p className="text-green-600">$ {item.price}</p>
                                <div className="flex">
                                    <i className="fa fa-star mt-[3px] text-yellow-600"></i>
                                    <i className="fa fa-star mt-[3px] text-yellow-600"></i>
                                    <i className="fa fa-star mt-[3px] text-yellow-600"></i>
                                    <i className="fa fa-star mt-[3px] text-yellow-600"></i>
                                    <i className="fa fa-star mt-[3px] text-yellow-600"></i>
                                    <p className="ml-3 mb-2">{Number(item.rating).toFixed(2)}</p>
                                </div>
                            </div>
                            <hr className="border-black" />
                            <input type="button" data-id={item.id} data-slug={item.description} onClick={this.handleDetai} className="mt-6 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" value="Button" />
                        </div>
                    </div>
                );
            this.setState({ isi: myData })
        })
    }

    getMenu() {
        menuService.getMenu().then(result => {
            let a = result.data
            const all = a.map((val, i) => 
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
                            <input type="button" data-id={val.id} data-slug={val.description} onClick={this.handleDetai} className="mt-6 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-900 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" value="Button" />
                        </div>
                    </div>
            )
            this.setState({
                menu: all
            })
        })
    }


    handleDetai(e) {
        let data = e.target.dataset.slug
        let id = e.target.dataset.id
        window.location.href = '/detail/' + btoa(id) + '/' + btoa(data)
    }

    componentDidMount() {
        this.gotin()
        this.getMenu()
    }

    render() {
        return (

            <div className="container-2xl mx-auto">
            {console.log(this.state.menu)}
                <Nav />
                <p className="text-4xl font-sans ml-6 mb-5 underline">6 Menu Terbaik untuk Anda</p>
                <div className="grid w-[84rem] mx-auto grid-cols-3 pb-6 gap-4">
                    {this.state.isi}
                </div>

                <p className="text-2xl font-sans ml-6 underline mb-4">Menu </p>
                <div className="grid w-[84rem] mx-auto grid-cols-4 pb-6 gap-3">
                    {this.state.menu}
                </div>
            </div>
        )
    }


}

export default App;