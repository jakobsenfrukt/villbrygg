import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { webhooksTrigger } from "sanity-plugin-webhooks-trigger";
import { Logo } from "./plugins/villbrygg-studio-logo/Logo";
import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";

const singleDocuments = [
  "faq",
  "articlepage",
  "about",
  "productpage",
  "reseller",
  "privacy",
  "general",
  "contactpage",
  "shops",
  "frontpage",
];

export default defineConfig({
  title: "Villbrygg",
  projectId: "8pq05gnc",
  dataset: "production",
  icon: Logo,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    colorInput(),
    media(),
    webhooksTrigger({ title: "Deploy", text: " " }),
  ],
  tools: (prev) => {
    if (import.meta.env && import.meta.env.DEV) {
      return prev;
    }
    return prev.filter((tool) => tool.name !== "vision");
  },
  schema: {
    types: schemas,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => !singleDocuments.includes(templateItem.templateId)
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (singleDocuments.includes(schemaType)) {
        return prev.filter(({ action }) => {
          if (!action) {
            return;
          }
          return !["unpublish", "delete", "duplicate"].includes(action);
        });
      }
      return prev;
    },
    unstable_comments: {
      enabled: false, // paid feature
    },
  },
  scheduledPublishing: {
    enabled: false, // paid feature
  },
});
