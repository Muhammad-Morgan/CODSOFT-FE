import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJ } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
function Home() {

  return (
    <div style={{
      height: '100%'
    }}>
      <header
      className='my-header'
        style={{
          padding: '2rem',
          maxWidth: '1200px',
          marginInline: 'auto'
        }}
      >
        <h1 className='text-body-emphasis'>
          <span className='logo'>
            <FontAwesomeIcon className='fa-lg' icon={faJ} />
          </span>
          Jobster
        </h1>
      </header>
      <div
        style={{
          padding: '2rem',
          // marginBottom: '4rem'
          maxWidth: '1200px',
          marginInline: 'auto'
        }}
      >
        <div
        style={{
          width: '100%'
        }}
        className="align-items-center row row-cols-1 row-cols-lg-2"
        >
          <div className='cols'>
            <h1 className='text-body-emphasis'
            style={{
              fontSize: '2.7rem',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }}
            >Job <span style={{
              color: 'var(--primary-color-1)',
            }}>Tracking</span> App</h1>
            <p className='lh-lg mb-4 text-primary-emphasis'>Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up fixie raclette taxidermy craft beer. Brunch bitters synth, VHS crucifix heirloom meggings bicycle rights.</p>
            <Link
            to='/login'
            className='lr-link'>Login/Register</Link>
          </div>
          <div className='cols d-none d-lg-block'>
            <img
            style={{
              height: '400px',
            }}
            src='https://redux-toolkit-jobster.netlify.app/static/media/main.17b316de742b3a1202078c5ae18c8261.svg' alt='logo'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home