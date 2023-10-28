import {Button} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

import {useSession, signIn, signOut} from 'next-auth/react';

export default function Header() {
    const {data: session} = useSession();
    return (
        <div className="flex flex-row justify-center items-center h-[10vh] p-2 bg-gray-800 text-white fixed w-full z-50">
            <Link href={'/'} className="mr-auto w-20">
                <Image src={'/marvel_snap_logo.png'} width={200} height={200} alt="logo" priority={true} />
            </Link>
            <div className="flex flex-row gap-4 font-bold">
                <Link href={'/cards'}>Cards</Link>
                <Link href={'/locations'}>Location</Link>
                <Link href={'/decks'}>Deck</Link>
                {session && (
                    <div className="flex flex-row gap-2 font-bold">
                        <Link href={'/admin'}>Admin</Link>
                    </div>
                )}
            </div>
            <div className="ml-auto">
                {session ? (
                    <Button onClick={() => signOut()} className="bg-blue-600 rounded-md px-2 py-1">
                        Sign out
                    </Button>
                ) : (
                    <Button onClick={() => signIn()} className="bg-blue-600 rounded-md px-2 py-1">
                        Sign in
                    </Button>
                )}
            </div>
        </div>
    );
}
