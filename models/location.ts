import type {Location, Prisma} from '@prisma/client';
import prisma from '@/lib/prisma';

// type LocationWithTag = Prisma.LocationGetPayload<{include: {tags: true}}>;

export async function getLocations() {
    let locations = await prisma.location.findMany();

    return JSON.parse(JSON.stringify(locations));
}

export async function getLocation(id: number) {
    let location = await prisma.location.findUnique({
        where: {
            id,
        },
    });

    return JSON.parse(JSON.stringify(location));
}

export async function createLocation(location: any) {
    let createdLocation = await prisma.location.create({
        data: location,
    });

    return JSON.parse(JSON.stringify(createdLocation));
}

export async function updateLocation(location: any) {
    let updatedLocation = await prisma.location.update({
        where: {
            id: location.id,
        },
        data: location,
    });
    return JSON.parse(JSON.stringify(updatedLocation));
}
