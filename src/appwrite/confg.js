import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    image,
    status,
    userId,
    userName,
    userAvatar,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
        { title, content, image, status, userId, userName, userAvatar },
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, image, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
        { title, content, image, status },
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
      );
    } catch (error) {
      
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        queries,
      );
    } catch (error) {
      throw error;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwritebucketid,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwritebucketid, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFileView(conf.appwritebucketid, fileId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const service = new Service();
export default service;
