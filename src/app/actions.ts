// @/app/actions.ts
'use server';

import {
  estimateRegistrationCost,
  type EstimateRegistrationCostInput,
} from '@/ai/flows/cost-monitoring-tool';
import Web3 from 'web3';

export async function getCostEstimation(input: EstimateRegistrationCostInput) {
  try {
    const result = await estimateRegistrationCost(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting cost estimation:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred.' };
  }
}

export async function verifyIdentity(
  address: string
): Promise<{ status: 'valid' | 'invalid' }> {
  const web3 = new Web3();
  if (web3.utils.isAddress(address)) {
    return { status: 'valid' };
  }
  return { status: 'invalid' };
}
