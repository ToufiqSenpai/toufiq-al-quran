import React from 'react'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className='bg-white px-20 h-10 fixed top-0 right-0 left-0 z-10 flex justify-between items-center shadow-nav font-inter max-mobile:px-4'>
      <h1 className='m-0'>{"Al-Qur'an"}</h1>
      <Link href='/settings'>
        <SettingsOutlinedIcon />
      </Link>
    </nav>
  )
}

export default Navbar