import React, { PureComponent } from 'react';
import axios from 'axios';
import Info from './instructions';
import Technical from './technical';
import {faTrash, faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from "@fortawesome/fontawesome-svg-core";

library.add(faLock)
export default class App extends PureComponent {
  constructor() {
    super();
     this.state = {
       word : '',
       rotors: '',
       encryption: ' ',
       rotor_settings: [true,true,true,true,true],
       r1:0,
       r2:1,
       r3:2,
       letters : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'
       ,'R','S','T','U','V','W','X','Y','Z', '1','2','3','4','5', '6','7', '8', '9', '0', '_' ],
       plug_board: '',
       enablePlug:false,
       instructions: true
     }

    this.encrypt_msg = this.encrypt_msg.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRotor = this.handleRotor.bind(this)
    this.handleClickR = this.handleClickR.bind(this)
    this.handlePlugBoard = this.handlePlugBoard.bind(this)
  }

  encrypt_msg(rotors, settings, word, plugBoard) {
    if (this.state.rotors.length != 3) {
      return;
    }
    this.setState({encryption:''})
    var [
      x,y,z
   ] = settings 
    
    axios.post(`https://obscure-chamber-16944.herokuapp.com/?rotors=${rotors}&x=${x}&y=${y}&z=${z}&word=${word}&plug_board=${plugBoard}`)
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

handleClickR(e) {
  e.preventDefault();
  e.persist();
  console.log(e.target.name)
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
    console.log('done')
    return ; 
  }
  var theItems = [...this.state.rotor_settings]
  theItems[rotor] = false
  this.setState({
    rotors: this.state.rotors.concat(n),
    rotor_settings: theItems })
  
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



  render() {
         
     if (this.state.instructions) {
       return  (<div className='info-wrapper' > <Info/>
        
              <button onClick={() => {this.setState({instructions: false})}}> Im ready </button>       
        </div>) 
     }
   




    const numSettings = (rtor) => [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15, 16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].map(num  =>
    { return (<button className={ this.toggleButton(num, rtor)}  name={rtor} key={num * 2}  onClick={ this.handleClickR} value={num}> {num} </button> )})
  
    const chosen = () => [...this.state.rotors].map( item => {
      return  (<div className='chosen' key={item + 1} >{ 'Rotor ' + (parseInt(item) + 1)  }</div>)

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
    
  
  
    {this.state.rotors.length == 3 && (this.state.plug_board.length == 20 || this.state.enablePlug == false)? 
     
    

    <button className='scramble' onClick={() => this.encrypt_msg(this.state.rotors, 
      [this.state.r1,this.state.r2,this.state.r3] ,
       this.state.word
      , this.state.plug_board )}> Scramble </button> 
        : null }
        </div>
    
    </div>  
      <div className='bottom'>
        <div className='rotors' >

          
         {this.state.rotors.length < 3 ?    <div className='choices'>
            
            <h2 className='h2-class'> Choose your rotors </h2>

        {this.state.rotor_settings[0] ?
          <button onClick={() => this.handleRotor('0', 0)} > Rotor 1 </button>
         :null}
        {this.state.rotor_settings[1] ?
          <button onClick={() => this.handleRotor('1', 1)} >  Rotor 2</button>
         : null}

         {this.state.rotor_settings[2] ?
          <button onClick={() => this.handleRotor('2', 2)}  > Rotor 3</button>
           : null }
          {this.state.rotor_settings[3] ?
          <button onClick={() => this.handleRotor('3', 3)}  >Rotor 4</button>
            : null }
          {this.state.rotor_settings[4] ? 
          <button onClick={() => this.handleRotor('4', 4)}  > Rotor 5</button> 
           : null }
         </div>:
         null }
         
          
          <div className='chosen-wrapper'>
            {chosen()}
             
          </div>

        </div>

        <div className='config-wrapper' >

          { this.state.rotors.length == 3 ? <div className='config'>
          
                   <h2 className='h2-class'> Choose your configuration settings  </h2>
           
           <div className='inpout' >
              <div className='rotors-set' >  
               
                <h4>Rotor 1</h4>
                <div className='rt-config' name='r1' > {numSettings('r1')} </div>
             
             </div>
             <div className='rotors-set'  >  
               
                <h4>Rotor 2</h4>
                <div className='rt-config' name='r2' > {numSettings('r2')} </div>
             
             </div>
             <div className='rotors-set'>  
               
                <h4>Rotor 3</h4>
                <div  className='rt-config' name='r3' > {numSettings('r3')} </div>
             
             </div>
            
           </div>    
           
            
             </div> : null

          }


        </div>

      </div>
      
 <div className='plugBoard-wrapper'>
 <h2> Plug Board</h2>
 <div className='plug-settings'> {[...this.state.plug_board].map((item, index) => {if (index % 2 == 1 && index != 0) {return item + ' '} return item }) } </div>
  
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
