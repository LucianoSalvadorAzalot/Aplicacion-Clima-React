import {  useState } from "react"


export const WheaterApp = () => {

    const [ciudad, setCiudad] = useState("")
    const [data, setData] = useState(null)

    const urlBase = "https://api.openweathermap.org/data/2.5/weather"
    const Api_Key = "605507acf87117e111e54a3ab5238541"
    const difKelvin = 273.15


    const handleCmabioCiudad = (e) =>{ 
       setCiudad(e.target.value) 
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () =>{
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${Api_Key}`)
            const data = await response.json()
            setData(data)

        } catch (error) {
             console.log("Ocurrio el siguente problema:", error)
        }
    }

    


  return (
    <div className="container">
        <h1>Aplicacion de clima</h1>

        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={ciudad}
            onChange={handleCmabioCiudad}
            
            />
            <button type="submit">Buscar</button>          
        </form>

        {
            data && (
              <div>
                 <h2>{data.name}</h2>
                 <p>Temperatura: {parseInt(data?.main?.temp - difKelvin)}°C </p>
                 <p>Condiocion Meteorologica: {data.weather[0].description}</p>
                 <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
              </div>
            )
        }
    
    </div>
  )
}
