/* بيانات المنتجات: كل دولة إلها سعر مستقل بدون تحويل عملات */
/* لتغيير صورة، عدّل مسار image وحط الصورة بمجلد images */
/* لتغيير قسم أي منتج، عدّل category إلى اسم أحد الأقسام الثمانية */
const PRODUCTS = [
    {
        "id": "JO-Anti-cellulite-mud",
        "brand": "Jomeer",
        "name": "Jomeer Anti cellulite body mud ",
        "category": "Body Care",
        "unit": "  200 ml",
        "image": "images/products/Jomeer Anti-cellulite body mud.png",
        "prices": {
            "LB": 10.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Anti-aging-cream",
        "brand": "Jomeer",
        "name": "Jomeer Anti Aging Cream",
        "category": "Skincare",
        "unit": "  30 ml",
        "image": "images/products/Jomeer Anti Aging Cream.png",
        "prices": {
            "LB": 32.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Anti-stretch-mark",
        "brand": "Jomeer",
        "name": "Jomeer Anti Strech mark cream",
        "category": "Body Care",
        "unit": "  200 ml",
        "image": "images/products/Jomeer Anti Strech mark cream.png",
        "prices": {
            "LB": 41.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Anti-cellulite-gel",
        "brand": "Jomeer",
        "name": "Jomeer Anti Celulitte Gel",
        "category": "Body Care",
        "unit": "  200 ml",
        "image": "images/products/Jomeer Anti Celulitte Gel.png",
        "prices": {
            "LB": 41.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Facial-mask",
        "brand": "Jomeer",
        "name": " Jomeer Facial mud mask ",
        "category": "Skincare",
        "unit": "  100 ml",
        "image": "images/products/Jomeer Facial mud mask.png",
        "prices": {
            "LB": 24.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Facial-scrub",
        "brand": "Jomeer",
        "name": "Jomeer Facial scrub cream ",
        "category": "Skincare",
        "unit": " 50 ml",
        "image": "images/products/Jomeer Facial scrub cream.png",
        "prices": {
            "LB": 35.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Facial-moisturizing",
        "brand": "Jomeer",
        "name": "Jomeer Facial moisturizing cream  ",
        "category": "Skincare",
        "unit": " 50 ml",
        "image": "images/products/Jomeer Facial moisturizing cream.png",
        "prices": {
            "LB": 35.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Facial-Wash",
        "brand": "Jomeer",
        "name": "Jomeer Facial wash",
        "category": "Skincare",
        "unit": " 100 ml",
        "image": "images/products/Jomeer Facial wash.png",
        "prices": {
            "LB": 24.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Facial-tonic",
        "brand": "Jomeer",
        "name": " Jomeer Facial Tonic",
        "category": "Skincare",
        "unit": "  160 ml",
        "image": "images/products/Jomeer Facial Tonic.png",
        "prices": {
            "LB": 29.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Intensive-night",
        "brand": "Jomeer",
        "name": " Jomeer Intensive Night Cream",
        "category": "Skincare",
        "unit": " 50 ml",
        "image": "images/products/Jomeer Intensive Day Cream.png",
        "prices": {
            "LB": 41.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Intensive-day",
        "brand": "Jomeer",
        "name": "Jomeer Intensive Day Cream",
        "category": "Skincare",
        "unit": "  50 ml",
        "image": "images/products/Jomeer Intensive Day Cream.png",
        "prices": {
            "LB": 35.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Brightening-cream",
        "brand": "Jomeer",
        "name": "Jomeer Brightening Cream",
        "category": "Skincare",
        "unit": " 50 ml",
        "image": "images/products/Jomeer Brightening Cream.png",
        "prices": {
            "LB": 45.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Hand-care",
        "brand": "Jomeer",
        "name": "Jomeer Hand care cream",
        "category": "Body Care",
        "unit": "  100 ml",
        "image": "images/products/Jomeer Hand care cream.png",
        "prices": {
            "LB": 19.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Sunscreen-SPF",
        "brand": "Jomeer",
        "name": "Jomeer Sunscreen SPF-50  ",
        "category": "Sun Care",
        "unit": " 50 ml",
        "image": "images/products/Jomeer Sunscreen.png",
        "prices": {
            "LB": 45.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Foot-cream",
        "brand": "Jomeer",
        "name": " Jomeer Foot Care Cream",
        "category": "Body Care",
        "unit": " 200 ml",
        "image": "images/products/Jomeer Foot Care Cream.png",
        "prices": {
            "LB": 29.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Cleansing Milk",
        "brand": "Jomeer",
        "name": "Jomeer Cleansing Milk",
        "category": "Skincare",
        "unit": "  160 ml",
        "image": "images/products/Jomeer Cleansing Milk.png",
        "prices": {
            "LB": 29.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Repair mask",
        "brand": "Jomeer",
        "name": "Jomeer Hair Mask",
        "category": "Hair Care",
        "unit": "  250 ml",
        "image": "images/products/Jomeer Hair Mask.png",
        "prices": {
            "LB": 35.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Restoring oil",
        "brand": "Jomeer",
        "name": "Jomeer Nail restoring oil ",
        "category": "Body Care",
        "unit": " 20 ml",
        "image": "images/products/Jomeer Nail restoring oil.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Body Butter",
        "brand": "Jomeer",
        "name": "Jomeer Body Butter Vanilia",
        "category": "Body Care",
        "unit": "قطعة 200 ml",
        "image": "images/products/Jomeer Body Butter Vanilia.png",
        "prices": {
            "LB": 29.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "JO-Body Butter",
        "brand": "Jomeer",
        "name": " Jomeer Body Butter Strawberry",
        "category": "Body Care",
        "unit": "  200 ml",
           "image": "images/products/Jomeer Body Butter Strawberry.png",
        "prices": {
            "LB": 29.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },

    {
        "id": "JO-Under-Cream",
        "brand": "Jomeer",
        "name": "Jomeer Under Eye Cream",
        "category": "Skincare",
        "unit": " 30 ml",
        "image": "images/products/Jomeer Under Eye Cream.png",
        "prices": {
            "LB": 32.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "ME-Mineral Beauty",
        "brand": "Mega",
        "name": "Mega Mineral Beauty Serum ",
        "category": "Skincare",
        "unit": " 50 ml",
        "image": "images/products/Mega Mineral Beauty Serum.png",
        "prices": {
            "LB": 65.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "ME-Vitamin ©",
        "brand": "Mega",
        "name": "Mega vitamin C  ",
        "category": "Skincare",
        "unit": " 30 ml",
        "image": "images/products/Mega vitamin C.png",
        "prices": {
            "LB": 37.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "ME-Niacinamide",
        "brand": "Mega",
        "name": "Mega Niacinamide Serum 250 ml",
        "category": "Skincare",
        "unit": "قطعة 250 ml",
        "image": "images/ME-Niacinamide.png",
        "prices": {
            "LB": 65.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Splash-Red",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Splash Red  ",
        "category": "Bath & Body",
        "unit": " 250 ml",
        "image": "images/products/Magic Aura Body Splash Red.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Splash-Green",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Splash Green  ",
        "category": "Bath & Body",
        "unit": " 250 ml",
        "image": "images/products/Magic Aura Body Splash Green.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Splash-Yellow",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Spalsh Yellow",
        "category": "Bath & Body",
        "unit": " 250 ml",
        "image": "images/products/Magic Aura Body Spalsh Yellow.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Splash-White",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Splash White  ",
        "category": "Bath & Body",
        "unit": " 250 ml",
        "image": "images/products/Magic Aura Body Splash White.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Butter-Red",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Butter Red    ",
        "category": "Body Care",
        "unit": " 200 ml",
        "image": "images/products/Magic Aura Body Butter Red.png",
        "prices": {
            "LB": 30.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Butter-Green",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Butter Green 200 ml",
        "category": "Body Care",
        "unit": "قطعة 200 ml",
        "image": "images/MA-Body Butter-Green.png",
        "prices": {
            "LB": 30.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Butter-Yellow",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Butter Yellow 200 ml",
        "category": "Body Care",
        "unit": "قطعة 200 ml",
        "image": "images/MA-Body Butter-Yellow.png",
        "prices": {
            "LB": 30.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Butter-White",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Butter White 200 ml",
        "category": "Body Care",
        "unit": "قطعة 200 ml",
        "image": "images/MA-Body Butter-White.png",
        "prices": {
            "LB": 30.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Serum-Red",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Serum Red 50 ml",
        "category": "Body Care",
        "unit": "قطعة 50 ml",
        "image": "images/MA-Body Serum-Red.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Serum-Green",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Serum Green 50 ml",
        "category": "Body Care",
        "unit": "قطعة 50 ml",
        "image": "images/MA-Body Serum-Green.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Serum-Yellow",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Serum Yellow 50 ml",
        "category": "Body Care",
        "unit": "قطعة 50 ml",
        "image": "images/MA-Body Serum-Yellow.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MA-Body Serum-White",
        "brand": "Magic Aura",
        "name": "Magic Aura Body Serum White 50 ml",
        "category": "Body Care",
        "unit": "قطعة 50 ml",
        "image": "images/MA-Body Serum-White.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MD-cleanser",
        "brand": "Medicube",
        "name": "Medicube zero foam cleanser 120 g",
        "category": "Skincare",
        "unit": "قطعة 120 g",
        "image": "images/MD-cleanser.png",
        "prices": {
            "LB": 22.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "MD-toner",
        "brand": "Medicube",
        "name": "Medicube triple collagen toner 140 g",
        "category": "Skincare",
        "unit": "قطعة 140 g",
        "image": "images/MD-toner.png",
        "prices": {
            "LB": 23.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Nila-Mask",
        "brand": "Luméra",
        "name": "Luméra Blue Nila & Argan Mask",
        "category": "Bath & Body",
        "unit": "  200 ml",
        "image": "images/products/Luméra Blue Nila & Argan Mask.png",
        "prices": {
            "LB": 39.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Nila-Mask-100",
        "brand": "Luméra",
        "name": "Luméra Blue Nila & Argan Mask 100 ml",
        "category": "Bath & Body",
        "unit": "قطعة 100 ml",
        "image": "images/LU-Nila-Mask-100.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Nila-Scrub",
        "brand": "Luméra",
        "name": "Luméra Blue Nila & Argan Scrub 200 ml",
        "category": "Bath & Body",
        "unit": " 200 ml",
        "image": "images/products/Luméra Blue Nila & Argan Scrub.png",
        "prices": {
            "LB": 35.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },

    {
        "id": "LU-Nila-Scrub-100",
        "brand": "Luméra",
        "name": "Luméra Blue Nila & Argan Scrub  ",
        "category": "Bath & Body",
        "unit": " 100 ml",
        "image": "images/products/Luméra Blue Nila & Argan Scrub 100.png",
        "prices": {
            "LB": 21.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Nila-Soap",
        "brand": "Luméra",
        "name": "Luméra Blue Nila Soap  ",
        "category": "Bath & Body",
        "unit": " 200 ml",
        "image": "images/products/Luméra Blue Nila Soap3.png",
        "prices": {
            "LB": 33.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Nila-Soap-100",
        "brand": "Luméra",
        "name": "Luméra Blue Nila Soap  ",
        "category": "Bath & Body",
        "unit": " 100 ml",
        "image": "images/products/Luméra Blue Nila Soap 100 ml.png",
        "prices": {
            "LB": 20.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Aker-Mask",
        "brand": "Luméra",
        "name": "Lumèra Akker Fassi Mask",
        "category": "Bath & Body",
        "unit": " 200 ml",
        "image": "images/products/Lumèra Akker Fassi Mask.png",
        "prices": {
            "LB": 39.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Aker-Mask-100",
        "brand": "Luméra",
        "name": "Luméra Aker Fassi & Argan Mask ",
        "category": "Bath & Body",
        "unit": " 100 ml",
        "image": "images/products/AKER FASSI & ARGAN MASK.png",
        "prices": {
            "LB": 25.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Aker-Scrub",
        "brand": "Luméra",
        "name": "Lumèra Akker Fassi Argan Scrub",
        "category": "Bath & Body",
        "unit": " 200 ml",
        "image": "images/products/Lumèra Akker Fassi Argan Scrub.png",
        "prices": {
            "LB": 35.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Aker-Scrub-100",
        "brand": "Luméra",
        "name": "Luméra Aker Fassi & Argan Scrub    ",
        "category": "Bath & Body",
        "unit": " 100 ml",
        "image": "images/products/AKER FASSI & ARGAN SCRUB.png",
        "prices": {
            "LB": 21.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Aker-Soap",
        "brand": "Luméra",
        "name": "Luméra Blue Nila Soap",
        "category": "Bath & Body",
        "unit": " 200 ml",
        "image": "images/products/Luméra Blue Nila Soap.png",
        "prices": {
            "LB": 33.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Aker-Soap-100",
        "brand": "Luméra",
        "name": "Luméra Aker Fassi Soap   ",
        "category": "Bath & Body",
        "unit": " 100 ml",
        "image": "images/products/AKER FASSI SOAP.png",
        "prices": {
            "LB": 20.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Shampoo-Sulfate",
        "brand": "Luméra",
        "name": "Luméra Shampoo Sulfate Free  ",
        "category": "Hair Care",
        "unit": "  500 ml",
        "image": "images/products/Luméra Shampoo Sulfate Free.png",
        "prices": {
            "LB": 41.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Shampoo-paraban",
        "brand": "Luméra",
        "name": "Luméra Shampoo (paraban free )    ",
        "category": "Hair Care",
        "unit": " 250 ml",
        "image": "images/products/Luméra Shampoo (paraban free ).png",
        "prices": {
            "LB": 15.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Lightening-Cream",
        "brand": "Luméra",
        "name": "Luméra Sensitive Area Lightening Cream  ",
        "category": "Feminine Care",
        "unit": " 50 ml",
        "image": "images/products/Luméra Sensitive Area Lightening Cream.png",
        "prices": {
            "LB": 37.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Conditione",
        "brand": "Luméra",
        "name": "Luméra Conditioner (paraban free )    ",
        "category": "Hair Care",
        "unit": " 250 ml",
        "image": "images/products/Luméra Conditioner (paraban free ).png",
        "prices": {
            "LB": 13.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Barrier-Cream",
        "brand": "Luméra",
        "name": "Luméra Barrier Rash Cream 30 ml",
        "category": "Body Care",
        "unit": "قطعة 30 ml",
        "image": "images/LU-Barrier-Cream.png",
        "prices": {
            "LB": 9.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Intimate-Wash Foam",
        "brand": "Luméra",
        "name": "Luméra Intimate Wash Foam ",
        "category": "Feminine Care",
        "unit": " 130 ml",
        "image": "images/products/Luméra Intimate Wash Foam 130 ml.png",
        "prices": {
            "LB": 14.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LU-Intimate-Wash Gel",
        "brand": "Luméra",
        "name": "Luméra Intimate Hydrating Wash Gel  ",
        "category": "Feminine Care",
        "unit": " 250 ml",
        "image": "images/products/Luméra Intimate Hydrating Wash Gel.png",
        "prices": {
            "LB": 15.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LO-LF-1",
        "brand": "Loofah",
        "name": "Loofah - 1",
        "category": "Accessories",
        "unit": "piece",
        "image": "images/products/Loofah - 1.png",
        "prices": {
            "LB": 11.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LO-LF-2",
        "brand": "Loofah",
        "name": "Loofah - 2",
        "category": "Accessories",
        "unit": "piece",
        "image": "images/products/Loofah - 2.png",
        "prices": {
            "LB": 7.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "TS-Luméra",
        "brand": "Samples",
        "name": "Morroco Samples Lumera mask",
        "category": "Bath & Body",
        "unit": " 10 ml",
        "image": "images/products/Morroco Samples Lumera mask.png",
        "prices": {
            "LB": 2.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "TS-Jomeer",
        "brand": "Samples",
        "name": "Morroco Samples Jomeer moisturizer ",
        "category": "Bath & Body",
        "unit": " 10 ml",
        "image": "images/products/Morroco Samples Jomeer 10 ml.png",
        "prices": {
            "LB": 2.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
     {
        "id": "TS-Jomeer",
        "brand": "Samples",
        "name": "Morroco Samples Jomeer Hand cream  ",
        "category": "Bath & Body",
        "unit": " 10 ml",
        "image": "images/products/Morroco Samples Jomeer Hand cream.png",
        "prices": {
            "LB": 2.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
     {
        "id": "TS-Jomeer",
        "brand": "Samples",
        "name": "Morroco Samples Jomeer night cream  ",
        "category": "Bath & Body",
        "unit": " 10 ml",
        "image": "images/products/Morroco Samples Jomeer night cream.png",
        "prices": {
            "LB": 2.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "TS-Jomeer",
        "brand": "Samples",
        "name": "Morroco Samples Jomeer Sunscreen  ",
        "category": "Bath & Body",
        "unit": " 10 ml",
        "image": "images/products/Morroco Samples Jomeer Sunscreen.png",
        "prices": {
            "LB": 2.0,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LR-Male-with sticker",
        "brand": "Loréve",
        "name": "Loréve Male (with sticker) (kung of seduccion )  ",
        "category": "Perfumes",
        "unit": " 60 ml",
        "image": "images/products/Loréve Male (with sticker) (kung of seduccion).png",
        "prices": {
            "LB": 9.99,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LR-Male-without  sticker",
        "brand": "Loréve",
        "name": "Loréve Male (without  sticker) (bad boy electric ) 60 ml",
        "category": "Perfumes",
        "unit": "قطعة 60 ml",
        "image": "images/LR-Male-without  sticker.png",
        "prices": {
            "LB": 9.99,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LR-Unisex-with sticker",
        "brand": "Loréve",
        "name": "Loreve Unisex (with sticker)(Thursday valentine) ",
        "category": "Perfumes",
        "unit": " 60 ml",
        "image": "images/products/Loreve Unisex (with sticker)(Thursday valentine) 60 ml.png",
        "prices": {
            "LB": 9.99,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LR-Unisex-without sticker",
        "brand": "Loréve",
        "name": "Loréve Unisex (without  sticker) (baqarat rouge) 60 ml",
        "category": "Perfumes",
        "unit": "قطعة 60 ml",
        "image": "images/LR-Unisex-without sticker.png",
        "prices": {
            "LB": 9.99,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LR-Femme-with sticke",
        "brand": "Loréve",
        "name": "Loréve Femme (with sticker) ( killer queen )  ",
        "category": "Perfumes",
        "unit": " 60 ml",
        "image": "images/products/Loréve Femme (with sticker) (killerqueen ).png",
        "prices": {
            "LB": 9.99,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
    {
        "id": "LR-Femme-without sticker",
        "brand": "Loréve",
        "name": "Loréve Femme (without  sticker) ( kenzo flower) 60 ml",
        "category": "Perfumes",
        "unit": "قطعة 60 ml",
        "image": "images/LR-Femme-without sticker.png",
        "prices": {
            "LB": 9.99,
            "SY": null,
            "KW": null,
            "JO": null,
            "EG": null
        }
    },
];
