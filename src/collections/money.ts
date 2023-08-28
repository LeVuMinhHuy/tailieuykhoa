import { buildCollection } from "firecms";
import { Roles } from "../consts/auth.consts";

export type Money = {
  endpoint: string;
  expiration: number;
};

export const moneyCollection = buildCollection<Money>({
  name: "Money",
  singularName: "Money",
  path: "money",
  icon: "paid",
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
    endpoint: {
      name: "Endpoint",
      validation: {
        required: true,
        requiredMessage: "Endpoint is required",
        unique: true,
      },
      dataType: "string",
    },
    expiration: {
      name: "Expiration",
      validation: {
        min: 0,
      },
      dataType: "number",
    },
  },
});
