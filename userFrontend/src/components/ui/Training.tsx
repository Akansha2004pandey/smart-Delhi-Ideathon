import { useState, useEffect, useRef } from "react";
import { Target } from "lucide-react";
import EmergencyTips from "./EmergencyTips";

declare global {
  interface Window {
    cv: any;
    poseDetection: any;
    tf: any;
  }
}

const Training = () => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isOpenCVLoaded = useRef(false);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [feedback, setFeedback] = useState("Start Moving!");

  let detector: any = null;

  useEffect(() => {
    const loadOpenCV = () => {
      return new Promise((resolve, reject) => {
        if (window.cv && window.cv.getBuildInformation) {
          console.log("OpenCV is already loaded");
          resolve(window.cv);
          return;
        }
    
        if (document.querySelector("#opencv-script")) {
          console.warn("OpenCV script is already added.");
          resolve(window.cv);
          return;
        }
    
        const script = document.createElement("script");
        script.id = "opencv-script";
        script.src = "https://docs.opencv.org/4.8.0/opencv.js";
        script.async = true;
        
        script.onload = () => {
          if (window.cv) {
            window.cv.onRuntimeInitialized = () => {
              console.log("✅ OpenCV initialized");
              resolve(window.cv);
            };
          } else {
            reject("OpenCV not found");
          }
        };
    
        script.onerror = () => reject("Failed to load OpenCV");
        document.body.appendChild(script);
      });
    };
    

    const loadPoseDetection = async () => {
      if (!window.tf || !window.poseDetection) {
        console.error("❌ TensorFlow.js or Pose Detection not loaded!");
        return;
      }

      console.log("🔍 Loading pose detection model...");
      const model = window.poseDetection.SupportedModels.MoveNet;
      detector = await window.poseDetection.createDetector(model);
      console.log("✅ Pose detector initialized");
    };

    const initializeWebcam = async () => {
      try {
        console.log("🎥 Requesting webcam access...");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsWebcamActive(true);
          console.log("✅ Webcam initialized");
          processVideo();
        }
      } catch (error) {
        console.error("❌ Webcam access error:", error);
        setIsLoading(false);
      }
    };

    const loadAllDependencies = async () => {
      try {
        await loadOpenCV();
        await loadPoseDetection();
        await initializeWebcam();
        setIsLoading(false);
      } catch (error) {
        console.error("❌ Error loading dependencies:", error);
      }
    };

    loadAllDependencies();

    return () => {
      if (isWebcamActive) stopWebcam();
      console.log("🛑 Cleaning up OpenCV & Webcam");
    };
  }, []);

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsWebcamActive(false);
    }
  };

  const processVideo = async () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error("🚨 Missing elements for video processing");
      return;
    }
  
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    if (!ctx) return;
  
    canvas.width = video.videoWidth;   // Match canvas size to video
    canvas.height = video.videoHeight;
  
    const processFrame = async () => {
      if (video.paused || video.ended) return;
  
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Draw video frame
  
        if (detector) {
          const poses = await detector.estimatePoses(video);
          if (poses.length > 0) {
            drawKeypoints(poses[0].keypoints, ctx);  //  Draw keypoints
            drawSkeleton(poses[0].keypoints, ctx);   //  Draw skeleton
            setFeedback(getFeedbackMessage(poses[0].keypoints));
          }
        }
      } catch (error) {
        console.error("🚨 Frame processing error:", error);
      }
  
      requestAnimationFrame(processFrame);
    };

    const getFeedbackMessage = (keypoints: any) => {
      const leftWrist = keypoints.find((kp: any) => kp.name === "left_wrist");
      const rightWrist = keypoints.find((kp: any) => kp.name === "right_wrist");
      const leftElbow = keypoints.find((kp: any) => kp.name === "left_elbow");
      const rightElbow = keypoints.find((kp: any) => kp.name === "right_elbow");
      const leftKnee = keypoints.find((kp: any) => kp.name === "left_knee");
      const rightKnee = keypoints.find((kp: any) => kp.name === "right_knee");
      const leftAnkle = keypoints.find((kp: any) => kp.name === "left_ankle");
      const rightAnkle = keypoints.find((kp: any) => kp.name === "right_ankle");
      const nose = keypoints.find((kp: any) => kp.name === "nose");
    
      if (!leftWrist || !rightWrist || !nose) return "❌ Move into the frame";
    
      // ✅ Hands Up (Blocking stance)
      if (leftWrist.y < nose.y && rightWrist.y < nose.y) {
        return "🙌 Hands Up! Stay Alert!";
      }
    
      // ✅ Defensive Guard (Elbows near ribs, wrists protecting face)
      if (
        leftElbow && rightElbow &&
        leftElbow.y > nose.y && rightElbow.y > nose.y &&
        leftWrist.y < leftElbow.y && rightWrist.y < rightElbow.y
      ) {
        return "🛡️ Maintain your Guard!";
      }
    
      // ✅ Punch (One wrist extended forward, other near chin)
      if (
        leftWrist.x < nose.x && leftWrist.y < leftElbow.y &&
        rightWrist.x > nose.x && rightWrist.y > rightElbow.y
      ) {
        return "🥊 Left Punch! Nice!";
      }
      if (
        rightWrist.x > nose.x && rightWrist.y < rightElbow.y &&
        leftWrist.x < nose.x && leftWrist.y > leftElbow.y
      ) {
        return "🥊 Right Punch! Great!";
      }
    
      // ✅ Kick (One knee lifted, ankle above the other knee)
      if (
        leftKnee && leftAnkle &&
        leftKnee.y < nose.y && leftAnkle.y < leftKnee.y
      ) {
        return "🦵 Left Kick! Powerful!";
      }
      if (
        rightKnee && rightAnkle &&
        rightKnee.y < nose.y && rightAnkle.y < rightKnee.y
      ) {
        return "🦵 Right Kick! Strong!";
      }
    
      // ✅ Squatting / Ducking (Both knees bent significantly)
      if (
        leftKnee && rightKnee &&
        leftKnee.y > nose.y && rightKnee.y > nose.y
      ) {
        return "⬇️ Good Duck! Avoid the hit!";
      }
    
      return "💪 Keep Going!";
    };
    
    
  
    requestAnimationFrame(processFrame);
  };
  
  

  const trails = useRef<{x: number, y: number}[]>([]);

  const drawKeypoints = (keypoints: any, ctx: CanvasRenderingContext2D) => {
    keypoints.forEach((point: any) => {
      if (point.score > 0.5) {
        trails.current.push({ x: point.x, y: point.y });
        if (trails.current.length > 50) trails.current.shift();
  
        trails.current.forEach((p, i) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5 - i * 0.1, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255, 0, 0, ${1 - i * 0.02})`;
          ctx.fill();
        });
      }
    });
  };
  
  
  const drawSkeleton = (keypoints: any, ctx: CanvasRenderingContext2D) => {
    const skeleton = [
      [0, 1], [1, 2], [2, 3], [3, 4], // Right arm
      [0, 5], [5, 6], [6, 7], [7, 8], // Left arm
      [5, 9], [9, 10], [10, 11], [11, 12], // Left leg
      [6, 13], [13, 14], [14, 15], [15, 16] // Right leg
    ];
  
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
  
    skeleton.forEach(([i, j]) => {
      const kp1 = keypoints[i];
      const kp2 = keypoints[j];
  
      if (kp1.score > 0.5 && kp2.score > 0.5) {
        ctx.beginPath();
        ctx.moveTo(kp1.x, kp1.y);
        ctx.lineTo(kp2.x, kp2.y);
        ctx.stroke();
      }
    });
  };

  
  

  return (
    <div className="max-w-4xl mx-auto">
       <div className="fixed inset-0 bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600 -z-50 h-96"></div>
      <div className="text-center mb-12">
     
        {/* <div className="inline-flex items-center justify-center p-3 rounded-2xl mb-4">
          <Target className="h-12 w-12 text-white" />
        </div> */}
        <h1 className="text-5xl mt-3 font-black text-white tracking-tighter">Training Mode</h1>
        <p className="text-white mt-3 ">Practice self-defense moves with real-time AI feedback</p>
      </div>

      <div className="aspect-video rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-gray-500">Initializing AI components...</div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <video ref={videoRef} className="absolute top-0 left-0 w-full h-full overflow-hidden object-cover" autoPlay playsInline muted />
            <canvas ref={canvasRef} className="w-full  absolute top-0 left-0 h-full" />
            <div className="absolute top-4 left-4 bg-white text-black p-2 rounded shadow-lg">
  {feedback}
</div>

          </div>
        )}
      </div>
      <EmergencyTips/>
    </div>
  );
};

export default Training;
