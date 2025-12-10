import { DB } from '~~/lib/database';
import type * as GodparentModel from "~~/prisma/generated/prisma/models/Godparents";

export async function FindGodparentByEmail(email: string){
    return await DB.godparents.findFirst({where: {email: email}})
}

export async function CreateGodparent(data: GodparentModel.GodparentsUncheckedCreateInput){
    return await DB.godparents.create({
        data: data,
        select: {
            id: true,
            unique_id: true,
            name: true,
            email: true
        }
    })
}