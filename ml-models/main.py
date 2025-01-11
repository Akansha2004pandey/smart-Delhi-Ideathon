from fastapi import FastAPI, UploadFile, File, HTTPException
import numpy as np
from tensorflow.keras.models import load_model
import cv2
from io import BytesIO
from pydantic import BaseModel

face_classifier = cv2.CascadeClassifier('models/haarcascade_frontalface_default.xml')
emotion_model = load_model('models/emotion_detection_model_100epochs.h5')
gender_model = load_model('models/gender_model_100epochs.h5')


class_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']
gender_labels = ['Male', 'Female']

app = FastAPI()

@app.get("/")
def read_root():
    print("in the root")
    return {"message": "Hello World!"}


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Read the image data from the file
    try:
        print("File received:", file.filename)
        image_data = await file.read()
        img_array = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        # Check if image is loaded
        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        # Convert image to grayscale for face detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray, 1.3, 5)
    
        response = {"gender": "", "emotion": "", "face_location": []}
        
        for (x, y, w, h) in faces:
            # Crop face from image
            face = img[y:y + h, x:x + w]
    
            # Emotion Detection
            face_gray = gray[y:y + h, x:x + w]
            face_gray = cv2.resize(face_gray, (48, 48), interpolation=cv2.INTER_AREA)
            face_gray = face_gray.astype('float32') / 255
            face_gray = np.expand_dims(face_gray, axis=-1)
            face_gray = np.expand_dims(face_gray, axis=0)
            
            emotion_preds = emotion_model.predict(face_gray)
            emotion_label = class_labels[np.argmax(emotion_preds)]
            
            # Gender Detection
            face_color = cv2.resize(face, (200, 200))
            face_color = np.expand_dims(face_color, axis=0)  # Add batch dimension
            print("face_Color shape: "+face_color.shape)
            gender_preds = gender_model.predict(face_color)
            gender_label = gender_labels[0] if gender_preds[0] < 0.5 else gender_labels[1]
    
            # Add to the response data
            response['face_location'].append([int(x), int(y), int(w), int(h)])
            response['gender'] = gender_label
            response['emotion'] = emotion_label
    
        return response
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Debugging
        raise HTTPException(status_code=500, detail=str(e))
    
    
    