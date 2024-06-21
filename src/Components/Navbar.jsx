import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

function Navbar() {
    const {user, logOut} = UserAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logOut()
            navigate("/Signup")
        } catch (error) {
            console.log('error');
        }
    } 
    
          const [isScrolled, setIsScrolled] = useState(false); // Initially visible

        useEffect(() => {
          const handleScroll = () => {
            const scrollY = window.scrollY;
            // Update state based on very small scroll position
            setIsScrolled(scrollY > 0); // Hide even on slight scroll down
          }

          window.addEventListener('scroll', handleScroll);

          return () => window.removeEventListener('scroll', handleScroll);
        }, []);
    
    const isProfilePage = location.pathname === '/profile'; 

    return (
        <div className={`${isScrolled ? 'bg-black/80' : 'transperent'} fixed w-full p-4 flex items-center justify-between z-50 transition ease-in`}>
          <Link to="/">
            <img
            className='w-28'
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="///"  />
          </Link>
    
          {user?.email ? ( 
            <>
              {isProfilePage ? ( 
                <div>
                  <Link to="/">
                    <button type="button" className='capitalize pr-4 hover:scale-110'>Home</button>
                  </Link>
                  <button onClick={handleLogout} type="button" className='capitalize bg-red-600 px-6 py-2 rounded cursor-pointer hover:scale-110'>Logout</button>
                </div>
              ) : (
                <div>
                  <Link to="/profile">
                    <button type="button" className='capitalize px-6 py-1 mx-2 rounded cursor-pointer hover:scale-110'>Profile</button>
                  </Link>
                  <button onClick={handleLogout} type="button" className='capitalize bg-red-600 px-6 py-2 rounded cursor-pointer hover:scale-110'>Logout</button>
                </div>
              )}
            </>
          ) : (
            <div>
              <Link to="/login">
                <button type="button" className='capitalize pr-4 hover:scale-110 '>Login</button>
              </Link>
              <Link to="/signup">
                <button type="button" className='capitalize bg-red-600 px-6 py-2 rounded cursor-pointer hover:scale-110'>Sign up</button>
              </Link>
            </div>
          )}
        </div>
      );
    }

export default Navbar