import {Card, Deck, Prisma} from '@prisma/client';
import {GetServerSideProps} from 'next';
import {getCards} from '../../../models/card';
import {useState} from 'react';
import Image from 'next/image';
import {fetchWrapper} from '../../../lib/utils';
import {useRouter} from 'next/router';
import {getDeck} from '../../../models/deck';

interface UpdateDeckPageProps {
    deck: Prisma.DeckGetPayload<{include: {cards: true}}>;
    cards: Card[];
}

export default function UpdateDeck({deck, cards}: UpdateDeckPageProps) {
    const router = useRouter();
    const [deckState, setDeckState] = useState<Prisma.DeckGetPayload<{include: {cards: true}}>>(deck);

    let [viewStyle, setViewStyle] = useState(false);

    let addCardToDeck = (card: Card) => {
        if (deckState.cards.length < 12) {
            let contains = deckState.cards.find(c => c.id === card.id);
            if (contains) return;
            let newCards = [...deckState.cards];
            newCards.push(card);
            setDeckState({...deckState, cards: newCards});
        }
    };
    let removeCardFromDeck = (card: Card) => {
        let index = deckState.cards.indexOf(card);
        console.log('🚀 ~ file: create.tsx:28 ~ removeCardFromDeck ~ index:', index);
        let newCards = [...deckState.cards];
        newCards.splice(index, 1);

        setDeckState({...deckState, cards: newCards});
    };
    let saveDeck = async () => {
        let resSaveDeck = await fetchWrapper('/api/deck', deckState, 'PUT');

        if (resSaveDeck.ok) {
            let savedDeck = await resSaveDeck.json();
            router.push(`/decks/${savedDeck.id}`);
        }
    };
    return (
        <main>
            <div className="flex flex-row gap-1">
                <div className="flex flex-col gap-1 w-1/3">
                    <div>Création de Deck</div>
                    <div>
                        <div>Nom</div>
                        <input
                            type="text"
                            id="deck-name"
                            placeholder="nom du deck"
                            className="border border-black rounded-md px-1"
                            value={deckState.name}
                            onChange={e => setDeckState({...deckState, name: e.target.value})}
                        />
                    </div>
                    <div className="flex flex-wrap">
                        {deckState &&
                            deckState.cards.map(card => (
                                <div key={card.id} className={`w-1/3 p-1`} onClick={() => removeCardFromDeck(card)}>
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
                    <div>
                        <button className="border border-black rounded-md px-1" onClick={saveDeck}>
                            Save
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-2/3">
                    <div className="flex flex-row gap-1">
                        <button className="border border-black rounded-full px-2" onClick={() => setViewStyle(false)}>
                            6
                        </button>
                        <button className="border border-black rounded-full px-1" onClick={() => setViewStyle(true)}>
                            12
                        </button>
                    </div>
                    <div className="flex flex-wrap">
                        {cards.map(card => (
                            <div
                                key={card.id}
                                className={`${viewStyle ? 'w-1/12' : 'w-1/6'} p-1`}
                                onClick={() => addCardToDeck(card)}
                            >
                                <div className={`flex flex-col gap-1 items-center border border-black p-2 rounded-md`}>
                                    <Image width={200} height={400} src={card.art ? card.art : ''} alt={card.name} />
                                    <div>{card.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps<UpdateDeckPageProps> = async context => {
    // fetching data here
    // Return the data as props

    let {id} = context.query;
    let deck = null;
    if (typeof id === 'string') deck = await getDeck(parseInt(id));
    let cards = await getCards();
    return {
        props: {
            pageName: `${deck.id} - ${deck.name} Update`,
            deck,
            cards,
        },
    };
};
