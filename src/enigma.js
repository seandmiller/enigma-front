import React, {PureComponent} from "react";



export default class DigitalEnigma extends PureComponent {
    constructor(props) {
        super(props);
        this.dummyWord = props.word.toUpperCase();
        this.word  = ''
        
        this.rotorOne      = ['USROTZIBHQDNA_WLGCYXEPJVFKM1234567890',
                             'THSMEBANOVXGPKYQW09DC1I2J3F4Z5L6R7U8_']; 

        this.rotorTwo      = ["CB1A2DE3U4Q56R78_SLH0Z9JYMKFGINOPTVWX", 
                              "D1A2EBZIMNYOKTWPVXC_LJF0H9RS876UQ5G43"];

        this.rotorThree    = ["DECBAFIJMNHKLU_1234567890RPGOQYWXZSTV",
                              "ABDECONJPQL0987654321MKIHGTUZF_VWXRSY"];

        this.rotorFour     = ["_KELQ12IYPV34WFR56ATX78BN90HZGOCMSDJU", 
                              "IFGJ54VP321LDHQ678_O90CSKRNUTZBMAYWEX"]
        
        
        this.rotorFive     =  ["UC12NQRF36745OZW89SH0ADVEXLBPIJ_TKMGY",
                               "RTNHPZBFWOLDCGQVJK0Y7M129A86E5X34IUS_"];
        
        for (let i = 0; i < this.dummyWord.length ; i++) {
            
           if (this.rotorOne[0].includes(this.dummyWord[i])) {
                this.word = this.word + this.dummyWord[i];
            
           } else if (this.dummyWord[i] === " ") {
            this.word = this.word + '_'
           }
        }
           
        
        this.plug          = {'A':'A', 'B':'B', 'C':'C', 'D':'D','E':'E',
                               'F':'F','G':'G','H':'H', 'I':'I','J':'J',
                               'K':'K','L':'L','M':'M','N':'N','O':'O','P':'P',
                               'Q':'Q','R':'R','S':'S','T':'T','U':'U','V':'V',
                               'W':'W','X':'X','Y':'Y','Z':'Z','1':'1','2':'2',
                               '3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','0':'0','_':'_'};
        this.rotors = [this.rotorOne, this.rotorTwo, this.rotorThree, this.rotorFour, this.rotorFive]
        
        this.rotorConfig = {};

        for (let i = 0; i < props.rotorChoices.length; i++) {
            this.rotorConfig['rotor' + (i + 1).toString()] = this.rotors[props.rotorChoices[i]]
        }
      
   
       //plug board configuration
       let idx = 0
       for (let i = 0; i < props.plugBoard.length / 2; i++) {
        var letterSwap1 = props.plugBoard[idx]
        var letterSwap2 = props.plugBoard[idx+1]
        this.plug[letterSwap1] = letterSwap2
        this.plug[letterSwap2] = letterSwap1
        idx = idx + 2
       };

  

    this.rotate = this.rotate.bind(this);
    this.enigma = this.enigma.bind(this);
    this.word = this.enigma(this.word);
  

        
 };  // end of constructor

    rotate(num,  rotor = this.rotorOne) {
        
            for (let i = 0; i < num; i++) {
                var letter = rotor[1][0]
                rotor[1] = rotor[1].substring(1);
                rotor[1] = rotor[1] + letter

            }
          return  rotor[1];
        

        }
  
    enigma(word) {
       
        const {rotor1, rotor2, rotor3} = this.rotorConfig;
        const reflector = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ_1234567890',
        '0987654321_ZYXWVUTSRQPONMLKJIHGFEDCBA'];
        
        var newWord = '';
        let [r1, r2] = [0,0];
   
        for (let i = 0; i < word.length; i++) {
            var letter = word[i];
            

            letter = this.plug[letter];
            
            const lengthOfR = rotor1[1].length;
            
            var firstIdx = rotor1[1].indexOf(letter);
            
            var secondLetter = rotor2[0][firstIdx];
            
            var secondIdx    = rotor2[1].indexOf(secondLetter);
            var thirdLetter  = rotor3[0][secondIdx];
            
            var thirdIdx     = rotor3[1].indexOf(thirdLetter);
            
            var reflectorLetter = reflector[1][thirdIdx]
            var reflectorIdx    = reflector[0].indexOf(reflectorLetter);
            
            thirdLetter         = rotor3[1][reflectorIdx]
            thirdIdx            = rotor3[0].indexOf(thirdLetter);
            secondLetter        = rotor2[1][thirdIdx];
        
            secondIdx           = rotor2[0].indexOf(secondLetter);
            var output          = rotor1[1][secondIdx];
            output         = this.plug[output];
        
            newWord = newWord + output;
    
             
            this.rotate(1,rotor1);
            
            r1++
            if (r1 >= lengthOfR) {
                this.rotate(1, rotor2);
                r2++
                r1 = 0
            };
            if (r2 >= lengthOfR) {
                this.rotate(1, rotor3)
                r2 = 0;
            };
        
    }
   
    
    
    return newWord;      }
        




render() { 
     return <div>{this.word}</div>  }

}

