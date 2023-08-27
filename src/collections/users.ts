import { buildCollection } from "firecms";
import { Roles } from "../consts/auth.consts";
import { UserReputation, UserStatus } from "../enums/users.enum";

export type User = {
  username: string;
  name: string;
  email: string;
  role: Roles;
  status: UserStatus;
  avatar: string;
  posts_count: number;
  reputation: UserReputation;
};

export const userCollection = buildCollection<User>({
  name: "Users",
  singularName: "User",
  path: "users",
  icon: "Person",
  group: "Data",
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes(Roles.ADMIN);
    return {
      edit: isAdmin,
      create: isAdmin,
      delete: isAdmin,
      read: isAdmin,
    };
  },
  properties: {
    username: {
      name: "Username",
      validation: {
        required: true,
        requiredMessage: "Username is required",
        unique: true,
      },
      dataType: "string",
    },
    name: {
      name: "Name",
      validation: { required: true, requiredMessage: "Name is required" },
      dataType: "string",
    },
    email: {
      name: "Email",
      dataType: "string",
      email: true,
      validation: {
        unique: true,
      },
    },
    role: {
      dataType: "string",
      name: "Role",
      enumValues: Roles,
      validation: {
        required: true,
        requiredMessage: "Role is required",
      },
    },
    status: {
      dataType: "string",
      name: "Status",
      enumValues: UserStatus,
    },
    avatar: {
      dataType: "string",
      name: "Avatar",
      storage: {
        storagePath: "users",
        metadata: {
          cacheControl: "max-age=1000000",
        },
        fileName: (context) => {
          return context.file.name;
        },
      },
    },
    posts_count: {
      name: "Posts count",
      validation: {
        min: 0,
      },
      dataType: "number",
    },
    reputation: {
      dataType: "string",
      name: "Reputation",
      enumValues: UserReputation,
      defaultValue: UserReputation.Excellent,
    },
  },
});
