import prisma from '@/lib/prisma';
import type {Card} from '@prisma/client';

export async function getCards() {
    let res: Card[] = await prisma.card.findMany();

    return JSON.parse(JSON.stringify(res));
}

export async function getCard(id: number) {
    // console.log('🚀 ~ file: card.ts:12 ~ getCard ~ id:', id);
    try {
        let res = await prisma.card.findUnique({
            where: {
                id,
            },
            include: {
                variants: true,
            },
        });

        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.log({error});

        return null;
    }
}

export async function createCard(card: any) {
    let createdCard = await prisma.card.create({
        data: card,
    });

    return JSON.parse(JSON.stringify(createdCard));
}

export async function updateCard(card: any) {
    let updatedCard = await prisma.card.update({
        where: {
            id: card.id,
        },
        data: card,
    });
    return JSON.parse(JSON.stringify(updatedCard));
}
