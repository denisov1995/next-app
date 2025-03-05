import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { session?: Session; message?: string; }): void; new(): any; }; }; }) {
  const session = await getSession({ req });

  if (session) {
    res.status(200).json({ session });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
}
