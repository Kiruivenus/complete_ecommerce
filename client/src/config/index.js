import { Phone } from "lucide-react";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "Phones", label: "Phones" },
      { id: "Electronics", label: "Electronics" },
      { id: "Fashion", label: "Fashion" },
      { id: "Appliances", label: "Appliances" },
      { id: "Shoes", label: "Shoes" },
      { id: "Health", label: "Health" },
      { id: "tvs", label: "Tvs" },
      { id: "Furniture", label: "Furniture" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "Kitchen", label: "Kitchen" },
      { id: "Appliances", label: "Appliances" },
      { id: "accessories", label: "accessories" },
      { id: "laptops", label: "laptops" },
      { id: "Computers", label: "Computers" },
      { id: "Women", label: "Women" },
      { id: "Men", label: "Men" },
      { id: "Kids", label: "Kids" },
      { id: "MakeUp", label: "MakeUp" },
      { id: "Audio", label: "Audio" },
      { id: "TV", label: "TV" },
      { id: "Camera", label: "Camera" },
      { id: "Furniture", label: "Furniture" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "Phones",
    label: "Phones",
    path: "/shop/listing",
  },
  {
    id: "Fashion",
    label: "Fashion",
    path: "/shop/listing",
  },
  {
    id: "Electronics",
    label: "Electronics",
    path: "/shop/listing",
  },
  {
    id: "Appliances",
    label: "Appliances",
    path: "/shop/listing",
  },
  {
    id: "Shoes",
    label: "Shoes",
    path: "/shop/listing",
  },
  {
    id: "Health",
    label: "Health",
    path: "/shop/listing",
  },
  {
    id: "Furniture",
    label: "Furniture",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  Phones: "Phones",
  Fashion: "Fashion",
  Electronics: "Electronics",
  Shoes: "Shoes",
  Appliances: "Appliances",
  Health: "Health",
  Furniture: "Furniture",
};

export const brandOptionsMap = {
  Kitchen: "Kitchen",
  Appliances: "Appliances",
  accessories: "accessories",
  laptops: "laptops",
  Computers: "Computers",
  Women: "Women",
  Men: "Men",
  Kids: "Kids",
  MakeUp: "MakeUp",
  Audio: "Audio",
  TV: "TV",
  Camera: "Camera",
  Furniture: "Furniture",
};

export const filterOptions = {
  category: [
    { id: "Phones", label: "Phones" },
    { id: "Fashion", label: "Fashion" },
    { id: "Electronics", label: "Electronics" },
    { id: "Shoes", label: "Shoes" },
    { id: "Appliances", label: "Appliances" },
    { id: "Health", label: "Health" },
    { id: "Furniture", label: "Furniture" },
  ],
  brand: [
    { id: "Kitchen", label: "Kitchen" },
    { id: "Appliances", label: "Appliances" },
    { id: "accessories", label: "accessories" },
    { id: "laptops", label: "laptops" },
    { id: "Computers", label: "Computers" },
    { id: "Women", label: "Women" },
    { id: "Men", label: "Men" },
    { id: "Kids", label: "Kids" },
    { id: "MakeUp", label: "MakeUp" },
    { id: "Audio", label: "Audio" },
    { id: "TV", label: "TV" },
    { id: "Camera", label: "Camera" },
    { id: "Furniture", label: "Furniture" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
