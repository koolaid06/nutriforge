// Nutrition values per 100g
// { calories (kcal), protein (g), carbs (g), fat (g) }

export const FOOD_DB = [
  // ── Proteins ─────────────────────────────────────────────
  { name: 'Chicken Breast',         calories: 165, protein: 31,   carbs: 0,    fat: 3.6,  unit: 'g'    },
  { name: 'Chicken Thigh',          calories: 209, protein: 26,   carbs: 0,    fat: 11,   unit: 'g'    },
  { name: 'Eggs (whole)',           calories: 155, protein: 13,   carbs: 1.1,  fat: 11,   unit: 'pc',  serving: 50  },
  { name: 'Egg Whites',             calories: 52,  protein: 11,   carbs: 0.7,  fat: 0.2,  unit: 'g'    },
  { name: 'Tuna (canned)',          calories: 116, protein: 26,   carbs: 0,    fat: 1,    unit: 'g'    },
  { name: 'Salmon',                 calories: 208, protein: 20,   carbs: 0,    fat: 13,   unit: 'g'    },
  { name: 'Tilapia',                calories: 96,  protein: 20,   carbs: 0,    fat: 1.7,  unit: 'g'    },
  { name: 'Shrimp',                 calories: 99,  protein: 24,   carbs: 0.2,  fat: 0.3,  unit: 'g'    },
  { name: 'Ground Beef (lean)',     calories: 215, protein: 26,   carbs: 0,    fat: 12,   unit: 'g'    },
  { name: 'Ground Beef (regular)',  calories: 254, protein: 17,   carbs: 0,    fat: 20,   unit: 'g'    },
  { name: 'Beef Steak',             calories: 271, protein: 26,   carbs: 0,    fat: 18,   unit: 'g'    },
  { name: 'Turkey Breast',          calories: 135, protein: 30,   carbs: 0,    fat: 1,    unit: 'g'    },
  { name: 'Pork Loin',              calories: 242, protein: 27,   carbs: 0,    fat: 14,   unit: 'g'    },
  { name: 'Lamb',                   calories: 294, protein: 25,   carbs: 0,    fat: 21,   unit: 'g'    },
  { name: 'Cottage Cheese',         calories: 98,  protein: 11,   carbs: 3.4,  fat: 4.3,  unit: 'g'    },
  { name: 'Greek Yogurt',           calories: 59,  protein: 10,   carbs: 3.6,  fat: 0.4,  unit: 'g'    },
  { name: 'Whey Protein Powder',    calories: 370, protein: 80,   carbs: 6,    fat: 4,    unit: 'g'    },
  { name: 'Tofu',                   calories: 76,  protein: 8,    carbs: 1.9,  fat: 4.8,  unit: 'g'    },
  { name: 'Tempeh',                 calories: 193, protein: 19,   carbs: 9,    fat: 11,   unit: 'g'    },

  // ── Dairy ────────────────────────────────────────────────
  { name: 'Whole Milk',             calories: 61,  protein: 3.2,  carbs: 4.8,  fat: 3.3,  unit: 'ml'   },
  { name: 'Skimmed Milk',           calories: 35,  protein: 3.4,  carbs: 5,    fat: 0.1,  unit: 'ml'   },
  { name: 'Cheddar Cheese',         calories: 402, protein: 25,   carbs: 1.3,  fat: 33,   unit: 'g'    },
  { name: 'Mozzarella',             calories: 280, protein: 28,   carbs: 2.2,  fat: 17,   unit: 'g'    },
  { name: 'Paneer',                 calories: 265, protein: 18,   carbs: 1.2,  fat: 21,   unit: 'g'    },
  { name: 'Butter',                 calories: 717, protein: 0.9,  carbs: 0.1,  fat: 81,   unit: 'g'    },

  // ── Carbs / Grains ───────────────────────────────────────
  { name: 'White Rice (cooked)',    calories: 130, protein: 2.7,  carbs: 28,   fat: 0.3,  unit: 'g'    },
  { name: 'Brown Rice (cooked)',    calories: 112, protein: 2.6,  carbs: 23,   fat: 0.9,  unit: 'g'    },
  { name: 'Oats',                   calories: 389, protein: 17,   carbs: 66,   fat: 7,    unit: 'g'    },
  { name: 'White Bread',            calories: 265, protein: 9,    carbs: 49,   fat: 3.2,  unit: 'pc',  serving: 30  },
  { name: 'Whole Wheat Bread',      calories: 247, protein: 13,   carbs: 41,   fat: 4.2,  unit: 'pc',  serving: 30  },
  { name: 'Pasta (cooked)',         calories: 131, protein: 5,    carbs: 25,   fat: 1.1,  unit: 'g'    },
  { name: 'Whole Wheat Pasta',      calories: 124, protein: 5.3,  carbs: 23,   fat: 1.4,  unit: 'g'    },
  { name: 'Potato (boiled)',        calories: 87,  protein: 1.9,  carbs: 20,   fat: 0.1,  unit: 'pc',  serving: 150 },
  { name: 'Sweet Potato',           calories: 86,  protein: 1.6,  carbs: 20,   fat: 0.1,  unit: 'pc',  serving: 130 },
  { name: 'Quinoa (cooked)',        calories: 120, protein: 4.4,  carbs: 22,   fat: 1.9,  unit: 'g'    },
  { name: 'Chapati / Roti',         calories: 297, protein: 8,    carbs: 52,   fat: 7,    unit: 'pc',  serving: 40  },
  { name: 'Cornflakes',             calories: 357, protein: 8,    carbs: 84,   fat: 0.9,  unit: 'g'    },
  { name: 'Idli',                   calories: 58,  protein: 2,    carbs: 12,   fat: 0.3,  unit: 'pc',  serving: 40  },
  { name: 'Dosa (plain)',           calories: 168, protein: 3.9,  carbs: 24,   fat: 6.4,  unit: 'pc',  serving: 80  },

  // ── Vegetables ───────────────────────────────────────────
  { name: 'Broccoli',               calories: 34,  protein: 2.8,  carbs: 7,    fat: 0.4,  unit: 'g'    },
  { name: 'Spinach',                calories: 23,  protein: 2.9,  carbs: 3.6,  fat: 0.4,  unit: 'g'    },
  { name: 'Kale',                   calories: 35,  protein: 2.9,  carbs: 4.4,  fat: 0.7,  unit: 'g'    },
  { name: 'Carrots',                calories: 41,  protein: 0.9,  carbs: 10,   fat: 0.2,  unit: 'pc',  serving: 80  },
  { name: 'Tomato',                 calories: 18,  protein: 0.9,  carbs: 3.9,  fat: 0.2,  unit: 'pc',  serving: 100 },
  { name: 'Cucumber',               calories: 15,  protein: 0.7,  carbs: 3.6,  fat: 0.1,  unit: 'pc',  serving: 200 },
  { name: 'Bell Pepper',            calories: 31,  protein: 1,    carbs: 6,    fat: 0.3,  unit: 'pc',  serving: 120 },
  { name: 'Onion',                  calories: 40,  protein: 1.1,  carbs: 9.3,  fat: 0.1,  unit: 'pc',  serving: 100 },
  { name: 'Mushrooms',              calories: 22,  protein: 3.1,  carbs: 3.3,  fat: 0.3,  unit: 'g'    },
  { name: 'Cauliflower',            calories: 25,  protein: 1.9,  carbs: 5,    fat: 0.3,  unit: 'g'    },
  { name: 'Cabbage',                calories: 25,  protein: 1.3,  carbs: 6,    fat: 0.1,  unit: 'g'    },
  { name: 'Corn',                   calories: 86,  protein: 3.3,  carbs: 19,   fat: 1.4,  unit: 'pc',  serving: 90  },
  { name: 'Green Beans',            calories: 31,  protein: 1.8,  carbs: 7,    fat: 0.1,  unit: 'g'    },
  { name: 'Peas',                   calories: 81,  protein: 5.4,  carbs: 14,   fat: 0.4,  unit: 'g'    },

  // ── Fruits ───────────────────────────────────────────────
  { name: 'Banana',                 calories: 89,  protein: 1.1,  carbs: 23,   fat: 0.3,  unit: 'pc',  serving: 120 },
  { name: 'Apple',                  calories: 52,  protein: 0.3,  carbs: 14,   fat: 0.2,  unit: 'pc',  serving: 180 },
  { name: 'Orange',                 calories: 47,  protein: 0.9,  carbs: 12,   fat: 0.1,  unit: 'pc',  serving: 150 },
  { name: 'Mango',                  calories: 60,  protein: 0.8,  carbs: 15,   fat: 0.4,  unit: 'pc',  serving: 200 },
  { name: 'Grapes',                 calories: 69,  protein: 0.7,  carbs: 18,   fat: 0.2,  unit: 'g'    },
  { name: 'Watermelon',             calories: 30,  protein: 0.6,  carbs: 8,    fat: 0.2,  unit: 'g'    },
  { name: 'Strawberries',           calories: 32,  protein: 0.7,  carbs: 8,    fat: 0.3,  unit: 'pc',  serving: 12  },
  { name: 'Blueberries',            calories: 57,  protein: 0.7,  carbs: 14,   fat: 0.3,  unit: 'g'    },
  { name: 'Pineapple',              calories: 50,  protein: 0.5,  carbs: 13,   fat: 0.1,  unit: 'g'    },
  { name: 'Papaya',                 calories: 43,  protein: 0.5,  carbs: 11,   fat: 0.3,  unit: 'pc',  serving: 200 },

  // ── Legumes ──────────────────────────────────────────────
  { name: 'Chickpeas (cooked)',     calories: 164, protein: 9,    carbs: 27,   fat: 2.6,  unit: 'g'    },
  { name: 'Lentils (cooked)',       calories: 116, protein: 9,    carbs: 20,   fat: 0.4,  unit: 'g'    },
  { name: 'Black Beans (cooked)',   calories: 132, protein: 8.9,  carbs: 24,   fat: 0.5,  unit: 'g'    },
  { name: 'Kidney Beans (cooked)',  calories: 127, protein: 8.7,  carbs: 23,   fat: 0.5,  unit: 'g'    },
  { name: 'Soya Chunks',           calories: 336, protein: 52,   carbs: 33,   fat: 0.5,  unit: 'g'    },
  { name: 'Peanut Butter',         calories: 588, protein: 25,   carbs: 20,   fat: 50,   unit: 'g'    },

  // ── Fats / Nuts / Seeds ──────────────────────────────────
  { name: 'Almonds',                calories: 579, protein: 21,   carbs: 22,   fat: 50,   unit: 'pc',  serving: 5   },
  { name: 'Walnuts',                calories: 654, protein: 15,   carbs: 14,   fat: 65,   unit: 'pc',  serving: 10  },
  { name: 'Cashews',                calories: 553, protein: 18,   carbs: 30,   fat: 44,   unit: 'pc',  serving: 10  },
  { name: 'Olive Oil',              calories: 884, protein: 0,    carbs: 0,    fat: 100,  unit: 'ml'   },
  { name: 'Coconut Oil',            calories: 862, protein: 0,    carbs: 0,    fat: 100,  unit: 'ml'   },
  { name: 'Avocado',                calories: 160, protein: 2,    carbs: 9,    fat: 15,   unit: 'pc',  serving: 150 },
  { name: 'Chia Seeds',             calories: 486, protein: 17,   carbs: 42,   fat: 31,   unit: 'g'    },
  { name: 'Flaxseeds',              calories: 534, protein: 18,   carbs: 29,   fat: 42,   unit: 'g'    },

  // ── Fast Food ────────────────────────────────────────────
  { name: 'Pizza (cheese)',         calories: 266, protein: 11,   carbs: 33,   fat: 10,   unit: 'pc',  serving: 100 },
  { name: 'Burger (beef)',          calories: 295, protein: 17,   carbs: 24,   fat: 14,   unit: 'pc',  serving: 200 },
  { name: 'French Fries',           calories: 312, protein: 3.4,  carbs: 41,   fat: 15,   unit: 'g'    },
  { name: 'Fried Rice',             calories: 163, protein: 3.1,  carbs: 28,   fat: 4,    unit: 'g'    },

  // ── Indian Breads ────────────────────────────────────────
  { name: 'Roti / Chapati',         calories: 297, protein: 8,    carbs: 52,   fat: 7,    unit: 'pc',  serving: 40  },
  { name: 'Paratha (plain)',        calories: 326, protein: 7,    carbs: 48,   fat: 12,   unit: 'pc',  serving: 60  },
  { name: 'Paratha (aloo)',         calories: 280, protein: 5.8,  carbs: 42,   fat: 10,   unit: 'pc',  serving: 80  },
  { name: 'Puri',                   calories: 340, protein: 6,    carbs: 44,   fat: 16,   unit: 'pc',  serving: 30  },
  { name: 'Naan',                   calories: 310, protein: 9,    carbs: 55,   fat: 7,    unit: 'pc',  serving: 90  },
  { name: 'Bhatura',                calories: 345, protein: 7,    carbs: 46,   fat: 15,   unit: 'pc',  serving: 100 },
  { name: 'Masala Dosa',            calories: 190, protein: 4.5,  carbs: 28,   fat: 7,    unit: 'pc',  serving: 120 },
  { name: 'Uttapam',                calories: 172, protein: 4.8,  carbs: 27,   fat: 5,    unit: 'pc',  serving: 100 },
  { name: 'Idli',                   calories: 58,  protein: 2,    carbs: 12,   fat: 0.3,  unit: 'pc',  serving: 40  },
  { name: 'Vada (medu)',            calories: 322, protein: 8,    carbs: 38,   fat: 16,   unit: 'pc',  serving: 50  },
  { name: 'Thepla',                 calories: 287, protein: 7.5,  carbs: 42,   fat: 10,   unit: 'pc',  serving: 50  },
  { name: 'Appam',                  calories: 120, protein: 2.6,  carbs: 24,   fat: 1.5,  unit: 'pc',  serving: 60  },
  { name: 'Pesarattu',              calories: 145, protein: 7,    carbs: 22,   fat: 3,    unit: 'pc',  serving: 80  },

  // ── Indian Rice Dishes ───────────────────────────────────
  { name: 'Biryani (chicken)',      calories: 163, protein: 8,    carbs: 21,   fat: 5,    unit: 'g'    },
  { name: 'Biryani (mutton)',       calories: 185, protein: 9,    carbs: 20,   fat: 7,    unit: 'g'    },
  { name: 'Biryani (veg)',          calories: 140, protein: 3.5,  carbs: 24,   fat: 4,    unit: 'g'    },
  { name: 'Pulao (veg)',            calories: 148, protein: 3.2,  carbs: 26,   fat: 4,    unit: 'g'    },
  { name: 'Khichdi',                calories: 124, protein: 5,    carbs: 22,   fat: 2.5,  unit: 'g'    },
  { name: 'Curd Rice',              calories: 130, protein: 4,    carbs: 22,   fat: 3.5,  unit: 'g'    },
  { name: 'Lemon Rice',             calories: 152, protein: 2.8,  carbs: 28,   fat: 4,    unit: 'g'    },
  { name: 'Tamarind Rice',          calories: 158, protein: 2.5,  carbs: 30,   fat: 4,    unit: 'g'    },

  // ── Indian Dals & Curries ────────────────────────────────
  { name: 'Dal Tadka',              calories: 116, protein: 7.6,  carbs: 20,   fat: 0.4,  unit: 'g'    },
  { name: 'Dal Makhani',            calories: 150, protein: 7,    carbs: 18,   fat: 5.5,  unit: 'g'    },
  { name: 'Chana Masala',           calories: 164, protein: 8.5,  carbs: 27,   fat: 4,    unit: 'g'    },
  { name: 'Rajma',                  calories: 144, protein: 8.5,  carbs: 24,   fat: 2,    unit: 'g'    },
  { name: 'Sambar',                 calories: 49,  protein: 2.9,  carbs: 7,    fat: 1,    unit: 'ml'   },
  { name: 'Rasam',                  calories: 30,  protein: 1.2,  carbs: 5,    fat: 0.5,  unit: 'ml'   },
  { name: 'Palak Paneer',           calories: 183, protein: 9,    carbs: 8,    fat: 13,   unit: 'g'    },
  { name: 'Paneer Butter Masala',   calories: 225, protein: 10,   carbs: 12,   fat: 16,   unit: 'g'    },
  { name: 'Shahi Paneer',           calories: 240, protein: 10,   carbs: 10,   fat: 19,   unit: 'g'    },
  { name: 'Mutter Paneer',          calories: 178, protein: 9,    carbs: 12,   fat: 11,   unit: 'g'    },
  { name: 'Butter Chicken',         calories: 165, protein: 14,   carbs: 7,    fat: 9,    unit: 'g'    },
  { name: 'Chicken Tikka Masala',   calories: 150, protein: 15,   carbs: 6,    fat: 8,    unit: 'g'    },
  { name: 'Chicken Curry',          calories: 158, protein: 14,   carbs: 5,    fat: 9,    unit: 'g'    },
  { name: 'Mutton Curry',           calories: 210, protein: 16,   carbs: 5,    fat: 14,   unit: 'g'    },
  { name: 'Fish Curry',             calories: 135, protein: 16,   carbs: 4,    fat: 6,    unit: 'g'    },
  { name: 'Egg Curry',              calories: 145, protein: 10,   carbs: 5,    fat: 10,   unit: 'g'    },
  { name: 'Aloo Gobi',              calories: 95,  protein: 2.5,  carbs: 14,   fat: 4,    unit: 'g'    },
  { name: 'Aloo Matar',             calories: 110, protein: 3,    carbs: 17,   fat: 4,    unit: 'g'    },
  { name: 'Bhindi Masala',          calories: 89,  protein: 2.5,  carbs: 10,   fat: 5,    unit: 'g'    },
  { name: 'Baingan Bharta',         calories: 92,  protein: 2.5,  carbs: 11,   fat: 5,    unit: 'g'    },
  { name: 'Mixed Veg Curry',        calories: 98,  protein: 3,    carbs: 12,   fat: 5,    unit: 'g'    },
  { name: 'Korma (veg)',            calories: 175, protein: 4,    carbs: 14,   fat: 12,   unit: 'g'    },
  { name: 'Korma (chicken)',        calories: 195, protein: 15,   carbs: 9,    fat: 12,   unit: 'g'    },
  { name: 'Saag (spinach curry)',   calories: 85,  protein: 3.5,  carbs: 8,    fat: 5,    unit: 'g'    },

  // ── Indian Snacks & Street Food ──────────────────────────
  { name: 'Samosa',                 calories: 262, protein: 4.5,  carbs: 28,   fat: 15,   unit: 'pc',  serving: 60  },
  { name: 'Pakora (veg)',           calories: 285, protein: 6,    carbs: 30,   fat: 16,   unit: 'pc',  serving: 30  },
  { name: 'Pakora (chicken)',       calories: 310, protein: 18,   carbs: 22,   fat: 16,   unit: 'pc',  serving: 30  },
  { name: 'Pav Bhaji',              calories: 200, protein: 5,    carbs: 30,   fat: 7,    unit: 'g'    },
  { name: 'Chole Bhature',          calories: 300, protein: 9,    carbs: 40,   fat: 12,   unit: 'g'    },
  { name: 'Pani Puri',              calories: 180, protein: 3,    carbs: 28,   fat: 6,    unit: 'pc',  serving: 15  },
  { name: 'Bhel Puri',              calories: 145, protein: 3.5,  carbs: 25,   fat: 4,    unit: 'g'    },
  { name: 'Aloo Tikki',             calories: 210, protein: 4,    carbs: 28,   fat: 10,   unit: 'pc',  serving: 80  },
  { name: 'Kachori',                calories: 320, protein: 6,    carbs: 35,   fat: 18,   unit: 'pc',  serving: 60  },
  { name: 'Dhokla',                 calories: 160, protein: 5.5,  carbs: 28,   fat: 3,    unit: 'pc',  serving: 50  },
  { name: 'Poha',                   calories: 130, protein: 2.5,  carbs: 25,   fat: 3,    unit: 'g'    },
  { name: 'Upma',                   calories: 145, protein: 3.5,  carbs: 24,   fat: 5,    unit: 'g'    },
  { name: 'Rava Idli',              calories: 132, protein: 3.5,  carbs: 22,   fat: 4,    unit: 'pc',  serving: 50  },
  { name: 'Pongal',                 calories: 155, protein: 4,    carbs: 27,   fat: 4.5,  unit: 'g'    },
  { name: 'Murmura / Puffed Rice',  calories: 325, protein: 6,    carbs: 73,   fat: 0.5,  unit: 'g'    },

  // ── Indian Sweets ────────────────────────────────────────
  { name: 'Gulab Jamun',            calories: 387, protein: 6,    carbs: 57,   fat: 15,   unit: 'pc',  serving: 50  },
  { name: 'Rasgulla',               calories: 186, protein: 4.5,  carbs: 39,   fat: 1.5,  unit: 'pc',  serving: 60  },
  { name: 'Jalebi',                 calories: 380, protein: 2,    carbs: 70,   fat: 10,   unit: 'pc',  serving: 50  },
  { name: 'Halwa (suji)',           calories: 310, protein: 4,    carbs: 50,   fat: 11,   unit: 'g'    },
  { name: 'Kheer',                  calories: 168, protein: 4.5,  carbs: 28,   fat: 5,    unit: 'g'    },
  { name: 'Ladoo (besan)',          calories: 430, protein: 8,    carbs: 58,   fat: 19,   unit: 'pc',  serving: 50  },
  { name: 'Burfi (milk)',           calories: 392, protein: 9,    carbs: 55,   fat: 16,   unit: 'pc',  serving: 40  },
  { name: 'Payasam',                calories: 150, protein: 3.5,  carbs: 26,   fat: 4,    unit: 'ml'   },
  { name: 'Mysore Pak',             calories: 520, protein: 7,    carbs: 57,   fat: 30,   unit: 'pc',  serving: 40  },

  // ── Indian Drinks ────────────────────────────────────────
  { name: 'Chai (with milk)',       calories: 55,  protein: 1.8,  carbs: 8,    fat: 1.8,  unit: 'ml'   },
  { name: 'Lassi (sweet)',          calories: 98,  protein: 3.5,  carbs: 16,   fat: 2.5,  unit: 'ml'   },
  { name: 'Lassi (salted)',         calories: 65,  protein: 3.2,  carbs: 7,    fat: 2.5,  unit: 'ml'   },
  { name: 'Buttermilk (chaas)',     calories: 40,  protein: 3,    carbs: 5,    fat: 1,    unit: 'ml'   },
  { name: 'Masala Chai',            calories: 60,  protein: 2,    carbs: 9,    fat: 2,    unit: 'ml'   },
  { name: 'Mango Lassi',            calories: 120, protein: 3,    carbs: 22,   fat: 2.5,  unit: 'ml'   },

  // ── Snacks & Others ──────────────────────────────────────
  { name: 'Dark Chocolate (70%)',   calories: 598, protein: 7.8,  carbs: 46,   fat: 43,   unit: 'g'    },
  { name: 'Milk Chocolate',         calories: 535, protein: 7.7,  carbs: 59,   fat: 30,   unit: 'g'    },
  { name: 'Protein Bar',            calories: 360, protein: 25,   carbs: 40,   fat: 9,    unit: 'pc',  serving: 60  },
  { name: 'Rice Cakes',             calories: 387, protein: 8,    carbs: 81,   fat: 3,    unit: 'pc',  serving: 10  },
  { name: 'Orange Juice',           calories: 45,  protein: 0.7,  carbs: 10,   fat: 0.2,  unit: 'ml'   },
  { name: 'Whole Milk Yogurt',      calories: 61,  protein: 3.5,  carbs: 4.7,  fat: 3.3,  unit: 'g'    },
]


// Search function — fuzzy match on name, returns top 6
export function searchFoods(query) {
  if (!query || query.trim().length < 1) return []
  const q = query.toLowerCase().trim()
  const scored = FOOD_DB
    .map(food => {
      const name = food.name.toLowerCase()
      if (name === q)                        return { food, score: 3 } // exact
      if (name.startsWith(q))                return { food, score: 2 } // starts with
      if (name.includes(q))                  return { food, score: 1 } // contains
      // word-level match
      const words = q.split(' ')
      const allMatch = words.every(w => name.includes(w))
      if (allMatch)                          return { food, score: 1 }
      return null
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, 6).map(s => s.food)
}