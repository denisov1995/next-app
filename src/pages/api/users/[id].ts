import type { NextApiRequest, NextApiResponse } from 'next';
import { users } from '../../../../db/db.json'; // Предполагаем, что у вас есть файл с данными

export default function handler(req: NextApiRequest, res: any) {
    const { id } = req.query; // Получаем идентификатор пользователя из URL

    // Добавляем заголовки CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Замените '*' на конкретный домен в продакшн среде
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Обработка preflight-запросов
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

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
