import React from 'react'
import { Switch } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocalStorage } from 'usehooks-ts';

function ShowAyahTranslation() {
  const [translate, setTranslate] = useLocalStorage('show-translate', false)

  return (
    <section className='mt-3'>
      <div className='flex justify-between px-3'>
        <p className="m-0 w-48 font-medium text-base">Show Ayah Translation</p>
        <div className='flex items-center'>
          <Switch 
            checked={translate}
            onChange={e => setTranslate(e.target.checked)}
          />
          <KeyboardArrowRightIcon />
        </div>
      </div>
    </section>
  )
}

export default ShowAyahTranslation