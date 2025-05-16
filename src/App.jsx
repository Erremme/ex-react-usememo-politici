 import React , { useState , useEffect, useMemo,} from "react" 

const Card = React.memo(({name , position , image , biography }) => {
  console.log("Card component re-rendered");
    return (
        <div className="single-politic" >
            <h2>{name}</h2>
            <div className="image-container">
                <img src={image} alt={name} />
            </div>
            <p>Carica :{position}</p>
            <h3>Biografia</h3>
            <p>{biography}</p>
        </div>
    )
})
 
 export default function App() {
    const [politcList, setPolitcList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

   

   async function fetchPolitcList(){
    try{
      const response= await fetch("http://localhost:5000/politicians")
      const data = await response.json()
      setPolitcList(data)
      console.log("dati ricevuti" , data)
      
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
                            <Card
                                name={politc.name}
                                position={politc.position}
                                image={politc.image}
                                biography={politc.biography}
                      />
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
                      <Card
                        name={politc.name}
                        position={politc.position}
                        image={politc.image}
                        biography={politc.biography}
                      />
                    </li>
                ))}
            </ul>
        </div>
    )
}