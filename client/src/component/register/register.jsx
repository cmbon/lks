import React, { Component } from "react";
import authService from "../../service/auth.service";
import "./register.css";

const Required = () => {
    return (
        <>
            <div class="bg-red-100 rounded-lg py-5 px-6 ext-base text-red-700 mb-3" role="alert">
                This field is required!
            </div>
        </>
    )
}

const Match = () => {
    return (
        <>
            <div class="bg-red-100 rounded-lg py-5 px-6 ext-base text-red-700 mb-3" role="alert">
                this field must be 8 or more characters
            </div>
        </>
    )
}
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            nickname: "",
            email: "",
            password: "",
            commonname: "",
            validNick: false,
            validemail: false,
            validpass: false,
            validLength: false,
            showPass: false,
            validCommon: false,
            errorEmail: "",

            validateFinalErr: ""
        }
        this.onChangeNickname = this.onChangeNickname.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onClicksv = this.onClicksv.bind(this)
        this.onChangeShow = this.onChangeShow.bind(this)
        this.clearSession = this.clearSession.bind(this)
        this.onChangeCommonname = this.onChangeCommonname.bind(this)
    }

    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    onChangeNickname(e) {
        this.setState({
            nickname: e.target.value
        })
        if ((this.state.validNick)) {
            this.setState({
                validNick: false
            })
        }
    }

    onChangeEmail(e) {
        if (!this.isValidEmail(e.target.value)) {
            this.setState({ errorEmail: 'Email is invalid' });
        } else {
            this.setState({ errorEmail: null });
        }

        this.setState({
            email: e.target.value
        })
        if ((this.state.validemail)) {
            this.setState({
                validemail: false
            })
        }
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
        if ((this.state.validpass)) {
            this.setState({
                validpass: false
            })
        } else {
            if (this.state.password.length >= 8)
                this.setState({
                    validLength: false
                })
        }
    }

    onChangeCommonname(e) {
        this.setState({
            commonname: e.target.value
        })
        if ((this.state.validCommon)) {
            this.setState({
                validCommon: false
            })
        }
    }

    onClicksv(e) {
        if (!(this.state.nickname)) {
            this.setState({
                validNick: true
            })
        }
        if (!(this.state.email)) {
            this.setState({
                validemail: true
            })
        }
        if (!(this.state.password)) {
            this.setState({
                validpass: true
            })
        } else {
            if (this.state.password.length < 8)
                this.setState({
                    validLength: true
                })
        }
        if (this.state.nickname && this.state.commonname && !(this.state.errorEmail) && !(this.state.validLength)) {
            authService.register(this.state.nickname, this.state.commonname, this.state.email, this.state.password).then(
                (response) => {
                    localStorage.setItem("success", 'success');
                    window.location.href = '/login'
                },
                error => {
                    let user =
                        <div class="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                            </svg>
                            Email {this.state.email} is not available
                            <button class="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" onClick={this.clearSession}></button>
                        </div>

                    this.setState({
                        validateFinalErr: user
                    })
                })
        }

    }

    clearSession(e) {
        this.setState({ validateFinalErr: "" })
    }
    onChangeShow(e) {
        if (this.state.showPass) {
            this.setState({
                showPass: false
            })
        } else {
            this.setState({
                showPass: true
            })
        }
    }

    render() {
        return (
            <>
                <div class="flex justify-center">
                    <div class="card-login">
                        <p class="text-header">Register</p>
                        {this.state.validateFinalErr}
                        <div className="form-group">
                            <p>Nickname</p>
                            <input type='text' value={this.state.nickname} onChange={this.onChangeNickname} />
                        </div>

                        {this.state.validNick && (
                            <Required />
                        )}
                        
                        <div className="form-group">
                            <p>Full Name</p>
                            <input type='text' value={this.state.commonname} onChange={this.onChangeCommonname} />
                        </div>

                        {this.state.validCommon && (
                            <Required />
                        )}

                        <div className="form-group">
                            <p>Email</p>
                            <input type='email' value={this.state.email} onChange={this.onChangeEmail} />
                        </div>
                        {this.state.errorEmail &&
                            <div class="bg-red-100 rounded-lg py-5 px-6 ext-base text-red-700 mb-3" role="alert">
                                {this.state.errorEmail}
                            </div>
                        }
                        {this.state.validemail && (
                            <Required />
                        )}

                        <div className="form-group">
                            <p>Password</p>
                            <input type={this.state.showPass === true ? "text" : "password"}
                                value={this.state.password} onChange={this.onChangePassword} />
                        </div>
                        <div className="flex ml-2 my-2">
                            <input type='checkbox' onChange={this.onChangeShow} className="m-0 " /> <p className="ml-4">Show Password</p>
                        </div>
                        {this.state.validpass && (
                            <Required />
                        )}
                        {this.state.validLength && (
                            <Match />
                        )}
                        <button onClick={this.onClicksv} type="button" class="btn-submit">Register</button>
                        <hr className="border-2 rounded-full border-slate-700 w-full mt-16" />

                        <p className="register">Belum Punya Akun? <a className="text-lg text-sky-800" href="/Login">Login</a> </p>
                    </div>
                </div>
            </>
        )
    }

}

export default App;