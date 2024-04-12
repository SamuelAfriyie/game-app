import { MongoClient } from "mongodb";

type MongoResponse = {
  // error: string;
  success: boolean;
  db: any;
};
const UseMongo = (): MongoResponse => {
  const URI = process.env.MONGODBURI;
  const options = {};
console.log(URI);
  // if (!URI) throw new Error("Please add your mongo url to your .env.local");
  if (!URI) console.log("Please add your mongo url to your .env.local");
  let client = new MongoClient(URI ?? "", options);
  let clentPromise;

  if (process.env.NODE_ENV !== "production") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = client.connect();
    }

    clentPromise = global._mongoClientPromise;
  } else {
  }
  clentPromise = client.connect();

  return {
    success: true,
    db: clentPromise,
  };
};

export default UseMongo;
