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

$('#currency-input').on('input', function(event) {
   console.log(event.originalEvent.target.value); 
});

$('.currency-select').on('change', function(event) {
   console.log(event.originalEvent.target.value); 
});

function convertCurrency(event) {
    var convertFrom = $("#converting-from").value;
    var convertTo = $("#converting-to").value;
}