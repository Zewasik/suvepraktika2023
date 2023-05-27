import "./auth.css"
import { fetchHandler } from "../fetchHandler"
import { useNavigate } from "react-router-dom"

const BASE_URL = process.env.REACT_APP_HOSTNAME

export default function Login() {
    const navigate = useNavigate()

    return (
        <div className="auth-page">
            <div className="auth">
                <form className="form" onSubmit={(e) => {
                    e.preventDefault()

                    const form = new FormData(e.currentTarget)
                    fetchHandler(`${BASE_URL}/api/auth/login`, 'POST', { email: form.get("email"), password: form.get("password") })
                        .then(r => {
                            if (r.status === 200) {
                                return r.json()
                            }
                            throw `Request error: ${r.status}`
                        }).then(({ token }) => {
                            if (token) {
                                localStorage.setItem("token", token)
                                navigate("/books")
                                return
                            }
                            throw `No token in response`
                        })
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
                        value="Register"
                        onClick={() => navigate("/registration")}
                    />
                </form>
            </div>
        </div >
    )
}
