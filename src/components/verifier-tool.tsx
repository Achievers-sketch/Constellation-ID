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
  CheckCircle2,
  HelpCircle,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  XCircle,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type VerificationStatus =
  | 'idle'
  | 'verifying'
  | 'valid'
  | 'invalid'
  | 'revoked';

export function VerifierTool() {
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [qrData, setQrData] = useState('');

  const handleVerify = () => {
    if (!qrData) return;
    setStatus('verifying');

    // Mock verification logic
    setTimeout(() => {
      if (qrData.includes('valid')) {
        setStatus('valid');
      } else if (qrData.includes('revoked')) {
        setStatus('revoked');
      } else {
        setStatus('invalid');
      }
    }, 1500);
  };

  const renderStatusAlert = () => {
    switch (status) {
      case 'valid':
        return (
          <Alert variant="default" className="border-green-500 bg-green-500/10 text-green-700 dark:text-green-400">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <AlertTitle className="font-bold">Identity Valid</AlertTitle>
            <AlertDescription>
              This identity has been successfully verified on the blockchain.
            </AlertDescription>
          </Alert>
        );
      case 'invalid':
        return (
          <Alert variant="destructive">
            <ShieldX className="h-5 w-5" />
            <AlertTitle className="font-bold">Identity Invalid</AlertTitle>
            <AlertDescription>
              This identity could not be found or verified on the blockchain.
            </AlertDescription>
          </Alert>
        );
      case 'revoked':
        return (
          <Alert variant="destructive" className="border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
            <ShieldAlert className="h-5 w-5 text-yellow-500" />
            <AlertTitle className="font-bold">Identity Revoked</AlertTitle>
            <AlertDescription>
              This identity has been revoked by its owner.
            </AlertDescription>
          </Alert>
        );
      case 'idle':
        return (
          <Alert variant="default" className="border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-400">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            <AlertTitle>Ready to Verify</AlertTitle>
            <AlertDescription>
              Paste the identity data from a QR code to begin verification.
            </AlertDescription>
          </Alert>
        );
      case 'verifying':
        return (
          <Alert variant="default" className="border-gray-500 bg-gray-500/10">
            <Loader2 className="h-5 w-5 animate-spin" />
            <AlertTitle>Verifying Identity</AlertTitle>
            <AlertDescription>
              Please wait... checking blockchain records and satellite cache.
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
            placeholder='Paste data from scanned QR code here. For demo, try typing "valid", "invalid", or "revoked".'
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
