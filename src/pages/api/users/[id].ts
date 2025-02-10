import { NextApiRequest, NextApiResponse } from 'next';
import { users } from '@/../db/db.json'; // Импортируем данные из data.ts

export default function handler(req: NextApiRequest, res: any) {
    // Добавляем заголовки CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Отключаем кэширование
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { id } = req.query;
    if (req.method === 'GET') {
        const user = users.find(user => user.id === parseInt(id as string));
        if (user) {
            res.status(200).json({ message: 'User fetched successfully!', data: { user } });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
