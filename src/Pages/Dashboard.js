import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import { faBriefcase, faCalendarCheck, faBug } from '@fortawesome/free-solid-svg-icons'
import Loading from '../Components/Loading'
import { useGlobalContext } from '../Utilities/Context'
import { jwtDecode } from 'jwt-decode'
function Dashboard() {
  const navigate = useNavigate()
  const { loading, startLoading, endLoading, userDetails, updateUser } = useGlobalContext()
  const [status, setStatus] = useState({
    numPen: 0,
    numInter: 0,
    numDec: 0
  })
  const getStatus = async () => {
    startLoading()
    axios.get('http://localhost:5000/getstatus').then(({ data }) => {
      setStatus({
        ...status,
        numPen: data.numPen,
        numInter: data.numInter,
        numDec: data.numDec
      })
      endLoading()
    }).catch(err => console.log(err))
  }
  useEffect(() => {
    startLoading()
    var token = localStorage.getItem('localToken') || ''
    axios.get(`http://localhost:5000/auth?token=${token}`).then(({ data }) => {
      const { myToken, state } = data
      if (state !== 'success') {
        navigate('/login')
      }
      if (userDetails?.type === 'employer') {
        navigate('/postjob')
      }
      else {
        const myData = jwtDecode(myToken)
        const { name, myID, type } = myData
        updateUser({
          name,
          id: myID,
          type
        })
      }
      endLoading()
    }).catch(err => console.log(err))
  }, [userDetails.name])
  useEffect(() => {
    getStatus()
  }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <div
    >
      <Navbar />
      <section className='dashboard container-fluid d-flex justify-content-center align-items-center'

      >
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          <div className="col mb-4">
            <div className="card p-3"
              style={{
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                borderBottomWidth: '4px',
                borderBottomColor: 'var(--pending)',
                borderBottomStyle: ' solid ',
                backgroundColor: '#fff'
              }}
            >
              <div className="card-body">
                <div className='d-flex justify-content-between align-items-center'
                  style={{
                    maxWidth: '600px',
                    minWidth: '350px',
                  }}
                >
                  <h1
                    style={{
                      color: 'var(--pending)',
                      fontSize: '3rem',
                      fontWeight: '600'
                    }}
                  >{status.numPen}</h1>
                  <span
                    style={{
                      backgroundColor: 'var(--pending-2)',
                      padding: '1.4rem',
                      borderRadius: '5px',
                      boxShadow: '0 0px 1px rgba(0,0,0,.2)'
                    }}
                  >
                    <FontAwesomeIcon className='fa-2xl'
                      style={{
                        color: 'var(--pending)'
                      }}
                      icon={faBriefcase} />
                  </span>
                </div>
                <h5
                  style={{
                    color: 'var(--text-color)',
                    fontSize: '1.5rem',
                    fontWeight: '600'
                  }}
                  className='my-4'
                >Pending Applications</h5>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card p-3"
              style={{
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                borderBottomWidth: '4px',
                borderBottomColor: 'var(--primary-color-1)',
                borderBottomStyle: ' solid ',
                backgroundColor: '#fff'
              }}
            >
              <div className="card-body">
                <div className='d-flex justify-content-between align-items-center'
                  style={{
                    maxWidth: '600px',
                    minWidth: '350px',
                  }}
                >
                  <h1
                    style={{
                      color: 'var(--primary-color-2)',
                      fontSize: '3rem',
                      fontWeight: '600'
                    }}
                  >{status.numInter}</h1>
                  <span
                    style={{
                      backgroundColor: 'var(--success)',
                      padding: '1.4rem',
                      borderRadius: '5px',
                      boxShadow: '0 0px 1px rgba(0,0,0,.2)'
                    }}
                  >
                    <FontAwesomeIcon className='fa-2xl'
                      style={{
                        color: 'var(--primary-color-2)'
                      }}
                      icon={faCalendarCheck} />
                  </span>
                </div>
                <h5
                  style={{
                    color: 'var(--text-color)',
                    fontSize: '1.5rem',
                    fontWeight: '600'
                  }}
                  className='my-4'
                >Interview scheduled</h5>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card p-3"
              style={{
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                borderBottomWidth: '4px',
                borderBottomColor: 'var(--declined)',
                borderBottomStyle: ' solid ',
                backgroundColor: '#fff'
              }}
            >
              <div className="card-body">
                <div className='d-flex justify-content-between align-items-center'
                  style={{
                    maxWidth: '600px',
                    minWidth: '350px',
                  }}
                >
                  <h1
                    style={{
                      color: 'var(--declined)',
                      fontSize: '3rem',
                      fontWeight: '600'
                    }}
                  >{status.numDec}</h1>
                  <span
                    style={{
                      backgroundColor: 'var(--declined-2)',
                      padding: '1.4rem',
                      borderRadius: '5px',
                      boxShadow: '0 0px 1px rgba(0,0,0,.2)'
                    }}
                  >
                    <FontAwesomeIcon className='fa-2xl'
                      style={{
                        color: 'var(--declined)'
                      }}
                      icon={faBug} />
                  </span>
                </div>
                <h5
                  style={{
                    color: 'var(--text-color)',
                    fontSize: '1.5rem',
                    fontWeight: '600'
                  }}
                  className='my-4'
                >Declined Applications</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Dashboard
