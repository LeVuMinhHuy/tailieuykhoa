import { Roles } from "../consts/auth.consts";


export const lazadaAffiliateCollection = {
  name: "Lazada Affiliate",
  singularName: "Lazada Affiliate",
  description: "Use for lazada affiliate, contains 4 fields: endpoint, company name, list users, and list event date.",
  show_in_nav: true,
  icon: "ri-file-copy-fill",
  group: "Collections",
  permissions: ({ authController }: any) => {
    const isAdmin = authController.extra?.roles.includes(Roles.ADMIN);
    return {
      edit: isAdmin,
      create: isAdmin,
      delete: isAdmin,
      read: isAdmin,
    };
  },
  fields: [
    {
      label: "Endpoint",
      name: "endpoint",
      type: "text",
      validation: {
        required: true,
        unique: true,
      },
    },
    {
      label: "Company Name",
      name: "company_name",
      type: "text",
      validation: {
        required: true,
      },
    },
    {
      label: "List Users",
      name: "list_users",
      type: "relation",
      target: "user",
      many: true,
      validation: {
        minLength: 1,
      },
    },
    {
      label: "List Event Date",
      name: "list_event_date",
      type: "datetime",
      validation: {
        required: true,
      },
    },
  ],
};
