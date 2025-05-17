 import React , { useState , useEffect, useMemo,} from "react" 

const Card = (({name , position , image , biography }) => {
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

const MemoizedCard = React.memo(Card)
 
 export default function App() {
    const [politcList, setPolitcList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedPosition , setSelectedPosition] = useState("")

   

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

  const positions = useMemo(() => {
    const singlePosition = []
    politcList.forEach((politic) => {
        if(!singlePosition.includes(politic.position) ){
             singlePosition.push(politic.position)
        }
       
    })
      return singlePosition
  },[politcList])

  console.log(positions)

  const filteredPolitcList = useMemo(() => {
    return politcList.filter((politic) => {
        const isName = politic.name.toLowerCase().includes(searchTerm.toLowerCase())
        const isBio = politic.biography.toLowerCase().includes(searchTerm.toLowerCase())
        const isValidPosition = selectedPosition === "" || selectedPosition === politic.position
        return (isBio || isBio) && isValidPosition
    })

  } , [politcList, searchTerm, selectedPosition])

 

    return (
        <div className="app">
            <h1>Politicians</h1>
            <div>
            <input type="text"
                placeholder="Cerca un politico"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    
                }}
            />
            <select 
            value={selectedPosition}
            onChange={(e) =>
                 setSelectedPosition(e.target.value)}
            >
                <option value="">Selezionare una Carica</option>
                {positions.map((position , index) =>(
                    <option key={index} value={position}>{position}</option>
                ))}


            </select>
            </div>
             <div className="filtered-list">
            {filteredPolitcList.length > 0 ? (
                <ul>
                    {filteredPolitcList.map((politc) => (
                        <li className="single-politic" key={politc.id}>
                            <MemoizedCard
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
            
        </div>
    )
}