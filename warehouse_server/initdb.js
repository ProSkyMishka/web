db = db.getSiblingDB('warehouse');

db.createCollection("categories");
db.categories.createIndex({ name: 1 }, { unique: true });

db.createCollection("products");
db.products.createIndex({ title: "text", description: "text" });

db.categories.insertMany([
  { name: "Fruits" },
  { name: "Vegetables" },
  { name: "Dairy" }
]);

const fruitsCategory = db.categories.findOne({ name: "Fruits" });
const vegetablesCategory = db.categories.findOne({ name: "Vegetables" });
const dairyCategory = db.categories.findOne({ name: "Dairy" });

db.products.insertMany([
  {
    title: "Apple",
    description: "Fresh apples from the local farm.",
    category: fruitsCategory._id,
    count: 100,
    meas: "kg",
    price: 2.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
  },
  {
    title: "Carrot",
    description: "Organic carrots.",
    category: vegetablesCategory._id,
    count: 200,
    meas: "kg",
    price: 1.5,
    image: "https://erepublic.brightspotcdn.com/dims4/default/3606abb/2147483647/strip/true/crop/1000x521+0+73/resize/840x438!/quality/90/?url=http%3A%2F%2Ferepublic-brightspot.s3.us-west-2.amazonaws.com%2Fa6%2Fa6%2F121ce519487199b9166fd8219dba%2Fcarrots.jpg"
  },
  {
    title: "Milk",
    description: "Fresh whole milk.",
    category: dairyCategory._id,
    count: 50,
    meas: "l",
    price: 0.99,
    image: "https://themodernmilkman.co.uk/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fszr69flitpp6%2F26I5KvEPjI1A5lvggje7tG%2F05d72e7d2b138b7af519665c2a795a82%2F2-2.jpg&w=640&q=75"
  }
]);

print("Инициализация базы данных завершена. Текущая база: " + db.getName());
