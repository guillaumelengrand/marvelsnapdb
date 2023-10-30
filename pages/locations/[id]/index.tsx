import {Deck, Location, Prisma} from '@prisma/client';
import {GetServerSideProps} from 'next';
import {getDeck} from '../../../models/deck';
import Link from 'next/link';
import Image from 'next/image';
import {getLocation, getLocations} from '../../../models/location';

interface LocationPageProps {
    location: Location;
}

export default function Location({location: location}: LocationPageProps) {
    return (
        <main className="min-h-[90vh] p-4">
            {location ? (
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-3xl font-bold">{location.name}</h1>

                    <Image
                        width={400}
                        height={400}
                        src={location.art ? location.art : ''}
                        alt={location.name}
                        className="w-[60vh]"
                    />

                    <div>{location.ability}</div>
                </div>
            ) : (
                <>
                    <h1>Location Not Founded</h1>
                </>
            )}
        </main>
    );
}

export const getServerSideProps: GetServerSideProps<LocationPageProps> = async context => {
    // fetching data here
    // Return the data as props

    // let cards = await getCards();
    let {id} = context.query;
    let deck = null;
    if (typeof id === 'string') deck = await getLocation(parseInt(id));
    return {
        props: {
            pageName: `${deck.id} - ${deck.name}`,
            location: deck,
        },
    };
};
