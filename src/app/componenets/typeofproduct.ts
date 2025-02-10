export interface Produc {
  _id: string;
  _rev: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  weight:number;
  imageRef:string;
  slug: {
    current: string;
  };
  imageurl: {
    _id: string;
    url: string;
  }
  dimensions: {
    depth: string;
    width: string;
    height: string;
  };
  features: string[];
  tags: string[];
  category: {
    _id: string;
    name: string;
  };
}



export interface category {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  quantity:number;
}


export interface Order {
  orderId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  products: category[];
}