export interface MenuItem {
  name: string;
  price: number;
  desc?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  note?: string;
  items: MenuItem[];
}

// Hawai Jharokha — pure-vegetarian multi-cuisine rooftop restaurant.
// Prices in INR, subject to government taxes.
const menuRaw: MenuCategory[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    items: [
      { name: "Parantha with Curd", price: 250, desc: "Aloo / Paneer / Pyaaz — whole-wheat flatbread with a spiced filling, served with curd" },
      { name: "Puri Bhaji", price: 250, desc: "Puffed deep-fried wheat bread with spiced vegetables" },
      { name: "Chole Bhature", price: 250, desc: "Spicy chickpea curry with deep-fried leavened bread" },
      { name: "Veg Grilled Sandwich", price: 250, desc: "Buttered bread, mint chutney, sliced vegetables, served with fries" },
      { name: "Idli Sambhar", price: 130, desc: "Steamed lentil cakes with spiced vegetable sambhar" },
      { name: "Vada Sambhar", price: 130, desc: "Fried urad dal vada soaked in sambhar, coriander, onions & curry leaves" },
      { name: "Chinese Idli Dry", price: 250, desc: "Idli tossed crisp, tangy and spicy" },
      { name: "Masala Dosa", price: 155, desc: "Fermented rice-and-lentil crepe with spiced potato" },
      { name: "Plain Dosa", price: 130, desc: "Crisp fermented rice-and-lentil crepe with curry" },
      { name: "Poha", price: 200, desc: "Soaked rice flakes tossed with Indian spices" },
      { name: "Toast (Butter / Jam)", price: 130 },
      { name: "Milk with Corn Flakes", price: 160 },
      { name: "Tea", price: 50 },
      { name: "Coffee", price: 60 },
      { name: "Juice", price: 150, desc: "Orange / Pineapple / Sweet Lime" },
    ],
  },
  {
    id: "soups",
    name: "Soups",
    items: [
      { name: "Sweet Corn Soup", price: 175, desc: "Sweet corn kernels and vegetables in a mildly seasoned broth" },
      { name: "Classic Cream of Tomato", price: 200, desc: "Smooth tomato soup finished with cream" },
      { name: "Hot and Sour Soup", price: 175, desc: "Spicy, tangy soup with vegetables, soy, vinegar & pepper" },
    ],
  },
  {
    id: "starters",
    name: "Starters",
    items: [
      { name: "Masala Papad", price: 100 },
      { name: "Hara Bhara Kebab", price: 250, desc: "Spinach and green-pea patties, spiced and shallow-fried" },
      { name: "Spring Roll", price: 250, desc: "Crisp rolls with a lightly seasoned vegetable filling" },
      { name: "Veg Manchurian Dry", price: 250, desc: "Vegetable balls tossed in spicy garlic-soy sauce" },
      { name: "Honey Chilli Potato", price: 250, desc: "Crisp potatoes in sweet-and-spicy honey chilli sauce" },
      { name: "Chilly Gobhi 65", price: 250, desc: "Cauliflower florets in spiced batter, fried crisp" },
      { name: "Chick Peas Kebab", price: 250, desc: "Chickpeas, potato and gram flour, pan-fried golden" },
      { name: "Crispy Chilli Mushroom", price: 300, desc: "Batter-fried mushrooms with chilli, garlic & sauces" },
      { name: "Corn Potato Ball", price: 300 },
      { name: "Tandoori Aloo", price: 350, desc: "Baby potatoes marinated in yogurt and spices, tandoor-roasted" },
      { name: "Paneer Tikka", price: 350, desc: "Paneer marinated in spiced yogurt, grilled in the tandoor" },
      { name: "Chilli Paneer", price: 350, desc: "Fried paneer with capsicum, onion and spicy sauces" },
      { name: "Paneer 65", price: 350, desc: "Deep-fried paneer in spicy South-Indian seasoning" },
      { name: "Veg Seekh Kebab", price: 350, desc: "Spiced vegetables and soy, skewered and grilled" },
      { name: "Cheese Ball", price: 350, desc: "Crisp potato, cheese, herbs and spices" },
      { name: "Dragon Cheese Ball", price: 400, desc: "Cream and blue cheese, butter and spices, sliced almonds" },
      { name: "Crispy Corn", price: 250 },
    ],
  },
  {
    id: "kulchas",
    name: "Exotic Kulchas",
    note: "2-piece kulcha served with Chole / Dal Makhani",
    items: [
      { name: "Paneer Kulcha", price: 450 },
      { name: "Stuffed Kulcha", price: 450 },
      { name: "Onion Kulcha", price: 450 },
    ],
  },
  {
    id: "pizza",
    name: "Pizza & Bread",
    items: [
      { name: "Classic Margherita", price: 350, desc: "Tomato, mozzarella and basil" },
      { name: "Cheeses Pizza", price: 350, desc: "Mozzarella, buffalo mozzarella, parmesan" },
      { name: "Spicy Paneer Pizza", price: 350, desc: "Chunky paneer, spiced red pepper, crisp capsicum" },
      { name: "Truffled Mushroom Pizza", price: 350, desc: "Shiitake, truffle oil, caramelised onions & mozzarella" },
      { name: "Garlic Bread", price: 225, desc: "Rustic brioche with roasted garlic herb butter, grilled golden" },
      { name: "Bruschetta", price: 225, desc: "Grilled sourdough, vine-ripened tomatoes, basil, olive oil" },
    ],
  },
  {
    id: "pasta-wrap",
    name: "Pasta, Wraps & Sandwich",
    items: [
      { name: "Alfredo", price: 350, desc: "Fettuccine in a velvety parmesan cream sauce" },
      { name: "Arrabiata", price: 350, desc: "Tossed in spicy arrabbiata sauce and fresh basil" },
      { name: "Penne Paprika", price: 400, desc: "Pasta tossed in a paprika sauce" },
      { name: "Paneer Kathi Roll", price: 350 },
      { name: "Falafal Wrap", price: 350 },
      { name: "Crispy Paneer Wrap", price: 400 },
      { name: "Veg Cheese Sandwich", price: 225, desc: "Buttered bread, mint chutney, vegetables & fries" },
      { name: "Paneer Sandwich", price: 250, desc: "Crumbled paneer, spices, veggies and herbs" },
      { name: "Mushroom & Cheese Sandwich", price: 250, desc: "Sautéed mushrooms with a hearty amount of cheese" },
    ],
  },
  {
    id: "paneer",
    name: "Indian Paneer Curries",
    items: [
      { name: "Paneer Do Pyaza", price: 325, desc: "Cooked with onions, sautéed and caramelised" },
      { name: "Paneer Lababdar", price: 350, desc: "Rich tomato-onion gravy with butter and fresh cream" },
      { name: "Paneer Butter Masala", price: 350, desc: "Smooth tomato gravy with butter, cream and mild spices" },
      { name: "Shahi Paneer", price: 350, desc: "Rich gravy of cashews, cream and mild spices" },
      { name: "Kadai Paneer", price: 350, desc: "Capsicum and onions in coarse, freshly ground masala" },
      { name: "Malai Kofta", price: 450, desc: "Red / White — soft koftas in tomato or cashew gravy" },
      { name: "Badshahi Paneer Tikka Masala", price: 450, desc: "Tandoor-roasted paneer in spiced tomato-butter gravy" },
      { name: "Paneer Sizzler", price: 1200, desc: "Chef special — cabbage, potato cutlet, fries, baked vegetable, chilli paneer, palak & baked-beans sauces, smoky butter" },
    ],
  },
  {
    id: "vegetables",
    name: "Vegetables",
    items: [
      { name: "Mix Veg Makkhan Wala", price: 400, desc: "Mixed vegetables in a buttery tomato gravy" },
      { name: "Mix Vegetable", price: 350, desc: "Mixed vegetables in a homestyle gravy" },
      { name: "Masala Bhindi", price: 250, desc: "Okra with onions, tomatoes and everyday spices" },
      { name: "Gatta Curry", price: 275, desc: "Gram-flour dumplings in a traditional Rajasthani yogurt gravy" },
      { name: "Chole Masala", price: 275, desc: "Chickpeas in a spiced onion-tomato gravy" },
      { name: "Mushroom Do Pyaza", price: 350, desc: "Mushrooms and onions in a thick spiced masala" },
      { name: "Matar Mushroom", price: 350, desc: "Peas and mushrooms in a light onion-tomato gravy" },
      { name: "Corn Palak", price: 350, desc: "Corn in a smooth spinach gravy with garlic tempering" },
      { name: "Lauki Kofta", price: 300, desc: "Bottle-gourd dumplings in a creamy tomato-onion curry" },
      { name: "Baked Vegetable", price: 450, desc: "Broccoli, carrots and beans in béchamel, baked with cheese" },
      { name: "Rajasthani Aloo Pyaz", price: 275, desc: "Potato and onion with red chilli and basic spices" },
      { name: "Methi Malai Matar", price: 350, desc: "Green peas in a mild creamy gravy with a hint of sweetness" },
      { name: "Kaju Masala Curry", price: 550, desc: "Cashews in a rich onion-tomato gravy with cream" },
      { name: "Kair Sangri", price: 550, desc: "Dried desert berries and beans with oil, spices, minimal gravy" },
      { name: "Kair Sangri Panchkutta Masala", price: 650, desc: "A mix of dried desert ingredients with strong spices" },
    ],
  },
  {
    id: "dal",
    name: "Indian Dal",
    items: [
      { name: "Dal Fry", price: 275, desc: "Yellow lentils tempered with garlic, cumin and red chilli" },
      { name: "Dal Panchmel", price: 275, desc: "Five lentils tempered with ghee and cumin" },
      { name: "Dal Bukhara", price: 300, desc: "Black lentils slow-cooked for a deep, smoky flavour" },
      { name: "Dal Maharani", price: 325, desc: "Whole black lentils slow-cooked with butter and cream" },
      { name: "Dal Makhani", price: 350, desc: "Black lentils and kidney beans, slow-cooked with butter and cream" },
    ],
  },
  {
    id: "rice-bread",
    name: "Rice & Breads",
    items: [
      { name: "Steamed Rice", price: 125, desc: "Plain basmati, soft and separate" },
      { name: "Jeera Rice", price: 175, desc: "Basmati tempered with cumin in ghee" },
      { name: "Matar Pulao", price: 200, desc: "Rice with green peas and mild whole spices" },
      { name: "Vegetable Pulao", price: 225, desc: "Rice with mixed vegetables and whole spices" },
      { name: "Tandoori Roti", price: 30 },
      { name: "Missi Roti", price: 80 },
      { name: "Naan", price: 100 },
      { name: "Garlic Naan", price: 150 },
      { name: "Lachchha Parantha", price: 120 },
      { name: "Paneer Parantha", price: 150 },
    ],
  },
  {
    id: "salad-raita",
    name: "Salad & Raita",
    items: [
      { name: "Green Salad", price: 120, desc: "Cucumber, onion, tomato and carrot" },
      { name: "Aloo-Channa Salad", price: 150, desc: "Tangy Rajasthani salad with mustard and spices" },
      { name: "Russian Salad", price: 200, desc: "Boiled vegetables in a mayonnaise dressing" },
      { name: "Plain Curd", price: 150, desc: "Fresh curd, lightly seasoned" },
      { name: "Boondi Raita", price: 200, desc: "Curd with fried gram-flour pearls and spices" },
      { name: "Mix Vegetable Raita", price: 250, desc: "Curd with chopped vegetables and mild seasoning" },
      { name: "Fruit Raita", price: 300, desc: "Curd with seasonal fruits and a touch of sugar" },
    ],
  },
  {
    id: "shakes",
    name: "Shakes & Mocktails",
    items: [
      { name: "Butterscotch Shake", price: 180 },
      { name: "Oreo Shake", price: 180 },
      { name: "Brownie Shake", price: 250 },
      { name: "Ferrero Rocher Shake", price: 225, desc: "Chocolate hazelnut blended with milk and chocolate wafers" },
      { name: "Mint Mojito", price: 125, desc: "Lime, mint and soda, full of ice" },
      { name: "Black Current", price: 125, desc: "Black currant with sparkling soda and lime" },
      { name: "Piña Colada", price: 125, desc: "Pineapple juice, coconut cream and ice" },
      { name: "First in Love", price: 150, desc: "Roohafza, limca and soda topped with ice cream" },
      { name: "Sweet Lemon Water", price: 80 },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    items: [
      { name: "Tea (with cookies)", price: 65 },
      { name: "Hot Coffee", price: 80 },
      { name: "Cold Coffee", price: 180 },
      { name: "Milkshake", price: 150, desc: "Oreo / Vanilla / Butterscotch" },
      { name: "Lassi", price: 125, desc: "Sweet / Salted / Plain" },
      { name: "Butter Milk", price: 80 },
      { name: "Lemon Aerated Water", price: 80 },
      { name: "Aerated Drinking Water", price: 50 },
      { name: "Packaged Drinking Water", price: 40 },
    ],
  },
  {
    id: "dessert",
    name: "Dessert",
    items: [
      { name: "Rasgulla", price: 80 },
      { name: "Ice Cream", price: 100 },
      { name: "Rasmalai", price: 125 },
      { name: "Gajar Halwa", price: 125, desc: "Seasonal" },
      { name: "Gulab Jamun with Ice Cream", price: 150 },
    ],
  },
];

