// src/ai/tools/ethereum-tools.ts
'use server';
/**
 * @fileOverview Ethereum blockchain tools for Genkit.
 *
 * This file defines Genkit tools for interacting with the Ethereum blockchain,
 * such as fetching the current gas price from the Etherscan API.
 *
 * - getGasPrice - A Genkit tool to retrieve current gas prices.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getGasOracle } from '@/services/ethereum';

export const getGasPrice = ai.defineTool(
  {
    name: 'getGasPrice',
    description:
      'Gets the current gas prices (safe, standard, fast) from the Ethereum network via Etherscan.',
    inputSchema: z.object({}),
    outputSchema: z.object({
      safe: z.number().describe('The safe (slow) gas price in Gwei.'),
      standard: z
        .number()
        .describe('The standard (average) gas price in Gwei.'),
      fast: z.number().describe('The fast (high priority) gas price in Gwei.'),
    }),
  },
  async () => {
    console.log('Fetching gas price from Etherscan...');
    const gasOracle = await getGasOracle();
    const prices = {
      safe: parseFloat(gasOracle.SafeGasPrice),
      standard: parseFloat(gasOracle.ProposeGasPrice),
      fast: parseFloat(gasOracle.FastGasPrice),
    };
    console.log('Gas prices fetched:', prices);
    return prices;
  }
);
