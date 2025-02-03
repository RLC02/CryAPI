import axios from "axios";

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/crypto/prices");
    return response.data.data; // Assumindo que a resposta contém o objeto "data"
  } catch (error) {
    console.error("Erro ao buscar dados da API", error);
    throw error;
  }
};
