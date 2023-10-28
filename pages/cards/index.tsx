import {GetServerSideProps} from 'next';
import {getCards} from '../../models/card';

import type {Card} from '@prisma/client';
import CardList from '@/components/cardList';

interface CardsPageProps {
    cards: Card[];
}

export default function Cards({cards}: CardsPageProps) {
    return (
        <div className="p-2">
            <main className="">
                <CardList cards={cards} />
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<CardsPageProps> = async context => {
    let cards = await getCards();
    return {
        props: {
            pageName: `Cards List`,
            cards,
        },
    };
};
