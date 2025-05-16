 import { useState , useEffect, use } from "react" 
 
 export default function App() {
    const [politcList, setPolitcList] = useState([])

   async function fetchPolitcList(){
    try{
      const response= await fetch("http://localhost:5000/politicians")
      const data = await response.json()
      setPolitcList(data)
    
    }catch (error) {
      console.error("Error nel recupero dei dati:", error);
    }
  }

  useEffect(() => { 
    fetchPolitcList()
  }
  , [])
  
   console.log(politcList)

    return (
        <div className="app">
            <h1>Politicians</h1>
            <ul>
                {politcList.map((politc) => (
                    <li className="single-politic" key={politc.id}>
                        <h2>{politc.name}</h2>
                        <p>{politc.description}</p>
                        <div className="image-container">
                        
                            <img src={politc.image} alt={politc.name} />
                        </div>
                        <p>Carica :{politc.position}</p>
                        <h3>Biografia</h3>
                        <p>{politc.biography}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}