import React, { Component } from "react";
import authService from "../../service/auth.service";
import "./login.css";
const regSucces = localStorage.getItem('success')

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
            succes: "",
            email: "",
            validemail: "",
            errorEmail: "",
            password: "",
            validFinal: false,
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.clearSession = this.clearSession.bind(this);
        this.onClicksub = this.onClicksub.bind(this);
        this.onChangeShow = this.onChangeShow.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.clearIncorect = this.clearIncorect.bind(this);
    }
    valSuc() {
        if (!(regSucces)) {
            this.setState({
                succes: ""
            })
        } else {
            let user = <div class="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full" role="alert">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
                Login Success
                <button class="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" onClick={this.clearSession}></button>
            </div>
            this.setState({
                succes: user
            })
        }
    }
    clearSession(e) {
        localStorage.removeItem('success')
        this.setState({
            succes: "",
        })
    }

    isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
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

    onClicksub(e) {

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
        if (!(this.state.errorEmail) && !(this.state.validLength)) {
            authService.login(this.state.email, this.state.password).then(
                (response) => {
                    window.location.href = '/'
                },
                error => {
                    this.setState({
                        validFinal: true
                    })
                }
            );

        }

    }

    clearIncorect(e) {
        this.setState({
            validFinal: false
        })
    }

    componentDidMount() {
        this.valSuc();
    }

    render() {
        return (
            <>
                <div class="flex justify-center">
                    <div class="card-login">
                        <p class="text-header">Login</p>
                        {this.state.succes}
                        {this.state.validFinal && (
                            <div class="bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full" role="alert">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                                </svg>
                                Incorrect username or password.
                                <button class="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" onClick={this.clearIncorect}></button>
                            </div>
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
                        <button type="button" class="btn-submit" onClick={this.onClicksub}>Login</button>
                        <hr className="border-2 rounded-full border-slate-700 w-full mt-16" />

                        <p className="register">Belum Punya Akun? <a className="text-lg text-sky-800" href="/register">Register</a> </p>
                    </div>
                </div>
            </>
        )
    }

}

export default App;