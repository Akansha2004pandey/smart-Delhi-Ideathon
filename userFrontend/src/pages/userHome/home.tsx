import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Building2, Siren } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate=useNavigate();
    const handleUserClick=()=>{
        navigate("/userRegister");
    }
    const handleComplainClick=()=>{
         navigate("/userLogin");
    }
    return (
    <div className="md:w-full bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600 flex justify-center items-center min-h-screen relative overflow-hidden">
  {/* Animated Background Effect */}
  <div className="absolute inset-0 z-0 opacity-50">
    <div className="animate-pulse bg-indigo-900 w-72 h-72 rounded-full absolute -top-16 -left-10"></div>
    <div className="animate-pulse bg-indigo-900 w-56 h-56 rounded-full absolute bottom-10 right-5"></div>
  </div>

  {/* Main Content */}
  <div className="relative z-10 text-center px-4">
    <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-4">
      Welcome to <span className="text-pink-400 animate-text-gradient">SahasiShe</span>
    </h1>
    <p className="mt-2 text-lg text-gray-200">
      Empowering women, preventing crimes, <br /> and creating a safer tomorrow.
    </p>
    <p className="mt-2 text-base italic text-gray-300">
      “Your safety, our priority. Together, we are fearless.”
    </p>
    <div className="mt-20 flex justify-center gap-x-6">
                        
                            <Button className="group bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-8 py-4 rounded-md shadow-lg transition duration-300" size="lg" onClick={handleUserClick}>
                                <UserCircle className="hidden md:block mr-2 h-5 w-5" />
                                Join as User
                            </Button>
                     
                            <Button size="lg" variant="outline" className="group border-2 font-bold text-indigo-700 px-8 py-4 hover:text-indigo-700 rounded-md shadow-lg transition duration-300" onClick={handleComplainClick}>
                                <Siren className="hidden md:block mr-2 h-5 w-5" />
                                File A Complaint
                            </Button>
                 
                    </div>
                    
  </div>



   
  {/* Illustration */}
  <div className="absolute right-1/2 w-1/2 md:w-1/3 lg:w-1/4 p-4">


<svg xmlns="http://www.w3.org/2000/svg" width="642.99652" height="699.63874" viewBox="0 0 642.99652 699.63874" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" artist="Katerina Limpitsouni" source="https://undraw.co/"><path d="m526.36926,329.63874c19.90002,12.82996,38.54004,30.01001,56,51.20001v32.39996c-8.52002-2.89996-41.03998-14.91998-53.88-33.92999-14.83997-21.96997-17.47998-55.32001-5.12-63.66998,3.21997-2.17004,7.13-2.44,11.41998-1.25,13.52997,9.72998,26.47003,21.52997,38.83002,35.27997,4.38,6.73004,7.09009,15.29999,8.75,23.96002v.40997c-15.98999-22.25995-34.79004-36.69995-56-44.39996Z" fill="#312e81"/><path d="m525.36926,130.63872c19.90002,12.82996,38.54004,30.01001,56,51.20001v7.39996c-1.66992-.57001-4.25-1.47998-7.42993-2.72998-14.28003-16.92999-30.56006-28.33002-48.57007-34.87,12.59998,8.12,24.69995,17.98999,36.31006,29.51996-12.28003-5.90997-26.64008-14.66998-34.19006-25.84998-.79999-1.17999-1.56-2.37-2.27997-3.57001-12.70001-21.08002-13.54004-44.20001-1.84003-52.09998,12.35999-8.35004,34.03003,3.47998,48.87,25.44,8.57996,12.70996,10.98999,32.42999,11.47998,46.77997-.78992,1.04004-1.56995,2.10004-2.34998,3.17999-15.98999-22.25995-34.79004-36.69995-56-44.39996Z" fill="#312e81"/><path d="m638.64929,248.8442v.01001c-1.42004,3.92999-3.19995,7.89995-5.32007,11.81001-3.1499,5.82001-7.98999,11.21997-13.46997,16.04999-5.87,5.17999-12.48999,9.70001-18.58008,13.37-8.5,5.13-15.96997,8.60999-18.90991,9.92999v-3.14996c16.89001-20.10004,34.84998-36.48004,54-48.82001-20.34009,7.38-38.44995,20.97998-54,41.70996v-13.88995c16.89001-20.10004,34.84998-36.48004,54-48.82001-20.34009,7.38-38.44995,20.97998-54,41.70996v-13.88995c16.66992-19.83002,34.37-36.04004,53.23999-48.32001,8.84009,7.10999,9.60999,24.26001,3.04004,42.29999v-.00002Z" fill="#312e81"/><circle cx="143.68463" cy="245.54544" r="143.68463" fill="#ff6884"/><path id="uuid-9ac3c440-2c29-483e-b5ea-f157a67fda2d-470" d="m593.86542,475.91107c12.08508,10.18033,16.6283,24.66791,10.14819,32.35791-6.4801,7.68994-21.52747,5.66974-33.61548-4.5159-4.88446-4.0025-8.73944-9.11652-11.24231-14.91425l-50.66037-43.78113,21.05191-23.33551,47.70709,45.63794c6.14044,1.48282,11.83636,4.41492,16.6109,8.55093h.00006Z" fill="#fcb4b4"/><polygon points="552.95795 443.51905 491.02707 363.99381 432.36926 256.63874 430.84827 405.52921 518.77356 477.74518 552.95795 443.51905" fill="#2f2e41"/><polygon points="283.55597 224.62357 297.74335 160.11792 345.16339 162.39891 357.33582 209.19409 283.55597 224.62357" fill="#fcb4b4"/><polygon points="283.55597 224.62357 297.74335 160.11792 345.16339 162.39891 357.33582 209.19409 283.55597 224.62357" isolation="isolate" opacity=".1"/><circle cx="320.27975" cy="124.33786" r="53.08847" fill="#fcb4b4"/><path d="m296.53302,144.83966v-.00003s-5.35571-.05193-16.49579-2.1235c-11.14008-2.07162,8.20172,23.95969,8.20172,23.95969-52.42401-21.89015-35.64839-77.41381-35.64839-77.41381-53.20448-10.17499-30.91603-57.47251-30.91603-57.47251,0,0,17.53793-33.84457,71.45114-31.6909,53.91318,2.15367,28.44357,55.32713,28.44357,55.32713,35.12576.06654,39.07767,31.72302,39.07767,31.72302,0,0-12.66254,1.58075-35.67487,7.42121-23.01227,5.84041-28.43887,50.26965-28.43887,50.26965l-.00006.00003-.00003.00003h-.00006Z" fill="#2f2e41"/><path d="m294.42831,204.30803l-2.39764-4.6693s-42.66142,4.94489-49.66142,11.47244-23,35.52756-23,35.52756l35,30.00003,40.05907-72.33072v-.00002Z" fill="#ffb6b6"/><path d="m347.36926,203.17417s32-8.53543,50,9.46457,39,51.00003,39,51.00003l-1,26-50-24.10236-38-62.3622v-.00005Z" fill="#ffb6b6"/><path d="m355.52676,199.63872s41.84253-15,68.84253,17,35,133.00002,35,133.00002c0,0,60.99997,186.99994,46,188.99994s-106.53979,7.52759-106.53979,7.52759l-31.46021-203.52756-14-143h2.15747v.00002Z" fill="#2f2e41"/><path d="m259.36926,379.63874l-10,36,136,10s-5-30.09448,0-41.04724l-126-4.95276Z" fill="#fcb4b4"/><polygon points="336.36926 613.63874 342.36926 699.63874 417.88895 697.63874 415.36926 610.63874 336.36926 613.63874" fill="#fcb4b4"/><polygon points="218.54477 605.13196 196.36926 698.63874 275.42792 698.10382 295.5704 621.67328 218.54477 605.13196" fill="#fcb4b4"/><path d="m353.36926,199.63872h-61.33859l-49.66142,66.00002,11,135s25.00002-7,60.00002-7h75s-11-35,3-49,4-79,4-79l-42-66v-.00002Z" fill="#312e81"/><path d="m244.36926,404.63874l-56,202.99994s82.46021,33.13385,132.2301,23.56696,117.7699-12.56696,117.7699-12.56696l-48-206-146-8v.00006Z" fill="#2f2e41"/><path id="uuid-73c6c48b-3ad6-4bf4-ae9b-2aead64e96c3-471" d="m373.86539,478.91107c12.08511,10.18033,16.6283,24.66791,10.14822,32.35791-6.4801,7.68994-21.52747,5.66974-33.61551-4.5159-4.88449-4.0025-8.73944-9.11652-11.24231-14.91425l-50.66037-43.78113,21.05194-23.33551,47.70709,45.63794c6.14044,1.48282,11.83636,4.41492,16.61093,8.55093Z" fill="#fcb4b4"/><polygon points="342.95795 443.51905 281.02707 363.99381 222.36926 256.63874 220.84827 405.52921 308.77356 477.74518 342.95795 443.51905" fill="#2f2e41"/><path d="m296.21179,199.63872s-41.84253-15-68.84253,17-35,133.00002-35,133.00002c0,0-61,186.99994-46,188.99994s106.53979,7.52759,106.53979,7.52759l31.46021-203.52756,14-143h-2.15747v.00002Z" fill="#2f2e41"/><rect x="581.36926" y="161.63872" width="2" height="348.00002" fill="#3f3d56"/><path d="m27.36927,518.63874c19.90002,12.82996,38.54004,30.01001,56,51.20001v32.39996c-8.52002-2.89996-41.03998-14.91998-53.88-33.92999-14.83997-21.96997-17.47998-55.32001-5.12-63.66998,3.21997-2.17004,7.13-2.44,11.41998-1.25,13.52997,9.72998,26.47003,21.52997,38.83002,35.27997,4.38,6.73004,7.09009,15.29999,8.75,23.96002v.40997c-15.98999-22.25995-34.79004-36.69995-56-44.39996Z" fill="#312e81"/><path d="m26.36927,319.63874c19.90002,12.82996,38.54004,30.01001,56,51.20001v7.39996c-1.66992-.57001-4.25-1.47998-7.42993-2.72998-14.28003-16.92999-30.56006-28.33002-48.57007-34.87,12.59998,8.12,24.69995,17.98999,36.31006,29.51996-12.28003-5.90997-26.64008-14.66998-34.19006-25.84998-.79999-1.17999-1.56-2.37-2.27997-3.57001-12.70001-21.08002-13.54004-44.20001-1.84003-52.09998,12.35999-8.35004,34.03003,3.47998,48.87,25.44,8.57996,12.70996,10.98999,32.42999,11.47998,46.77997-.78992,1.04004-1.56995,2.10004-2.34998,3.17999-15.98999-22.25995-34.79004-36.69995-55.99999-44.39996Z" fill="#312e81"/><path d="m139.64931,437.84421v.01001c-1.42004,3.92999-3.19995,7.89996-5.32007,11.81-3.1499,5.82001-7.98999,11.21997-13.46997,16.04999-5.87,5.17999-12.48999,9.70001-18.58008,13.37-8.5,5.13-15.96997,8.60999-18.90991,9.92999v-3.14996c16.89001-20.10004,34.84998-36.48004,54-48.82001-20.34009,7.38-38.44995,20.97998-54,41.70996v-13.88995c16.89001-20.10004,34.84998-36.48004,54-48.82001-20.34009,7.38-38.44995,20.97998-54,41.70996v-13.88995c16.66992-19.83002,34.37-36.04004,53.23999-48.32001,8.84009,7.10999,9.60999,24.26001,3.04004,42.29999Z" fill="#312e81"/><rect x="82.36927" y="350.63874" width="2" height="347.99994" fill="#3f3d56"/></svg>
  </div>
</div>
    )
    /*
    return (
        <div className=' bg-gradient-to-r from-indigo-700 to-indigo-800 h-screen'>
            <section className="relative  text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
                    <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-7xl">
                        Stay Safe with{' '}
                        <span className="relative whitespace-nowrap text-primaryRed">
                            <span className="relative text-pink-400">SahasiShe</span>
                        </span>{' '}
                        - A Community for Women’s Safety
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-200">
                        Your safety is our priority. With SahasiShe, stay informed about crimes in your area and
                        connect with others to stay safe and empowered. Together, we can create a safer world.
                    </p>
                    <div className="mt-10 flex justify-center gap-x-6">
                        <Link to="/register?role=user">
                            <Button className="group bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-4 rounded-md shadow-lg transition duration-300" size="lg">
                                <UserCircle className="hidden md:block mr-2 h-5 w-5" />
                                Join as User
                            </Button>
                        </Link>
                        <Link to="/register?role=authority">
                            <Button size="lg" variant="outline" className="group border-2 border-indigo-700 text-indigo-700 hover:bg-indigo-700 hover:text-white px-8 py-4 rounded-md shadow-lg transition duration-300">
                                <Building2 className="hidden md:block mr-2 h-5 w-5" />
                                File A Complaint
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );*/

};

export default Home;
