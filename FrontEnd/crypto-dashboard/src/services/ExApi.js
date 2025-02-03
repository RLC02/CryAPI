export const fetchExchangeRate = async () => {
  try {
    const response = await fetch(
      "https://api.bcb.gov.br/dados/serie/bcdata.sgs.21706/dados?formato=csv"
    );
    const data = await response.text();
    const lines = data.split("\n");
    const latestRate = lines[lines.length - 2].split(",")[1]; // Pega a última linha e o valor da taxa
    return parseFloat(latestRate.replace(",", ".")); // Converte o valor para número
  } catch (error) {
    console.error("Erro ao carregar a taxa de câmbio", error);
    throw error;
  }
};
