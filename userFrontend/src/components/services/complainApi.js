import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig.js";
import emailjs from '@emailjs/browser';
/*
export const createComplain = async (request) => {
    try {
        const response = await fetch("http://localhost:8000/api/complain", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        console.log(response);
        if (!response.ok) {   
             console.log("Error creating complain");
        }

        return response.status;
        return data;
    } catch (err) {
        console.log(err);
    }
}
*/
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const toRad = (deg) => deg * (Math.PI / 180); 

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; 
    return distance * 1000; 
}

export const createComplain = async (complain) => {
    try {
    
        console.log(complain);

        await addDoc(collection(db, "complaints"), complain);

        const emailUsersRef = collection(db, "EmailSignedInUsers");
        const querySnapshot = await getDocs(emailUsersRef);
        const sendEmails = [];

        querySnapshot.forEach(doc => {
            console.log("Document ID:", doc.id);
            console.log("Document Data:", doc.data());
            sendEmails.push(doc.data());
        });

       
        const emailPromises = sendEmails.map(async (user) => {
            const userLocation = user?.location;
            const complainLocation = complain?.location;

            if (userLocation && complainLocation) {
                const distance = haversine(
                    complainLocation.latitude, complainLocation.longitude,
                    userLocation.latitude, userLocation.longitude
                );

                console.log("User:", user);
                console.log("Distance:", distance);

                if (distance < 20000) { 
                    const locationIqStaticMapUrl = `https://maps.locationiq.com/v3/staticmap?key=pk.1f1f0072f3deb20a04306badaed0504c&markers=icon:small-red-cutout|${complainLocation.latitude},${complainLocation.longitude}|icon:small-blue-cutout|${userLocation.latitude},${userLocation.longitude}&center=${complainLocation.latitude},${complainLocation.longitude}&zoom=14&size=600x300&format=png`;

                    
                    const emailData = {
                        complain: complain?.complain || 'N/A',
                        complain_latitude: complainLocation.latitude,
                        complain_longitude: complainLocation.longitude,
                        distance: distance,
                        user_latitude: userLocation.latitude,
                        user_longitude: userLocation.longitude,
                        static_map_url: locationIqStaticMapUrl,
                        to_email: user?.email, 
                    };

                   
                    try {
                        const response = await emailjs.send(
                            import.meta.env.VITE_SERVICE_ID, 
                            import.meta.env.VITE_TEMPLATE_ID, 
                            emailData,
                            import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
                        );
                        console.log("Email sent successfully:", response);
                    } catch (error) {
                        console.log("Error sending email:", error);
                    }
                }
            }
        });

        await Promise.all(emailPromises);
        

    
    } catch (err) {
        console.log(err);
     
    }
}
