import React, { PureComponent } from 'react';
import axios from 'axios';
import Info from './instructions';
import Technical from './technical';
import {faCamera , faLock, faKey, faCircle, faSpinner} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from "@fortawesome/fontawesome-svg-core";
import Camera from './camera';
import FuzzySet from 'fuzzyset';


library.add(faLock, faCamera, faKey, faCircle, faSpinner)
export default class App extends PureComponent {
  constructor() {
    super();
     this.state = {
       word : '',
       rotors: '',
       encryption: '',
       rotor_settings: [true,true,true,true,true],
       r1:0,
       r2:1,
       r3:2,
       letters : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'
       ,'R','S','T','U','V','W','X','Y','Z', '1','2','3','4','5', '6','7', '8', '9', '0', '_' ],
       plug_board: '',
       enablePlug:false,
       instructions: true,
       camera:false
     }

    this.encrypt_msg = this.encrypt_msg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRotor = this.handleRotor.bind(this);
    this.handleClickR = this.handleClickR.bind(this);
    this.handlePlugBoard = this.handlePlugBoard.bind(this);
    this.handleCamera    =  this.handleCamera.bind(this)
  }

  encrypt_msg(rotors, settings, word, plugBoard) {
    if (this.state.rotors.length != 3) {
      return;
    }
    this.setState({encryption:''})
    var [
      x,y,z
   ] = settings
 //Data clean up
  var wanted = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_qwertyuiopasdfghjklzxcvbnm'.split("")
  var newWord = ''
  for (var i = 0; i < word.length; i++) {
        if (word[i] == " ") {
          newWord+= '_'
        }
    else if (wanted.indexOf(word[i]) > -1) {
       newWord += word[i]
    }
  }
   const hash_m = {'#':'0', '*':'1', '^':'2','+':'3', '%':'4'}
   var newRotor  = ''
   for (var i= 0; i < 3; i++) {
     newRotor += hash_m[rotors[i]]

   }
   
   axios.post(`https://obscure-chamber-16944.herokuapp.com/?rotors=${newRotor}&x=${x}&y=${y}&z=${z}&word=${newWord}&plug_board=${plugBoard}`)
    .then(response => {
      
      this.setState({  
        encryption: response.data.token,
        rotor : response.data.settings,
        word: ''
      });
     
     
      
    })
     .catch(error => console.log(error))
   
  }


handleChange(e) {
  this.setState({
    [e.target.name] : e.target.value.replace(' ', '_')
  })

}

  stopVideo = () => {
  navigator.mediaDevices.getUserMedia({video: {facingMode:'environment',
      width:2000, height:1080}

  }).then(stream => {
      let video = videoRef.current;
      video.pause();
      video.src = ''
      stream.getTracks()[0].stop()
      
  }).catch(err => console.error(err ))


}

handleClickR(e) {
  e.preventDefault();
  e.persist();
  
  this.setState({
     [e.target.name] : e.target.value,
     ['activeRoto' + e.target.name]: e.target.value
         })

}


handlePlugBoard(letter) {
 
  this.setState({
    
    plug_board: this.state.plug_board + letter,
    letters: this.state.letters.filter( item => {return item != letter})
  }) 

  
  
}

handleRotor(n, rotor) {
  if (this.state.rotors.length == 3) {
    return ; 
  }
  
  var theItems = [...this.state.rotor_settings]
  theItems[rotor] = false
  this.setState({
    rotors: this.state.rotors.concat(n),
    rotor_settings: theItems })
  console.log(this.state.rotors)
}

toggleButton(n, rotor) {
  if (n == this.state.r1 && rotor == 'r1') {
    return 'active-rotor' + rotor
  }
  if (n == this.state.r2 && rotor == 'r2') {
    return 'active-rotor' + rotor
  }
  if(n == this.state.r3 && rotor == 'r3') {
    return 'active-rotor' + rotor 
  } 
  return 'non-active-rotor'
}


