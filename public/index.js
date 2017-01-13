var currencyConversions;

$.ajax({
    url: "https://api.fixer.io/latest",
    global: false,
    success: function(data) {
        console.log("data", data);
        currencyConversions = data //JSON.parse(data);
        currencyConversions.rates.EUR = 1;
    }
});

$('#currency-input').on('input', conversionDomChange());

$('.currency-select').on('change', conversionDomChange());

function conversionDomChange() {
    var convertFromRate = currencyConversions.rates[$("#converting-from").value];
    var convertToRate = currencyConversions.rates[$("#converting-to").value];
    var outputBox = $("#dollar-amount");
    var originalAmount = $("#currency-input").value;
    
    outputBox.value = convertCurrency(originalAmount, convertFromRate, convertToRate);
}

function convertCurrency(originalAmount, convertFromRate, convertToRate) {
    return (originalAmount * (convertToRate / convertFromRate)); 
}