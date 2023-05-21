import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useRef, useEffect, useState} from 'react';
import Tesseract from 'tesseract.js';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';





const Camera = (props) => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    var [brightness, setBrightness] = useState('brightness(1)');
    var [isLoading, setLoading]    = useState(false)
    
   
    const takePhoto = () => {
        setBrightness('brightness(1.75');
        setLoading(true)
        const width = 400;
        const height =  200;
        let video = videoRef.current;
        let photo = photoRef.current;
        photo.height = height;
        photo.width = width;
        let ctx = photo.getContext('2d');

        ctx.drawImage(video, 20, 20, width, height);
        var block = ctx.getImageData(0,0, width, height);
        const matrix = block.data;

        for (var y = 0; y < matrix.length; y+=4) {
           
                const avg = (matrix[y] + matrix[y+1] + matrix[y + 2]) / 3

                matrix[y] = avg
                matrix[y + 1] = avg
                matrix[ y+ 2] = avg
             
        }
        document.getElementById('image').style.filter='blur(3.5px)'
          for (var y = 0; y < matrix.length; y+=4) {

    
                var  r = matrix[y];
             
                var  g = matrix[y + 1];
             
                var  b = matrix[y + 2];
             
                var  gray = (0.199 * r + 0.587 * g + 0.314 * b);

                if ( gray > 150) {
                    matrix[y] = 255;
                    matrix[y + 1] = 255;
                    matrix[y + 2] = 255
                } else {
                    matrix[y] = 0;
                    matrix[y + 1] = 0;
                    matrix[y + 2] = 0;
                }
            
        }
       
        ctx.putImageData(block, 0, 0);
        
        var data = photo.toDataURL('image/png');
        photo.setAttribute('src', data);
        //var textract = require('textract');
         








        Tesseract.recognize(photo,'eng',
        {logger: m => console.log(m) })
        .catch( err => { console.error(err) })
        .then(( {data: { text} } ) => 
         {props.encrypt(props.rotors, props.rotorSettings, text, props.plugBoard, true ); 
            setBrightness('brightness(1)');
            setLoading(false) })

      
        
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
  
    useEffect(() => {getVideo()}, [videoRef] )

    

    return (<div className='camera-wrapper' style={{background: 'url(' +'https://wallpaperaccess.com/full/2939800.jpg' + ')'
                                                   }}>
         <div className='camera-cont'>
            <video ref={videoRef} style={{filter: brightness}} allow='camera;microphone' ></video>
           <div className='crypt-cont'>
            <div className='cryptic'>{ props.encryptedWord}</div>
         
             </div>
           
            {isLoading ? <div className='takePhoto' style={{color:'black'}}> <FontAwesomeIcon icon='lock' />   </div> 
                              : //else :
            <div className='takePhoto' onClick={takePhoto}> <FontAwesomeIcon icon='circle'/>  </div>
          
                 }
           <div className='homepage-btn'> <button onClick={props.handleCamera}>HomePage </button> </div>


         </div> 
        <div className='photo'>
            <canvas id='image' ref={photoRef}></canvas>
            

        </div>
      <div>
      <ReactCrop src={'https://editorial01.shutterstock.com/preview-440/10352396x/298a39fa/Shutterstock_10352396x.jpg'} crop={{aspect:1/1}}/>
      </div>


        </div>
    )
}
export  default Camera;