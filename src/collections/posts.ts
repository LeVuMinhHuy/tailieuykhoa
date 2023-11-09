import { EntityReference, buildCollection } from "firecms";
import { Roles } from "../consts/auth.consts";
import { PostCategories, PostStatus, ShareSocial } from "../enums/posts.enum";

export type Post = {
  title: string;
  //slug: string;
  content: {
    files: string[];
    text: string;
    textLink: string;
  }[];
  folders: EntityReference[];
  categories: string[];
  //status: PostStatus;
  publish_metadata: {
    date: Date;
    publisher: EntityReference;
    tags: string[];
  };
  //download: {
  //  show: boolean;
  //  link: string;
  //  text: string;
  //};
  //share: {
  //  show: boolean;
  //  socials: ShareSocial[];
  //};
  //views: number;
  metadata: object;
  related_posts: EntityReference[];
};

export const postCollection = buildCollection<Post>({
  name: "Posts",
  singularName: "Post",
  path: "posts",
  icon: "Article",
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
    title: {
      name: "Title",
      validation: { required: true, requiredMessage: "Title is required" },
      dataType: "string",
      multiline: true,
    },
    //slug: {
    //  name: "Slug",
    //  validation: { unique: true },
    //  dataType: "string",
    //  multiline: true,
    //},
    content: {
      name: "Content",
      dataType: "array",
      oneOf: {
        typeField: "type",
        valueField: "value",
        properties: {
          files: {
            dataType: "array",
            name: "File",
            of: {
              dataType: "string",
              storage: {
                storagePath: "files",
                //acceptedFiles: ["image/*", "pdf/*" ],
                metadata: {
                  cacheControl: "max-age=1000000",
                },
              },
            },
          },
          text: {
            dataType: "string",
            name: "Text",
            markdown: true,
          },
          textLink: {
            dataType: "string",
            name: "Text Link",
            markdown: true,
          },
        },
      },
    },
    folders: {
      name: "Folders",
      dataType: "array",
      of: {
        dataType: "reference",
        path: "folders",
        previewProperties: ["name", "parents"],
      },
    },
    //status: {
    //  dataType: "string",
    //  name: "Status",
    //  enumValues: PostStatus,
    //},
    categories: {
      name: "Categories",
      validation: { required: true },
      dataType: "array",
      of: {
        dataType: "string",
        enumValues: PostCategories,
      },
    },
    publish_metadata: {
      name: "Publish Metadata",
      dataType: "map",
      properties: {
        date: {
          name: "Date",
          dataType: "date",
          autoValue: "on_update",
        },
        publisher: {
          name: "Publisher",
          dataType: "reference",
          path: "users",
          previewProperties: ["name", "avatar", "role"],
        },
        tags: {
          name: "Tags",
          dataType: "array",
          of: {
            dataType: "string",
          },
        },
      },
      expanded: true,
    },
    //views: {
    //  name: "Views",
    //  validation: {
    //    min: 0,
    //  },
    //  dataType: "number",
    //},
    //download: {
    //  name: "Download Options",
    //  dataType: "map",
    //  properties: {
    //    show: {
    //      name: "Show",
    //      dataType: "boolean",
    //      defaultValue: false,
    //    },
    //    link: {
    //      name: "Link",
    //      dataType: "string",
    //      url: true,
    //    },
    //    text: {
    //      name: "Display Text",
    //      dataType: "string",
    //    },
    //  },
    //  expanded: true,
    //},
    //share: {
    //  name: "Share Options",
    //  dataType: "map",
    //  properties: {
    //    show: {
    //      name: "Show",
    //      dataType: "boolean",
    //      defaultValue: false,
    //    },
    //    socials: {
    //      name: "Socials",
    //      dataType: "array",
    //      of: {
    //        dataType: "string",
    //        enumValues: ShareSocial,
    //      },
    //    },
    //  },
    //  expanded: true,
    //},
    metadata: {
      name: "Metadata",
      dataType: "map",
      keyValue: true,
    },
    related_posts: {
      name: "Related Posts",
      dataType: "array",
      of: {
        dataType: "reference",
        path: "posts",
        previewProperties: ["title", "categories"],
      },
    },
  },
});
