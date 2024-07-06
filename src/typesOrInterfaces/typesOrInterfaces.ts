export interface IProduct extends INewProduct {
  id: number;
}

export type AllProducts = IProduct[];

export type Categories = string[];

export interface INewProduct {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface IProduct extends INewProduct {
  id: number;
}

export interface ICartProduct {
  productId: number;
  quantity: number;
}

export interface ICart {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number };
}

export interface INewCartProduct {
  userId: number;
  date: string;
  products: { productId: number; quantity: number };
}

export interface IProductsInCart extends INewCartProduct {
  id: number;
}

export interface INewUser {
  email: string;
  username: string;
  password: string;
  name: { firstname: string; lastname: string };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: { lat: string; long: string };
  };
  phone: string;
}

export interface IUser extends INewUser {
  id: number;
}

export interface IRefreshUser {
  user: IUser;
  token: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}
