'use client'; // Этот файл должен использовать client-side rendering

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Session {
  user: {
    name?: string;
    email: string;
  };
}

const Profile = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch('/api/session');
      if (res.status === 200) {
        console.log('Сессия найдена');
        const data = await res.json();
        setSession(data.session);
      } else {
        console.log('Сессия не найдена, перенаправление на страницу логина');
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  if (!session) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
      <h1>Ваш профиль</h1>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
    </>
  );
};

export default Profile;
