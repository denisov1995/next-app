"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Предотвращаем стандартное поведение ссылки

    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  return session ? (
    <button
      onClick={handleLogout}
      className="ml-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Log out
    </button>
  ) : (
    <Link
      href={"/login"}
      className="ml-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Log in
    </Link>
  );
};

export default AuthButton;
