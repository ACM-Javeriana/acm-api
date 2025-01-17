import { Context } from "elysia";
import MongoDB from "../lib/mongo";
import { BadRequest, Ok } from "../utils/responses";

const COLLECTION : string = 'activities';
const mongo = new MongoDB();

export const getAllActivities = async (context: Context) => {
    return Ok(context, await mongo.getAllDocuments(COLLECTION));
}

export const getOneActivity = async (context: Context) => {
    const result = await mongo.getOneDocument(COLLECTION, {_id: context.params.id });

    if (!result) return BadRequest(context, "Do not exist.");

    return Ok(context, result);
}

export const createActivity = async (context: Context) => {
    const act = await mongo.getOneDocument(COLLECTION, { title: context.body.title });

    if (act) return BadRequest(context, "Activity already exist");

    return (await mongo.insertDocument(COLLECTION, context.body));
}

export const updateActivity = async (context: Context)=> {
    const activityId = context.params.id;

    const toUpdt = await mongo.getOneDocument(COLLECTION, { _id: activityId });

    if (!toUpdt) return BadRequest(context, "This activity do not exist.");

    return Ok(context, await mongo.updateOneDocument(COLLECTION, { _id: activityId }, context.body));
}


export const deleteActivity = async (context: Context) => {
    const activityId = context.params.id;
    const toDel = await mongo.getOneDocument(COLLECTION, { _id: activityId });

    if (!toDel) return BadRequest(context, "This activity do not exist.");

    return Ok(
        context,
        await mongo.deleteOneDocument(COLLECTION, { _id: activityId })
    );
}
