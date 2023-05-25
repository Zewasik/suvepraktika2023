import "./login-registration.css"
import { LoginProp } from './login'
import { fetchHandler } from "../fetchHandler"

export default function Registration({ setStatus, changePage }: LoginProp) {

    return (
        <div className="registration-page">
            <div className="registration">
                <form
                    className="form"
                    onSubmit={(e) => {
                        e.preventDefault()

                        const form = new FormData(e.currentTarget)
                        fetchHandler(`http://localhost:8080/api/auth/register`, 'POST', { email: form.get("email"), password: form.get("password"), role: form.get("role") })
                            .then(r => r.json())
                            .then((r) => {
                                setStatus({ isLogged: true, role: "READER", token: r.token })
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
                        onClick={() => changePage()}
                        value="Sign in"
                    />
                </form>
            </div>
        </div>
    )
}