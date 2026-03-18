// Nutrition values per 100g
// { calories (kcal), protein (g), carbs (g), fat (g) }

export const FOOD_DB = [
  // ── Proteins ─────────────────────────────────────────────
  { name: 'Chicken Breast',         calories: 165, protein: 31,   carbs: 0,    fat: 3.6  },
  { name: 'Chicken Thigh',          calories: 209, protein: 26,   carbs: 0,    fat: 11   },
  { name: 'Eggs (whole)',           calories: 155, protein: 13,   carbs: 1.1,  fat: 11   },
  { name: 'Egg Whites',             calories: 52,  protein: 11,   carbs: 0.7,  fat: 0.2  },
  { name: 'Tuna (canned)',          calories: 116, protein: 26,   carbs: 0,    fat: 1    },
  { name: 'Salmon',                 calories: 208, protein: 20,   carbs: 0,    fat: 13   },
  { name: 'Tilapia',                calories: 96,  protein: 20,   carbs: 0,    fat: 1.7  },
  { name: 'Shrimp',                 calories: 99,  protein: 24,   carbs: 0.2,  fat: 0.3  },
  { name: 'Ground Beef (lean)',     calories: 215, protein: 26,   carbs: 0,    fat: 12   },
  { name: 'Ground Beef (regular)',  calories: 254, protein: 17,   carbs: 0,    fat: 20   },
  { name: 'Beef Steak',             calories: 271, protein: 26,   carbs: 0,    fat: 18   },
  { name: 'Turkey Breast',          calories: 135, protein: 30,   carbs: 0,    fat: 1    },
  { name: 'Pork Loin',              calories: 242, protein: 27,   carbs: 0,    fat: 14   },
  { name: 'Lamb',                   calories: 294, protein: 25,   carbs: 0,    fat: 21   },
  { name: 'Cottage Cheese',         calories: 98,  protein: 11,   carbs: 3.4,  fat: 4.3  },
  { name: 'Greek Yogurt',           calories: 59,  protein: 10,   carbs: 3.6,  fat: 0.4  },
  { name: 'Whey Protein Powder',    calories: 370, protein: 80,   carbs: 6,    fat: 4    },
  { name: 'Tofu',                   calories: 76,  protein: 8,    carbs: 1.9,  fat: 4.8  },
  { name: 'Tempeh',                 calories: 193, protein: 19,   carbs: 9,    fat: 11   },

  // ── Dairy ────────────────────────────────────────────────
  { name: 'Whole Milk',             calories: 61,  protein: 3.2,  carbs: 4.8,  fat: 3.3  },
  { name: 'Skimmed Milk',           calories: 35,  protein: 3.4,  carbs: 5,    fat: 0.1  },
  { name: 'Cheddar Cheese',         calories: 402, protein: 25,   carbs: 1.3,  fat: 33   },
  { name: 'Mozzarella',             calories: 280, protein: 28,   carbs: 2.2,  fat: 17   },
  { name: 'Paneer',                 calories: 265, protein: 18,   carbs: 1.2,  fat: 21   },
  { name: 'Butter',                 calories: 717, protein: 0.9,  carbs: 0.1,  fat: 81   },

  // ── Carbs / Grains ───────────────────────────────────────
  { name: 'White Rice (cooked)',    calories: 130, protein: 2.7,  carbs: 28,   fat: 0.3  },
  { name: 'Brown Rice (cooked)',    calories: 112, protein: 2.6,  carbs: 23,   fat: 0.9  },
  { name: 'Oats',                   calories: 389, protein: 17,   carbs: 66,   fat: 7    },
  { name: 'White Bread',            calories: 265, protein: 9,    carbs: 49,   fat: 3.2  },
  { name: 'Whole Wheat Bread',      calories: 247, protein: 13,   carbs: 41,   fat: 4.2  },
  { name: 'Pasta (cooked)',         calories: 131, protein: 5,    carbs: 25,   fat: 1.1  },
  { name: 'Whole Wheat Pasta',      calories: 124, protein: 5.3,  carbs: 23,   fat: 1.4  },
  { name: 'Potato (boiled)',        calories: 87,  protein: 1.9,  carbs: 20,   fat: 0.1  },
  { name: 'Sweet Potato',           calories: 86,  protein: 1.6,  carbs: 20,   fat: 0.1  },
  { name: 'Quinoa (cooked)',        calories: 120, protein: 4.4,  carbs: 22,   fat: 1.9  },
  { name: 'Chapati / Roti',         calories: 297, protein: 8,    carbs: 52,   fat: 7    },
  { name: 'White Bread Roll',       calories: 267, protein: 9.4,  carbs: 49,   fat: 3.6  },
  { name: 'Cornflakes',             calories: 357, protein: 8,    carbs: 84,   fat: 0.9  },
  { name: 'Idli',                   calories: 58,  protein: 2,    carbs: 12,   fat: 0.3  },
  { name: 'Dosa',                   calories: 168, protein: 3.9,  carbs: 24,   fat: 6.4  },

  // ── Vegetables ───────────────────────────────────────────
  { name: 'Broccoli',               calories: 34,  protein: 2.8,  carbs: 7,    fat: 0.4  },
  { name: 'Spinach',                calories: 23,  protein: 2.9,  carbs: 3.6,  fat: 0.4  },
  { name: 'Kale',                   calories: 35,  protein: 2.9,  carbs: 4.4,  fat: 0.7  },
  { name: 'Carrots',                calories: 41,  protein: 0.9,  carbs: 10,   fat: 0.2  },
  { name: 'Tomato',                 calories: 18,  protein: 0.9,  carbs: 3.9,  fat: 0.2  },
  { name: 'Cucumber',               calories: 15,  protein: 0.7,  carbs: 3.6,  fat: 0.1  },
  { name: 'Bell Pepper',            calories: 31,  protein: 1,    carbs: 6,    fat: 0.3  },
  { name: 'Onion',                  calories: 40,  protein: 1.1,  carbs: 9.3,  fat: 0.1  },
  { name: 'Garlic',                 calories: 149, protein: 6.4,  carbs: 33,   fat: 0.5  },
  { name: 'Mushrooms',              calories: 22,  protein: 3.1,  carbs: 3.3,  fat: 0.3  },
  { name: 'Cauliflower',            calories: 25,  protein: 1.9,  carbs: 5,    fat: 0.3  },
  { name: 'Cabbage',                calories: 25,  protein: 1.3,  carbs: 6,    fat: 0.1  },
  { name: 'Corn',                   calories: 86,  protein: 3.3,  carbs: 19,   fat: 1.4  },
  { name: 'Green Beans',            calories: 31,  protein: 1.8,  carbs: 7,    fat: 0.1  },
  { name: 'Peas',                   calories: 81,  protein: 5.4,  carbs: 14,   fat: 0.4  },

  // ── Fruits ───────────────────────────────────────────────
  { name: 'Banana',                 calories: 89,  protein: 1.1,  carbs: 23,   fat: 0.3  },
  { name: 'Apple',                  calories: 52,  protein: 0.3,  carbs: 14,   fat: 0.2  },
  { name: 'Orange',                 calories: 47,  protein: 0.9,  carbs: 12,   fat: 0.1  },
  { name: 'Mango',                  calories: 60,  protein: 0.8,  carbs: 15,   fat: 0.4  },
  { name: 'Grapes',                 calories: 69,  protein: 0.7,  carbs: 18,   fat: 0.2  },
  { name: 'Watermelon',             calories: 30,  protein: 0.6,  carbs: 8,    fat: 0.2  },
  { name: 'Strawberries',           calories: 32,  protein: 0.7,  carbs: 8,    fat: 0.3  },
  { name: 'Blueberries',            calories: 57,  protein: 0.7,  carbs: 14,   fat: 0.3  },
  { name: 'Pineapple',              calories: 50,  protein: 0.5,  carbs: 13,   fat: 0.1  },
  { name: 'Papaya',                 calories: 43,  protein: 0.5,  carbs: 11,   fat: 0.3  },

  // ── Legumes ──────────────────────────────────────────────
  { name: 'Chickpeas (cooked)',     calories: 164, protein: 9,    carbs: 27,   fat: 2.6  },
  { name: 'Lentils (cooked)',       calories: 116, protein: 9,    carbs: 20,   fat: 0.4  },
  { name: 'Black Beans (cooked)',   calories: 132, protein: 8.9,  carbs: 24,   fat: 0.5  },
  { name: 'Kidney Beans (cooked)',  calories: 127, protein: 8.7,  carbs: 23,   fat: 0.5  },
  { name: 'Soya Chunks',           calories: 336, protein: 52,   carbs: 33,   fat: 0.5  },
  { name: 'Peanut Butter',         calories: 588, protein: 25,   carbs: 20,   fat: 50   },

  // ── Fats / Nuts / Seeds ──────────────────────────────────
  { name: 'Almonds',                calories: 579, protein: 21,   carbs: 22,   fat: 50   },
  { name: 'Walnuts',                calories: 654, protein: 15,   carbs: 14,   fat: 65   },
  { name: 'Cashews',                calories: 553, protein: 18,   carbs: 30,   fat: 44   },
  { name: 'Olive Oil',              calories: 884, protein: 0,    carbs: 0,    fat: 100  },
  { name: 'Coconut Oil',            calories: 862, protein: 0,    carbs: 0,    fat: 100  },
  { name: 'Avocado',                calories: 160, protein: 2,    carbs: 9,    fat: 15   },
  { name: 'Chia Seeds',             calories: 486, protein: 17,   carbs: 42,   fat: 31   },
  { name: 'Flaxseeds',              calories: 534, protein: 18,   carbs: 29,   fat: 42   },

  // ── Fast Food ────────────────────────────────────────────
  { name: 'Pizza (cheese)',         calories: 266, protein: 11,   carbs: 33,   fat: 10   },
  { name: 'Burger (beef)',          calories: 295, protein: 17,   carbs: 24,   fat: 14   },
  { name: 'French Fries',           calories: 312, protein: 3.4,  carbs: 41,   fat: 15   },
  { name: 'Fried Rice',             calories: 163, protein: 3.1,  carbs: 28,   fat: 4    },

  // ── Indian Breads ────────────────────────────────────────
  { name: 'Roti / Chapati',         calories: 297, protein: 8,    carbs: 52,   fat: 7    },
  { name: 'Paratha (plain)',        calories: 326, protein: 7,    carbs: 48,   fat: 12   },
  { name: 'Paratha (aloo)',         calories: 280, protein: 5.8,  carbs: 42,   fat: 10   },
  { name: 'Puri',                   calories: 340, protein: 6,    carbs: 44,   fat: 16   },
  { name: 'Naan',                   calories: 310, protein: 9,    carbs: 55,   fat: 7    },
  { name: 'Bhatura',                calories: 345, protein: 7,    carbs: 46,   fat: 15   },
  { name: 'Dosa (plain)',           calories: 168, protein: 3.9,  carbs: 24,   fat: 6.4  },
  { name: 'Masala Dosa',            calories: 190, protein: 4.5,  carbs: 28,   fat: 7    },
  { name: 'Uttapam',                calories: 172, protein: 4.8,  carbs: 27,   fat: 5    },
  { name: 'Idli',                   calories: 58,  protein: 2,    carbs: 12,   fat: 0.3  },
  { name: 'Vada (medu)',            calories: 322, protein: 8,    carbs: 38,   fat: 16   },
  { name: 'Poori',                  calories: 340, protein: 6,    carbs: 44,   fat: 16   },
  { name: 'Thepla',                 calories: 287, protein: 7.5,  carbs: 42,   fat: 10   },
  { name: 'Appam',                  calories: 120, protein: 2.6,  carbs: 24,   fat: 1.5  },
  { name: 'Pesarattu',              calories: 145, protein: 7,    carbs: 22,   fat: 3    },

  // ── Indian Rice Dishes ───────────────────────────────────
  { name: 'Biryani (chicken)',      calories: 163, protein: 8,    carbs: 21,   fat: 5    },
  { name: 'Biryani (mutton)',       calories: 185, protein: 9,    carbs: 20,   fat: 7    },
  { name: 'Biryani (veg)',          calories: 140, protein: 3.5,  carbs: 24,   fat: 4    },
  { name: 'Pulao (veg)',            calories: 148, protein: 3.2,  carbs: 26,   fat: 4    },
  { name: 'Khichdi',                calories: 124, protein: 5,    carbs: 22,   fat: 2.5  },
  { name: 'Curd Rice',              calories: 130, protein: 4,    carbs: 22,   fat: 3.5  },
  { name: 'Lemon Rice',             calories: 152, protein: 2.8,  carbs: 28,   fat: 4    },
  { name: 'Tamarind Rice',          calories: 158, protein: 2.5,  carbs: 30,   fat: 4    },

  // ── Indian Dals & Curries ────────────────────────────────
  { name: 'Dal Tadka',              calories: 116, protein: 7.6,  carbs: 20,   fat: 0.4  },
  { name: 'Dal Makhani',            calories: 150, protein: 7,    carbs: 18,   fat: 5.5  },
  { name: 'Chana Masala',           calories: 164, protein: 8.5,  carbs: 27,   fat: 4    },
  { name: 'Rajma',                  calories: 144, protein: 8.5,  carbs: 24,   fat: 2    },
  { name: 'Sambar',                 calories: 49,  protein: 2.9,  carbs: 7,    fat: 1    },
  { name: 'Rasam',                  calories: 30,  protein: 1.2,  carbs: 5,    fat: 0.5  },
  { name: 'Palak Paneer',           calories: 183, protein: 9,    carbs: 8,    fat: 13   },
  { name: 'Paneer Butter Masala',   calories: 225, protein: 10,   carbs: 12,   fat: 16   },
  { name: 'Shahi Paneer',           calories: 240, protein: 10,   carbs: 10,   fat: 19   },
  { name: 'Mutter Paneer',          calories: 178, protein: 9,    carbs: 12,   fat: 11   },
  { name: 'Butter Chicken',         calories: 165, protein: 14,   carbs: 7,    fat: 9    },
  { name: 'Chicken Tikka Masala',   calories: 150, protein: 15,   carbs: 6,    fat: 8    },
  { name: 'Chicken Curry',          calories: 158, protein: 14,   carbs: 5,    fat: 9    },
  { name: 'Mutton Curry',           calories: 210, protein: 16,   carbs: 5,    fat: 14   },
  { name: 'Fish Curry',             calories: 135, protein: 16,   carbs: 4,    fat: 6    },
  { name: 'Egg Curry',              calories: 145, protein: 10,   carbs: 5,    fat: 10   },
  { name: 'Aloo Gobi',              calories: 95,  protein: 2.5,  carbs: 14,   fat: 4    },
  { name: 'Aloo Matar',             calories: 110, protein: 3,    carbs: 17,   fat: 4    },
  { name: 'Bhindi Masala',          calories: 89,  protein: 2.5,  carbs: 10,   fat: 5    },
  { name: 'Baingan Bharta',         calories: 92,  protein: 2.5,  carbs: 11,   fat: 5    },
  { name: 'Mixed Veg Curry',        calories: 98,  protein: 3,    carbs: 12,   fat: 5    },
  { name: 'Korma (veg)',            calories: 175, protein: 4,    carbs: 14,   fat: 12   },
  { name: 'Korma (chicken)',        calories: 195, protein: 15,   carbs: 9,    fat: 12   },
  { name: 'Saag (spinach curry)',   calories: 85,  protein: 3.5,  carbs: 8,    fat: 5    },

  // ── Indian Snacks & Street Food ──────────────────────────
  { name: 'Samosa',                 calories: 262, protein: 4.5,  carbs: 28,   fat: 15   },
  { name: 'Pakora (veg)',           calories: 285, protein: 6,    carbs: 30,   fat: 16   },
  { name: 'Pakora (chicken)',       calories: 310, protein: 18,   carbs: 22,   fat: 16   },
  { name: 'Pav Bhaji',              calories: 200, protein: 5,    carbs: 30,   fat: 7    },
  { name: 'Chole Bhature',          calories: 300, protein: 9,    carbs: 40,   fat: 12   },
  { name: 'Pani Puri',              calories: 180, protein: 3,    carbs: 28,   fat: 6    },
  { name: 'Bhel Puri',              calories: 145, protein: 3.5,  carbs: 25,   fat: 4    },
  { name: 'Sev Puri',               calories: 190, protein: 4,    carbs: 27,   fat: 8    },
  { name: 'Dahi Puri',              calories: 170, protein: 5,    carbs: 25,   fat: 6    },
  { name: 'Aloo Tikki',             calories: 210, protein: 4,    carbs: 28,   fat: 10   },
  { name: 'Kachori',                calories: 320, protein: 6,    carbs: 35,   fat: 18   },
  { name: 'Dhokla',                 calories: 160, protein: 5.5,  carbs: 28,   fat: 3    },
  { name: 'Khandvi',                calories: 170, protein: 7,    carbs: 22,   fat: 6    },
  { name: 'Poha',                   calories: 130, protein: 2.5,  carbs: 25,   fat: 3    },
  { name: 'Upma',                   calories: 145, protein: 3.5,  carbs: 24,   fat: 5    },
  { name: 'Rava Idli',              calories: 132, protein: 3.5,  carbs: 22,   fat: 4    },
  { name: 'Pongal',                 calories: 155, protein: 4,    carbs: 27,   fat: 4.5  },
  { name: 'Murmura / Puffed Rice',  calories: 325, protein: 6,    carbs: 73,   fat: 0.5  },
  { name: 'Chakli',                 calories: 450, protein: 7,    carbs: 55,   fat: 23   },
  { name: 'Mathri',                 calories: 480, protein: 8,    carbs: 52,   fat: 28   },

  // ── Indian Sweets & Desserts ─────────────────────────────
  { name: 'Gulab Jamun',            calories: 387, protein: 6,    carbs: 57,   fat: 15   },
  { name: 'Rasgulla',               calories: 186, protein: 4.5,  carbs: 39,   fat: 1.5  },
  { name: 'Jalebi',                 calories: 380, protein: 2,    carbs: 70,   fat: 10   },
  { name: 'Halwa (suji)',           calories: 310, protein: 4,    carbs: 50,   fat: 11   },
  { name: 'Kheer',                  calories: 168, protein: 4.5,  carbs: 28,   fat: 5    },
  { name: 'Ladoo (besan)',          calories: 430, protein: 8,    carbs: 58,   fat: 19   },
  { name: 'Burfi (milk)',           calories: 392, protein: 9,    carbs: 55,   fat: 16   },
  { name: 'Payasam',                calories: 150, protein: 3.5,  carbs: 26,   fat: 4    },
  { name: 'Mysore Pak',             calories: 520, protein: 7,    carbs: 57,   fat: 30   },

  // ── Indian Drinks ────────────────────────────────────────
  { name: 'Chai (with milk)',       calories: 55,  protein: 1.8,  carbs: 8,    fat: 1.8  },
  { name: 'Lassi (sweet)',          calories: 98,  protein: 3.5,  carbs: 16,   fat: 2.5  },
  { name: 'Lassi (salted)',         calories: 65,  protein: 3.2,  carbs: 7,    fat: 2.5  },
  { name: 'Buttermilk (chaas)',     calories: 40,  protein: 3,    carbs: 5,    fat: 1    },
  { name: 'Masala Chai',            calories: 60,  protein: 2,    carbs: 9,    fat: 2    },
  { name: 'Mango Lassi',            calories: 120, protein: 3,    carbs: 22,   fat: 2.5  },

  // ── Snacks / Drinks ──────────────────────────────────────
  { name: 'Dark Chocolate (70%)',   calories: 598, protein: 7.8,  carbs: 46,   fat: 43   },
  { name: 'Milk Chocolate',         calories: 535, protein: 7.7,  carbs: 59,   fat: 30   },
  { name: 'Protein Bar',            calories: 360, protein: 25,   carbs: 40,   fat: 9    },
  { name: 'Rice Cakes',             calories: 387, protein: 8,    carbs: 81,   fat: 3    },
  { name: 'Orange Juice',           calories: 45,  protein: 0.7,  carbs: 10,   fat: 0.2  },
  { name: 'Whole Milk Yogurt',      calories: 61,  protein: 3.5,  carbs: 4.7,  fat: 3.3  },
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