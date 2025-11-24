// @/app/actions.ts
'use server';

import {
  estimateRegistrationCost,
  type EstimateRegistrationCostInput,
} from '@/ai/flows/cost-monitoring-tool';

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
