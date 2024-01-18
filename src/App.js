import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useGlobalContext } from "./utilities/Context";
import Home from './pages/Home'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Postjob from "./pages/Postjob";
import Alljobs from "./pages/Alljobs";
import Editjob from "./pages/Editjob";
import Profile from "./pages/Profile";
import Sidebar from './components/Sidebar'
import './styles.css'
function App() {
  const { alert, userDetails, hideAlert } = useGlobalContext()
  useEffect(() => {
    const myTime = setTimeout(() => {
      hideAlert()
    }, 3000);
    return () => {
      clearTimeout(myTime)
    };
  }, [alert?.condition]);
  return (
    <main>
      <Router>
        <div className={`my-alert ${alert?.condition ? 'show-alert' : 'hide-alert'
          }`}
          style={{
            backgroundColor: `${alert?.type === 'success' ? 'var(--success)' : ''}
            ${alert?.type === 'danger' ? 'var(--danger)' : ''}
            ${alert?.type === 'info' ? 'var(--info)' : ''}
            `,
            color: `${alert?.type === 'success' ? 'var(----alert-check-success)' : ''}
            ${alert?.type === 'danger' ? 'var(----alert-check-danger)' : ''}
            ${alert?.type === 'info' ? 'var(----alert-check-info)' : ''}`,
            borderColor: `${alert?.type === 'success' ? 'var(----alert-check-success)' : ''}
            ${alert?.type === 'danger' ? 'var(----alert-check-danger)' : ''}
            ${alert?.type === 'info' ? 'var(----alert-check-info)' : ''}`
          }}
          role="alert">
          <p className="mb-0 text-center"
            style={{
              marginInline: 'auto'
            }}
          >{alert?.msg}</p>
          <button
            onClick={hideAlert}
            className="cls-btn">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        {userDetails.isUserLogged === true && <Sidebar />
        }        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/postjob' element={<Postjob />} />
          <Route path='/alljobs' element={<Alljobs />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/alljobs/:_id' element={<Editjob />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
