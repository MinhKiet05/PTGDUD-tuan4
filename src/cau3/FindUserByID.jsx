import { useEffect, useState } from 'react'

export default function FindUserByID(){
    const [data, setData] = useState(null)
    const [userID, setUserID] = useState('')
    const [searchID, setSearchID] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] =useState(null)
    var url = `https://jsonplaceholder.typicode.com/users/${searchID}`

    useEffect(()=>{
    if(!searchID) return ;    
    async function fetchUserByID(){
        setLoading(true)
        setError(null)
        try{
            var res = await fetch(url)
            if(!res.ok){
                throw new Error("Error not found")
            }
            var jsonData = await res.json()
            setData(jsonData)
            setError(null)
        }catch(err){
            setTimeout(()=>{
                setLoading(false)
                setError(err.message)
                setData(null)
            },1000)
            
        }finally{
            setTimeout(()=>{
                setLoading(false)
            },1000)
        }
        

    }

    fetchUserByID()
    },[searchID])
    
    const handleFindUser = ()=>{
        setSearchID(userID)
    }


    return (<>
    <input type="text" name="" value={userID} id="" onChange={(e)=>setUserID(e.target.value)}/>
    <button onClick={handleFindUser}>Find</button>
        {loading && <p>Loading...</p>}
        {error && <p>User not found</p>}
        {data && !loading && (<div>
            <p>{data.name}</p>
            <p>{data.phone}</p>
            <p>{data.website}</p>
        </div>)}
    </>)
}