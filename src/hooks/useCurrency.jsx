import { useState, useEffect } from 'react';

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (!currency) return;

        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error fetching the currency: ${res.statusText}. Please input the right currency.`);
                }
                return res.json();
            })
            .then((res) => {
                if (res[currency]) {
                    setData(res[currency]);
                } else {
                    console.error('The currency you are searching for is not found.');
                }
            })
            .catch((err) => console.error(err));
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
