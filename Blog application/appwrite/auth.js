import conf from "../confg/confg";
import { Client, Account, ID } from "appwrite";

export class authService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAcount({ email, password, name }) {
    try {
      const userAcount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAcount) {
        return this.login({ email, password });
      } else {
        return userAcount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async currentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("the erroe accured form the currentuser::", error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSession();
    } catch (error) {
      console.log("The error accured from the logout::", error);
    }
  }
}

const service = new authService();

export default service;
