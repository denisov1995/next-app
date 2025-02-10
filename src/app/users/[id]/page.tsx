import BackButton from "@/app/components/BackButton";
import { fetchUserData } from "../../lib/fetchUserData";
import { log } from "node:console";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function fetchAllUsers(): Promise<any> {
  const res = await fetch(`${apiUrl}/users`);
  const users: any[] = (await res.json()).data.users;
  return users;
}
const UserPage = async ({ params }: any) => {
  const us = await fetchAllUsers();

  console.log("us", us);

  const paramsValue = await params;
  const user = await fetchUserData(paramsValue.id);

  if (!user) {
    return (
      <>
        <div className="text-center text-red-500">
          Пользователь 123 не найден
        </div>
        {us}
      </>
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
