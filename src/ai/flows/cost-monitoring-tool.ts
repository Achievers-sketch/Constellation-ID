'use server';

/**
 * @fileOverview Estimates the cost of identity registration on the blockchain and suggests optimal settings.
 *
 * - estimateRegistrationCost - Estimates the cost of registering an identity on the blockchain.
 * - EstimateRegistrationCostInput - The input type for the estimateRegistrationCost function.
 * - EstimateRegistrationCostOutput - The return type for the estimateRegistrationCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getGasPrice } from '../tools/ethereum-tools';

const EstimateRegistrationCostInputSchema = z.object({
  networkCongestion: z.string().describe('The current network congestion level (e.g., low, medium, high).'),
  gasPrice: z.number().describe('The current gas price in Gwei.'),
  dataSize: z.number().describe('The size of the identity data in bytes.'),
});
export type EstimateRegistrationCostInput = z.infer<typeof EstimateRegistrationCostInputSchema>;

const EstimateRegistrationCostOutputSchema = z.object({
  estimatedCostUSD: z.number().describe('The estimated cost of registration in USD.'),
  suggestedSettings: z.string().describe('Suggestions for optimal settings to reduce cost.'),
});
export type EstimateRegistrationCostOutput = z.infer<typeof EstimateRegistrationCostOutputSchema>;

export async function estimateRegistrationCost(input: EstimateRegistrationCostInput): Promise<EstimateRegistrationCostOutput> {
  return estimateRegistrationCostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateRegistrationCostPrompt',
  input: {schema: EstimateRegistrationCostInputSchema},
  output: {schema: EstimateRegistrationCostOutputSchema},
  tools: [getGasPrice],
  prompt: `You are an AI assistant that estimates the cost of registering an identity on the Ethereum blockchain and suggests optimal settings to reduce cost.

  Given the following information:
  - Network Congestion: {{{networkCongestion}}}
  - Data Size (bytes): {{{dataSize}}}

  Use the getGasPrice tool to fetch the current gas prices on the Ethereum network. The tool returns prices in Gwei for different speeds (safe, standard, fast).
  
  Based on the network congestion provided by the user, select the appropriate gas price from the tool's output:
  - 'low' congestion -> use 'safe' gas price
  - 'medium' congestion -> use 'standard' gas price
  - 'high' congestion -> use 'fast' gas price
  
  Assume a base gas limit for a simple transaction (e.g., 21000 gas) and add an estimated cost per byte of data. A reasonable estimation is 68 gas per non-zero byte. For this calculation, assume all bytes are non-zero.

  Calculate the total transaction fee in ETH and then convert it to USD. You can use a rough, recent ETH to USD conversion rate (e.g., 1 ETH = $3500 USD).

  Provide an estimated cost in USD and suggest optimal settings to reduce cost (e.g., waiting for lower congestion, reducing data size).
  Ensure the estimatedCostUSD is a number.

  Example Calculation:
  1. Gas Limit = 21000 (base) + (dataSize * 68)
  2. Transaction Fee (ETH) = (Gas Limit * Gas Price) / 1,000,000,000
  3. Estimated Cost (USD) = Transaction Fee (ETH) * ETH_PRICE_USD
`,
});

const estimateRegistrationCostFlow = ai.defineFlow(
  {
    name: 'estimateRegistrationCostFlow',
    inputSchema: EstimateRegistrationCostInputSchema,
    outputSchema: EstimateRegistrationCostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
