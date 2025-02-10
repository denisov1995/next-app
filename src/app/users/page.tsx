'use client'
import Link from "next/link";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { User } from "../types/User";
import BackButton from "../components/BackButton";
import { fetchAllUsers } from "../lib/fetchAllUsers";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ id: '', name: '', email: '', phone: '' });

  useEffect(() => {
    // Используем обычную функцию вместо async/await
    const fetchData = () => {
      fetchAllUsers().then(users => {
        setUsers(users);
      });
    };
    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Failed to add user');
      }
    }).then(addedUser => {
      setUsers([...users, addedUser]);
      setNewUser({ id: '', name: '', email: '', phone: '' });
    }).catch(error => {
      console.error('Error adding user:', error);
    });
  };

  return (
    <div className="container mx-auto px-4">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Список пользователей</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            required
            className="border p-2 mb-2"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            required
            className="border p-2 mb-2"
          />
        </div>
        <div>
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            required
            className="border p-2 mb-2"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Добавить пользователя</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-green-100 p-4 rounded-lg shadow-md">
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
