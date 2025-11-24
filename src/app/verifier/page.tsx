import { PageHeader } from '@/components/layout/page-header';
import { VerifierTool } from '@/components/verifier-tool';

export default function VerifierPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Identity Verifier" />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <VerifierTool />
      </div>
    </div>
  );
}
