// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from '../components/Navbar'
import ContactTable from '../components/ContactTable'

const Dashboard = () => {
  return (
    <div className=' container mx-auto'>
      <Navbar/>
      <ContactTable/>
    </div>
  )
}

export default Dashboard