import {GetServerSideProps} from 'next';

import type {Location} from '@prisma/client';
import Image from 'next/image';
import {useState} from 'react';
import Link from 'next/link';
import {getLocations} from '@/models/location';

interface DecksPageProps {
    locations: Location[];
}

export default function Decks({locations}: DecksPageProps) {
    let [viewStyle, setViewStyle] = useState(false);
    return (
        <div className="px-2">
            <main className="flex flex-col gap-1">
                <h1 className="text-5xl place-self-center">Locations</h1>

                <div className="flex flex-row gap-1">
                    <button className="border border-black rounded-full px-2" onClick={() => setViewStyle(false)}>
                        6
                    </button>
                    <button className="border border-black rounded-full px-1" onClick={() => setViewStyle(true)}>
                        12
                    </button>
                </div>

                <div className="flex flex-wrap">
                    {locations.map(location => (
                        <Link
                            href={`/locations/${location.id}`}
                            key={location.id}
                            className={`${viewStyle ? 'w-1/12' : 'w-1/6'} p-1`}
                        >
                            <div
                                className={`group flex flex-col gap-1 items-center border border-black p-2 rounded-md relative`}
                            >
                                <Image
                                    width={400}
                                    height={400}
                                    src={location.art ? location.art : ''}
                                    alt={location.name}
                                />
                                <div className="hidden absolute w-full bottom-2 left-0 group-hover:block">
                                    <div className="flex flex-col items-center gap-1 mx-4 bg-white rounded-md px-2 text-black">
                                        <div className="font-bold">{location.name}</div>
                                        <div className="text-xs">{location.ability}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<DecksPageProps> = async context => {
    // fetching data here
    // Return the data as props

    let locations = await getLocations();
    return {
        props: {
            pageName: `Decks List`,
            locations,
        },
    };
};
