"use client"

import BackButton from "@/app/components/BackButton";
import { fetchUserData } from "../../lib/fetchUserData";
import { fetchAllUsers } from "@/app/lib/fetchAllUsers";
const UserPage = async ({ params }: any) => {
  const us = await fetchAllUsers()
  console.log('us', us);
  
  const paramsValue = await params;
  const user = await fetchUserData(paramsValue.id);

  if (!user) {
    return (
      <div className="text-center text-red-500">Пользователь не найден</div>
    );
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
