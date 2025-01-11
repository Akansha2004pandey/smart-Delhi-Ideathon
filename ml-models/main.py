from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import numpy as np
import cv2
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from io import BytesIO
from PIL import Image
# import uvicorn
import os
# Load models
face_classifier = cv2.CascadeClassifier('models/haarcascade_frontalface_default.xml')
emotion_model = load_model('models/emotion_detection_model_100epochs.h5')
gender_model = load_model('models/gender_model_100epochs.h5')

# Labels
class_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']
gender_labels = ['Male', 'Female']

# Initialize FastAPI app
app = FastAPI()

def process_image(image_bytes: BytesIO):
    # Convert byte image to array
    image = Image.open(image_bytes)
    image = np.array(image)
    print("File is received")
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray, 1.3, 5)
    
    men_count = 0
    women_count = 0
    predictions = []

    for (x, y, w, h) in faces:
        # Emotion detection
        roi_gray = gray[y:y + h, x:x + w]
        roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)
        roi = roi_gray.astype('float') / 255.0
        roi = img_to_array(roi)
        roi = np.expand_dims(roi, axis=0)
        emotion_preds = emotion_model.predict(roi)[0]
        emotion_label = class_labels[emotion_preds.argmax()]

        # Gender detection
        roi_color = image[y:y + h, x:x + w]
        roi_color = cv2.resize(roi_color, (200, 200), interpolation=cv2.INTER_AREA)
        gender_predict = gender_model.predict(np.array(roi_color).reshape(-1, 200, 200, 3))
        gender_predict = (gender_predict >= 0.5).astype(int)[:, 0]
        gender_label = gender_labels[gender_predict[0]]

        predictions.append({
            "face_location": [int(x), int(y), int(w), int(h)],
            "emotion": emotion_label,
            "gender": gender_label
        })

        # Update counts
        if gender_label == 'Male':
            men_count += 1
        elif gender_label == 'Female':
            women_count += 1

    return predictions, men_count, women_count

@app.get("/")
def read_root():
    print("in the root")
    return {"message": "Hello World!"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read image file and process
        image_bytes = BytesIO(await file.read())
        predictions, men_count, women_count = process_image(image_bytes)
        
        return JSONResponse(content={
            "predictions": predictions,
            "men_count": men_count,
            "women_count": women_count
        })
    
    except Exception as e:
        return JSONResponse(status_code=400, content={"message": f"Error processing image: {str(e)}"})

# if __name__ == '__main__':
#     uvicorn.run(app, host='127.0.0.1', port=8000)
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=int(os.getenv('PORT', 8000)))
# #uvicorn main:app --reload

