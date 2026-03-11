import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  var url = "https://jsonplaceholder.typicode.com/users";


  useEffect(() => {
    async function fetchAPI() {
      try {
        var res = await fetch(url)
        if (!res.ok) {
          throw new Error("Error 404...")
        }
        var data = await res.json()
        console.log(data);
        setData(data);
      } catch (err) {
        setError[err.message]
      } finally {
        setTimeout(() => { setLoading(false) }, 1000)
      }
    }

    fetchAPI()
  }, [])



  return (
    <>{
      loading ? (<p>Loading...</p>) : (error === null ? (data.map((item) => {
        return <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.email}</p>
        </div>
      })) : (<p>Error...</p>)
      )


    }
    </>
  )
}

export default App
