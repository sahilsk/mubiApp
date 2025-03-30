import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Card from './components/Card.jsx'
// import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <main className="w-full max-w-5xl mx-auto px-4 bg-slate-950 min-h-screen">


                //background pattern
                <div className="relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div><div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div></div>


                <h2> Hello World </h2>
                <Card />

            </main>
        </>
    )
}

export default App
