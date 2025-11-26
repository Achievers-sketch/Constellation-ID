// src/services/ethereum.ts
'use server';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'YourApiKeyToken';
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';

type GasOracleResponse = {
  status: string;
  message: string;
  result: {
    LastBlock: string;
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
    suggestBaseFee: string;
    gasUsedRatio: string;
  };
};

/**
 * Fetches the current gas oracle data from Etherscan.
 * @returns {Promise<GasOracleResponse['result']>} The gas oracle data.
 */
export async function getGasOracle(): Promise<GasOracleResponse['result']> {
  const url = `${ETHERSCAN_API_URL}?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Etherscan API request failed: ${response.statusText}`);
    }
    const data: GasOracleResponse = await response.json();
    if (data.status !== '1') {
      throw new Error(`Etherscan API error: ${data.message} - ${data.result}`);
    }
    return data.result;
  } catch (error) {
    console.error('Error fetching gas oracle from Etherscan:', error);
    // In case of an API error, return some default values to avoid breaking the flow.
    return {
      LastBlock: '0',
      SafeGasPrice: '10',
      ProposeGasPrice: '20',
      FastGasPrice: '30',
      suggestBaseFee: '15',
      gasUsedRatio: '',
    };
  }
}
