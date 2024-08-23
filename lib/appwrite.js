import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.mandrilltech.smoothieland',
  projectId: '66c6393f0013e8fcc592',
  databaseId: '66c63ae60013303b988a',
  userCollectionId: '66c63b0300327f37fcd9',
  smoothieCollectionId: '66c71ff20008ff9059f6',
  orderCollectionId: '66c8483f0033eb2fe081',
  storageId: '66c71b760009fd694266'
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  smoothieCollectionId,
  orderCollectionId,
  storageId
} = appwriteConfig;

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function createUser(email, password, username){
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount .$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } 
  catch (error) {
    console.log(error.message);
    throw new Error(error)
  }
}

export async function signIn(email, password){
  try {
    //await account.deleteSession("current");
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } 
  catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
}

export async function getCurrentUser(){
  try{
    const currentAccount = await account.get();

    if(!currentAccount) {
      console.log("Error getting current user");
      throw Error;
    };


    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  }
  catch(error){
    console.log(error)
  }
}

export async function signOut(){
  try {
    const session = await account.deleteSession('current');

    return session;
  }
  catch (error) {
    throw new Error(error.message);  
  }
}

export async function getAllSmoothies(){
  try {
    const smoothies = await databases.listDocuments(
      databaseId, smoothieCollectionId
    )

    return smoothies.documents;
  } 
  catch (error) {
    console.log("Error fetching smoothies.");
    throw new Error(error);
  }
}

export async function getImageUrl(imageId) {
  try {
    const fileUrl = storage.getFilePreview(storageId, imageId);

    //console.log(fileUrl);
    return fileUrl;
  } 
  catch (error) {
    console.log("Error fetching image:", error.message);
    throw new Error(error.message);
  }
}

export const createOrder = async (userId, items, total) => {
  try {
    // Convert each item object to a string
    const stringifiedItems = items.map(item => JSON.stringify(item));

    const response = await databases.createDocument(
      databaseId,
      orderCollectionId,
      ID.unique(),
      {
        items: stringifiedItems,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        creator: userId
      }
    );

    return response;
  } 
  catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};