import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useRef, useEffect, useState} from 'react';
import Tesseract from 'tesseract.js';



const Camera = (props) => {
    const videoRef = useRef(null)
    const photoRef = useRef(null)
    const [phone, setPhone] = useState(false)
    

    const takePhoto = () => {
        const width = 414
        const height =   width / (16/9)
        let video = videoRef.current;
        let photo = photoRef.current;
        photo.height = height;
        photo.width = width;
        let ctx = photo.getContext('2d');

        ctx.drawImage(video, 0, 0, width, height);
        var block = ctx.getImageData(0,0,   width,height);
        const matrix = block.data;
        var w2 = width / 2;

        for (var y = 0; y < matrix.length; y+=4) {
    
                var  r = matrix[y];
             
                var  g = matrix[y + 1];
             
                var  b = matrix[y + 2];
             
                var  a = matrix[y + 3];
                var  gray = (0.299 * r + 0.587 * g + 0.114 * b);

                if ( gray > 120) {
                    matrix[y] = 255;
                    matrix[y + 1] = 255;
                    matrix[y + 2] = 255;
                    matrix[y + 3] = a;
                } else {
                    matrix[y] = 0;
                    matrix[y + 1] = 0;
                    matrix[y + 2] = 0;
                    matrix[y + 3] = a;

                }
            
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
        navigator.mediaDevices.getUserMedia({video: {facingMode:'environment',
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
    
    
    return (<div className='camera-wrapper' style={{background: 'url(' +'https://wallpaperaccess.com/full/2939800.jpg' + ')'
                                                   }}>
         <div className='camera-cont'>
            <video  ref={videoRef} allow='camera;microphone' ></video>
           <div className='crypt-cont'>
            <div className='cryptic'>{props.encryptedWord}</div>
             </div>
            <div className='takePhoto' onClick={takePhoto}> <FontAwesomeIcon icon='circle'/>  </div>
           <div className='homepage-btn'> <button onClick={props.handleCamera}>HomePage </button> </div>


         </div> 
        <div className='photo'>
            <canvas ref={photoRef}></canvas>

        </div>

        </div>
    )
}
export  default Camera;