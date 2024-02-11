import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered, faUser } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../Utilities/Context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Navbar = () => {
    const navigate = useNavigate()
    const { userDetails, logOutBtn, LogOutBtn, toggleLogOutBtn, showSideBar, showAlert, hideSideBar } = useGlobalContext()
    const handleLogOut = (e) => {
        e.preventDefault()
        hideSideBar()
        axios.delete(`http://localhost:5000/logout`).then(({data}) => {
            const {msg,type}=data
            localStorage.removeItem('localToken')
            showAlert({
                msg,
                type
            })
            navigate('/login')
        }).catch(err => console.log(err))
    }
    useEffect(() => { LogOutBtn() }, [])
    return (
        <nav className="navbar py-4 px-3 navbar-expand-lg"
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
                        { userDetails.name}
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
