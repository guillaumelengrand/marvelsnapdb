import {Tag} from '@prisma/client';
import prisma from '../lib/prisma';

export async function getTag(id: number) {
    let tag = await prisma.tag.findUnique({
        where: {
            id,
        },
    });

    return JSON.parse(JSON.stringify(tag));
}

export async function createTag(tag: any) {
    let createdTag = await prisma.tag.create({
        data: tag,
    });
    return JSON.parse(JSON.stringify(createdTag));
}
