import { useEffect, useState } from 'react'
export default function SearchPost() {
    const [data, setData] = useState([])
    const [displayData, setDisplayData] = useState([])
    const [title, setTitle] = useState('')
    const url = "https://jsonplaceholder.typicode.com/posts";

    useEffect(() => {
        async function fetchPost() {
            try {
                var duLieu = await fetch(url);
                var duLieuJson = await duLieu.json()
                setData(duLieuJson);
                setDisplayData(duLieuJson)
                console.log(duLieuJson)
            } catch (err) {
                console.error(err);

            } finally {

            }


        }
        fetchPost()
    }
        , []);
    
    
    
    
    useEffect(() => {
        if (title.trim() === "") {
            setDisplayData(data)
        } else {
            const filtered = data.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()));
            setDisplayData(filtered);
        }

    }, [title, data])
    return (<>

        <input type="text" placeholder='Title' value={title} onChange={e => {
            setTitle(e.target.value)
        }} />
        {displayData.length === 0 ? (<p>Không có post nào</p>) : (displayData.map((item) => (
            <div key={item.id}>
                <p>{item.title}</p>
            </div>
        )
        ))}
    </>)

}