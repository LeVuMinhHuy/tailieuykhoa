import { buildCollection } from "firecms";
import { Roles } from "../consts/auth.consts";

export type Affiliate = {
  endpoint: string;
  expiration: number;
};

export const affiliateCollection = buildCollection<Affiliate>({
  name: "Affiliate",
  singularName: "Affiliate",
  path: "affiliate",
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
        requiredMessage: "Username is required",
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
