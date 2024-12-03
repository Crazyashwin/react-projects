import { useEffect, useState } from "react";

function useCurrencyInfo(currency, date) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (!currency) return; // Ensure `currency` is valid before fetching

        const url = `https://api.frankfurter.app/${date}?base=${currency}`;

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error fetching currency data: ${res.statusText}`);
                }
                return res.json();
            })
            .then((res) => {
                if (res.rates) { // `rates` is where currency data is stored in the Frankfurter API
                    setData(res.rates);
                } else {
                    console.error("No rates found in the response.");
                }
            })
            .catch((err) => console.error(err));
    }, [currency,    date]);

    return data;
}

export default useCurrencyInfo;