handleCamera() {
  this.setState({
    camera:!this.state.camera
  });

}


  render() {
    
   if (this.state.camera) {
    return <Camera 
    handleCamera={this.handleCamera} 
    encrypt={this.encrypt_msg} 
    rotorSettings={[0,1,2]} 
    plugBoard={this.state.plug_board}
    rotors={this.state.rotors}
    encryptedWord ={this.state.encryption} />
   }
   

     if (this.state.instructions) {
       return  (<div className='info-wrapper' > <Info/>
        
              <button onClick={() => {this.setState({instructions: false})}}> Im ready </button>       
        </div>) 
     }
   

  
    const chosen = () => [...this.state.rotors].map( item => {
      return  (<div className='chosen' key={item } > <FontAwesomeIcon icon='key'/> {  item  }</div>)

    })

    const plugBoard = () => this.state.letters.map( letter => {

      return (<button onClick={() => this.handlePlugBoard(letter)} className='plug' > {letter} </button>)
    })
   
    return (
    
         
      <div className='app' style={{background: 'url(' +'https://wallpaperaccess.com/full/2939800.jpg' + ')'}}>
     
  

  
     <div className='page-wrapper'>
   
     <div className='top-part'>
       <div className='nested'>
      <h1> The Enigma Machine </h1>
           <p>Inspired by the Movie: The Imitation Game</p>

      <input type='text' name='word' value={this.state.word} onChange={this.handleChange}  />
     <h1 className='encrypt-wrapper' > {this.state.encryption.length > 0 ?  <div className='encrypt'> {this.state.encryption} </div> :
      <FontAwesomeIcon icon='lock' /> } </h1>
    
  
  
    {this.state.rotors.length == 3 && (this.state.plug_board.length == 20 || this.state.enablePlug == false) ? 
     
     <div className='scramble-action-wrapper'> 

    <button className='scramble' onClick={() => this.encrypt_msg(this.state.rotors, 
      [0,1,2] ,
       this.state.word, 
       this.state.plug_board)}> Scramble </button> 

        <div className='cam-btn-wrapper'>
          <div className='camera-btn' onClick={this.handleCamera} > <FontAwesomeIcon icon='camera'/> (in BETA)  </div>
        </div>

      </div>
        
        : null }
        </div>
    
    </div>  
      <div className='bottom'>

        
        <div className='rotors' >

          
         {this.state.rotors.length < 3 ?    <div className='choices'>
            
            <h2 className='h2-class'> Choose your rotors </h2>

        {this.state.rotor_settings[0] ?
          <button onClick={() => this.handleRotor('#', 0)} > # </button>
         :null}
        {this.state.rotor_settings[1] ?
          <button onClick={() => this.handleRotor('%', 1)} >%</button>
         : null}

         {this.state.rotor_settings[2] ?
          <button onClick={() => this.handleRotor('*', 2)}  >*</button>
           : null }
          {this.state.rotor_settings[3] ?
          <button onClick={() => this.handleRotor('^', 3)}  >^</button>
            : null }
          {this.state.rotor_settings[4] ? 
          <button onClick={() => this.handleRotor('+', 4)}  >+</button> 
           : null }
         </div>:
         null }
         
          <div className='chosen-container'>
            <div className='chosen-wrapper'>
             {chosen()}
             
            </div>
           </div>
          </div>


      </div>
      
 <div className='plugBoard-wrapper'>
 <h2> Plug Board</h2>
 <div className='plug-settings'> 
     {[...this.state.plug_board].map((item, index) => {if (index % 2 == 1 && index != 0) 
                                               {return item + ' '} 
                                                        return item }) }
 </div>
  
 { this.state.plug_board.length < 20 ?
    
      <div>
      {this.state.enablePlug ?
       <div className='plug-board'> {plugBoard()} </div> : <div className='enablePlug'> <button onClick={() => this.setState({enablePlug:true})}> Enable Plug Board</button> <p>I caution using this feature, it adds alot of complexity</p> </div> }
      </div> :   null }
 </div>
     
     <Technical/>

      </div>
      
  </div>

    )
  }
}

