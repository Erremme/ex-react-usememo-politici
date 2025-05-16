 import { useState , useEffect, useMemo } from "react" 
 
 export default function App() {
    const [politcList, setPolitcList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

   

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

  const filteredPolitcList = useMemo(() => {
    return politcList.filter((politic) => {
        return(
        politic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        politic.biography.toLowerCase().includes(searchTerm.toLowerCase()) 
        )
    })
  } , [politcList, searchTerm])

  console.log(filteredPolitcList)

  
  
   console.log(politcList)
   console.log(searchTerm)

    return (
        <div className="app">
            <h1>Politicians</h1>
            <input type="text"
                placeholder="Cerca un politico"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    
                }}
            />
             <div className="filtered-list">
            {filteredPolitcList.length > 0 ? (
                <ul>
                    {filteredPolitcList.map((politc) => (
                        <li className="single-politic" key={politc.id}>
                            <h2>{politc.name}</h2>
                            <div className="image-container">
                                <img src={politc.image} alt={politc.name} />
                            </div>
                            <p>Carica :{politc.position}</p>
                            <h3>Biografia</h3>
                            <p>{politc.biography}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nessun politico trovato</p>
            )}
            </div>
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