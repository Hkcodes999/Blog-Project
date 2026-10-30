const conf = {
  appwriteurl: String(import.meta.env.VITE_APP_URL),
  appwriteprojectid: String(import.meta.env.VITE_APP_PROJECT_ID),
  appwritedatabaseid: String(import.meta.env.VITE_APP_DATABASE_ID),
  appwritecollectionid: String(import.meta.env.VITE_APP_COLLECTION_ID),
  appwritebucketid: String(import.meta.env.VITE_APP_BUCKET_ID),
};

export default conf;