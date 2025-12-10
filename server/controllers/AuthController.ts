import { prisma } from "../database";
import type * as GodparentModel from "~~/prisma/generated/prisma/models/Godparents";

export async function FindGodparentByEmail(email: string){
    return await prisma.godparents.findFirst({where: {email: email}})
}

export async function CreateGodparent(data: GodparentModel.GodparentsUncheckedCreateInput){
    return await prisma.godparents.create({
        data: data,
        select: {
            id: true,
            unique_id: true,
            name: true,
            email: true
        }
    })
}