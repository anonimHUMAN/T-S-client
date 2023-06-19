import { useRef, useState } from "react";
import config from "../../qwe/config"
import axios from "axios"
import './sign.css'

function SignIn() {
    const [darkMode, setDarkMode] = useState(true);
    const [spiner, setSpiner] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const gcv = (inp) => {
        return inp.current.value
    }

    let inp1 = useRef(null)
    let inp2 = useRef(null)

    const checkBtn = async () => {
        if (gcv(inp1) && gcv(inp2)) {
            setSpiner(true)
            setTimeout(() => {
                setSpiner(false)
            }, 4000)
            let user = {
                email: gcv(inp1),
                password: gcv(inp2)
            }
            let res = await axios.post(`${config.url}/auth`, user)
            alert(res.data.message)
            let TOKEN = res.data.token
            window.localStorage.setItem('token', TOKEN)
            if (res.data.status === 'admin') {
                window.location.replace('/adminpanel')
            } else if (res.data.status === 'teacher') {
                window.location.replace('/teachers')
            } else if (res.data.status === 'student') {
                window.location.replace('/students')
            }
        } else {
            alert("Complete all input: __")
        }
    }


    return (
        <>
            <div className={`App ${darkMode ? 'dark' : 'light'}`}>
                <main className="bg-white dark:bg-gray-900 h-screen">
                    <div className="text-center fixed top-5  right-6">
                        <button onClick={toggleDarkMode} id="theme-toggle" type="button"
                            className="text-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                            <ion-icon name="invert-mode-outline"></ion-icon>
                        </button>
                    </div>
                    {spiner && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
                    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="card sm:mx-auto sm:w-full sm:max-w-sm bg-gray-200 dark:bg-gray-800 p-5  rounded-lg shadow">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">

                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
                                    Sign in to your account
                                </h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" action="#" method="POST">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input ref={inp1} id="email" name="email" type="email" autoComplete="email" required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password"
                                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Password</label>
                                            <div className="text-sm">
                                                <a href="#" className="font-semibold text-gray-400 hover:text-blue-700">Forgot password?</a>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <input ref={inp2} id="password" name="password" type="password" autoComplete="current-password" required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <button onClick={checkBtn} type="button"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Sign In
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Not a member?
                                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-blue-600">
                                        <span> </span> Start a 14 day free trial
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default SignIn