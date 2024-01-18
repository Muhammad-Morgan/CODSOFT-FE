import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered, faUser } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../utilities/Context'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Navbar = () => {
    const navigate = useNavigate()
    const { userDetails, logOutBtn, LogOutBtn, toggleLogOutBtn, showSideBar, showAlert, updateUser } = useGlobalContext()
    const handleLogOut = (e) => {
        e.preventDefault()
        axios.delete(`https://jobster-fsmsa.vercel.app/logout?id=${userDetails._id}`).then(()=>{
        updateUser()
        }).catch(err=>console.log(err))
        localStorage.setItem('userDetails', JSON.stringify({
            name: '',
            _id: '',
            isUserLogged: false
        }))
        showAlert({
            msg: 'Singed Out!',
            type: 'success'
        })
        navigate('/login')
    }
    useEffect(()=>{LogOutBtn()},[])
    return (
        <nav className="navbar py-4 px-3 navbar-expand-lg bg-body-tertiary"
            style={{
                boxShadow: '0px 1px 1px rgba(0,0,0,.2)'
            }}
        >
            <div className="container-fluid">
                <button
                    style={{
                        border: 'none',
                        backgroundColor: 'transparent',
                    }}

                    onClick={showSideBar}
                >
                    <FontAwesomeIcon
                        style={{
                            color: 'var(--primary-color-2)'
                        }}
                        className='fa-2xl' icon={faBarsStaggered} />
                </button>
                <h3
                    style={{
                        fontWeight: '400',
                        letterSpacing: '1px',
                        color: 'var(--text-color)'
                    }}
                >Dashboard</h3>
                <div
                    style={{ position: 'relative' }}
                    className="dropdown">
                    <button
                        onClick={toggleLogOutBtn}
                        className="btn btn-secondary dropdown-toggle"
                        style={{
                            backgroundColor: 'var(--primary-color-1)',
                            borderColor: 'var(--primary-color-1)',
                            fontSize: '1rem',
                            fontWeight: '600',
                            letterSpacing: '1px',
                            width: 'fit-content !important',
                            paddingInline: '1rem'
                        }}
                    >
                        <FontAwesomeIcon className='mx-1' icon={faUser} />
                        {userDetails.name}
                    </button>
                    <ul className={`my-dropdown-menu px-0 ${logOutBtn ? 'show-dropdown' : 'hide-dropdown'}`}>
                        <li className="d-flex px-0 text-center"
                            style={{ width: '100%' }}
                        ><button
                            style={{
                                border: 'none',
                                padding: '0',
                                borderRadius: '5px'
                            }}
                            onClick={handleLogOut}
                            className="my-dropdown-item">Log Out</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar