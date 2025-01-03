import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useState } from 'react'
import { CardDescription, CardContent} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog,DialogTrigger } from '@radix-ui/react-dialog'
import AddDetails from './AddDetails'
import ShowDetails from './ShowDetails';
import { useAddDetailModalStore } from '@/components/hooks/addDetailsModal'
import { useNavigate } from 'react-router-dom'
const Consent = () => {
    const [location, setLocation] = useState(false);
    const [notifications, setNotifications] = useState(false);
    const [identity, setIdentity]=useState(null)
    const navigate=useNavigate();
    const handleDetailsSubmit = (details) => {
        
        setIdentity(details);
        console.log('User Details Submitted:', details);

      };
    const handleSubmit=()=>{
             navigate("/userDashboard");
    }
    const handleLocationChange=()=>{
        setLocation(!location);
    }
    const handleNotificationsChange=()=>{
        setNotifications(!notifications);
    }
    const addDetails=useAddDetailModalStore();
  return (
    <div className='h-screen'>
    <div className='h-1/2 bg-[#211278]'>

    </div>
    <div className='flex items-center absolute justify-center h-screen top-0 w-full'>
      
        <Card className='w-1/3 min-w-[400px] border-2 border-solid border-gray-200 rounded-lg p-4 shadow-md z-20'>
            <CardHeader>
                <CardTitle>
                   Consent Form 
                </CardTitle>
                <CardDescription>
                    {!identity &&  <Dialog>
                        <DialogTrigger asChild>
                        <Button className='w-full mt-5' onClick={addDetails.onOpen}>Add Identity Details</Button>
                        </DialogTrigger>
                    </Dialog>}
                   
                    {identity && <ShowDetails details={identity}/> }
                </CardDescription>
            </CardHeader>
            <CardContent>
        <div className=''>
            <div className="flex justify-between items-center">
      {/* Location Toggle */}
      <div className="flex items-center space-x-2">
        <label htmlFor="location" className="text-sm">Allow Location Access</label>
        <input 
          id="location" 
          type="checkbox" 
          checked={location}
          onChange={handleLocationChange} 
          className="toggle toggle-sm" 
        />
      </div>

      {/* Notifications Toggle */}
      <div className="flex items-center space-x-2">
        <label htmlFor="notifications" className="text-sm">Allow Notifications</label>
        <input 
          id="notifications" 
          type="checkbox" 
          checked={notifications}
          onChange={handleNotificationsChange} 
          className="toggle toggle-sm" 
        />
      </div>
    </div>
    </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
                <Button variant="default" onClick={()=>handleSubmit()}>Go to Dashboard</Button>
            </CardFooter>
        </Card>
     <AddDetails onDetailsChange={handleDetailsSubmit}/>
    </div>
    </div>
  )
}

export default Consent