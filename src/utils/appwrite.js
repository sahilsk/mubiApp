import { Client, Databases, ID, Query } from "appwrite";
import _ from "lodash";

const client = new Client();

const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_DB_COLLECTION_ID;

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const databases = new Databases(client);

export const fetchMovieSearches = async (limit=10) => {

  try {
    const resp = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [ 
      Query.limit(20),
      Query.orderDesc('count')
    ]);
    console.log("[Appwrite] Documents");
    console.log(resp);
    let docs = resp.documents;
    docs = _.sortBy(docs, ['count']).reverse();

    let seen = []
    let filterDocs = docs.filter((doc) => {
      if( seen.indexOf(doc.movie_id) < 0 && seen.length <= limit && doc.poster_path) {
        seen.push(doc.movie_id);
        return true;
      }
      return false;
    });
    
    return _.sortBy(filterDocs, ['count']).reverse();
  }
  catch (e) {
    console.log(`Error fetching documents: ${e}`);
  }
  finally {
    console.log("Listing documents complete");
  }
} // fetch_trending


export const storeSearches = async (searchTerm, movie) => {

  if ([null, '', undefined].includes(searchTerm)) {
    console.log("searchTerm is empty");
    return
  }

  console.log(`[storeSearches] search: ${searchTerm}`);

  let resp = null;
  try {
    resp = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("search", searchTerm)]);
    console.log(resp);

    if (resp.total == 0) {
      // new search term found
      console.log("[Appwrite] Storing new search term");

      resp = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          "search": searchTerm,
          "movie_id": movie.id,
          "poster_path": movie.poster_path,
          "count": 1
        });

      console.log("[storeSearches] new search created !");
    } else {
      const result = resp.documents[0];
      console.log(`Updating document: ${result}`);
      console.log(result);

      console.log(movie);

      resp = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        result.$id,
        {
          "search": searchTerm,
          "movie_id": movie.id,
          "poster_path": movie.poster_path,
          "count": result.count + 1
        });


    } // end 'else'
    console.log(resp);
    return resp;
  }
  catch (e) {
    console.log(`Error updating documents: ${e}`);
  }



}


