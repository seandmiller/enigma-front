import React from 'react';

const info = () => {

    return (<div className='instructions-wrapper'>

   
        <h3>Here are the instructions</h3>
        <li>First you need to choose the rotors your going to use. The order you place the rotors in matters (if someone else tries to decrypt your message and the rotors are in the incorrect order it will not decrypt properly)</li>
        <li>After you choose your rotors, you will need to choose a setting for each rotor from 0 - 36</li>
        
        <li>After that you have the option of using the Plug Board feature, I do not recommend it as it adds alot of complexity to the encryption but if you do choose to use it, you will pair 20 letters in pairs of 2 so 10 pairs in total. This will swap letters around as it enters the Virtual Machine</li>
     <h4>All settings must be the same in order for the decryption to work</h4>
    
    </div>)

}

export default info;