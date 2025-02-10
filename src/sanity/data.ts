// schemas/product.ts
import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  // Preview configuration for Sanity Studio
  
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
    }),

    
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "quantity",
      title: "Stock Quantity",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Add tags for better searchability",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().min(50).max(500),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "Key features of the product",
    }),
    defineField({
      name: 'weight',
      title: 'Weight (lbs)',
      type: 'number',
      validation: Rule => Rule.required().min(0.1),
      initialValue: 1
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        defineField({ name: "height", title: "Height", type: "string" }),
        defineField({ name: "width", title: "Width", type: "string" }),
        defineField({ name: "depth", title: "Depth", type: "string" }),
      ],
    }),
  ],
});