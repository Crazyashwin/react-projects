function InputBox({
label,
id,
amount,
onAmountChange,
onCurrencyChange,
currencyOptions= [],
selectCurrency = {from: "inr", to: "usdd"},
disabled
}) {
return(
<>
<div>
<div>
<label htmlFor={id}>
{label}
</label>
<input type="number" value={amount} 
onChange={(e) => onAmountChange(e.target.value)}
/>
</div>
<div>
<select
value={selectCurrency}
onChange={(e) => onCurrencyChange(e.target.value)}
>
{currencyOptions.map((currency) => (
<option key={currency} value={currency}>
{currency}
</option>
))}
</select>
</div>
</div>
</>
);
}
export default InputBox;