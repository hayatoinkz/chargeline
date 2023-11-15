'use client';

import GoogleAuth from './google/google-auth';
import { isGoogleAuthEnabled } from './google/google-config';

export default function SocialAuth() {
  return <div>{isGoogleAuthEnabled && <GoogleAuth />}</div>;
}
