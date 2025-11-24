import { z } from 'zod';

export const costEstimationSchema = z.object({
  networkCongestion: z.enum(['low', 'medium', 'high'], {
    required_error: 'You need to select a network congestion level.',
  }),
  gasPrice: z.coerce
    .number({ invalid_type_error: 'Gas price must be a number.' })
    .positive({ message: 'Gas price must be positive.' }),
  dataSize: z.coerce
    .number({ invalid_type_error: 'Data size must be a number.' })
    .int()
    .positive({ message: 'Data size must be a positive integer.' }),
});
