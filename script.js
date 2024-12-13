document.getElementById('currency-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita el recargo de la página.
  
    // Obtiene valores del formulario.
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = document.getElementById('amount').value;
  
    // Validaciones básicas.
    if (!fromCurrency || !toCurrency || !amount) {
      alert('Please fill in all fields!');
      return;
    }
  
    // API URL (puedes usar tu propia API key).
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Calcula el resultado.
      const rate = data.rates[toCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
  
      // Muestra el resultado.
      document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching exchange rates.');
    }
  });
  