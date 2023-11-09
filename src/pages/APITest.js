
import { useState } from 'react'

function DictForm()
{
    const [word, setWord] = useState('');
    const [phonetics, setPhonetic] = useState([]);
    const [meanings, setMeanings] = useState([]);

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
            console.log(data);

            setPhonetic(data[0].phonetics);
            setMeanings(data[0].meanings);

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
            
            {(meanings.length > 0) && (
                <>
                    <h2>API RESPONCE</h2>

                    <ul>

                        <li>
                            <ul>
                                {meanings.map((entry, index) => (
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

                        <li> 
                            { phonetics[0].text } 
                        </li>
                        
                        <li>
                            <audio controls>
                                <source src={phonetics[0].audio} type='audio/mpeg' ></source>
                                Your browser does not support the audio element.
                            </audio>
                        </li>

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