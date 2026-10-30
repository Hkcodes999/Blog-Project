import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid);
    this.account = new Account(this.client);
  }

  async CreateAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.LoginAccount({ email, password });
      }
    } catch (error) {
      throw error;
    }
  }

  async LoginAccount({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async LogoutAccount() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  }

  async GetCurrentUser() {
    try {
      const user = await this.account.get();
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateAvatar(fileID) {
    try {
      return await this.account.updatePrefs({ avatar: fileID });
    } catch (error) {
      throw error;
    }
  }
}

const authservice = new AuthService();

export default authservice;
