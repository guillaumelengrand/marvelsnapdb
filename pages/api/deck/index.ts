import {NextApiRequest, NextApiResponse} from 'next';
import {createDeck, updateDeck} from '../../../models/deck';
import {Card} from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const deck = req.body;
    // console.log('🚀 ~ file: index.ts:7 ~ handler ~ deck:', deck);

    if (req.method === 'POST') {
        try {
            let cards = [...deck.cards];
            delete deck.cards;
            delete deck.id;
            const createdDeck = await createDeck(deck);

            const updatedDeck = await updateDeck({
                ...createdDeck,
                cards: {
                    set: [
                        ...cards.map((c: Card) => {
                            return {id: c.id};
                        }),
                    ],
                },
            });

            res.status(200).json(updatedDeck);
        } catch (error) {
            console.log({error});

            res.status(500).json({error});
        }
    }
}
