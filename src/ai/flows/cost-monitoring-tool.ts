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
  prompt: `You are an AI assistant that estimates the cost of registering an identity on the blockchain and suggests optimal settings to reduce cost.

  Given the following information:
  - Network Congestion: {{{networkCongestion}}}
  - Gas Price (Gwei): {{{gasPrice}}}
  - Data Size (bytes): {{{dataSize}}}

  Provide an estimated cost in USD and suggest optimal settings to reduce cost.
  Ensure the estimatedCostUSD is a number.
  Consider that lower network congestion results in lower fees.
  Data size directly impacts the gas used.
  Gas price is a key factor in determining transaction cost.

  Ensure the suggestedSettings are clear, concise, and actionable.
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
