'use client';

import { redirect } from 'next/navigation';
import withPageRequiredGuest from '@/hooks/auth/with-page-required-guest';

function Home() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    redirect('/auth');
  }

  redirect('/home');
}

export default withPageRequiredGuest(Home);
