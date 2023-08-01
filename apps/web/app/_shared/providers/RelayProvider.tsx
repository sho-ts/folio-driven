'use client';

import { RelayEnvironmentProvider } from 'react-relay';
import { environment } from '@/RelayEnvironment';

export const RelayProvider = ({ children }: { children: React.ReactNode }) => {
  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>;
};
