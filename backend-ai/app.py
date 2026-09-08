from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
from ultralytics import YOLO
import threading

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Load the YOLOv8 model
model = YOLO('best.pt')

# Set your video source here (can be a local MP4 file or RTSP stream)
VIDEO_SOURCE = 'videos/cctv test1.mp4' 

# Initialize the camera
camera = cv2.VideoCapture(VIDEO_SOURCE)

def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            # If the video ends, loop back to the first frame
            camera.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue
        else:
            # Run YOLOv8 inference on the frame
            results = model(frame, stream=True, verbose=False)
            
            # Draw bounding boxes on the frame
            for r in results:
                im_array = r.plot()
            
            # Encode the frame in JPEG format
            ret, buffer = cv2.imencode('.jpg', im_array)
            frame_bytes = buffer.tobytes()
            
            # Yield the frame in byte format
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/api/detect-frame')
def video_feed():
    # Return the response generated along with the specific media type (mime type)
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/status')
def status():
    return jsonify({"status": "running", "model": "YOLOv8 PPE Detection"})

if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, debug=False)
