import {GetServerSideProps} from 'next';

import type {Deck} from '@prisma/client';
import {useState} from 'react';
import Link from 'next/link';
import {getDecks} from '@/models/deck';

interface DecksPageProps {
    decks: Deck[];
}

export default function Decks({decks: decks}: DecksPageProps) {
    let [viewStyle, setViewStyle] = useState(false);
    return (
        <div className="flex flex-col gap-2 px-2">
            <header></header>
            <main className="flex flex-col gap-1">
                <h1 className="text-5xl place-self-center">Decks</h1>
                <div>
                    <Link href={'/decks/create'}>Create</Link>
                </div>
                <div className="flex flex-row gap-1">
                    <button className="border border-black rounded-full px-2" onClick={() => setViewStyle(false)}>
                        6
                    </button>
                    <button className="border border-black rounded-full px-1" onClick={() => setViewStyle(true)}>
                        12
                    </button>
                </div>
                <div className="flex flex-wrap">
                    {decks.map(deck => (
                        <Link
                            href={`/decks/${deck.id}`}
                            key={deck.id}
                            className={`${viewStyle ? 'w-1/12' : 'w-1/6'} p-1`}
                        >
                            <div className={`flex flex-col gap-1 items-center border border-black p-2 rounded-md`}>
                                <div>{deck.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <footer></footer>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<DecksPageProps> = async context => {
    // fetching data here
    // Return the data as props

    let decks = await getDecks();
    return {
        props: {
            pageName: `Decks List`,
            decks,
        },
    };
};
