import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faCalendarDays, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../utilities/Context'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
const Alljobs = () => {
    const { loading, startLoading, endLoading, userDetails } = useGlobalContext()
    const [job, setjob] = useState({
        position: '',
        status: '',
        jobType: ''
    })
    const navigate = useNavigate()
    const [jobList, setJobList] = useState([])
    const getData = useCallback(
        async () => {
            startLoading()
            axios.get(`https://my-jobster-server.vercel.app/getjobs`).then(({ data }) => {
                setJobList(data)
            }).catch(err => console.log(err))
            endLoading()
        },
        [jobList],
    )
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setjob({
            ...job,
            [name]: value
        })
        axios.get(`https://jobster-fsmsa.vercel.app/filterjobs?position=${value}`).then(({ data }) => {
            setJobList(data)
        })
    }
    const handleStatus = (e) => {
        const name = e.target.name
        const value = e.target.value
        setjob({
            ...job,
            [name]: value
        })
        axios.put('https://jobster-fsmsa.vercel.app/filterstatus', {
            status: value
        }).then(({ data }) => {
            setJobList(data)
        })
    }
    const handleType = (e) => {
        const name = e.target.name
        const value = e.target.value
        setjob({
            ...job,
            [name]: value
        })
        axios.put('https://jobster-fsmsa.vercel.app/filtertypes', {
            type: value
        }).then(({ data }) => {
            setJobList(data)
        })
    }
    const clearBtn = () => {
        getData()
        setjob({
            position: '',
            status: '',
            jobType: ''
        })
    }
    useEffect(() => {
        getData()
    }, []);
    useEffect(() => {
        if (userDetails.isUserLogged === false) {
            navigate('/login')
        }
    }, [userDetails.isUserLogged])
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <Navbar />

            <div className=' container-fluid'>
                <div className="card mb-4 mt-3" style={{
                    maxWidth: '1150px',
                    width: '90%',
                    marginInline: 'auto',
                    boxShadow: '1px 1px 2px 1px rgba(0,0,0,.1)',
                    paddingBlock: '3rem',
                    paddingInline: '2rem',
                    border: 'none',
                }}>
                    <div className="card-body">
                        <h3 className="card-title mb-3">Search a job</h3>
                        <div className='row row-cols-1 row-cols-md-3 mb-md-4'>
                            <div className='col mb-3 mb-md-0'>
                                <div>
                                    <label htmlFor='position'>Search</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name='position'
                                        id='position'
                                        value={job.position}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='col mb-3 mb-md-0'>
                                <div>
                                    <label htmlFor='status'>Status</label>
                                    <select
                                        onChange={handleStatus}
                                        style={{ cursor: 'pointer' }}
                                        value={job.status}
                                        name='status'
                                        className="form-select" aria-label="Default select example">
                                        <option value="0">Statuses</option>
                                        <option value="all">All</option>
                                        <option value="interview">Interview</option>
                                        <option value="pending">Pending</option>
                                        <option value="declined">Declined</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col mb-3 mb-md-0'>
                                <div>
                                    <label htmlFor='jobType'>Job Type</label>
                                    <select
                                        onChange={handleType}
                                        style={{ cursor: 'pointer' }}
                                        value={job.jobType}
                                        name='jobType'
                                        className="form-select" aria-label="Default select example">
                                        <option value="0">Types</option>
                                        <option value="all">All</option>
                                        <option value="full-time">Full-time</option>
                                        <option value="part-time">Part-time</option>
                                        <option value="internship">Internship</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='row row-cols-1 row-cols-md-3'>
                            <div className='col mb-3 mb-md-0 d-flex justify-content-between align-items-end'>
                                <button type="button"

                                    onClick={clearBtn}
                                    className="my-clear-btn">Clear</button>
                            </div>
                        </div>
                    </div>
                </div>
                <section className='search-result'
                    style={{
                        maxWidth: '1150px',
                        width: '90%',
                        marginInline: 'auto',
                        border: 'none',
                    }}
                >
                    <h3 className='ms-2'
                        style={{
                            fontSize: '1.3rem',
                            color: 'var(--text-color)'
                        }}
                    >{jobList.length} Jobs Found</h3>
                    <div className='row row-cols-1 row-cols-md-2'>
                        {jobList.map((job, index) => {
                            const { _id, position, company, location, status, jobType } = job
                            return (
                                <div
                                    key={index}
                                    className='col mb-3'>
                                    <div
                                        style={{
                                            boxShadow: '1px 1px 2px 1px rgba(0,0,0,.1)',
                                            border: 'none',
                                        }}
                                        className="card">
                                        <div
                                            style={{
                                                backgroundColor: '#fff'
                                            }}
                                            className="card-header">

                                            <div className='d-flex align-items-center'>
                                                <h3
                                                    style={{
                                                        backgroundColor: 'var(--primary-color-2)',
                                                        color: '#fff',
                                                        fontSize: '2rem',
                                                        fontWeight: '500',
                                                        marginRight: '1rem',
                                                        padding: '.7rem 1.2rem',
                                                        borderRadius: '5px',
                                                        boxShadow: '1px 1px 2px 1px rgba(0,0,0,.1)',

                                                    }}
                                                >
                                                    {company?.slice(0, 1).toUpperCase()}
                                                </h3>
                                                <div>
                                                    <h4 className='title-job text-capitalize'>{position}</h4>
                                                    <h4
                                                        style={{
                                                            color: 'rgb(130,154,181)',
                                                            fontSize: '1rem'
                                                        }}
                                                        className='title-job text-capitalize'>
                                                        {company}</h4>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="card-body"
                                            style={{
                                                width: '75%'
                                            }}
                                        >
                                            <div className='d-flex mb-2 justify-content-between align-items-center'>
                                                <h5 className='body-job text-capitalize'>
                                                    <FontAwesomeIcon className='me-3 fa-xl'
                                                        style={{
                                                            color: 'var(--gray-color)'
                                                        }}
                                                        icon={faLocationArrow} />
                                                    {location}</h5>
                                                <h5 className='body-job d-flex justify-content-start'
                                                    style={{
                                                        width: '27%',
                                                    }}
                                                >
                                                    <FontAwesomeIcon className='me-3 fa-xl'
                                                        style={{
                                                            color: 'var(--gray-color)'
                                                        }}
                                                        icon={faCalendarDays} />

                                                    13/1/2024</h5>
                                            </div>
                                            <div className='d-flex mb-2 justify-content-between align-items-center'>
                                                <h5 className='body-job text-capitalize'>
                                                    <FontAwesomeIcon className='me-3 fa-xl'
                                                        style={{
                                                            color: 'var(--gray-color)'
                                                        }}
                                                        icon={faBriefcase} />
                                                    {jobType}</h5>
                                                <h5 className='text-capitalize'
                                                    style={{
                                                        backgroundColor: `${status === 'interview' ? 'var(--interview-2)' : ''}
                                                     ${status === 'pending' ? 'var(--pending-2)' : ''}
                                                     ${status === 'declined' ? 'var(--declined-2)' : ''}`,
                                                        color: `${status === 'interview' ? 'var(--interview)' : ''}
 ${status === 'pending' ? 'var(--pending)' : ''}
 ${status === 'declined' ? 'var(--declined)' : ''}`,
                                                        padding: '.5rem 1rem',
                                                        borderRadius: '5px',
                                                        fontSize: '1rem'
                                                    }}
                                                >{status}</h5>
                                            </div>
                                            <div className="d-flex mb-3 justify-content-start gap-3">
                                                <Link
                                                    to={`/alljobs/${_id}`}
                                                    style={{
                                                        backgroundColor: 'rgb(209,231,221)',
                                                        color: 'var(--alert-check-success)',
                                                        border: 'none',
                                                        textDecoration: 'none'
                                                    }}
                                                    className="my-newBtns">Job Details</Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </section >
            </div >
        </>
    )
}
export default Alljobs