// Display order of menu categories on the Hawai Jharokha page.
const MENU_ORDER = [
  "breakfast",
  "starters",
  "soups",
  "pasta-wrap",
  "pizza",
  "kulchas",
  "paneer",
  "vegetables",
  "dal",
  "rice-bread",
  "shakes",
  "salad-raita",
  "beverages",
  "dessert",
];

export const menu: MenuCategory[] = MENU_ORDER
  .map((id) => menuRaw.find((c) => c.id === id))
  .filter((c): c is MenuCategory => Boolean(c));

// Fail loudly at build/dev start if MENU_ORDER and menuRaw drift, so a category
// is never silently dropped from the page.
if (process.env.NODE_ENV !== "production") {
  const rawIds = menuRaw.map((c) => c.id);
  const missing = rawIds.filter((id) => !MENU_ORDER.includes(id));
  const unknown = MENU_ORDER.filter((id) => !rawIds.includes(id));
  const duplicates = MENU_ORDER.filter((id, i) => MENU_ORDER.indexOf(id) !== i);
  if (missing.length || unknown.length || duplicates.length) {
    throw new Error(
      `menu.ts MENU_ORDER is out of sync with menuRaw — missing: [${missing}], unknown: [${unknown}], duplicates: [${duplicates}]`
    );
  }
}
