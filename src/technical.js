import React from 'react';


const Technical = () =>  {

    return (
        <div className='technical-overview'>
        <h2>A Technical Overview </h2>
         <h4>The Original Design</h4>
          <div className='img-wrapper'>
              <img alt='' src='https://spartacus-educational.com/00enigma2.jpg'/>
              </div>
            <p> At first glance this blueprint may seem a little bit intimidating but it is actually not. 
                The machine is very simple you type one letter and an electrical signal travels between 3 rotors and then gets reflected by the reflector and travels back out as an output.
                As you can see through the blueprint. The machine is heavily dependant on the reflector (The very last Rectangle/wheel at the very top) , 
                with a badly configured reflector you will not be able to properly decipher the encoded key that you've typed in. The entire scrambling process is based on the 
                electrical pathways, for instance lets use four letters as an example. In the source code for the Api, I mimicked the electrical pathways by making the rotors into arrays with two items,
                those items are two strings so ['abcd', 'badc']. In this example I'll only use one rotor and our reflector will be ['abcd','dcba'] in the reflector the two strings must only have 1 unique pair, so if A maps to C then C must map to A.So lets say we type 'A', 'A' then finds the index of itself in the second item in the array/rotor which in this case would be 
                1 it then finds the index 1 in the reflector which in this case is B and 'B' then finds itself in the second item in the reflector which will be 2. This is the part where the reflector plays a key role.
                We now find the index of 2 in second item in the rotor array which will be D, so 'A' gets encrypted as 'D' if you now type in 'D' as your input the same process will happen and the reflector will reflect the opposite 
                pathway to the rotors so the output would be 'A'. So in short 'A' =~ 1 =~ 'B' =~ 2 Reflects Back as D if we typed the input as 'D' =~ 2 =~ 'C' =~ 1 Reflects back as 'A' since A is array[1], If you take a look at the diagram you can see the encrypted text links directly with the input. 
                This is how we are able to encrypt and decrypt messages without an encryption and decryption mode.  
            </p>
         <h4>Computing All Possible Settings</h4>
         <p>With Permutations we can calculate the number of all possible settings : ((5! / (5-3)!)  * 37^3 )  *  (37! / (37 - 20)! * 2^10 * 10!) = 3.16 Septillion or 3.1649131 * 10^25 </p>
         <p>Explanation: since we have 5 rotors and only choosing 3 of them (and order matters), were going to need Permutations to calculate all possible orders the rotors could be arranged in, 5 factorial gives all possible arrangments of 5 items we only need 3 out of the 5 so we then must divide 5! by (5-3)! which is 2! , that comes out to be 60,
              we then get all configuration settings, since there are 37 in total and three sets, we calculate 37^3 or 37 cubed which is 50,653 you multiply that by 60 and you get 3,039,180 million possible settings. Now we need to calculate all the possible settings for the plug board. First lets start with the items dataset which is 37.
              What were looking for is how many unique 10 pairs of 2s is there from this entire dataset. The order in which the letters are paired doesn't matter, so Jk = KJ also the order in which the pairs are arranged doesn't matter either.
              So by that logic we now know what equation to use in this model, since arrangments do not matter at all we divide by 10! and since each pair can have two possible arrangments we also divide by 2^10, we are only selecting 10 pairs
              so 2 * 10 = 20 the resulting equation for the entire Plug Board settings is 37! / (37 - 20)! * 2^10 * 10! <a href='https://www.codesandciphers.org.uk/enigma/steckercount.htm'>Click for more info</a>
    
         </p>
         <p>Note: Deprecation - The rotor settings for each rotor (to improve user experience) were removed. So we no longer need 37^3 in our equation </p>

         <p>Creator : <a href='https://aseanimiller.netlify.app'>Aseani Miller</a></p>
         <p> Original Machine: <a href='https://en.wikipedia.org/wiki/Enigma_machine'>Click here</a> </p>

        </div>
    )
}


export default Technical;