import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // State untuk mengatur visibilitas menu
    const navigate = useNavigate()
    // const [username, setUsername] = useState("");
    // const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
          const username = await localStorage.getItem("username");
          if (username) {
            // try {
            //   setUsername(username);
            //   const response = await axios.get(`https://filter-be.vercel.app/auth/getUserByUsername?username=${username}`);
            //   setUserId(response.data._id)
            // } catch (error) {
            //   console.error("Error fetching user data", error);
            // }
          } else {
            navigate('/');
          }
        };
        fetchUserData();
      }, [navigate]);
    
      // axios.defaults.withCredentials = true

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle untuk buka/tutup menu
    };
      const handleLogout = () => {
        localStorage.removeItem("username")
        axios.get('https://filter-be.vercel.app/user/logout')
        .then(res => {
          if(res.data.status){
            navigate('/')
          }
        }).catch(err => console.log(err)) 
      }


    return (
        <>
            <nav className='w-full top-0 py-3 px-3 md:px-10 md:py-6 fixed bg-blue-500 shadow-xl justify-between items-center'>
                <div className='w-full flex justify-between items-center'>
                    {/* Logo */}
                    <img src="/logo.png" alt="" className='w-16 md:w-20' />

                    {/* Hamburger Button untuk layar mobile */}
                    <button
                        className="text-white md:hidden focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            ></path>
                        </svg>
                    </button>

                    {/* Menu Links */}
                    <div className={`flex-col md:flex md:flex-row md:items-center md:gap-x-5 absolute md:relative bg-blue-500 md:bg-transparent top-full left-0 w-full md:w-auto transition-transform duration-500 ease-in-out ${isOpen ? 'block' : 'hidden'} md:block`}>
                        <Link to={`/filter-app`} className="block py-2 md:py-0 font-bold text-white text-center mb-7 mt-7 md:mb-0 md:mt-0">Filter App</Link>
                        <div className="text-center mb-7 md:mb-0">
                            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 md:px-5 md:py-1 font-bold text-white uppercase italic rounded-lg shadow-xl hover:bg-red-700 transition-all duration-500 text-center">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
