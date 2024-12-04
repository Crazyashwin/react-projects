import { useState, useEffect } from "react";
import InputBox from "./components/inputComponent.jsx";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import useCurrency from "./hooks/useCurrency.jsx";

function App() {
    const [options, setOptions] = useState([]);
    const [advanceButton, setAdvanceButton] = useState(false);
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const [date, setDate] = useState(today);
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Load theme preference from localStorage
        return localStorage.getItem("theme") === "dark";
    });

    const nextCurrency = useCurrency(from);
    const currencyInfo = useCurrencyInfo(from, date);

    const handleOptions = () => {
        if (advanceButton && currencyInfo) {
            setOptions(Object.keys(currencyInfo));
        } else if (advanceButton != true &&  nextCurrency) {
            setOptions(Object.keys(nextCurrency));
        } else {
            setOptions([]);
        }
    };

    const toggleAdvanceButton = () => {
        setAdvanceButton((prev) => !prev);
    };

    const swap = () => {
        setFrom(to);
        setTo(from);
        setAmount(convertedAmount);
        setConvertedAmount(amount);
    };

    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to]);
        } else if (nextCurrency && nextCurrency[to]) {
            setConvertedAmount(amount * nextCurrency[to]);
        } else {
            console.error("Conversion rate not available.");
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    useEffect(() => {
        handleOptions();
    }, [advanceButton, currencyInfo, nextCurrency]);

    return (
        <div
            className={`min-h-screen ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            } flex items-center justify-center py-8`}
        >
            {/* Dark Mode Toggle Button */}
            <button
                onClick={toggleDarkMode}
                className="absolute top-4 left-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {/* Toggle Advance Mode */}
            <button
                type="button"
                onClick={toggleAdvanceButton}
                className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {advanceButton ? "Switch to Basic Mode" : "Switch to Advanced Mode"}
            </button>

            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                    Currency Converter
                </h2>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                    Currency converter by Ashwin Gudepu. Convert 200+ currencies on the go.
                </p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert();
                    }}
                    className="space-y-6"
                >
                    {/* Date Input */}
                    {advanceButton ? (
                        <div className="flex flex-col space-y-2">
                            <label
                                htmlFor="date"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Enter Date
                            </label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                id="date"
                                placeholder="Enter date you want to see conversion on"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Basic mode active. Date-based conversion unavailable.
                        </p>
                    )}

                    {/* From InputBox */}
                    <InputBox
                        label="From"
                        amount={amount}
                        onAmountChange={setAmount}
                        onCurrencyChange={(currency) => setFrom(currency)}
                        selectCurrency={from}
                        currencyOptions={options}
                    />

                    {/* Swap Button */}
                    <button
                        type="button"
                        onClick={swap}
                        className="w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                        Swap
                    </button>

                    {/* To InputBox */}
                    <InputBox
                        label="To"
                        amount={convertedAmount}
                        onCurrencyChange={setTo}
                        selectCurrency={to}
                        currencyOptions={options}
                        amountDisable
                    />

                    {/* Convert Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Convert
                    </button>
                </form>

                {/* Conversion Info */}
                {currencyInfo && currencyInfo[to] && (
                    <pre className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-md text-sm text-gray-600 dark:text-gray-300 overflow-auto">
                        Conversion rate: {JSON.stringify(currencyInfo[to], null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
}

export default App;
