'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { costEstimationSchema } from '@/lib/schemas';
import { getCostEstimation } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Bot, Cpu, Loader2, Rocket, Zap } from 'lucide-react';
import type { EstimateRegistrationCostOutput } from '@/ai/flows/cost-monitoring-tool';

type CostEstimationFormValues = z.infer<typeof costEstimationSchema>;

export function CostEstimator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EstimateRegistrationCostOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<CostEstimationFormValues>({
    resolver: zodResolver(costEstimationSchema),
    defaultValues: {
      networkCongestion: 'medium',
      gasPrice: 20,
      dataSize: 340,
    },
  });

  const onSubmit: SubmitHandler<CostEstimationFormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    const response = await getCostEstimation(data);
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          response.error || 'Failed to get cost estimation.',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-headline text-2xl">
                    Cost Monitoring Tool
                  </CardTitle>
                  <CardDescription>
                    Estimate identity registration cost with AI.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="networkCongestion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Network Congestion</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select congestion level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gasPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gas Price (Gwei)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 20"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Size (bytes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 340"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Zap className="mr-2" />
                    Estimate Cost
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className="flex flex-col shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="font-headline text-2xl">
                AI Analysis
              </CardTitle>
              <CardDescription>
                Review the estimated cost and suggestions.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p>AI is analyzing the parameters...</p>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Estimated Cost (USD)
                </p>
                <p className="text-4xl font-bold text-primary">
                  ${result.estimatedCostUSD.toFixed(4)}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Optimal Settings
                </p>
                <div className="prose prose-sm max-w-none rounded-lg border bg-secondary/30 p-4 text-secondary-foreground">
                  <p>{result.suggestedSettings}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
                <Rocket className="h-10 w-10" />
                <p>
                  Your cost estimation and AI-powered suggestions will appear
                  here.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          <p>
            Estimates are based on provided data and may vary with real-time
            network conditions.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
