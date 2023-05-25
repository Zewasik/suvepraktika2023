import { fetchHandler } from "../fetchHandler"
import { Status } from '../../App'
import "./login-registration.css"

export interface LoginProp {
    setStatus: (arg: Status) => void
    changePage: () => void
}

export default function Login({ setStatus, changePage }: LoginProp) {

    return (
        <div className="login-page">
            <div className="login">
                <form className="form" onSubmit={(e) => {
                    e.preventDefault()

                    const form = new FormData(e.currentTarget)
                    fetchHandler(`http://localhost:8080/api/auth/login`, 'POST', { email: form.get("email"), password: form.get("password") })
                        .then(r => r.json())
                        .then((r) => {
                            setStatus({ isLogged: true, role: "READER", token: r.token })
                        }
                        )
                        .catch((err) => alert(err))
                }}>
                    <input name="email" type="text" className="form__field" placeholder="Email" />
                    <input
                        name="password"
                        type="password"
                        className="form__field"
                        placeholder="Password"
                    />
                    <input type="submit" className="button form__button" value="Log In" />
                    <input
                        type="button"
                        className="button switch-button"
                        onClick={() => changePage()}
                        value="Register"
                    />
                </form>
            </div>
        </div>
    )
}
