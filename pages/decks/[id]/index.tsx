import {Deck, Prisma} from '@prisma/client';
import {GetServerSideProps} from 'next';
import {getDeck} from '../../../models/deck';
import Link from 'next/link';
import Image from 'next/image';

interface DeckPageProps {
    deck: Prisma.DeckGetPayload<{include: {cards: true}}>;
}

export default function Decks({deck}: DeckPageProps) {
    return (
        <main>
            {deck ? (
                <>
                    <h1>{deck.name}</h1>
                    <div>
                        <Link href={`/decks/${deck.id}/update`}>Update</Link>
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <div className="flex flex-wrap w-1/2">
                            {deck &&
                                deck.cards.map(card => (
                                    <div key={card.id} className={`w-1/6 p-1`}>
                                        <div
                                            className={`flex flex-col gap-1 items-center border border-black p-2 rounded-md`}
                                        >
                                            <Image
                                                width={200}
                                                height={400}
                                                src={card.art ? card.art : ''}
                                                alt={card.name}
                                            />
                                            <div>{card.name}</div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h1>Deck Not Founded</h1>
                </>
            )}
        </main>
    );
}

export const getServerSideProps: GetServerSideProps<DeckPageProps> = async context => {
    // fetching data here
    // Return the data as props

    // let cards = await getCards();
    let {id} = context.query;
    let deck = null;
    if (typeof id === 'string') deck = await getDeck(parseInt(id));
    return {
        props: {
            pageName: `${deck.id} - ${deck.name}`,
            deck,
        },
    };
};
