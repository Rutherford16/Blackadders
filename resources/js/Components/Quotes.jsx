import { useEffect, useState } from 'react';


export default function Quotes() {
    const [randomQuote, setRandomQuote] = useState({});
    const getQuotes = () => {
        fetch('/json/quotes.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (quotesData) {
                console.log(quotesData);
                setRandomQuote(quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)]);
                console.log(randomQuote.quote);
                console.log(randomQuote.author);
            });
    };

    function nextQuote() {
        getQuotes();
    }

    useEffect(() => {
        getQuotes();
    }, []);

    return (
        <div className='bg-gray-600 w-3/4 mx-auto mt-14 p-4 rounded' id="quote-box">
            <p className='text-lg' id="text">"{randomQuote.quote}"</p>
            <p className='text-sm mb-4' id="author">- {randomQuote.author}</p>
            <hr className='mb-2' />
            <a href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + randomQuote.quote + '" - ' + randomQuote.author)} target='_blank' id="tweet-quote" className='hover:text-gray-200 inline-block'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
                </svg>
            </a>
            <button type="submit" className='bg-gray-500 hover:bg-gray-400 p-2 rounded float-right' id="new-quote" onClick={nextQuote}>Next Quote</button>
        </div>
    );
}