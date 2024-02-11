import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useGlobalContext } from "./Utilities/Context";
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Postjob from "./Pages/Postjob";
import Alljobs from "./Pages/Alljobs";
import Editjob from "./Pages/Editjob";
import Profile from "./Pages/Profile";
import Sidebar from './Components/Sidebar'
import Alert from './Components/Alert'
import Createdjobs from "./Pages/Createdjobs";
function App() {
  const { userDetails } = useGlobalContext()

  return (
    <main>
      <Router>
        <Alert />
        {userDetails.name && <Sidebar />
        }        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/postjob' element={<Postjob />} />
          <Route path='/alljobs' element={<Alljobs />} />
          <Route path='/createdjobs' element={<Createdjobs />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/alljobs/:_id' element={<Editjob />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
