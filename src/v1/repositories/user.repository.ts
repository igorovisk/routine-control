import { UserDTO } from "../interfaces/dtos";
import { UserInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserRepository {
   async getUsers(): Promise<UserDTO[]> {
      try {
         const users = await prisma.user.findMany({
            include: {
               Routine: {
                  include: {
                     tasks: true,
                  },
               },
            },
         });
         return users;
      } catch (error) {
         console.log(error, "Error getting all users from database.");
         throw error;
      }
   }

   async getUserById(id: string): Promise<UserDTO | {}> {
      try {
         const user = await prisma.user.findUnique({
            where: { id: id },
            include: {
               Routine: {
                  include: {
                     tasks: true,
                  },
               },
            },
         });
         if (!user) {
            return {};
         }
         console.log(user, "User");
         return user;
      } catch (error) {
         console.log(error, "Error getting user.");
         throw error;
      }
   }

   async createUser(user: UserInterface): Promise<UserDTO> {
      try {
         const newUser = await prisma.user.create({ data: user });
         console.log(newUser, "NEW USER");
         return newUser;
      } catch (error) {
         throw error;
      }
   }
   async updateUser(updatedUserData: UserInterface): Promise<UserDTO> {
      try {
         //get token
         const token = {
            id: "1",
         };
         const userExists = await prisma.user.findUnique({
            where: {
               id: token.id,
            },
         });

         if (!userExists) {
            throw new Error("This user doesn't exist.");
         }

         const updatedUser = await prisma.user.update({
            where: { id: token.id },
            data: updatedUserData,
         });
         console.log(updatedUser, "updatedUser ");
         return updatedUser;
      } catch (error) {
         throw error;
      }
   }

   async getUserByUsernameOrEmail(
      username?: string,
      email?: string
   ): Promise<UserDTO | null> {
      try {
         const user = prisma.user.findFirst({
            where: {
               OR: [
                  {
                     email: email,
                  },
                  { username: username },
               ],
            },
            include: {
               Routine: {
                  include: {
                     tasks: true,
                  },
               },
            },
         });
         return user;
      } catch (error) {
         console.log(error, "Error getting user by username ou email.");
         throw error;
      }
   }
}
