import prisma from '@/lib/prisma';
import {Deck} from '@prisma/client';

export async function getDecks() {
    let decks = await prisma.deck.findMany({
        include: {
            cards: true,
        },
    });

    return JSON.parse(JSON.stringify(decks));
}

export async function getDeck(id: number) {
    const deck = await prisma.deck.findUnique({
        where: {
            id,
        },
        include: {
            cards: true,
        },
    });

    return JSON.parse(JSON.stringify(deck));
}

export async function createDeck(deck: Deck) {
    const createdDeck = await prisma.deck.create({
        data: deck,
    });

    return JSON.parse(JSON.stringify(createdDeck));
}

export async function updateDeck(deck: Deck) {
    const updatedDeck = await prisma.deck.update({
        where: {
            id: deck.id,
        },
        data: deck,
    });

    return JSON.parse(JSON.stringify(updatedDeck));
}
