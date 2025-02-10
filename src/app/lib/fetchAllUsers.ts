import { User } from "../types/User";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAllUsers(): Promise<User[]> {
    const res = await fetch(`${apiUrl}/users`);
    const users: User[] = (await res.json()).data.users;
    return users;
}