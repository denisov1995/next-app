import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '../../../../db/db.json'; // Предполагаем, что у вас есть файл с данными

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; // Получаем идентификатор пользователя из URL


    if (req.method === 'GET') {
        const user = users.find((user: any) => user.id == id); // Находим пользователя по идентификатору
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'Пользователь не найден' });
        }
    } else {
        res.status(405).json({ message: 'Метод не поддерживается' });
    }
}
