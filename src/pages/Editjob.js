import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import { useGlobalContext } from '../utilities/Context'
import axios from 'axios'
const Editjob = () => {
    const { _id } = useParams()
    const { loading, startLoading, endLoading, userDetails } = useGlobalContext()
    const navigate = useNavigate()
    const [emptyCondition, setEmptyCondition] = useState(false)
    const [singleJob, setSingleJob] = useState({
        position: '',
        company: '',
        location: '',
        status: '',
        jobType: ''
    })
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSingleJob({
            ...singleJob,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`https://jobster-fsmsa.vercel.app/editmyjob?id=${_id}`, {
            position: singleJob.position,
            company: singleJob.company,
            location: singleJob.location,
            status: singleJob.status,
            jobType: singleJob.jobType
        }).then(({ data }) => {
            setSingleJob(data)
        }).catch(err => console.log(err))
    }
    const handledelete = () => {
        axios.delete(`https://jobster-fsmsa.vercel.app/deletejob?id=${_id}`).then(() => {
            navigate('/alljobs')
        }).catch(err => console.log(err))
    }
    const getData = async () => {
        startLoading()
        axios.get(`https://jobster-fsmsa.vercel.app/api/getsinglejob?id=${_id}`).then(({ data }) => {
            if (data) {
                setEmptyCondition(false)
                setSingleJob(data)
            } else {
                setEmptyCondition(true)
            }
        }).catch(err => console.log(err))
        endLoading()
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
    if (emptyCondition) {
        navigate('/alljobs')
    }
    else {
        return (<>
            <Navbar />
            <div className=' container-fluid'>
                <div className="card mt-3" style={{
                    width: '90%',
                    paddingBlock: '3rem',
                    paddingInline: '2rem',
                    marginInline: 'auto',
                    maxWidth: '1150px',
                    border: 'none',
                    boxShadow: '1px 1px 2px 1px rgba(0,0,0,.1)'
                }}>
                    <div className="card-body">
                        <h2 className="card-title mb-3">Edit Job</h2>
                        <form>
                            <div className='row row-cols-1 row-cols-md-3 mb-md-4'>
                                <div className='col mb-3 mb-md-0'>
                                    <div>
                                        <label htmlFor='position'>Position</label>
                                        <input
                                            onChange={handleChange}
                                            value={singleJob?.position}
                                            class="form-control"
                                            type="text"
                                            name='position'
                                            id='position'
                                            placeholder="Ex: Developer" />
                                    </div>

                                </div>
                                <div className='col mb-3 mb-md-0'>
                                    <div>
                                        <label htmlFor='company'>Company</label>
                                        <input
                                            onChange={handleChange}
                                            value={singleJob?.company}
                                            className="form-control"
                                            type="text"
                                            name='company'
                                            id='company'
                                        />
                                    </div>
                                </div>
                                <div className='col mb-3 mb-md-0'>
                                    <div>
                                        <label htmlFor='location'>Job Location</label>
                                        <input
                                            onChange={handleChange}
                                            value={singleJob?.location}
                                            className="form-control"
                                            type="text"
                                            name='location'
                                            id='location'
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className='row row-cols-1 row-cols-md-3'>
                                <div className='col mb-3 mb-md-0'>
                                    <div>
                                        <label htmlFor='status'>Status</label>
                                        <select
                                            onChange={handleChange}
                                            value={singleJob?.status}
                                            style={{ cursor: 'pointer' }}
                                            name='status'
                                            className="form-select" aria-label="Default select example">
                                            <option value="0">Statuses</option>
                                            <option value="interview">Interview</option>
                                            <option value="pending">Pending</option>
                                            <option value="declined">Declined</option>
                                        </select>
                                    </div>

                                </div>
                                <div className='col mb-3 mb-md-0'>
                                    <div>
                                        <label htmlFor='type'>Job Type</label>
                                        <select
                                            onChange={handleChange}
                                            value={singleJob?.jobType}
                                            style={{ cursor: 'pointer' }}
                                            name='jobType'
                                            className="form-select" aria-label="Default select example">
                                            <option value="0">Types</option>
                                            <option value="full-time">Full-time</option>
                                            <option value="part-time">Part-time</option>
                                            <option value="internship">Internship</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-start align-items-end gap-3">
                                    <button
                                        onClick={handleSubmit}
                                        style={{
                                            backgroundColor: 'rgb(209,231,221)',
                                            color: 'var(--alert-check-success)',
                                            border: 'none',
                                            textDecoration: 'none',
                                            width: '100%',
                                            height: '60%'
                                        }}
                                        className="my-newBtns">Save</button>
                                    <button
                                        onClick={handledelete}
                                        style={{
                                            backgroundColor: 'var(--declined-2)',
                                            color: 'var(--alert-check-danger)',
                                            border: 'none',
                                            textDecoration: 'none',
                                            width: '100%',
                                            height: '60%'
                                        }}
                                        className="my-newBtns">Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default Editjob