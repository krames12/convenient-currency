var currencyConversions = {};

$.ajax({
    url: "https://api.fixer.io/latest",
    global: false,
    success: function(data) {
        currencyConversions = JSON.parse(data);
        currencyConversions.rates.EUR = 1;
        console.log('currencyConversions', currencyConversions);
    }
});