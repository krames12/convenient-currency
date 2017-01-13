var currencyConversions;

$.ajax({
    url: "https://api.fixer.io/latest",
    global: false,
    success: function(data) {
        console.log("data", data);
        currencyConversions = data //JSON.parse(data);
        currencyConversions.rates.EUR = 1;
        setEventHandlers();
    }
});

function setEventHandlers (){
  $('#currency-input').on('input', conversionDomChange);
  $('.currency-select').on('change', conversionDomChange);  
}

function conversionDomChange() {
    var convertFromRate = currencyConversions.rates[document.getElementById("converting-from").value];
    var convertToRate = currencyConversions.rates[document.getElementById("converting-to").value];
    var outputBox = document.getElementById("dollar-amount");
    var originalAmount = document.getElementById("currency-input").value;

    console.log("convert from", convertFromRate);
    console.log("convert to", convertToRate);
    console.log("original amount", originalAmount);

    outputBox.innerHTML = convertCurrency(originalAmount, convertFromRate, convertToRate);
}

function convertCurrency(originalAmount, convertFromRate, convertToRate) {
    var convertedValue = originalAmount * (convertToRate / convertFromRate)
    console.log(convertedValue);

    return convertedValue;
}