
import { useState } from 'react'

function AudioBlock( {source} )
{
    return (
        <audio controls>
            <source src={source} type='audio/mpeg' ></source>
            Your browser does not support the audio element.
        </audio>
    );
}

function DefBlock( {defs} )
{
    return (
        <ul>
        {defs.map((entry, index) => (
            <li key={index}>
                <h3> {entry.partOfSpeech} </h3>
                <ul>
                    {entry.definitions.map((def, dex) => (
                        <li className='defList'  key={dex} > {def.definition} </li>
                    ))}
                </ul>
            </li>
        ))}
        </ul>
    );
}

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
            setPhonetic(data[0].phonetics);
            setMeanings(data[0].meanings);

        } 
        catch (error) 
        {
            console.error('Error fetching dictionary definition. Error: ', error);
            alert("Definition Could not be fetched. Unknow Word")
        }

    }

    return (
        <>
            <form className='apiForm' onSubmit={handleSubmit}>
                <input type="text" value={word} onChange={(e) => setWord(e.target.value)} placeholde='Enter A Word ...'></input>
                <button type='submit'> Search </button>
            </form>
            
            {(meanings.length > 0) && (
                <div className='apiRespoce' >
                    <h2>API RESPONCE</h2>
                    <ul className='mainList'>
                        <li> <DefBlock defs={ meanings } /> </li>

                        <li> { phonetics[0].text } </li>
                        
                        <li> <AudioBlock source={ `${phonetics[0].audio}` }/> </li>
                    </ul>
                </div>
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