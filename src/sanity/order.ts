const orderSchema = {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "orderId",
      title: "Order ID",
      type: "string",
      description: "The unique ID of the order from Stripe.",
    },
    {
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      description: "The ID of the user who placed the order.",
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "productId",
              title: "Product ID",
              type: "string",
            },
            {
              name: "name",
              title: "Product Name",
              type: "string",
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
            {
              name: "image",
              title: "Product Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
      description: "The products included in the order.",
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
      description: "The total amount paid for the order.",
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
        ],
      },
      description: "The current status of the order.",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "The date and time when the order was created.",
    },
    {
      name: "shippingInfo",
      title: "Shipping Information",
      type: "object",
      fields: [
        { name: "name", title: "Full Name", type: "string" },
        { name: "address", title: "Street Address", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "state", title: "State", type: "string" },
        { name: "zip", title: "ZIP Code", type: "string" },
        { name: "country", title: "Country", type: "string" },
        { name: "email", title: "Email", type: "string" },
      ],
    },
    // New Fields Added
    {
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "street1",
      title: "Street Address 1",
      type: "string",
    },
    {
      name: "street2",
      title: "Street Address 2",
      type: "string",
    },
    {
      name: "labelUrl",
      title: "Label URL",
      type: "string",
    },
    {
      name: "trackingId",
      title: "Tracking ID",
      type: "string",
    },
  ],
};

export default orderSchema;
