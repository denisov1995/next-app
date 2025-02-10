"use client";
import Link from "next/link";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { User } from "../types/User";
import BackButton from "../components/BackButton";
import { fetchAllUsers } from "../lib/fetchAllUsers";
import SkeletonCard from "../components/SkeletonCard";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedUsers = localStorage.getItem("users");
    if (cachedUsers) {
      setUsers(JSON.parse(cachedUsers));
      setLoading(false);
    } else {
      const fetchData = async () => {
        setLoading(true);
        const users = await fetchAllUsers();
        localStorage.setItem("users", JSON.stringify(users));
        setUsers(users);
        setLoading(false);
      };
      fetchData();
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to add user");
        }
      })
      .then((addedUser) => {
        const updatedUsers = [...users, addedUser];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers)); // Обновление данных в localStorage
        setNewUser({ id: "", name: "", email: "", phone: "" });
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <div className="container mx-auto px-4">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Список пользователей</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Телефон
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Добавить пользователя
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : users.map((user) => (
              <div
                key={user.id}
                className="bg-green-100 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
                <p className="text-sm mb-1">{user.email}</p>
                <p className="text-sm mb-4">{user.phone}</p>
                <Link
                  href={`/users/${user.id}`}
                  className="text-green-500 hover:text-green-700"
                >
                  Подробнее
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
};

export default UsersPage;
