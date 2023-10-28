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
        <main>
            {location ? (
                <>
                    <h1>{location.name}</h1>

                    <div className="flex flex-col gap-1 items-center">
                        <div className="flex flex-wrap w-1/2">
                            {location && (
                                <div>
                                    <div>{location.ability}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
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
