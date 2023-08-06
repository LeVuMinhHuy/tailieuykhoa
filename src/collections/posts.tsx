import { EntityReference, buildCollection } from "firecms";

export type Post = {
  title: string;
  download: {
    show: boolean;
    link: string;
    text: string;
  };
  share: {
    show: boolean;
    socials: ShareSocial[];
  };
  publish_metadata: {
    date: Date;
    publisher: Publisher;
    tags: string[];
  };
  content: {
    files: string;
    text: string;
  };
  views: number;
  metadata: object;
  categories: string[];
  related_posts: EntityReference[];
};

enum ShareSocial {
  Link = "link",
  Facebook = "facebook",
  Zalo = "zalo",
}

enum PostCategories {
  Documents = "documents",
  Exams = "exams",
  Books = "books",
}

type Publisher = {
  name: string;
  avatar: string;
  link: string;
  id: string;
};

export const postCollection = buildCollection<Post>({
  name: "Posts",
  singularName: "Post",
  path: "posts",
  icon: "ArticleIcon",
  group: "Data",
  permissions: ({ authController, user }) => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    title: {
      name: "Title",
      validation: { required: true, requiredMessage: "Title is required" },
      dataType: "string",
    },
    download: {
      name: "Download Options",
      dataType: "map",
      properties: {
        show: {
          name: "Show",
          dataType: "boolean",
        },
        link: {
          name: "Link",
          dataType: "string",
        },
        text: {
          name: "Display Text",
          dataType: "string",
        },
      },
      expanded: true,
    },
    share: {
      name: "Share Options",
      dataType: "map",
      properties: {
        show: {
          name: "Show",
          dataType: "boolean",
        },
        socials: {
          name: "Socials",
          dataType: "array",
          of: {
            dataType: "string",
            enumValues: ShareSocial,
          },
        },
      },
      expanded: true,
    },
    publish_metadata: {
      name: "Publish Metadata",
      dataType: "map",
      properties: {
        date: {
          name: "Date",
          dataType: "date",
        },
        publisher: {
          name: "Publisher",
          dataType: "map",
          properties: {
            name: {
              name: "Name",
              dataType: "string",
            },
            avatar: {
              name: "Avatar",
              dataType: "string",
            },
            link: {
              name: "Link",
              dataType: "string",
            },
            id: {
              name: "Id",
              dataType: "string",
            },
          },
        },
        tags: {
          name: "Tags",
          description: "Example of generic array",
          //validation: { required: true },
          dataType: "array",
          of: {
            dataType: "string",
          },
        },
      },
      expanded: true,
    },
    categories: {
      name: "Categories",
      validation: { required: true },
      dataType: "array",
      of: {
        dataType: "string",
        enumValues: PostCategories,
      },
    },
    content: {
      name: "Content",
      dataType: "map",
      properties: {
        files: {
          dataType: "string",
          name: "File",
          storage: {
            storagePath: "files",
            //acceptedFiles: ["image/*", "pdf/*" ],
            metadata: {
              cacheControl: "max-age=1000000",
            },
          },
        },
        text: {
          dataType: "string",
          name: "Text",
          markdown: true,
        },
      },
    },
    views: {
      name: "Views",
      validation: {
        min: 0,
      },
      dataType: "number",
    },
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
