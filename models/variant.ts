import prisma from '@/lib/prisma';

export async function getVariant(id: number) {
    try {
        let variant = await prisma.variant.findUnique({
            where: {
                id,
            },
        });

        return JSON.parse(JSON.stringify(variant));
    } catch (error) {
        console.log({error});
        return null;
    }
}

export async function createVariant(variant: any) {
    let createdVariant = await prisma.variant.create({
        data: variant,
    });

    return JSON.parse(JSON.stringify(createdVariant));
}

export async function updateVariant(variant: any) {
    let createdVariant = await prisma.variant.update({
        where: {
            id: variant.id,
        },
        data: variant,
    });

    return JSON.parse(JSON.stringify(createdVariant));
}
