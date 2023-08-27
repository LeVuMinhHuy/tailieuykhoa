import { EntityReference, buildCollection } from "firecms";
import { Roles } from "../consts/auth.consts";

export type Folder = {
  name: string;
  parents: EntityReference[];
  show_in_nav: boolean;
  access: string[];
  metadata: object;
};

export const folderCollection = buildCollection<Folder>({
  name: "Folders",
  singularName: "Folder",
  path: "folders",
  icon: "Folder",
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
    name: {
      name: "Name",
      validation: { required: true, requiredMessage: "Name is required" },
      dataType: "string",
    },
    parents: {
      name: "Parent folders",
      dataType: "array",
      of: {
        dataType: "reference",
        path: "folders",
        previewProperties: ["name", "parents"],
      },
    },
    show_in_nav: {
      name: "Show in navigation",
      dataType: "boolean",
      defaultValue: false,
    },
    access: {
      name: "Access",
      validation: { required: false },
      dataType: "array",
      defaultValue: [Roles.ALL],
      of: {
        dataType: "string",
        enumValues: Roles,
      },
    },
    metadata: {
      name: "Metadata",
      dataType: "map",
      keyValue: true,
    },
  },
});
