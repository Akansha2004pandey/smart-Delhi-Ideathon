import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  AlarmClock,
  AlertTriangle,
  BellRing,
  Brain,
  Eye,
  Hand,
  KeyRound,
  MoveRight,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sun,
  Users,
  Volume2,
  X,
} from "lucide-react";

const EmergencyTips = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const tips = [
    { icon: Eye, text: "Aim for sensitive areas: Eyes, nose, throat, and groin." },
    { icon: MoveRight, text: "Use your legs: A strong kick can create distance." },
    { icon: ShieldCheck, text: "Stay alert: Be aware of your surroundings." },
    { icon: Volume2, text: "Make noise: Yell to attract attention and deter attackers." },
    { icon: AlarmClock, text: "Escape first: Run towards crowded places when possible." },
    { icon: Phone, text: "Call for help: Dial emergency services immediately." },
    { icon: Hand, text: "Keep your hands up: Always be ready to defend yourself." },
    { icon: Users, text: "Walk with confidence: Attackers target those who seem vulnerable." },
    { icon: Sun, text: "Carry a flashlight: Use it to blind an attacker momentarily." },
    { icon: BellRing, text: "Carry a personal alarm: A loud sound can startle an attacker." },
    { icon: Brain, text: "Learn basic self-defense moves: Knowing a few techniques can save your life." },
    { icon: KeyRound, text: "Use everyday objects: Keys, pens, and bags can be used for self-defense." },
  ];

  const emergencyNumbers = [
    { name: "Women Helpline", number: "1091" },
    { name: "Police", number: "100" },
    { name: "Emergency Medical Services", number: "108" },
    { name: "National Commission for Women", number: "7827-170-170" },
    { name: "Child Helpline", number: "1098" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    toast.info(`${number} copied to clipboard`,{
      autoClose: 1000, // 1 second
      position: "top-right",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      
    });
  };

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700"
      >
        <AlertTriangle className="h-5 w-5" /> Emergency Tips
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div
            ref={modalRef}
            className="bg-white p-6 shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto 
             scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-red-500 hover:scrollbar-thumb-red-600 rounded-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                Emergency Self-Defense Tips
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Self-Defense Tips Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Self-Defense Tips</h3>
                <ul className="space-y-2 text-gray-700">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                      <tip.icon className="h-5 w-5 text-blue-600" />
                      <span>{tip.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emergency Contacts Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <PhoneCall className="h-5 w-5 text-green-600" />
                  Emergency Contacts
                </h3>
                <ul className="space-y-2">
                  {emergencyNumbers.map((contact, index) => (
                    <li
                      key={index}
                      onClick={() => handleCopy(contact.number)}
                      className="flex justify-between bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                      <span className="font-medium">{contact.name}</span>
                      <span className="text-blue-600 font-semibold">{contact.number}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
       <ToastContainer />
    </div>
  );
};

export default EmergencyTips;
