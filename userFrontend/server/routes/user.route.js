import express from "express";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig.js";
import nodemailer from "nodemailer";
const router = express.Router();


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

router.get("/home", (req, res) => {
    res.send("Hello World!");
});

router.post("/complain", async (req, res) => {
    try {
        const complain = req.body;
        console.log(complain);

        // Add complaint to Firestore
        await addDoc(collection(db, "complaints"), complain);

        // Fetch all signed-in users
        const emailUsersRef = collection(db, "EmailSignedInUsers");
        const querySnapshot = await getDocs(emailUsersRef);
        const sendEmails = [];

        querySnapshot.forEach(doc => {
            console.log("Document ID:", doc.id);
            console.log("Document Data:", doc.data());
            sendEmails.push(doc.data());
        });

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akanshaoptimist@gmail.com',
                pass: process.env.SAHASISHE_PASSWORD,
            },
        });

        // Prepare and send emails
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
                    const locationIqStaticMapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.LOCATION_IQ}&markers=icon:small-red-cutout|${complainLocation.latitude},${complainLocation.longitude}|icon:small-blue-cutout|${userLocation.latitude},${userLocation.longitude}&center=${complainLocation.latitude},${complainLocation.longitude}&zoom=14&size=600x300&format=png`;

                    // Construct HTML email content
                    const htmlContent = `
                        <div style="font-family: Arial, sans-serif; border: 1px solid #ff0000; padding: 20px; background-color: #ffe6e6;">
                            <h2 style="color: #ff0000;">🚨 RED ALERT 🚨</h2>
                            <p style="font-size: 16px; color: #333;">A new complaint has been submitted in your area:</p>
                            <ul style="font-size: 16px; color: #333;">
                                <li><strong>Description:</strong> ${complain?.complain || 'N/A'}</li>
                                <li><strong>Location:</strong> Latitude: ${complainLocation.latitude}, Longitude: ${complainLocation.longitude}</li>
                                <li><strong>Distance from you:</strong> ${distance} meters</li>
                            </ul>
                            <p style="font-size: 16px; color: #333;">Please take immediate action if necessary.</p>
                            
                            <!-- Google Maps URL for dynamic view of route -->
                            <div style="margin-top: 15px; margin-bottom: 15px;">
                                <a href="https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${complainLocation.latitude},${complainLocation.longitude}&travelmode=driving" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #ff0000; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">Open Directions in Google Maps</a>
                            </div>

                            <!-- Display static map as a preview -->
                            <img src="${locationIqStaticMapUrl}" alt="Location Map" style="margin-top: 10px; max-width: 100%; border: 1px solid #ccc;" />
                        </div>
                    `;

                    const mailOptions = {
                        from: 'akanshaoptimist@gmail.com',
                        to: user?.email,
                        subject: '🚨 RED ALERT: New Complaint Submitted',
                        html: htmlContent,
                    };

                    await transporter.sendMail(mailOptions);
                    console.log("Email sent to:", user.email);
                }
            }
        });

        await Promise.all(emailPromises);

        res.status(201).send("Complain created and emails sent successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error creating complain");
    }
});

export default router;
