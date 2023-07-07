import { useRef, useState } from "react";
import config from "../../qwe/config"
import axios from "axios"
import './sign.css'

function SignIn() {
    const [darkMode, setDarkMode] = useState(true);
    const [spiner, setSpiner] = useState(false);
    const [alert1, setAlert1] = useState(false);
    const [alert2, setAlert2] = useState('');
    const [label, setLabel] = useState(false);
    const [label1, setLabel1] = useState(false);
    let inp1 = useRef(null)
    let inp2 = useRef(null)
    const toggleDarkMode = () => { setDarkMode(!darkMode); };
    const gcv = (inp) => { return inp.current.value }
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
            setAlert2(res.data.message)
            setAlert1(true)
            setTimeout(() => {
                setAlert1(false)
            }, 1000);
            let TOKEN = res.data.token
            window.localStorage.setItem('token', TOKEN)
            setTimeout(() => {
                if (res.data.status === 'admin') {
                    window.location.replace('/adminpanel')
                } else if (res.data.status === 'teacher') {
                    window.location.replace('/teachers')
                } else if (res.data.status === 'student') {
                    window.location.replace('/students')
                }
            }, 2000);
        } else if (gcv(inp1) === '' && gcv(inp2) !== '') {
            setLabel(true)
            setLabel1(false)
        } else if (gcv(inp2) === '' && gcv(inp1) !== '') {
            setLabel1(true)
            setLabel(false)
        } else if (gcv(inp1) === '' && gcv(inp1) === '') {
            setLabel(true)
            setLabel1(true)
        }
    }

    return (
        <>
            <div className={`App ${darkMode ? 'dark' : 'light'}`}>
                <main className="bg-white bg-[url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9naW58ZW58MHx8MHx8fDA%3D&w=1000&q=80')] bg-no-repeat bg-cover bg-center p-9 dark:bg-gray-900 h-screen">
                    <div className="z-10 bg-black rounded-xl text-center fixed top-5  right-6">
                        <button onClick={toggleDarkMode} id="theme-toggle" type="button"
                            className="text-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-3 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                            <ion-icon name="invert-mode-outline"></ion-icon>
                        </button>
                    </div>
                    {alert1 && <div className="absolute right-16 top-20 z-10 flex rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-slate-700 md:max-w-xl md:flex-row">
                        <div className="flex p-6">
                            <h5 className="mb-2 text-xl font-medium text-red-600 dark:text-red-600">{alert2}</h5>
                        </div>
                    </div>}
                    {spiner && <div className="z-10 lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
                    <div className="backdrop-blur-sm flex flex-col justify-center px-6 py-12 lg:px-8">
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
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        {label && <label htmlFor="email" className="block text-sm font-medium leading-6 text-red-800 dark:text-red-800">
                                            Enter your email address
                                        </label>}
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
                                        {label1 && <label htmlFor="email" className="block text-sm font-medium leading-6 text-red-800 dark:text-red-800">
                                            Enter your password
                                        </label>}
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