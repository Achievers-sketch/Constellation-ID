'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  HelpCircle,
  Loader2,
  ShieldCheck,
  ShieldX,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { verifyIdentity } from '@/app/actions';

type VerificationStatus =
  | 'idle'
  | 'verifying'
  | 'valid'
  | 'invalid';

export function VerifierTool() {
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [qrData, setQrData] = useState('');

  const handleVerify = async () => {
    if (!qrData) return;
    setStatus('verifying');

    const result = await verifyIdentity(qrData);
    setStatus(result.status);
  };

  const renderStatusAlert = () => {
    switch (status) {
      case 'valid':
        return (
          <Alert variant="default" className="border-green-500 bg-green-500/10 text-green-700 dark:text-green-400">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <AlertTitle className="font-bold">Identity Valid</AlertTitle>
            <AlertDescription>
              This identity address has been successfully validated.
            </AlertDescription>
          </Alert>
        );
      case 'invalid':
        return (
          <Alert variant="destructive">
            <ShieldX className="h-5 w-5" />
            <AlertTitle className="font-bold">Identity Invalid</AlertTitle>
            <AlertDescription>
              This is not a valid Ethereum address.
            </AlertDescription>
          </Alert>
        );
      case 'idle':
        return (
          <Alert variant="default" className="border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-400">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            <AlertTitle>Ready to Verify</AlertTitle>
            <AlertDescription>
              Paste the identity data (e.g., an Ethereum address) to begin verification.
            </AlertDescription>
          </Alert>
        );
      case 'verifying':
        return (
          <Alert variant="default" className="border-gray-500 bg-gray-500/10">
            <Loader2 className="h-5 w-5 animate-spin" />
            <AlertTitle>Verifying Identity</AlertTitle>
            <AlertDescription>
              Please wait... checking blockchain data.
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Offline Verification Tool
        </CardTitle>
        <CardDescription>
          Verify an identity using data from a QR code.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="qr-data" className="text-sm font-medium">
            Identity Data
          </label>
          <Textarea
            id="qr-data"
            placeholder='Paste an Ethereum address to verify. e.g., 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'
            className="min-h-[120px]"
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            disabled={status === 'verifying'}
          />
        </div>
        <div className="min-h-[80px]">{renderStatusAlert()}</div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleVerify}
          disabled={!qrData || status === 'verifying'}
          className="w-full"
        >
          {status === 'verifying' ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <ShieldCheck className="mr-2" />
              Verify Identity
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
