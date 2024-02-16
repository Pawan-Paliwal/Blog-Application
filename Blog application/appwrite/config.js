import conf from "../confg/confg";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class DatabaseService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //for creating the post instance
  async createpost({ slug, title, content, image, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritecollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("error from the createpost::", error);
      return false;
    }
  }

  //getting the single project
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritecollectionId,
        slug
      );
    } catch (error) {
      console.log("error from the getPost::", error);
      return false;
    }
  }

  //getting the multiple project according to the condition
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritecollectionId,
        queries
      );
    } catch (error) {
      console.log("error from the getPosts::", error);
      return false;
    }
  }

  //update the post
  async updatePost(slug, { title, content, image, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritecollectionId,
        slug,
        {
          title,
          content,
          image,
          status,
        }
      );
    } catch (error) {
      console.log("error from the updatePost::", error);
      return false;
    }
  }

  //delete the post
  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwritecollectionId,
        slug
      );
    } catch (error) {
      console.log("error from the deletePost::", error);
      return false;
    }
  }

  //send file to the bucket file in appwrite
  async sendFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBuckectId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("error from the sendFile::", error);
      return false;
    }
  }

  //delete the appwrite file which id inserted before
  async deletefile(fileID) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBuckectId, fileID);
    } catch (error) {
      console.log("error from the deletefile::", error);
      return false;
    }
  }

  //getfilee preview

  getFilePre(fileID) {
    return this.bucket.getFilePreview(conf.appwriteBuckectId, fileID).href;
  }
}

const database = new DatabaseService();

export default database;
