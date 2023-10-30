import {Card, Deck, Prisma} from '@prisma/client';
import {GetServerSideProps} from 'next';
import {getCards, getCardsReleased} from '@/models/card';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {fetchWrapper} from '@/lib/utils';
import {useRouter} from 'next/router';
import IconTrash from '@/components/icons/trash';
import IconClipboardCopy from '@/components/icons/copy';
import IconClipboardPaste from '@/components/icons/past';
import IconArrowDownUp from '@/components/icons/arrowDownUp';
import Validator from '@/components/buttons/validator';
import CardList from '@/components/cardList';

interface CreateDeckPageProps {
    cards: Card[];
    params: {};
}

export default function CreateDeck({cards, params}: CreateDeckPageProps) {
    const router = useRouter();

    const [deck, setDeck] = useState<Prisma.DeckGetPayload<{include: {cards: true}}>>({
        id: 0,
        name: ``,
        cards: [],
    });
    const [placeholderCards, setPlaceholderCards] = useState(
        Array.apply(null, Array(12)).map(function (x, i) {
            return i;
        }),
    );

    const [searchValue, setSearchValue] = useState('');

    const [viewStyle, setViewStyle] = useState('w-1/6');

    useEffect(() => {
        const rand = Math.floor(Math.random() * 101);
        setDeck({...deck, name: `Deck ${rand}`});

        console.log('🚀 ~ file: create.tsx:23 ~ CreateDeck ~ placeholderCards:', placeholderCards);
    }, []);

    let addCardToDeck = (card: Card) => {
        if (deck.cards.length < 12) {
            let contains = deck.cards.find(c => c.id === card.id);
            if (contains) return;
            let newCards = [...deck.cards];
            newCards.push(card);
            setDeck({...deck, cards: newCards});

            let newPlaceholderCards = [...placeholderCards];
            newPlaceholderCards.pop();
            setPlaceholderCards(newPlaceholderCards);
        }
    };
    let removeCardFromDeck = (card: Card) => {
        let index = deck.cards.indexOf(card);
        let newCards = [...deck.cards];
        newCards.splice(index, 1);

        setDeck({...deck, cards: newCards});
        setPlaceholderCards([...placeholderCards, 1]);
    };
    let saveDeck = async () => {
        let resSaveDeck = await fetchWrapper('/api/deck', deck, 'POST');

        if (resSaveDeck.ok) {
            let savedDeck = await resSaveDeck.json();
            router.push(`/decks/${savedDeck.id}`);
        }
    };
    return (
        <main>
            <div className="flex flex-row">
                {/** Deck Editor */}
                <div className="flex flex-col gap-1 w-1/3 border-r-2 border-blue-950 pr-2">
                    <div className="p-2">
                        <div className="flex flex-row gap-4 justify-end place-items-center">
                            <input
                                type="text"
                                id="deck-name"
                                placeholder="nom du deck"
                                className="rounded-md p-1 bg-blue-950 text-white text-2xl"
                                value={deck.name}
                                onChange={e => setDeck({...deck, name: e.target.value})}
                            />
                            <button>
                                <IconClipboardCopy className="w-6 h-6" />
                            </button>
                            <button>
                                <IconClipboardPaste className="w-6 h-6" />
                            </button>
                            <button>
                                <IconTrash className="w-6 h-6" />
                            </button>
                        </div>
                        {/** Card List Display */}
                        <div className="flex flex-wrap">
                            {deck &&
                                deck.cards.map(card => (
                                    <div key={card.id} className={`w-1/4`} onClick={() => removeCardFromDeck(card)}>
                                        <div className={`flex flex-col gap-1 items-center`}>
                                            <Image
                                                width={600}
                                                height={600}
                                                src={card.art ? card.art : ''}
                                                alt={card.name}
                                                onError={e => {
                                                    console.log({e});
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            {placeholderCards.length > 0 &&
                                placeholderCards.map((v, i) => (
                                    <div key={i} className={`w-1/4 px-6 py-1`}>
                                        <div className={`flex flex-col gap-1 items-center`}>
                                            <Image
                                                width={200}
                                                height={400}
                                                src={
                                                    'https://assets.snap.fan/files/assets/card-frame-placeholder.ef8c62230e9519b4.webp'
                                                }
                                                alt={'placeholder'}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="flex flex-row justify-end">
                            {/* <button className="border border-black rounded-md px-1" onClick={saveDeck}>
                            Save
                        </button> */}
                            <Validator label={'sauvegarder'} onClick={saveDeck} />
                        </div>
                    </div>
                </div>
                {/** List Card Selector */}
                <div className="flex flex-col gap-1 w-2/3 py-2 ml-2 overflow-auto h-[90vh]">
                    <CardList cards={cards} addCardToDeck={addCardToDeck} />
                </div>
            </div>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps<CreateDeckPageProps> = async context => {
    // fetching data here
    // Return the data as props

    let params = context.query;

    console.log({params});

    let cards = await getCardsReleased(params);
    return {
        props: {
            pageName: `Create Deck`,
            cards,
            params,
        },
    };
};
