import "./Output.css"
import { useEffect, useState } from 'react';

export default function Output({ askedQuestion, sql, queriedDb, results }) {
    
    const [resultsDimensionality, setResultsDimensionality] = useState(0);

    useEffect(() => {
        const findArrDimensions = (arr) => {
            const dimensions = [
                arr.length,
                arr.reduce((x, y) => Math.max(x, y.length), 0)
            ];  
        
            return dimensions;
        }

        //set dimensionality
        const dimensions = findArrDimensions(results);
        setResultsDimensionality(dimensions);
    }, [results])
    

    return (
        <section id="output">
            <h5>{askedQuestion ? askedQuestion : "User Requested"}</h5>
            <h2>Results</h2>

            <div className='container output__container'>
            {sql && //console.log(results) &&
                <div className='output__item output__sql'>
                <h3><b>Generated SQL</b></h3>
                <p>{sql}</p>
                </div>
            }
            {results.length !== 0 && //only display if results available
                <div className='output__item output__rslts'>
                <h3><b>Information from {queriedDb} Database</b></h3>
                <ul className='output__rslts__list'>
                    {resultsDimensionality && (resultsDimensionality[1] === 1 ? //if 2nd dimesion is singular, display normally
                    (results.map((rslt, i) => (
                        <li className='output__rslts__list__elly' key={i}>{rslt}</li>
                    ))) : //if 2nd dimension greater than 1, display each dimension in its own row
                    (results.map((rsltArry, i) => {
                        return(
                        <div className='output__rslts__list__ellys__container' key={i}>
                            {rsltArry.map((rslt, j) => (
                            <li className='output__rslts__list__elly' key={j}>{rslt}</li>
                            ))}
                        </div>
                        )
                    }))
                    )}
                </ul>
                </div>
            }
            </div>
        </section>
    )
}
