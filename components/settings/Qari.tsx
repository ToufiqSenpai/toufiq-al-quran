import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Dialog, DialogContent, MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckIcon from '@mui/icons-material/Check';

function Qari({ qariList }: { qariList: any }) {
  const [open, setOpen] = useState<boolean>(false)
  const [qari, setQari] = useLocalStorage('qari', 7)

  const spanLabel = () => {
    for(const qariId of qariList.recitations) {
      if((qariId as any).id == qari) {
        return (qariId as any).reciter_name
      }
    }
  }

  return (
    <section className='mt-3'>
      <div className='flex justify-between px-3' onClick={() => setOpen(true)}>
        <p className="m-0 w-28 font-medium text-s">Qari</p>
        <div className='flex items-center'>
          <span className='text-sm text-gray-700 mr-1'>{spanLabel()}</span>
          <KeyboardArrowRightIcon />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
      >
        <DialogContent
          className='p-0 w-80'
        >
          <MenuList>
            {qariList.recitations.map((rec: any, index: number) => (
              <MenuItem 
                key={index} 
                selected={rec.id == qari}
                onClick={() => setQari((rec.id as number))}
              >
                <ListItemText>{rec.reciter_name}</ListItemText>
                <ListItemIcon>
                  {rec.id == qari && <CheckIcon />}
                </ListItemIcon>
              </MenuItem>
            ))}
          </MenuList>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Qari