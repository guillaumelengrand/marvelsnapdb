import {ReactNode, useEffect, useState} from 'react';
import IconArrowDownUp from './icons/arrowDownUp';
import {Card} from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {fetchWrapper} from '@/lib/utils';

interface CardListProps {
    cards: Card[];
    addCardToDeck?: (card: Card) => void;
}

export default function CardList({cards, addCardToDeck}: CardListProps) {
    const router = useRouter();
    const [cardsDisplay, setCardsDisplay] = useState(cards);
    const [searchValue, setSearchValue] = useState('');

    const [viewStyle, setViewStyle] = useState('w-1/6');

    useEffect(() => {
        console.log({query: router.query});

        let fetchData = async () => {
            console.log('fetcj');

            let res = await fetchWrapper('/api/cards', router.query, 'POST');
            let data = await res.json();
            console.log({data});

            setCardsDisplay(data);
        };
        fetchData();
    }, [router.query]);
    useEffect(() => {
        let fetchData = async () => {
            console.log('fetch');

            let res = await fetchWrapper('/api/cards', {...router.query, searchValue}, 'POST');
            let data = await res.json();
            console.log({data});

            setCardsDisplay(data);
        };
        fetchData();
    }, [searchValue]);
    return (
        <>
            <div className="flex flex-row">
                <div className="flex flex-row gap-1 border-r-1 border-blue-950 pr-1">
                    <select
                        className="bg-blue-950"
                        onChange={e => {
                            e.preventDefault();
                            let val = e.target.value;
                            router.push(`?order=${val}`, `?order=${val}`, {shallow: true});
                        }}
                        defaultValue={router.query.order ? router.query.order : 'name'}
                    >
                        <option value={'name'}>Nom</option>
                        <option value={'cost'}>Energie</option>
                        <option value={'power'}>Puissance</option>
                    </select>
                    <button className="border rounded border-blue-950 px-1">
                        <IconArrowDownUp />
                    </button>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        className="bg-blue-950 px-1"
                        placeholder="Recherche..."
                    />
                    <select className="bg-blue-950">
                        <option>Selectionner une capacité</option>
                        <option>Révélée</option>
                        <option>Continu</option>
                        <option>Sans Effet</option>
                        <option>Défausse</option>
                        <option>Déplace</option>
                        <option>Détruit</option>
                    </select>

                    <button className="border border-black rounded-full text-xs px-1" onClick={() => setViewStyle('')}>
                        0-1
                    </button>
                    <button className="border border-black rounded-full px-2" onClick={() => {}}>
                        2
                    </button>
                    <button className="border border-black rounded-full px-2" onClick={() => {}}>
                        3
                    </button>
                    <button className="border border-black rounded-full px-2" onClick={() => {}}>
                        4
                    </button>
                    <button className="border border-black rounded-full px-2" onClick={() => {}}>
                        5
                    </button>
                    <button className="border border-black rounded-full px-1" onClick={() => {}}>
                        6+
                    </button>
                </div>

                <div className="flex flex-row gap-1 pl-1">
                    <button className="border border-black rounded-full px-2" onClick={() => setViewStyle('w-1/4')}>
                        4
                    </button>
                    <button className="border border-black rounded-full px-2" onClick={() => setViewStyle('w-1/6')}>
                        6
                    </button>
                    <button className="border border-black rounded-full px-1" onClick={() => setViewStyle('w-[12.5%]')}>
                        10
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap">
                {cardsDisplay.map(card => (
                    <>
                        <CardLayout
                            card={card}
                            addCardToDeck={addCardToDeck}
                            viewStyle={viewStyle}
                            type={addCardToDeck ? 'action' : 'link'}
                        >
                            <div className={`group flex flex-col gap-1 items-center relative`}>
                                <Image width={200} height={400} src={card.art ? card.art : ''} alt={card.name} />
                                <div className="absolute hidden bottom-0 group-hover:block">
                                    <div className="flex flex-col gap-1 mx-2 bg-white bg-opacity-80 rounded-md px-2 py-1 text-black">
                                        <div className="font-bold text-center">{card.name}</div>
                                        <div className="text-xs">{card.ability}</div>
                                    </div>
                                </div>
                            </div>
                        </CardLayout>
                    </>
                ))}
            </div>
        </>
    );
}

interface CardLayoutProps {
    children: ReactNode;
    card: Card;
    addCardToDeck?: (card: Card) => void;
    viewStyle: string;
    type: string;
}
const CardLayout = ({children, card, addCardToDeck, viewStyle, type = 'link'}: CardLayoutProps) => {
    return (
        <>
            {type === 'link' ? (
                <Link href={`/cards/${card.id}`} key={card.id} className={`${viewStyle} p-1`}>
                    {children}
                </Link>
            ) : (
                <div
                    key={card.id}
                    className={`${viewStyle} p-1`}
                    onClick={() => {
                        if (addCardToDeck) {
                            addCardToDeck(card);
                        }
                    }}
                >
                    {children}
                </div>
            )}
        </>
    );
};
