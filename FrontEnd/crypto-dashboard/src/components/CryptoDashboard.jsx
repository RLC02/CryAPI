import { useEffect, useState } from "react";
import { fetchCryptoData } from "../services/CryApi";
import { fetchExchangeRate } from "../services/ExApi";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowUpDown, Clock } from "lucide-react";
import "@fontsource/poppins";

function CryptoDashboard() {
  const [data, setData] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetchCryptoData();
      setData(result);

      const rate = await fetchExchangeRate();
      setExchangeRate(rate);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 font-poppins">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mb-4" />
        <span className="text-gray-400 animate-pulse">
          Carregando dados de criptomoedas...
        </span>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 min-h-screen text-white font-poppins">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black bg-gradient-to-r p-4 from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4"
            >
              CryApi
            </motion.h1>
          </div>
          <div className="flex justify-center items-center gap-4 text-gray-400">
            <Clock className="w-5 h-5" />
            <span>Atualizado em: {lastUpdated}</span>
            <span className="flex items-center gap-2 ml-4">
              <ArrowUpDown className="w-5 h-5" />
              USD/BRL: {exchangeRate?.toFixed(2)}
            </span>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-1000/50 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-gray-800"
        >
          <ul className="space-y-4">
            <AnimatePresence>
              {data.map((crypto, index) => (
                <motion.li
                  key={crypto.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-gray-800/50 transition-colors rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                        <span className="font-bold text-sm">
                          {crypto.symbol.slice(0, 3)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{crypto.name}</h3>
                        <span className="text-gray-400 text-sm">
                          {crypto.symbol}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-cyan-400 font-medium">
                          $
                          {parseFloat(crypto.priceUsd).toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <div className="text-green-400 text-sm">
                          R$
                          {(
                            parseFloat(crypto.priceUsd) * exchangeRate
                          ).toLocaleString("pt-BR", {
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>

        <footer className="mt-8 text-center text-gray-400 text-sm">
          <p>Dados atualizados a cada 30 segundos • Cotação em tempo real</p>
        </footer>
      </div>
    </div>
  );
}

export default CryptoDashboard;
