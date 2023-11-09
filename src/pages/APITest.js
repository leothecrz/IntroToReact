
import { useState } from 'react'

function DictForm()
{
    const [word, setWord] = useState('');
    const [apiData, setAPIData] = useState([]);

    const handleSubmit = async (evnt) =>
    {
        evnt.preventDefault();
        try 
        {
            const resp = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );

            if(!resp.ok)
            {
                throw new Error("Responce Failed");
            }

            const data = await resp.json();
            setAPIData(data);

        } 
        catch (error) 
        {
            console.error('Error fetching dictionary definition. Error: ', error);
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={word} onChange={(e) => setWord(e.target.value)} placeholde='Enter A Word ...'></input>
                <button type='submit'> Search </button>
            </form>
            
            {(apiData.length > 0) && (
                <>
                    <h2>API RESPONCE</h2>

                    <ul>
                        <li>
                            <ul>
                                {apiData[0].meanings.map((entry, index) => (
                                    <div key={index}>
                                        <h3> {entry.partOfSpeech} </h3>
                                        <ul>
                                            {entry.definitions.map((def, dex) => (
                                                <li key={dex} > {def.definition} </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </ul>
                        </li>

                        <li>{apiData[0].phonetic}</li>
                        
                        <li></li>
                    </ul>
                </>
            )}

        </>
    );

}


function Apitest()
{

    return (
        <>
            <h1 className="pageHeader"> API </h1>
            <DictForm />
        </>
    );
}

export default Apitest;