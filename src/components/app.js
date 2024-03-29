import React, { PureComponent } from 'react';
import axios from 'axios';
import Info from './instructions';
import Technical from './technical';
import {faCamera , faLock, faKey, faCircle, faCogs,faAtom,faCode, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from "@fortawesome/fontawesome-svg-core";
import Camera from './camera';
import DigitalEnigma from './enigma';



library.add(faLock, faCamera, faKey, faCircle, faCogs, faAtom, faCode, faEnvelope)
export default class App extends PureComponent {
  constructor() {
    super();
     this.state = {
       word : '',
       rotorsKey: [],
       rotors:[],
       encryption: false,
       rotor_settings: [true,true,true,true,true],
       letters : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'
       ,'R','S','T','U','V','W','X','Y','Z', '1','2','3','4','5', '6','7', '8', '9', '0', '_' ],
       plugBoard: [],
       enablePlug:false,
       instructions: true,
       camera:false,
       scrambled: ''
     }

    this.encrypt_msg = this.encrypt_msg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRotor = this.handleRotor.bind(this);
    this.handleClickR = this.handleClickR.bind(this);
    this.handlePlugBoard = this.handlePlugBoard.bind(this);
    this.handleCamera    =  this.handleCamera.bind(this);
    
  }

  encrypt_msg( word) {
    if (this.state.rotors.length != 3) {
      return;
    }
    var text = word;
    this.setState({encryption:true, scrambled: text, word:'' })
  
  }

handleChange(e) {
  this.setState({
    [e.target.name] : e.target.value.replace(' ', '_'),
    encryption:false});
};

handleClickR(e) {
  e.preventDefault();
  e.persist();
  
  this.setState({
     [e.target.name] : e.target.value,
     ['activeRoto' + e.target.name]: e.target.value
         })};

handlePlugBoard(letter) {
  this.setState({
    plugBoard: this.state.plugBoard + letter,
    letters: this.state.letters.filter( item => {return item != letter})
  }) 
};

handleRotor(key, rotor) {
  var theItems = [...this.state.rotor_settings]
  theItems[rotor] = false
  this.setState({
    rotor_settings: theItems });
    this.state.rotorsKey.push(key);
    this.state.rotors.push(rotor); };

handleCamera() {
  this.setState({
    camera:!this.state.camera
  });};

  render() {
    
    
   if (this.state.camera) {
    return <Camera 
    handleCamera={this.handleCamera} 
    encrypt={this.encrypt_msg} 
     
    plugBoard={this.state.plugBoard}
    rotors={this.state.rotors}
    encryptedWord ={this.state.encryption} />
   }
   

     if (this.state.instructions) {
       return  (<div className='info-wrapper' > <Info/>
        
              <button onClick={() => {this.setState({instructions: false})}}> Im ready </button>       
        </div>) 
     }
   
    const chosen = () => this.state.rotorsKey.map( item => {
      return  (<div className='chosen' key={item } > <FontAwesomeIcon icon={item}/> </div>)

    })

    const plugBoard = () => this.state.letters.map(letter => {

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
    
     <h1 className='encrypt-wrapper' > {this.state.encryption ? 
     
     <div className='encrypt'> 
      
         <DigitalEnigma  word={this.state.scrambled} rotorChoices={this.state.rotors} plugBoard={this.state.plugBoard}/>
      
    </div> :
   
      <FontAwesomeIcon icon='lock' /> } </h1>
    
    {this.state.rotors.length == 3 && (this.state.plugBoard.length == 20 || this.state.enablePlug == false) ? 
     
     <div className='scramble-action-wrapper'> 

    <button className='scramble' onClick={() => this.encrypt_msg( this.state.word)}> Scramble </button> 

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
          <button onClick={() => this.handleRotor('key', 0)} > <FontAwesomeIcon icon='key'/> </button>
         :null}
        {this.state.rotor_settings[1] ?
          <button onClick={() => this.handleRotor('atom', 1)} > <FontAwesomeIcon icon='atom' /> </button>
         : null}

         {this.state.rotor_settings[2] ?
          <button onClick={() => this.handleRotor('cogs', 2)}  ><FontAwesomeIcon icon='cogs'/> </button>
           : null }
          {this.state.rotor_settings[3] ?
          <button onClick={() => this.handleRotor('code', 3)}  ><FontAwesomeIcon icon='code'/></button>
            : null }
          {this.state.rotor_settings[4] ? 
          <button onClick={() => this.handleRotor('envelope', 4)}  ><FontAwesomeIcon icon='envelope'/></button> 
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
     {[...this.state.plugBoard].map((item, index) => {if (index % 2 == 1 && index != 0) 
                                               {return item + ' '} 
                                                        return item }) }
 </div>
  
 { this.state.plugBoard.length < 20 ?
    
      <div>
      {this.state.enablePlug ?
       <div className='plug-board'> {plugBoard()} </div> : <div className='enablePlug'> <button onClick={() => this.setState({enablePlug:true})}> Enable Plug Board</button> <p>I caution using this feature, it adds a lot of complexity</p> </div> }
      </div> :   null }
 </div>
     
     <Technical/>
  </div>
      
  </div>

    )
  }
}

