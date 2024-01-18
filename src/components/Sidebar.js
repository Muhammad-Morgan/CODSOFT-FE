import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJ, faChartLine, faUsersViewfinder, faIndustry, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../utilities/Context'
const Sidebar = () => {
  const { sideBar, hideSideBar } = useGlobalContext()
  return (
    <div className={`my-sidebar ${sideBar ? 'show-alert' : 'hide-alert'} `}>
      <div className="hed d-flex justify-content-between align-items-center p-4">
        <h1>
          <span className='logo py-0'>
            <FontAwesomeIcon className='fa-md' icon={faJ} />
          </span>
          Jobster
        </h1>
        <button type="button" className="btn-close"
          onClick={hideSideBar}
        ></button>
      </div>
      <div className="sidebar-links">
        <ul className="nav flex-column">
          <Link
            to="/dashboard"
            className="nav-item">
            <FontAwesomeIcon
              style={{
                color: 'var(--text-color)'
              }}
              className='me-2' icon={faChartLine} />
            Stats
          </Link>
          <Link
            to="/alljobs"
            className="nav-item">
            <FontAwesomeIcon
              style={{
                color: 'var(--text-color)'
              }}
              className='me-2' icon={faUsersViewfinder} />
            All Jobs
          </Link>
          <Link
            to="/postjob"
            className="nav-item">
            <FontAwesomeIcon
              style={{
                color: 'var(--text-color)'
              }}
              className='me-2' icon={faIndustry} />
            Post a Job
          </Link>
          <Link
            to="/profile"
            className="nav-item">
            <FontAwesomeIcon
              style={{
                color: 'var(--text-color)'
              }}
              className='me-2' icon={faAddressCard} />
            Profile
          </Link>
        </ul>
      </div>
    </div>

  )
}

export default Sidebar