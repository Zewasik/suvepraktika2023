import "./auth.css"
import { fetchHandler } from "../fetchHandler"
import { useNavigate } from "react-router-dom"

const BASE_URL = process.env.REACT_APP_HOSTNAME

export default function Registration() {
    const navigate = useNavigate()

    return (
        <div className="auth-page">
            <div className="auth">
                <form
                    className="form"
                    onSubmit={(e) => {
                        e.preventDefault()

                        const form = new FormData(e.currentTarget)
                        fetchHandler(`${BASE_URL}/api/auth/register`, 'POST', { email: form.get("email"), password: form.get("password"), role: form.get("role") })
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
                    }}
                >
                    <input name="email" placeholder="Email" type="email" className="form__field" />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        className="form__field"
                    />
                    <select
                        name="role"
                        className="form__field"
                    >
                        <option value={"READER"}>Reader</option>
                        <option value={"LIBRARIAN"}>Librarian</option>
                    </select>
                    <input type="submit" className="button form__button" value="Register" />
                    <input
                        type="button"
                        className="button switch-button"
                        value="Sign in"
                        onClick={() => navigate("/login")}
                    />
                </form>
            </div>
        </div>
    )
}
