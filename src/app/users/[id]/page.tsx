"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BackButton from "@/app/components/BackButton";
import { fetchUserData } from "@/app/lib/fetchUserData";
import { User } from "@/app/types/User";

const UserPage = ({ params }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function unwrapParams() {
      const paramsValue = await params;
      const user = await fetchUserData(paramsValue.id);

      if (user) {
        setUser(user);
      } else {
        setMessage("Пользователь не найден");
      }
    }

    unwrapParams().catch((error) => {
      console.error("Error fetching user data:", error);
      setMessage("Failed to fetch user.");
    });
  }, [params]);

  if (!user) {
    return <div className="text-center text-red-500">{message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <div className="bg-green-100 p-6 rounded-lg shadow-md mt-4">
        <h1 className="text-3xl font-bold mb-4 text-green-800">
          Информация о пользователе
        </h1>
        <p className="text-lg mb-2">
          <span className="font-semibold">Имя:</span> {user.name}
        </p>
        <p className="text-lg mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold">Телефон:</span> {user.phone}
        </p>
      </div>
    </div>
  );
};

export default UserPage;
