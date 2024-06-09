import { useState,useCallback,useEffect, useRef } from 'react'


function App() {
  const[length, setLenght] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charecterAllowed, setCharecterAllowed] = useState(false)
  const[Password,setPassword] = useState("")

  // useRef hook
  const passRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if(charecterAllowed) str += "!@#$%^&*_+=><?/~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      

      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length,numberAllowed,charecterAllowed,setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(Password)
  },[Password])

 useEffect(() => {
  passwordGenerator()
 },[length,numberAllowed,charecterAllowed,passwordGenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600 py-3 '>
     <h1 className='text-white text-center my-3'>Password Generator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
     <input 
     type="text"
     value={Password}
     className='outline-none w-full py-1 px-3'
     placeholder='password'
     readOnly
     ref={passRef}
     />
     <button
     onClick={copyPasswordToClipBoard}
     className='outline-none bg-blue-900 text-white px-3 py-0.5 shrink-0'
     >copy</button>
     </div>
      <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type='range' 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) =>{setLenght(e.target.value)}}
            />
            <label>Length{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked = {numberAllowed}
              id='numberInput'
              onClick={() => {
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked = {charecterAllowed}
              id='charInput'
              onClick={() => {
                setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="charInput">Charecters</label>
          </div>

      </div>
     </div>
    </>
  )
}

export default App
