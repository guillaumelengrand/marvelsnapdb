import {GetServerSideProps} from 'next';

import type {Card, Prisma, Variant} from '@prisma/client';
import Image from 'next/image';

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from '@nextui-org/react';
import {getCard} from '@/models/card';

interface CardsPageProps {
    data: Prisma.CardGetPayload<{include: {variants: true}}>;
}

export default function Cards({data}: CardsPageProps) {
    return (
        <div className="flex flex-col gap-2 px-2">
            <header></header>
            <main className="flex flex-col gap-1">
                {data && (
                    <>
                        <div>
                            <CardModal card={data} />
                            <div>{data.name}</div>
                        </div>
                        <div className="flex flex-wrap">
                            {data.variants &&
                                data.variants.map((variant: Variant) => (
                                    <div key={variant.id} className="w-1/5 p-1">
                                        <VariantModal card={data} variant={variant} />
                                    </div>
                                ))}
                        </div>
                    </>
                )}
            </main>
            <footer></footer>
        </div>
    );
}

interface CardModalProps {
    card: Card;
}
let CardModal = ({card}: CardModalProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    let size = 400;
    return (
        <>
            <div onClick={onOpen} className="cursor-pointer">
                <Image width={size} height={size} src={card.art ? card.art : ''} alt={`${card.name}-${card.id}`} />
            </div>
            <Modal
                size="3xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                hideCloseButton={true}
                className="bg-transparent border-none rounded-none shadow-none"
            >
                <ModalContent>
                    {onClose => (
                        <>
                            {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
                            <ModalBody className="flex flex-col items-center" onClick={onClose}>
                                <Image
                                    width={1000}
                                    height={1000}
                                    src={card.art ? card.art : ''}
                                    alt={`${card.name}-${card.id}`}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

interface VariantModalProps {
    card: Card;
    variant: Variant;
}

interface Tag {
    tag: string;
    tag_id: number;
    tag_slug: string;
}
let VariantModal = ({card, variant}: VariantModalProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const size = 200;
    console.log({card});

    return (
        <>
            <div onClick={onOpen} className="cursor-pointer flex flex-col gap-1 items-center">
                <Image
                    width={size}
                    height={size}
                    src={variant.art ? variant.art : ''}
                    alt={`${card.name}-${variant.id}`}
                />
                <div className="bg-blue-600 rounded-xl px-2">{variant.rarity}</div>
                {Array.isArray(variant.tags) &&
                    variant.tags.map((tag: any) => (
                        <div className="bg-green-600 rounded-xl px-2" key={tag.tag_id}>
                            {tag.tag}
                        </div>
                    ))}
            </div>
            <Modal
                size="3xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                hideCloseButton={true}
                className="bg-transparent border-none rounded-none shadow-none"
            >
                <ModalContent>
                    {onClose => (
                        <>
                            {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
                            <ModalBody className="flex flex-col items-center" onClick={onClose}>
                                <Image
                                    width={1000}
                                    height={1000}
                                    src={variant.art ? variant.art : ''}
                                    alt={`${card.name}-${variant.id}`}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{data: Card}> = async context => {
    // fetching data here
    // Return the data as props

    let {id} = context.query;
    console.log('🚀 ~ file: [id].tsx:52 ~ id:', id);

    let data = null;

    if (id && typeof id === 'string') {
        let parseId = parseInt(id);
        if (parseId) data = await getCard(parseInt(id));
        console.log('🚀 ~ file: [id].tsx:56 ~ data:', data);
    }
    return {
        props: {
            pageName: `${data.id} - ${data.name}`,
            data,
        },
    };
};
