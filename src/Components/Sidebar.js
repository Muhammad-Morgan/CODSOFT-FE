import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJ, faChartLine, faUsersViewfinder, faIndustry, faAddressCard, faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../Utilities/Context'
const Sidebar = () => {
  const { sideBar, hideSideBar, userDetails } = useGlobalContext()
  return (
    <div className={`my-sidebar ${sideBar ? 'show-side' : 'hide-side'} `}>
      <div className="hed d-flex justify-content-between align-items-center p-4">
        <h1 className='text-primary-emphasis'>
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
        <ul
        style={{
          transition: 'all .1s ease-in-out'
        }}
        className="nav flex-column">
          {userDetails?.type === 'employee' && <Link
            onClick={() => hideSideBar()}
            to="/dashboard"
            className="nav-item">
            <FontAwesomeIcon
              style={{
                color: 'var(--text-color)'
              }}
              className='me-2' icon={faChartLine} />
            Stats
          </Link>}
          {userDetails?.type === 'employee' && <Link
            onClick={() => hideSideBar()}
            to="/alljobs"
            className="nav-item">
            <FontAwesomeIcon
              style={{
                color: 'var(--text-color)'
              }}
              className='me-2' icon={faUsersViewfinder} />
            All Jobs
          </Link>
          }
          {userDetails?.type === 'employer' && <Link
            onClick={() => hideSideBar()}
            to="/postjob"
            className="nav-item">
            <FontAwesomeIcon
              style={{
                color: 'var(--text-color)'
              }}
              className='me-2' icon={faIndustry} />
            Post a Job
          </Link>

          }
          {userDetails?.type === 'employer' && <Link
            onClick={() => hideSideBar()}
            to="/createdjobs"
            className="nav-item">
            <FontAwesomeIcon
              style={{
                color: 'var(--text-color)'
              }}
              className='me-2' icon={faRectangleList} />
            My Jobs
          </Link>

          }
          <Link
            onClick={() => hideSideBar()}
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
