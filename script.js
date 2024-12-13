document.addEventListener('DOMContentLoaded', () => {
    const currencies = [
      { code: 'USD', name: 'United States Dollar' },
      { code: 'EUR', name: 'Euro' },
      { code: 'JPY', name: 'Japanese Yen' },
      { code: 'GBP', name: 'British Pound' },
      { code: 'AUD', name: 'Australian Dollar' },
      { code: 'CAD', name: 'Canadian Dollar' },
      { code: 'CHF', name: 'Swiss Franc' },
      { code: 'CNY', name: 'Chinese Yuan' },
      { code: 'ARS', name: 'Argentine Peso' },
    ];
  
    // Poblamos los dropdowns.
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
  
    currencies.forEach(currency => {
      const optionFrom = document.createElement('option');
      optionFrom.value = currency.code;
      optionFrom.textContent = `${currency.code} - ${currency.name}`;
      fromCurrency.appendChild(optionFrom);
  
      const optionTo = document.createElement('option');
      optionTo.value = currency.code;
      optionTo.textContent = `${currency.code} - ${currency.name}`;
      toCurrency.appendChild(optionTo);
    });
  
    // Lógica para convertir monedas.
    document.getElementById('currency-form').addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const fromCurrencyValue = fromCurrency.value;
      const toCurrencyValue = toCurrency.value;
      const amount = document.getElementById('amount').value;
  
      // Validación.
      if (!fromCurrencyValue || !toCurrencyValue || !amount) {
        alert('Please fill in all fields!');
        return;
      }
  
      // Llama a la API de conversión.
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`;
  
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        const rate = data.rates[toCurrencyValue];
        const convertedAmount = (amount * rate).toFixed(2);
  
        // Muestra el resultado.
        document.getElementById('result').textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;

        // Muestra el historial de conversiones
        addToHistory(amount, document.getElementById('from-currency').value, 
        document.getElementById('to-currency').value, convertedAmount);

      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching exchange rates.');
      }
    });


    // Función para agregar una conversión al historial
    function addToHistory(amount, fromCurrency, toCurrency, convertedAmount) {
        const historyList = document.getElementById('conversion-history'); // El <ul>
        const listItem = document.createElement('li'); // Crea un nuevo <li>
        listItem.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        historyList.appendChild(listItem); // Añade el <li> al <ul>
    }
    

  });
  

    
