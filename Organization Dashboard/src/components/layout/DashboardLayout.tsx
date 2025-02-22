import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ChatBot } from "../chatbot/Chatbot";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setAlerts } from "../../store/slices/alertSlice";
import { AlertCircle } from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alerts.alerts);

  const [emailSent, setEmailSent] = useState(new Set());
  const emailSentRef = useRef(new Set()); // Track sent emails persistently

  const currentOrganization =
    JSON.parse(localStorage.getItem("currentOrganization")) || { name: "Organization", email: "" };

  const sendAlertEmail = async (alert) => {
    if (!currentOrganization.email) {
      console.error("Organization email is missing.");
      return;
    }

    if (emailSentRef.current.has(alert.id)) return; // Prevent duplicate sending

    emailSentRef.current.add(alert.id);
    setEmailSent((prev) => new Set(prev).add(alert.id));

    const mockEmailSend = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Mock email sent successfully for alert ID ${alert.id}`);
        }, 1000);
      });

    try {
      await toast.promise(mockEmailSend(), {
        loading: `Notifying the organization...`,
        success: `Alert email sent successfully!`,
        error: `Failed to send alert email.`,
      });
    } catch (err) {
      console.error(`Failed to send email for alert ID ${alert.id}:`, err);
    }
  };

  const processAlerts = async () => {
    const pendingAlerts = alerts.filter((alert) => !emailSentRef.current.has(alert.id) && !alert.isAddressed);

    for (const alert of pendingAlerts) {
      await sendAlertEmail(alert);
    }
  };

  useEffect(() => {
    processAlerts();
  }, [alerts]);

  useEffect(() => {
    const storedAlerts = JSON.parse(localStorage.getItem("alerts") || "[]");
    dispatch(setAlerts(storedAlerts));
  }, [dispatch]);

  const unreadAlerts = alerts.filter(
    (alert) => (alert.severity === "Critical" || alert.severity === "Red") && !alert.isAddressed
  );

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-800 z-0 h-[350px]"></div>

      <div className="relative z-10">
        <Navbar />

        {/* Alert Notification */}
        {unreadAlerts.length > 0 && (
          <div
            className="fixed z-50 top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-red-600 text-white px-5 py-3 rounded-full text-md font-semibold shadow-lg animate-pulse cursor-pointer transition hover:scale-105"
            onClick={() => navigate("/dashboard/alerts")}
          >
            <AlertCircle className="h-6 w-6" />
            <span>{unreadAlerts.length} Critical Alerts</span>
          </div>
        )}

        <div className="flex">
          {/* Sidebar with a modern look */}

            <Sidebar />
          

          <main className="flex-1 my-12 p-10">
            <Outlet />
          </main>
        </div>

        {/* Chatbot positioned well */}
        <div className="fixed bottom-5 right-5">
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
