import { useState } from 'react';
import InputBox from './components/InputComponent';
import useCurrencyInfo from './hooks/useCurrency';

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);
    const currencyInfo = useCurrencyInfo(from);
    const options = currencyInfo ? Object.keys(currencyInfo) : [];

    const swap = () => {
        setFrom(to);
        setTo(from);
        setAmount(convertedAmount);
        setConvertedAmount(amount);
    };

    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to]);
        } else {
            console.error("Conversion rate not available.");
        }
    };

    return (
        <>
            <div>
                <div>
                    <h2>Currency Converter</h2>
                    <p>Currency converter by Ashwin Gudepu. You can convert 200+ currencies on the go.</p>
                </div>
                <div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <InputBox
                            label="From"
                            id="fromBox"
                            amount={amount}
                            onAmountChange={(amount) => setAmount(amount)}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            currencyOptions={options}
                        />
                        <div>
                            <InputBox
                                label="To"
                                id="toBox"
                                amount={convertedAmount}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                currencyOptions={options}
disabled
                            />
                        </div>
<button type="submit">convert </button>
                    </form>
                    <button onClick={swap}>Swap</button>
                </div>

            </div>
        </>
    );
}

export default App;
