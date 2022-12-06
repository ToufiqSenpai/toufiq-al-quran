import { useState } from 'react'
import { Dialog, DialogContent, MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocalStorage } from 'usehooks-ts';

function Language() {
  const [dialog, setDialog] = useState<boolean>(false)
  const [languageId, setLanguage] = useLocalStorage('language', 'en')

  const langLabel = (): string => {
    switch(languageId) {
      case 'en': 
        return 'English'
      case 'id':
        return 'Bahasa Indonesia'
      default:
        return 'English'
    }
  }
  
  return (
    <section>
      <div className='flex justify-between px-3' onClick={() => setDialog(true)}>
        <p className="m-0 w-28 font-medium text-base">Language</p>
        <div className='flex items-center'>
          <span className='text-sm text-gray-700 mr-1'>{langLabel()}</span>
          <KeyboardArrowRightIcon />
        </div>
      </div>
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        onClick={() => setDialog(false)}
      >
        <DialogContent
          className='p-0 w-80'
        >
          <MenuList>
            <MenuItem onClick={() => setLanguage('en')} selected={languageId == 'en'}>
              <ListItemText>English</ListItemText>
              <ListItemIcon>
                {languageId == 'en' || languageId == null ? <CheckIcon /> : null}
              </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={() => setLanguage('id')} selected={languageId == 'id'}>
              <ListItemText>Bahasa Indonesia</ListItemText>
              <ListItemIcon>
                {languageId == 'id' && <CheckIcon />}
              </ListItemIcon>
            </MenuItem>
          </MenuList>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Language