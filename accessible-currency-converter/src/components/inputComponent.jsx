import React, { useId } from 'react';

function InputBox({
    ref,
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "USD",
    amountDisable = false,
}) {
    const id = useId();

    return (
        <div
            className="space-y-4 p-4 bg-gray-50 rounded-lg shadow-md"
            role="group"
            aria-labelledby={`${id}-label`}
        >
            {/* Amount Section */}
            <div className="flex flex-col space-y-2">
                <label
                    htmlFor={id}
                    id={`${id}-label`}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
                <input
                    id={id}
                    type="number"
                    placeholder="Enter amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                    aria-label="Amount"
                    aria-required="true"
                    aria-disabled={amountDisable}
                    className={`w-full px-4 py-2 text-sm border rounded-md ${
                        amountDisable
                            ? 'bg-gray-200 text-gray-500'
                            : 'bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                />
            </div>

            {/* Currency Section */}
            <div className="flex flex-col space-y-2">
                <p
                    id={`${id}-currency-label`}
                    className="text-sm font-medium text-gray-700"
                >
                    Currency Type
                </p>
                <select
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    aria-live="polite"
                    aria-labelledby={`${id}-currency-label`}
                    className="w-full px-4 py-2 text-sm border bg-white border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
