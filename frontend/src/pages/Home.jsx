import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar } />
    </div>
  )
}

export default Home