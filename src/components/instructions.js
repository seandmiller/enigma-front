import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const info = () => {

    return (<div className='instructions-wrapper'>

   
        <h3>Here are the instructions</h3>
        <li>First you must choose your encryption keys and order matters (if someone else tries to decrypt your message and the keys are in the incorrect order it will not decrypt properly)</li>
        <li>Here are the encryption symbols you can choose from | {<FontAwesomeIcon icon='key'/>} {<FontAwesomeIcon icon='atom'/>} {<FontAwesomeIcon icon='cogs'/>} {<FontAwesomeIcon icon='code'/>} { <FontAwesomeIcon icon='envelope'/>} |   you can choose 3 in total. </li>
        
        <li>After that you have the option of using the Plug Board feature, I do not recommend it as it adds a lot of complexity to the encryption but if you do choose to use it, you will pair 20 letters in pairs, so 10 pairs in total. This will swap letters around as it enters the Virtual Machine</li>
     <h4>All settings must be the same in order for the decryption to work</h4>
    
    </div>)

}

export default info;