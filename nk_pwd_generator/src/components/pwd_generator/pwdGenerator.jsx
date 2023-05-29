import './pwdGenerator.css'
import { useState } from 'react';

export const PwdGenerator = () => {

    const [pwdLength,setPwdLength] = useState(4);
    const [pwdResult,setPwdResult] = useState("");
    const [pwdStength,setPwdStength] = useState("");
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [dispStrength,setDispStrength] = useState(displayStrength(calculatePasswordStrength("")))
    const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz"
    const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const allNumbers = "0123456789"
    const allSymbols = "&#@$£+-*/.°="
    var regexSymbols = /[\W_]/
    var regexNumbers = /\d/
    var regexLowercase = /[a-z]/
    var regexUppercase = /[A-Z]/

    function calculatePassword () {
        let tempBase = ""
        let result = ""
        if (uppercase) { tempBase += upperAlphabet }
        if (lowercase){ tempBase += lowerAlphabet }
        if (numbers){ tempBase += allNumbers }
        if (symbols){ tempBase += allSymbols }
        let hasNotUppercase = uppercase
        let hasNotLowercase = lowercase
        let hasNotSymbols = symbols
        let hasNotNumbers = numbers
        if(tempBase != "" ){
            while ((hasNotUppercase || hasNotLowercase || hasNotNumbers || hasNotSymbols)) {
                result = ""
                for (let index = 0; index < pwdLength; index++) {
                    let randNumber =  Math.floor(Math.random() * tempBase.length);
                    result += tempBase[randNumber]
                }
                if (uppercase) {
                    if (regexUppercase.test(result)) {hasNotUppercase = false} else {hasNotUppercase = uppercase , hasNotLowercase = lowercase,hasNotNumbers = numbers, hasNotSymbols = symbols}
                }
                if (lowercase) {
                    if (regexLowercase.test(result)) {hasNotLowercase = false}  else {hasNotUppercase = uppercase , hasNotLowercase = lowercase,hasNotNumbers = numbers, hasNotSymbols = symbols}
                }
                if (numbers) {
                    if (regexNumbers.test(result)) {hasNotNumbers = false}  else {hasNotUppercase = uppercase , hasNotLowercase = lowercase,hasNotNumbers = numbers, hasNotSymbols = symbols}
                }
                if (symbols) {
                    if (regexSymbols.test(result)) {hasNotSymbols = false}  else {hasNotUppercase = uppercase , hasNotLowercase = lowercase,hasNotNumbers = numbers, hasNotSymbols = symbols}
                }
            }
        } else {
            result = "No parameters selected"
        }
        return result
    }

    function calculatePasswordStrength (password) {
        let result = 0
        result +=  Number(pwdLength)
        if (password == "No parameters selected" || password == "") {
            return ""
        }
        if (regexSymbols.test(password)) {result += 7 }
        if (regexNumbers.test(password)) {result += 4 }
        if (regexLowercase.test(password)) {result += 2}
        if (regexUppercase.test(password)) {result += 2}
        result = ((result * 40) / 30)
        if (result <= 13){
            return "TOO LOW"
        } else if (result <= 22) {
            return "EASY"
        } else if (result <= 28) {
            return "MEDIUM"
        } else if (result <= 40){
            return "HARD"
        } else {
            return ""
        }
    }

    function displayStrength (strength) {
        let color = ""
        let coloredNb = 0
        if (strength == "TOO LOW") {
            coloredNb = 1
        } else if (strength == "EASY") {
            color = "rgb(230, 117, 72)"
            coloredNb = 2
        } else if (strength == "MEDIUM") {
            color = "rgb(223, 223, 126)"
            coloredNb = 3
        } else if (strength == "HARD") {
            color = "lightgreen"
            coloredNb = 4
        } 
        let result = []
        for (let index = 0; index < coloredNb; index++) {
            result.push(<span key={index} className='strengthBar' style={{backgroundColor:color,border:`2px solid ${color}`}}></span>)
        }
        for (let index = 0; index < 4 - coloredNb; index++) {
            result.push(<span key={4-index} className='strengthBar' style={{border:`2px solid ${color}`}}></span>)
        }
        return (    
            <div className='rowContainer containerDisplayStrength'>
                {result}
            </div>
        )       
    }

    function handleChangeRange(e) {
        e.preventDefault();
        setPwdLength(e.target.value)
        return {value: e.target.value}
    }

    function handleChangeChecked(e,name) {
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
      const password = calculatePassword()
      setPwdResult(password)
      const pwdSten = calculatePasswordStrength(password)
      setPwdStength(pwdSten)
      setDispStrength(displayStrength(pwdSten))
    }

    return (
        <div className='columnContainer alignCenter containerPage'>
            <div className='containerPwdGen columnContainer'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <form onSubmit={handleSubmit} className='formStyle columnContainer'>
                    <div className='rowContainer containerHeader'>
                        <h2>{pwdResult}</h2>
                        <span onClick={() => navigator.clipboard.writeText(pwdResult)} className="googleIcon material-symbols-outlined">content_copy</span>
                    </div>
                    <div className='content columnContainer'>
                        <input type="range" onChange={e => handleChangeRange(e)} min={"5"} max={"15"} defaultValue={"4"} step={"1"}/>
                        <div className='checkboxContainer columnContainer'>
                            <div className='rowContainer containerInCheck'>
                                <input type="checkbox" onChange={e => handleChangeChecked(e , "uppercase")}  name="Uppercase"/>
                                <label htmlFor="">Uppercase</label>
                            </div>
                            <div className='rowContainer containerInCheck'>
                                <input type="checkbox" onChange={e => handleChangeChecked(e , "lowercase")} name="Lowercase"/>
                                <label htmlFor="">Lowercase</label>
                            </div>
                            <div className='rowContainer containerInCheck'>
                                <input type="checkbox" onChange={e => handleChangeChecked(e , "numbers")} name="Numbers"/>
                                <label htmlFor="">Numbers</label>
                            </div>
                            <div className='rowContainer containerInCheck'>
                                <input type="checkbox" onChange={e => handleChangeChecked(e , "symbols")} name="Symbols"/>
                                <label htmlFor="">Symbols</label>
                            </div>
                        </div>
                        <div className='rowContainer containerStength '>
                            <h3>STENGTH</h3>
                            <div className='rowContainer alignCenter containerStengthGap'>
                                <h3>{pwdStength}</h3>
                                {dispStrength}
                            </div>
                        </div>
                        <button className='sumbmitBtn' type="submit">Generate</button>
                    </div>
                </form>
            </div>
        </div>
    )
}