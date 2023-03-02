import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import AWS from 'aws-sdk';
import { API } from 'aws-amplify';





const videoConstraints = {
  facingMode: 'user',
  height: 460,
  width: 500
};

const MyWebcam = () => {
  const webcamRef = useRef(null);
  const [recordedVideo, setRecordedVideo] = useState(null);

  const onStopRecording = (videoBlob) => {
    setRecordedVideo(videoBlob);

    const s3 = new AWS.S3({
      accessKeyId: 'YAKIA3TAVGZLUA3Z3VXOY',
      secretAccessKey: 'z/BRdXxht32fszykDG2nknb2l6NoVjoBp/eqMXJG',
    });

    const params = {
      Bucket: 'luxorsurveyapp-storage-48413d43211922-luxordev',
      Key: 'my-video-file.mp4',
      Body: videoBlob,
    };

    s3.putObject(params, async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Successfully uploaded video to ${params.Bucket}/${params.Key}`);
  
        // Make API request to store video metadata in your database
        const response = await API.post('luxorsurveyapp', '/videos', { body: { key: params.Key } });
        console.log(response);
      }
    });
  };

  return (
    <>
<Webcam
  audio={false}
  ref={webcamRef}
  screenshotFormat="image/jpeg"
  videoConstraints={videoConstraints}
  onUserMediaError={(err) => console.log(err)}
  onUserMedia={(stream) => console.log(stream)}
  onRecordingComplete={onStopRecording}
/>

      {recordedVideo && (
        <video src={URL.createObjectURL(recordedVideo)} controls />
      )}
    </>
  );
};

export default MyWebcam;
