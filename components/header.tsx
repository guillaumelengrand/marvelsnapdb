import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <div className="flex flex-row justify-center items-center h-[10vh] p-2 bg-gray-800 text-white fixed w-full">
            <Link href={'/'} className="mr-auto w-20">
                <Image src={'/marvel_snap_logo.png'} width={200} height={200} alt="logo" priority={true} />
            </Link>
            {/* <h1>Marvel Snap DB</h1> */}
            <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2 font-bold">
                    <Link href={'/cards'}>Cards</Link>
                </div>
                <div className="flex flex-row gap-2 font-bold">
                    <Link href={'/admin'}>Admin</Link>
                </div>
            </div>
            <div className="m-auto"></div>
        </div>
    );
}
