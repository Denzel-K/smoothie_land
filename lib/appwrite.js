import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.mandrilltech.smoothieland',
  projectId: '66c6393f0013e8fcc592',
  databaseId: '66c63ae60013303b988a',
  userCollectionId: '66c63b0300327f37fcd9',
  // smoothieCollectionId: '66b0f9ae0006af4021a5',
  //storageId: '66b0fb8500385a781972'
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId
} = appwriteConfig;

const client = new Client();

client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
//const storage = new Storage(client);

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