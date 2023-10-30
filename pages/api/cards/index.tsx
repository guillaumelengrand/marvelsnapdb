import {NextApiRequest, NextApiResponse} from 'next';
import {createDeck, updateDeck} from '../../../models/deck';
import {Card} from '@prisma/client';
import {getCardsReleased} from '@/models/card';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const params = req.body;
    // console.log('🚀 ~ file: index.ts:7 ~ handler ~ deck:', deck);

    if (req.method === 'POST') {
        try {
            let cards = await getCardsReleased(params);

            res.status(200).json(cards);
        } catch (error) {
            console.log({error});
            res.status(500).json(null);
        }
    }
}
