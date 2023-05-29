import './pwdGenerator.css'
import { useState } from 'react';

export const PwdGenerator = () => {

    const [pwdLength,setPwdLength] = useState(3);
    const [pwdResult,setPwdResult] = useState("");
    const [pwdStength,setPwdStength] = useState("");
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [message, setMessage] = useState('');
    const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz"
    const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const allNumbers = "0123456789"
    const allSymbols = "&#@$£"

    function calculatePassword () {
        let tempBase = ""
        let result = ""
        if (uppercase) { tempBase += upperAlphabet }
        if (lowercase){ tempBase += lowerAlphabet }
        if (numbers){ tempBase += allNumbers }
        if (symbols){ tempBase += allSymbols }
        if(tempBase != "" ){
            for (let index = 0; index < pwdLength; index++) {
                let randNumber =  Math.floor(Math.random() * tempBase.length);
                result += tempBase[randNumber]
                console.log("a");
            }
        }
        return result
    }

    function calculatePasswordStrength () {
        let result = 0
        result +=  Number(pwdLength)
        var regexSybols = /[\W_]/;
        var regexNumbers = /\d/;
        var regexLowercase = /[a-z]/;
        var regexUppercase = /[A-Z]/;
        if (regexSybols.test(pwdResult)) {
            result += 5
        }
        if (regexNumbers.test(pwdResult)) {
            result += 4
        }
        if (regexLowercase.test(pwdResult)) {
            result += 3
        }
        if (regexUppercase.test(pwdResult)) {
            result += 3
        }
        result = ((result * 40) / 30)
        if (result <= 13){
            return "TOO LOW"
        }     
        else if (result <= 22) {
            return "EASY"
        }   
        else if (result <= 28) {
            return "MEDIUM"
        }  
        else if (result <= 40){
            return "HARD"
        }
    }

    function handleChangeRange(e) {
        e.preventDefault();
        setPwdLength(e.target.value)
        return {value: e.target.value}
    }

    function handleChange(e,name) {
        let isChecked = e.target.checked;
        switch (name) {
            case "symbols":
                setSymbols(isChecked)
                break;
            case "numbers": 
                setNumbers(isChecked)
                break
            case "lowercase":
                setLowercase(isChecked)
                break
            case "uppercase": 
                setUppercase(isChecked)
            default:
                break;
        }
    }

    function handleSubmit(e) {
      e.preventDefault();
      setMessage(`Parameters : ${uppercase} ${lowercase} ${numbers} ${symbols} Range : ${pwdLength}`);
      setPwdResult(calculatePassword())
      setPwdStength(calculatePasswordStrength())
      console.log(pwdStength);
    };

    return (
        
        <div className='containerPwdGen columnContainer'>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <form onSubmit={handleSubmit} className='formStyle columnContainer'>
                {/* <h2>{message}</h2> */}
                <div className='rowContainer containerHeader'>
                    <h2>{pwdResult}</h2>
                    <span class="googleIcon material-symbols-outlined">content_copy</span>
                </div>
                <div className='content columnContainer'>
                    <input type="range" onChange={e => handleChangeRange(e)} min={"5"} max={"15"} defaultValue={"2"} step={"1"}/>
                    <div className='checkboxContainer columnContainer'>
                        <div className='rowContainer containerInCheck'>
                            <input type="checkbox" onChange={e => handleChange(e ,  "uppercase")}  name="Uppercase" id="" />
                            <label htmlFor="">Uppercase</label>
                        </div>
                        <div className='rowContainer containerInCheck'>
                            <input type="checkbox" onChange={e => handleChange(e ,  "lowercase")} name="Lowercase" id="" />
                            <label htmlFor="">Lowercase</label>
                        </div>
                        <div className='rowContainer containerInCheck'>
                            <input type="checkbox" onChange={e => handleChange(e ,  "numbers")} name="Numbers" id="" />
                            <label htmlFor="">Numbers</label>
                        </div>
                        <div className='rowContainer containerInCheck'>
                            <input type="checkbox" onChange={e => handleChange(e ,  "symbols")} name="Symbols" id="" />
                            <label htmlFor="">Symbols</label>
                        </div>
                    </div>
                    <div className='rowContainer containerStength'>
                        <h3>STENGTH</h3>
                        <div className='rowContainer'>
                            <h3>{pwdStength}</h3>
                        </div>
                    </div>
                    <button className='sumbmitBtn' type="submit">Generate</button>
                </div>
              
            </form>
        </div>
    )
}