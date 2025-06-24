import { Holding } from "@/components/PortfolioManager";
import { Account, Client, Databases, ID, Query } from "appwrite";


// Add at the top of appwrite.ts after imports
console.log("🔍 DEBUG INFO:");
console.log("Project ID:", process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
console.log("Database ID:", "crypto_portfolio");
console.log("Collection ID:", "users");


const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);

const DATABASE_ID = "crypto_portfolio";
const COLLECTION_ID = "users";

export const createAccount = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    await login(email, password);
    return response;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const saveHoldings = async (userId: string, holdings: Holding[]) => {
  try {
    await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      user_id: userId,
      holdings: holdings,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error saving holdings:", error);
    throw error;
  }
};

export const getHoldings = async (userId: string) => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("user_id", userId),
    ]);
    return response.documents;
  } catch (error) {
    console.error("Error getting holdings:", error);
    throw error;
  }
};

export const saveSubscriber = async (email: string) => {
  try {
    const existingSubscriber = await databases.listDocuments(
      DATABASE_ID,
      "subscribers",
      [Query.equal("email", email)],
    );

    if (existingSubscriber.documents.length > 0) {
      throw new Error("Subscriber already exists");
    }

    await databases.createDocument(DATABASE_ID, "subscribers", ID.unique(), {
      email: email,
      subscribed_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error saving subscriber:", error);
    throw error;
  }
};
