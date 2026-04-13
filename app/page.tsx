'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { Feed } from '@/components/dashboard/Feed';

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-[1600px] mx-auto">
        <Feed />
      </div>
    </MainLayout>
  );
}
