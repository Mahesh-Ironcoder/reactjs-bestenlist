import {useState} from 'react';


export default function AlertInput() {
    const [input, setInput] = useState("")
    return (
        <form>
            Input: <input type="text" value={input} onChange={(e)=> setInput(e.target.value) }/> <br />
            <button onClick={()=>alert(input)}>Submit</button >
        </form >
    )
}