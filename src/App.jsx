import { useEffect, useRef, useState } from 'react';
import { upperCaseLetters,lowerCaseLettters,numbers,specialCharacters } from './components/Characters';
import './App.css'

function App() {

  const [password, setPassword] = useState("");
  const [passwordlength, setPasswordLength] = useState(20);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [IncludeSymboles, setIncludeSymboles] = useState(true);

  const copybtn = useRef();

  const handleGentratePassword = () => {
    if(!password && !includeUpperCase && !includeLowerCase && !includeNumbers && !IncludeSymboles){
      return (
        alert("must enter atleast one option")
      )
    }

    let characterList = "";

    if(includeUpperCase){
      characterList += upperCaseLetters
    }
    if(includeLowerCase){
      characterList += lowerCaseLettters
    }
    if(includeNumbers){
      characterList += numbers
    }
    if(IncludeSymboles){
      characterList += specialCharacters
    }

    setPassword(createPassword(characterList))
  };

  const createPassword = (characterList) => {
    let password = "";
    let characterLength = characterList.length;

    for(let i = 0; i < passwordlength; i++){
       const characterIndex = getRandomIndex(characterLength);
       password += characterList.charAt(characterIndex);
    }

    return password;
  };

  const getRandomIndex = (limit) => {
    return Math.round(Math.random() * limit)
  };

  useEffect(() => {
    handleGentratePassword();
    // setPassword("")
  },[])

  const copypassword = () => {
    const newtextarea = document.createElement("textarea");
    newtextarea.innerText = password;
    document.body.appendChild(newtextarea);
    newtextarea.select();
    document.execCommand("copy");
    newtextarea.remove();

    copybtn.current.disable = true;
    setTimeout(() => {
      copybtn.current.disable = false;
    },3000)
  };
  
  const handleClick = () => {
    copypassword();
  };

 
  return (
   <>
   <div className="container-fluid main-div">
    <div className="row sub-div">
      <div className="col-sm text-center mt-5 ">
        <h1>Random password Generator</h1>
      </div>
    </div>
    <div className="row text-center">
      <div className="col-sm bg-light">
        <h1>{password}</h1>
        <button className='mb-3' 
        ref={copybtn}
        onClick={handleClick}
        >
          Copy Password
        </button>
      </div>
    </div>
    <div className="row text-center bg-light">
      <div>
        <label  htmlFor='password length'>password length : </label>
        <input type='number' id='password length' min="10" max='20' required
        defaultValue={passwordlength}
        onChange={(e) => setPasswordLength(e.target.value)}
        />
      </div>
      <div>
        <label  htmlFor='capitialletters'>Includes UpperCase Letters : </label>
        <input type='checkbox' id='capitialletters' 
        checked={includeUpperCase}
        onChange={(e) => setIncludeUpperCase(e.target.checked)}
        />
      </div>
      <div>
        <label  htmlFor='smallletters'>Includes Lower Case Letters : </label>
        <input type='checkbox' id='smallletters' 
        checked={includeLowerCase}
        onChange={(e) => setIncludeLowerCase(e.target.checked)}
        />
      </div>
      <div>
        <label  htmlFor='numbers'>Includes Numbers : </label>
        <input type='checkbox' id='numbers'
        checked={includeNumbers}
        onChange={(e) => setIncludeNumbers(e.target.checked)} 
        />
      </div>
      <div>
        <label  htmlFor='symboles'>Includes Symboles : </label>
        <input type='checkbox' id='symboles' 
        checked={IncludeSymboles}
        onChange={(e) => setIncludeSymboles(e.target.checked)}
        />
      </div>
      <div>
        <button className='btn btn-primary mb-3 mt-2' onClick={handleGentratePassword}>Generate Password</button>
      </div>
    </div>
   </div>
   </>
  )
}

export default App
