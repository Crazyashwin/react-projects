import { useEffect, useState } from "react";

function useCurrency(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        if (!currency) return; // Ensure `currency` is valid before fetching

        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error fetching currency data: ${res.statusText}`);
                }
                return res.json();
            })
            .then((res) => {
                if (res[currency]) {
                    setData(res[currency]);
                } else {
                    console.error(`Currency data for "${currency}" not found.`);
                }
            })
            .catch((err) => console.error(err));
    }, [currency]);

    return data;
}

export default useCurrency;
