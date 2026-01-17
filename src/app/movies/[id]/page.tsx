import { getDatabase } from "@/db/mongodb";
import {ObjectId} from "mongodb";

async function getMovie(id: string){
    const db=await getDatabase("cinema-platform");
    return db.collection("movies").findOne({_id: new ObjectId(id)});
}

export default async function Movie({params}:{params:{id: string}}) {
    const movie = await getMovie(params.id);

}