import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LandingPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // axios.defaults.withCredentials = true
    const handleSubmit = async (e) => {
        e.preventDefault();
        // axios.post('https://filter-be.vercel.app/user/login', { username, password})
        // // .then(response => {
        // //     const username = jwtDecode(response.data.token)
        // //     localStorage.setItem("username", username.username)
        // //     alert("Berhasil Login");
        // //     navigate('/filter-app');
        // // })
        try {
            const response = await toast.promise(
              axios.post('https://filter-be.vercel.app/user/login', { username, password }),
              {
                pending: 'Logging in...',
                success: 'Berhasil Login!',
                error: 'Failed to Login'
              }
            );
      
            setTimeout(() => {
              const username = jwtDecode(response.data.token);
              localStorage.setItem("username", username.username);
              navigate('/filter-app');
            }, 2000);
        }catch (error) {
            if (error.response && error.response.data.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error("An error occurred while logging in");
            }
            console.error(error);
          }
    }

    return (
        <>
        <div className="w-full h-[100vh] bg-blue-800 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-3/4 bg-blue-500 border-2 border-slate-500 shadow-xl p-7 rounded-lg sm:w-3/5 md:w-2/5 lg:w-1/4">
            {/* logo */}
                <div className="w-full flex flex-col gap-y-4 items-center justify-center mb-6">
                    <img src="/logo.png" alt="logo digital of thinking" className='w-1/2 sm:w-3/5' />
                </div>
                {/* form action */}
                <form action="" className="w-full" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col gap-y-1 mb-4">
                        <label htmlFor="username" className="font-bold text-white uppercase text-lg  ">Username</label>
                        <input type="text" className="rounded shadow-xl sm:py-1" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className="w-full flex flex-col gap-y-1 mb-6">
                        <label htmlFor="password" className="font-bold text-white uppercase text-lg  ">password</label>
                        <input type="password" className="rounded shadow-xl sm:py-1" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="text-center w-full font-bold italic bg-emerald-400 py-2 rounded-lg  uppercase hover:bg-emerald-500 transition-all duration-300 sm:text-lg" >Login</button>
                </form>

            </div>
        </div>
        <ToastContainer position="top-center" />
        </>
    )
}