import React, {useRef, useEffect, useState} from 'react';
import Tesseract from 'tesseract.js';



const Camera = (props) => {
    const videoRef = useRef(null)
    const photoRef = useRef(null)
    const [phone, setPhone] = useState(false)
    
    const takePhoto = () => {
        const width = 414
        const height = width / (16/9)
        let video = videoRef.current;
        let photo = photoRef.current;
        photo.height = height;
        photo.width = width;
        let ctx = photo.getContext('2d');

        ctx.drawImage(video, 0, 0, width, height);
        var block = ctx.getImageData(0,0,   width,height)
        const matrix = block.data
       // Personal contrast algorithm
        for  (var i = 0; i < matrix.length; i+=4) {
            matrix[i]     = matrix[i] * 2;
            matrix[i + 1] = matrix[i + 1] * 2;
            matrix[i + 2] = matrix[i + 2] ;
        }
        // inverting the image
        for  (var i = 0; i < matrix.length; i+=4) {
            matrix[i]     = 255 - matrix[i];
            matrix[i + 1] = 255 - matrix[i + 1] ;
            matrix[i + 2] = 255 - matrix[i + 2] ;
        }
        ctx.putImageData(block, 0, 0);
        
        var data = photo.toDataURL('image/png');
        photo.setAttribute('src', data);
        
        Tesseract.recognize(photo,'eng',
        {logger: m => console.log(m) })
        .catch( err => { console.error(err) })
        .then(( {data: { text} } ) => 
         {props.encrypt(props.rotors, props.rotorSettings, text, props.plugBoard )} )

         
        console.log(props.encryptedWord, 'll')
    }
    const  getVideo = () => {
        navigator.mediaDevices.getUserMedia({video: {
            width:2000, height:1080}

        }).then(stream => {
            let video = videoRef.current;
            video.setAttribute('playsinline', true);
            video.srcObject = stream;
            video.play();
        }).catch(err => console.error(err ))
    }
   const deviceType = () => {
        if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          setPhone(true)
           }
       if (phone == true) {
           return true
       }   
       return false 
    }
    useEffect(() => {getVideo()}, [videoRef] )
    
    
    return (<div className='camera-wrapper'>
         <div className='camera-cont'>
            <video  ref={videoRef} allow='camera;microphone' ></video>
            <div className='cryptic'> Detected Text: {props.encryptedWord}</div>
            <button onClick={takePhoto}>Capture Text</button>
            <button onClick={props.handleCamera}>HomePage </button>


         </div> 
        <div className='photo'>
            <canvas ref={photoRef}></canvas>

        </div>

        </div>
    )
}
export  default Camera;