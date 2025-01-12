import React from 'react'
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import {useProModalStore} from '@/components/hooks/promodal'
const Promodal = () => {
 const proModal = useProModalStore();
  

  return (
    <div>
        
       <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
     
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button variant="ghost" type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default Promodal
