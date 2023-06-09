const { faker } = require("@faker-js/faker")
const { getRandomItem, getRandomNumberBasedOnMax } = require("../seedfunctions.js");
const { consoleLogger } = require("../errorhandling/logger.js");

// Gardeny is a class that contains all the data needed to seed the database
class Gardeny{
    constructor() {
        this.fruits = [
            'apple',
            'banana',
            'orange',
            'grape',
            'pear',
            'strawberry',
            'blueberry',
            'raspberry',
            'mango',
            'pineapple',
        ];

        this.vegetables = [
            'broccoli',
            'carrot',
            'tomato',
            'cucumber',
            'lettuce',
            'spinach',
            'kale',
            'onion',
            'garlic',
            'potato',
        ];

        this.productNames = [
            "Sunshine",
            "Sunlight",
            "Sun",
            "Moonlight",
            "Moonshine",
            "Moon",
            "Rainbow",
            "Rain",
            "Rainy",
            "Starlight",
            "Starshine",
            "Star",
            "Stardust",
            "Stardew",
            "Honey",
            "Honeydew",
            "Honeybee",
            "Hilltop",
        ]

        this.productAdjectives = [
            "Gardeny",
            "Green",
            "Organic",
            "Harvest",
            "Farm",
            "Bountiful",
            "Nature's",
            "Sunrise",
            "Rainbow",
            "Happy",
            "Heavenstead",
        ]

        this.farms = [
            'Gardeny Farms',
            'Green Acres',
            'Organic Oasis',
            'Harvest House',
            'Farm Fresh',
            'Bountiful Harvest',
            'Nature\'s Bounty',
            'Sunrise Farm',
            'Rainbow Ranch',
            'Happy Harvest',
            "Heavenstead Farms",
            "Hillside Farm",
            "Hilltop Farm",
            "Honeybee Farm",
        ]

        this.farmPrefixes = [
            'Gardeny',
            'Green',
            'Organic',
            'Harvest',
            'Farm',
            'Bountiful',
            'Nature\'s',
            'Sunrise',
            'Rainbow',
            'Happy',
            "Heavenstead",
            "Hillside",
            "Hilltop",
            "Honeybee",
            "Honey",
            "Honeydew",
            "Stardew",
            "Stardust",
            "Starlight",
            "Starshine",
            "Star",
            "Sunshine",
            "Sunlight",
            "Sun",
            "Moonlight",
            "Moonshine",
            "Moon",
            "Rainbow",
            "Rain",
            "Rainy",
        ]

        this.farmSuffixes = [
            'Farms',
            'Acres',
            'Oasis',
            'House',
            'Fresh',
            'Harvest',
            'Bounty',
            'Farm',
            'Ranch',
            'Garden',
            "Gardens",
            "Grove",
            "Orchard",
            "Orchards",
            "Farmstead",
            "Farmsteads",
            "Field",
            "Fields",
            "Farmette",
            "Farmettes",
            "Valley",
            "Valleys",
            "Vineyard",
            "Vineyards",
        ]


        this.productTags = [
            'Organic',
            'Non-GMO',
            'Gluten Free',
            'Vegan',
            'Vegetarian',
            'Kosher',
            'Halal',
            'Fair Trade',
            'Local',
            'Sustainable',
            'Natural',
            'No Preservatives',
            'No Artificial Flavors',
            'No Artificial Colors',
            'No Artificial Sweeteners',
            'No Artificial Ingredients',
            'No Artificial Anything',
            'No Added Sugar',
            'No Added Salt',
            'No Added Fat',
            'No Added Preservatives',
            'No Added Flavors',
            'No Added Colors',
            'No Added Sweeteners',
            "Salads",
            "Soups",
            "Sauces",
            "Dips",
            "Salsas",
            "Dressings",
            "Breads",
            "Sweet",
            "Savory",
            "Spicy",
            "Mild",
            "Hot",
            "Cold",
            "Warm",
            "Fresh",
            "Crunchy",
        ]

        this.vendorSpecialities = [
            "Vegetables",
            "Fruits",
            "Herbs",
            "Flowers",
            "Plant Products",
            "Meats",
            "Dairy",
            "Fish",
            "Animal Products",
            "Wines"
        ]

        this.jams = [
            'Strawberry Jam',
            'Blueberry Jam',
            'Raspberry Jam',
            'Blackberry Jam',
            'Apricot Jam',
            'Peach Jam',
            'Plum Jam',
            'Cherry Jam',
        ]

        this.vendorLinks = [
            "https://i.imgur.com/VVQTPu9.jpg",
            "https://i.imgur.com/zfZeyKd.jpg",
            "https://i.imgur.com/0Nu2EKo.jpg",
            "https://i.imgur.com/TbnGUlu.jpg",
            "https://i.imgur.com/5qZ2cw1.jpg",
            "https://i.imgur.com/IEGSKrD.jpg",
            "https://i.imgur.com/XimRFcW.jpg",
            "https://i.imgur.com/8S0hpv3.jpg",
            "https://i.imgur.com/i6KfPXO.jpg",
            "https://i.imgur.com/85E1460.jpg",
            "https://i.imgur.com/ymhgnHx.jpg",
            "https://i.imgur.com/oyb2PfU.jpg",
            "https://i.imgur.com/iXcSUnT.jpg",
            "https://i.imgur.com/uEzeFY0.jpg",
            "https://i.imgur.com/TFQtcDV.jpg",
            "https://i.imgur.com/XRJBUoq.jpg",
            "https://i.imgur.com/KR49PME.jpg",
            "https://i.imgur.com/GmvyfFd.jpg",
            "https://i.imgur.com/9vk9Av2.jpg",
            "https://i.imgur.com/iEZjfI1.jpg",
            "https://i.imgur.com/Ib4nNyt.jpg",
            "https://i.imgur.com/OChe0ku.jpg",
            "https://i.imgur.com/ifbKPvP.jpg",
            "https://i.imgur.com/yxZt8cp.jpg",
            "https://i.imgur.com/tchbrjB.jpg",
            "https://i.imgur.com/AW0I6Pa.jpg",
            "https://i.imgur.com/tWNnDvH.jpg",
            "https://i.imgur.com/v7hNHn6.jpg",
            "https://i.imgur.com/aKOx6Wj.jpg",
            "https://i.imgur.com/iymnRtd.jpg",
            "https://i.imgur.com/vLVrDD6.jpg",
            "https://i.imgur.com/yCKqQzz.jpg",
            "https://i.imgur.com/0coTENW.jpg",
            "https://i.imgur.com/OnMSuLZ.jpg",
            "https://i.imgur.com/uvDifn9.jpg",
            "https://i.imgur.com/ZqTys7J.jpg",
            "https://i.imgur.com/NbzQVkg.jpg",
            "https://i.imgur.com/egivCLt.jpg",
            "https://i.imgur.com/03iAE6k.jpg",
            "https://i.imgur.com/e7jVsys.jpg",
            "https://i.imgur.com/DXzJnxu.jpg",
            "https://i.imgur.com/57pYcp2.jpg",

        ]

        this.jamLinks = [
            "https://i.imgur.com/2lrC2gB.jpg",
            "https://i.imgur.com/oAxuqyv.jpg",
            "https://i.imgur.com/5l2UobM.jpg",
            "https://i.imgur.com/0gmiPRD.jpg",
            "https://i.imgur.com/amFQWDB.jpg",
            "https://i.imgur.com/agIs3sT.jpg",
            "https://i.imgur.com/7uv44ya.jpg",
            "https://i.imgur.com/n5N2MoI.jpg",
            "https://i.imgur.com/F2Yq2Gm.jpg",
            "https://i.imgur.com/hBM0a0y.jpg",
        ]

        this.appleLinks = [
            "https://i.imgur.com/WObXlKL.jpg",
            "https://i.imgur.com/BWSTg3f.jpg",
            "https://i.imgur.com/J7aQWNP.jpg",
            "https://i.imgur.com/LbHtBkU.jpg",
            "https://i.imgur.com/fzA8OMa.jpg",
            "https://i.imgur.com/Ov4F2v8.jpg",
            "https://i.imgur.com/vL1OVTF.jpg",
            "https://i.imgur.com/D7YLN22.jpg",
            "https://i.imgur.com/5sAgUhs.jpg",
            "https://i.imgur.com/6unEvso.jpg",
        ]

        this.appleTypes = [
            "Granny Smith",
            "Honeycrisp",
            "Fuji",
            "Gala",
            "Pink Lady",
            "Golden Delicious",
            "Red Delicious",
            "Cortland",
            "Braeburn",
        ]

        this.bananaLinks = [
            "https://i.imgur.com/4FK00ap.jpg",
            "https://i.imgur.com/Z1y2Jr8.png",
            "https://i.imgur.com/kWyfVya.jpg",
            "https://i.imgur.com/3m4E7oL.jpg",
            "https://i.imgur.com/NzD6AV6.jpg",
            "https://i.imgur.com/fwMi2vp.jpg",
            "https://i.imgur.com/vSSS4lV.jpg",
            "https://i.imgur.com/j79D964.jpg",
            "https://i.imgur.com/05lKVQK.jpg",
            "https://i.imgur.com/rHscqqT.jpg",
        ]

        this.bananaTypes = [
            "Cavendish",
            "Lady Finger",
            "Plantain",
            "Red Banana",
            "Saba",
        ]
        
        this.orangeLinks = [
            "https://i.imgur.com/qNUIkIW.jpg",
            "https://i.imgur.com/OUkgxyH.jpg",
            "https://i.imgur.com/Qa7dLLV.jpg",
            "https://i.imgur.com/bGjrLnz.jpg",
            "https://i.imgur.com/JCZgE2r.jpg",
            "https://i.imgur.com/b15NsAE.jpg",
            "https://i.imgur.com/od3PV1u.jpg",
            "https://i.imgur.com/563nf5Q.jpg",
            "https://i.imgur.com/Pvm99ji.jpg",
            "https://i.imgur.com/xYVfNb9.jpg"
        ]

        this.orangeTypes = [
            "Blood Orange",
            "Cara Cara",
            "Clementine",
            "Honey Tangerine",
            "Mandarin",
            "Navel Orange",
            "Valencia Orange",
            "Tangerine",
        ]

        this.beetLinks = [
            "https://i.imgur.com/NxJnslf.jpg",
            "https://i.imgur.com/kBm8Ftc.jpg",
            "https://i.imgur.com/EQA6dxU.jpg",
            "https://i.imgur.com/A3RKDDJ.jpg",
            "https://i.imgur.com/4SZAsut.jpg",
            "https://i.imgur.com/uFCoYnr.jpg",
            "https://i.imgur.com/9JeWmNG.jpg",
            "https://i.imgur.com/l0uZAt7.jpg",
            "https://i.imgur.com/GUsdJRs.jpg",
        ]

        this.beetTypes = [
            "Bull's Blood",
            "Chioggia",
            "Detroit Dark Red",
            "Golden",
            "Red Ace",
            "Red Ball",
            "Red Cylindra",
            "Red Globe",
        ]

        this.garlicLinks = [
            "https://i.imgur.com/GGrqrK8.jpg",
            "https://i.imgur.com/cLlPgH6.jpg",
            "https://i.imgur.com/5Pjox8N.jpg",
            "https://i.imgur.com/ioWyIED.jpg",
            "https://i.imgur.com/9zmm3gB.jpg",
            "https://i.imgur.com/abiTtU9.jpg",
            "https://i.imgur.com/fb9WBP9.jpg",
            "https://i.imgur.com/20wDUYm.jpg",
            "https://i.imgur.com/u642RKY.jpg",
        ]

        this.garlicTypes = [
            "Ajo Rojo",
            "Porcelain",
            "Silverskin",
            "Spanish Roja",
        ]

        this.soybeanLinks = [
            "https://i.imgur.com/ZfVyvqo.jpg",
            "https://i.imgur.com/NDkGJTy.jpg",
            "https://i.imgur.com/tYiOxFi.jpg",
            "https://i.imgur.com/uqxvFTs.jpg",
            "https://i.imgur.com/qRfnCEd.jpg",
            "https://i.imgur.com/Ga3TZyp.png",
            "https://i.imgur.com/3lhla96.jpg",
            "https://i.imgur.com/ht7Vxlf.jpg",
            "https://i.imgur.com/uO32Nb7.jpg",
            "https://i.imgur.com/KUYlLY2.jpg",
        ]

        this.soybeanTypes = [
            "Asgrow 2000",
            "Asgrow 3000",
            "Asgrow 4000",
            "Yellow Soybean",
            "Black Soybean",
            "Brown Soybean",
            "Green Soybean",
            "White Soybean",
        ]

        this.tomatoLinks = [
            "https://i.imgur.com/5JxV1vI.jpg",
            "https://i.imgur.com/FBMm9Pf.jpg",
            "https://i.imgur.com/Xkv3UXQ.jpg",
            "https://i.imgur.com/Gv8bY5H.jpg",
            "https://i.imgur.com/N2lHVfL.jpg",
            "https://i.imgur.com/k6vvrWb.jpg",
            "https://i.imgur.com/JT5TKzb.jpg",
            "https://i.imgur.com/Ffm76KE.jpg",
            "https://i.imgur.com/VVErrl5.jpg",
            "https://i.imgur.com/PS778Iu.jpg",
        ]

        this.tomatoTypes = [
            "Cherry Tomato",
            "Grape Tomato",
            "Heirloom Tomato",
            "Plum Tomato",
            "Roma Tomato",
            "Slicing Tomato",
            "4th of July Tomato",
            "Black Cherry Tomato",
            "Black Krim Tomato",
            "Black Plum Tomato",
            "Black Zebra Tomato",
        ]

        this.jalapenoLinks = [
            "https://i.imgur.com/srrKVJI.jpg",
            "https://i.imgur.com/mPf2JfN.jpg",
            "https://i.imgur.com/zNkW87m.jpg",
            "https://i.imgur.com/XBu274n.jpg",
            "https://i.imgur.com/m4BxYjQ.jpg",
            "https://i.imgur.com/yZAxQVK.jpg",
            "https://i.imgur.com/9MW369N.jpg",
            "https://i.imgur.com/VIpyG8I.jpg",
            "https://i.imgur.com/XUiBisW.jpg",
            "https://i.imgur.com/2gJqXQB.jpg",
        ]

        this.jalapenoTypes = [
            "Habanero",
            "Jalapeno",
            "Poblano",
            "Serrano",
            "Thai Chili",
            "Thai Hot",
        ]

        this.eggplantLinks = [
            "https://i.imgur.com/oSo7rqC.jpg",
            "https://i.imgur.com/98jtGga.jpg",
            "https://i.imgur.com/HAyPgW4.jpg",
            "https://i.imgur.com/PVgrEJP.jpg",
            "https://i.imgur.com/770sCiX.jpg",
            "https://i.imgur.com/dwrg6N3.jpg",
            "https://i.imgur.com/HBazKtO.jpg",
            "https://i.imgur.com/Z76ag8L.jpg",
            "https://i.imgur.com/0YU84Nl.jpg",
            "https://i.imgur.com/4cAh67d.jpg",
        ]

        this.eggplantTypes = [
            "African Eggplant",
            "Black Beauty Eggplant",
            "Black Eggplant",
            "Chinese Eggplant",
            "Japanese Eggplant",
            "Long Eggplant",
            "Purple Eggplant",
        ]

        this.lemonLinks = [
            "https://i.imgur.com/BzrfTdc.jpg",
            "https://i.imgur.com/oVTb8kz.jpg",
            "https://i.imgur.com/nRzJcl7.jpg",
            "https://i.imgur.com/AUqiUNw.jpg",
            "https://i.imgur.com/BSnHkCD.jpg",
            "https://i.imgur.com/bWd1dbD.jpg",
            "https://i.imgur.com/ZbxZBFZ.jpg",
            "https://i.imgur.com/QszwWIe.jpg",
            "https://i.imgur.com/2bcnvoZ.jpg",
            "https://i.imgur.com/EozxMx8.jpg",
        ]

        this.lemonTypes = [
            "Lisbon Lemon",
            "Meyer Lemon",
            "Eureka Lemon",
            "Verna Lemon",
        ]

        this.peaLinks = [
            "https://i.imgur.com/GB52lap.jpg",
            "https://i.imgur.com/3hDPi6P.jpg",
            "https://i.imgur.com/41wHcMf.jpg",
            "https://i.imgur.com/BsfuWCu.png",
            "https://i.imgur.com/8KL8kAn.jpg",
            "https://i.imgur.com/CVuGDeo.jpg",
            "https://i.imgur.com/s8E2800.jpg",
            "https://i.imgur.com/Cez9GAb.jpg",
            "https://i.imgur.com/c4vPuig.jpg",
            "https://i.imgur.com/6faUG4x.jpg",
        ]

        this.peaTypes = [
            "Snow Pea",
            "Sugar Snap Pea",
            "English Pea",
            "Shelling Pea",
        ]

        this.pearLinks = [
            "https://i.imgur.com/5kuw4cJ.jpg",
            "https://i.imgur.com/2d0nDmu.jpg",
            "https://i.imgur.com/qdu6hWP.jpg",
            "https://i.imgur.com/Byv2kiQ.jpg",
            "https://i.imgur.com/TEMO03X.jpg",
            "https://i.imgur.com/Ds3ClWT.jpg",
            "https://i.imgur.com/QUYjTAV.jpg",
            "https://i.imgur.com/4TKTpMO.jpg",
            "https://i.imgur.com/LNULrfV.jpg",
            "https://i.imgur.com/GdtWcYN.jpg",
        ]

        this.pearTypes = [
            "Asian Pear",
            "Bartlett Pear",
            "Bosc Pear",
            "D'Anjou Pear",
            "Nashi Pear",
            "Red Anjou Pear",
        ]

        this.cabbageLinks = [
            "https://i.imgur.com/NoxtrwR.jpg",
            "https://i.imgur.com/6fmXrB8.jpg",
            "https://i.imgur.com/1TWggzh.jpg",
            "https://i.imgur.com/n25wpW0.jpg",
            "https://i.imgur.com/g9nYL56.jpg",
            "https://i.imgur.com/M2eJ2aQ.jpg",
            "https://i.imgur.com/dbIZtL6.jpg",
            "https://i.imgur.com/CedWWhk.jpg",
            "https://i.imgur.com/VL8Xy5P.jpg",
            "https://i.imgur.com/M6b51Qu.jpg",
        ]

        this.cabbageTypes = [
            "Chinese Cabbage",
            "Red Cabbage",
            "Savoy Cabbage",
            "Napa Cabbage",
            "Green Cabbage",
        ]

        this.grapeLinks = [
            "https://i.imgur.com/Bt38caa.jpg",
            "https://i.imgur.com/YDJx1dI.jpg",
            "https://i.imgur.com/8nzq0wc.jpg",
            "https://i.imgur.com/Uc1oidx.jpg",
            "https://i.imgur.com/4yEZjvg.jpg",
            "https://i.imgur.com/vWTwIxd.jpg",
            "https://i.imgur.com/VXq3mFz.jpg",
            "https://i.imgur.com/AvFymLl.jpg",
            "https://i.imgur.com/coYhPNj.jpg",
            "https://i.imgur.com/MYwUt85.jpg",
        ]

        this.grapeTypes = [
            "Red Seedless Grape",
            "Green Seedless Grape",
            "Red Grape",
            "Green Grape",
            "Black Grape",
        ]


        this.pomegranateLinks = [
            "https://i.imgur.com/0wTLZvC.jpg",
            "https://i.imgur.com/DYo1jlb.jpg",
            "https://i.imgur.com/hvJZWwj.jpg",
            "https://i.imgur.com/wAsZaf0.jpg",
            "https://i.imgur.com/XV5LEgr.jpg",
            "https://i.imgur.com/n7Bemwj.jpg",
            "https://i.imgur.com/K4so7Z1.jpg",
            "https://i.imgur.com/aMRa3V7.jpg",
            "https://i.imgur.com/Xe617H4.jpg",
            "https://i.imgur.com/9coTW0s.jpg",
        ]

        this.pomegranateTypes = [
            "Eversweet Pomegranate",
            "Kazake Pomegranate",
            "Purple Heart Pomegranate",
            "Red Silk Pomegranate",
        ]

        this.carrotLinks = [
            "https://i.imgur.com/61Vytsk.jpg",
            "https://i.imgur.com/jb3hOFR.jpg",
            "https://i.imgur.com/FXyLK2Q.jpg",
            "https://i.imgur.com/XDiOqDn.jpg",
            "https://i.imgur.com/hs2ICmP.jpg",
            "https://i.imgur.com/6mM95P3.jpg",
            "https://i.imgur.com/Uj10gH3.jpg",
            "https://i.imgur.com/JRWZRwr.jpg",
            "https://i.imgur.com/7lmYJyP.jpg",
            "https://i.imgur.com/mJ4evex.jpg",
        ]

        this.carrotTypes = [
            "Chantenay Carrot",
            "Danvers Carrot",
            "Nantes Carrot",
            "Parisian Carrot",
            "Purple Haze Carrot",
        ]

        this.watermelonLinks = [
            "https://i.imgur.com/og1GFJq.jpg",
            "https://i.imgur.com/zrBDDYG.jpg",
            "https://i.imgur.com/UVsJSq6.jpg",
            "https://i.imgur.com/0VHJTv2.jpg",
            "https://i.imgur.com/W0UCQ6u.jpg",
            "https://i.imgur.com/exlHfFf.jpg",
            "https://i.imgur.com/4L4wq6c.jpg",
            "https://i.imgur.com/Ao4SUuZ.jpg",
            "https://i.imgur.com/Y4JeZQp.jpg",
            "https://i.imgur.com/Y38WLjl.jpg",
        ]

        this.watermelonTypes = [
            "Crimson Sweet Watermelon",
            "Honey Dew Watermelon",
            "Moon and Stars Watermelon",
            "Orange Flesh Watermelon",
            "Sugar Baby Watermelon",
        ]

        this.potatoLinks = [
            "https://i.imgur.com/oCCpZZv.jpg",
            "https://i.imgur.com/Bt4FVY0.jpg",
            "https://i.imgur.com/4XeB01s.jpg",
            "https://i.imgur.com/4ObgmdJ.jpg",
            "https://i.imgur.com/MZnSqgZ.jpg",
            "https://i.imgur.com/8iGn9nX.jpg",
            "https://i.imgur.com/w5EbRuk.jpg",
            "https://i.imgur.com/kMuRt45.jpg",
            "https://i.imgur.com/AJxoTTw.jpg",
            "https://i.imgur.com/sGRJrGC.jpg",
        ]

        this.potatoTypes = [
            "Adirondack Blue Potato",
            "All Blue Potato",
            "All Red Potato",
            "All White Potato",
            "Blue Potato",
        ]

        this.spinachLinks = [
            "https://i.imgur.com/nzCmBoA.jpg",
            "https://i.imgur.com/aCv1O7E.jpg",
            "https://i.imgur.com/vVdIPKe.jpg",
            "https://i.imgur.com/QBRs4cW.jpg",
            "https://i.imgur.com/ePp6wRW.jpg",
            "https://i.imgur.com/Jj7cc4D.jpg",
            "https://i.imgur.com/gnrmtJU.jpg",
            "https://i.imgur.com/yvqjHNv.jpg",
            "https://i.imgur.com/n0oewu7.jpg",
            "https://i.imgur.com/hHfxNaC.jpg",
        ]

        this.spinachTypes = [
            "Bloomsdale Long Standing Spinach",
            "Bloomsdale Spinach",
            "Bloomsdale Winter Spinach",
        ]

        this.mangoLinks = [
            "https://i.imgur.com/F8gc3vU.jpg",
            "https://i.imgur.com/Yfx7KHN.jpg",
            "https://i.imgur.com/RvqV4HF.png",
            "https://i.imgur.com/2P8FMTu.jpg",
            "https://i.imgur.com/eITl4Av.jpg",
            "https://i.imgur.com/34Qe7PL.jpg",
            "https://i.imgur.com/u7Rexa8.jpg",
            "https://i.imgur.com/XD1Bz7I.jpg",
            "https://i.imgur.com/1WQrTmA.jpg",
            "https://i.imgur.com/ET9zJ9b.jpg",
        ]

        this.mangoTypes = [
            "Ataulfo Mango",
            "Kent Mango",
            "Keitt Mango",
            "Tommy Atkins Mango",
        ]

        this.onionLinks = [
            "https://i.imgur.com/PjACob7.jpg",
            "https://i.imgur.com/nzpWSt7.jpg",
            "https://i.imgur.com/vHnsMFS.jpg",
            "https://i.imgur.com/MncSplH.jpg",
            "https://i.imgur.com/a2tw3qv.jpg",
            "https://i.imgur.com/d4JXJ2r.jpg",
            "https://i.imgur.com/1zpFS6b.jpg",
            "https://i.imgur.com/6NN7R0g.jpg",
            "https://i.imgur.com/QA6z4TE.jpg",
            "https://i.imgur.com/D5IPSCJ.jpg",
        ]

        this.onionTypes = [
            "Bermuda Onion",
            "Bulb Onion",
            "Cipollini Onion",
        ]

        this.lettuceLinks = [
            "https://i.imgur.com/JJicSPm.jpg",
            "https://i.imgur.com/JY8OCA4.jpg",
            "https://i.imgur.com/5p9Q2Zi.jpg",
            "https://i.imgur.com/OSkCvLz.jpg",
            "https://i.imgur.com/UQtTrtO.jpg",
            "https://i.imgur.com/Q7L8W4M.jpg",
            "https://i.imgur.com/MF2J7e5.jpg",
            "https://i.imgur.com/FKfPEKL.jpg",
            "https://i.imgur.com/q5EPAiV.jpg",
            "https://i.imgur.com/CCAixI8.jpg",
        ]

        this.lettuceTypes = [
            "Buttercrunch Lettuce",
            "Green Ice Lettuce",
            "Lollo Rossa Lettuce",
            "Red Sails Lettuce",
        ]

        this.pineappleLinks = [
            "https://i.imgur.com/aKxYU9C.jpg",
            "https://i.imgur.com/bg6PeFK.jpg",
            "https://i.imgur.com/2y0lUsW.jpg",
            "https://i.imgur.com/16IpxIe.jpg",
            "https://i.imgur.com/47DWnuy.jpg",
            "https://i.imgur.com/T8SoknO.jpg",
            "https://i.imgur.com/yzi6LBP.jpg",
            "https://i.imgur.com/syYhPSR.jpg",
            "https://i.imgur.com/KQfRpcv.jpg",
            "https://i.imgur.com/Aa7uMuq.jpg",
        ]

        this.pineappleTypes = [
            "Smooth Cayenne Pineapple",
            "Red Spanish Pineapple",
            "Queen Pineapple",
            "Pernambuco Pineapple",
            "Abacaxi Pineapple",
        ]

        this.cornLinks = [
            "https://i.imgur.com/C5uz801.jpg",
            "https://i.imgur.com/rfpgfLb.jpg",
            "https://i.imgur.com/FtFpooY.jpg",
            "https://i.imgur.com/soMhqJ4.jpg",
            "https://i.imgur.com/3TrqEAO.jpg",
            "https://i.imgur.com/FTBGfsX.jpg",
            "https://i.imgur.com/oom40GJ.jpg",
            "https://i.imgur.com/rqmlyU1.jpg",
            "https://i.imgur.com/GgDuYte.jpg",
            "https://i.imgur.com/7x8mN2h.jpg",
        ]

        this.cornTypes = [
            "Blue Hopi Corn",
            "Ruby Queen Corn",
            "Golden Bantam Corn",
            "Black Aztec Corn",
            "Black Beauty Corn",
            "Nirvana Hybrid Corn"
        ]

        this.cheeseLinks = [
            "https://i.imgur.com/Tg6vuou.jpg",
            "https://i.imgur.com/4LIIWUx.jpg",
            "https://i.imgur.com/RHs7PCK.jpg",
            "https://i.imgur.com/UgijZCQ.jpg",
            "https://i.imgur.com/tQpFlf5.jpg",
            "https://i.imgur.com/qgvZL3Q.jpg",
            "https://i.imgur.com/VkacEsV.jpg",
            "https://i.imgur.com/11dYsZr.jpg",
            "https://i.imgur.com/d1glHJD.jpg",
            "https://i.imgur.com/Ja8YloV.jpg",
            "https://i.imgur.com/QXE0j80.jpg",
            "https://i.imgur.com/1uYKWJX.jpg",
            "https://i.imgur.com/iGc33h3.jpg",
        ]

        this.milkLinks = [
            "https://i.imgur.com/0JIayhl.jpg",
            "https://i.imgur.com/YCa0n2I.jpg",
            "https://i.imgur.com/PvNsXm2.jpg",
            "https://i.imgur.com/eeEM5BM.jpg",
            "https://i.imgur.com/IUG8zAo.jpg",
            "https://i.imgur.com/YyS4ngd.jpg",
            "https://i.imgur.com/2WvlAjE.jpg",
            "https://i.imgur.com/XYg1bvF.jpg",
            "https://i.imgur.com/UiU7vEy.jpg",
            "https://i.imgur.com/xa85ogT.jpg",
            "https://i.imgur.com/ggxqzSa.jpg",
            "https://i.imgur.com/hPLfUpm.jpg",
            "https://i.imgur.com/63ezTRY.jpg",
            "https://i.imgur.com/NNHG5an.jpg",
            "https://i.imgur.com/oODQYGU.jpg",
            "https://i.imgur.com/bac3reN.jpg",
            "https://i.imgur.com/VKpNZ23.jpg",
            "https://i.imgur.com/BcwniqH.jpg",
        ]

        this.eggs = [
            'Chicken Eggs',
            'Duck Eggs',
            'Goose Eggs',
            'Quail Eggs',
            'Turkey Eggs',
            'Ostrich Eggs',
            'Emu Eggs',
        ]

        this.milktypes = [
            "Cow Milk",
            "Goat Milk",
            "Sheep Milk",
            "Almond Milk",
            "Soy Milk",
            "Rice Milk",
            "Oat Milk",
            "Coconut Milk",
            "Hemp Milk",
        ]

        // These are the quantites that small products such as apples, bottles of milk, eggs etc. will be sold in.
        this.smallProductStocks = [
            {
                size_name: "Half Dozen",
                size_item_count: 6,
                size_stock:  faker.datatype.number({ min: 0, max: 10 }),
            },
            {
                size_name: "Dozen",
                size_item_count: 12,
                size_stock:  faker.datatype.number({ min: 0, max: 10 }),
            },
            {
                size_name: "Two Dozen",
                size_item_count: 24,
                size_stock:  faker.datatype.number({ min: 0, max: 10 }),
            },
            {
                size_name: "Three Dozen",
                size_item_count: 36,
                size_stock:  faker.datatype.number({ min: 0, max: 10 }),
            },
        ]

        // These are the quantites that large products such as watermelons, pumpkins, etc. will be sold in.
        this.largeProductStocks = [
            {
                size_name: "Small Crate",
                size_item_count: 2,
                size_stock:  faker.datatype.number({ min: 0, max: 10 }),
            },
            {
                size_name: "Medium Crate",
                size_item_count: 4,
                size_stock:  faker.datatype.number({ min: 0, max: 10 }),
            },
            {
                size_name: "Large Crate",
                size_item_count: 6,
                size_stock:  faker.datatype.number({ min: 0, max: 10 }),
            },
        ]

    }

    // Functions to return data for each fruit, vegetable, etc.
    // Each returns an object containing a productName, productLink, and productStock, a set of tags, and a productType

    async getVendorSpeciality () { return await getRandomItem(this.vendorSpecialities) }


    async getRandomSizeTagList (){
        let tagList = []
        let tagCount = faker.datatype.number({ min: 1, max: 5 })
        for (let i = 0; i < tagCount; i++) {
            const tag = await getRandomItem(this.productTags)
            if (!tagList.includes(tag)) {
                tagList.push(tag)
            }
        }
        return await tagList
    }

    async getSmallSizes () {
        return await this.smallProductStocks
    }

    async getLargeSizes () {
        return await this.largeProductStocks
    }

    async getApple () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Apple",
            link: await getRandomItem(this.appleLinks),
            stock: await this.getSmallSizes(),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.appleTypes),
            vegetationType: "fruit",
        }
    }

    async getBanana () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Banana",
            link: await getRandomItem(this.bananaLinks),
            stock: await Promise.all(this.smallProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.bananaTypes),
            vegetationType: "fruit",
        }
    }

    async getOrange () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Orange",
            link: await getRandomItem(this.orangeLinks),
            stock: await Promise.all(this.smallProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.orangeTypes),
            vegetationType: "fruit",
        }
    }

    async getLemon () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Lemon",
            link: await getRandomItem(this.lemonLinks),
            stock: await Promise.all(this.smallProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.lemonTypes),
            vegetationType: "fruit",
        }
    }

    async getBeet () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Beet",
            link: await getRandomItem(this.beetLinks),
            stock: await Promise.all(this.smallProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.beetTypes),
            vegetationType: "vegetable",
        }
    }

    async getCarrot () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Carrot",
            link: await getRandomItem(this.carrotLinks),
            stock: await Promise.all(this.smallProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.carrotTypes),
            vegetationType: "vegetable",
        }
    }


    async getEggplant () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Eggplant",
            link: await getRandomItem(this.eggplantLinks),
            stock: await Promise.all(this.smallProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.eggplantTypes),
            vegetationType: "vegetable",
        }
    }

    async getLettuce () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Lettuce",
            link: await getRandomItem(this.lettuceLinks),
            stock: await Promise.all(this.smallProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.lettuceTypes),
            vegetationType: "vegetable",
        }
    }

    async getOnion () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Onion",
            link: await getRandomItem(this.onionLinks),
            stock: await Promise.all(this.smallProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.onionTypes),
            vegetationType: "vegetable",
        }
    }

    async getPotato () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Potato",
            link: await getRandomItem(this.potatoLinks),
            stock: await Promise.all(this.smallProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.potatoTypes),
            vegetationType: "vegetable",
        }
    }

    async getTomato () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Tomato",
            link: await getRandomItem(this.tomatoLinks),
            stock: await Promise.all(this.smallProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.tomatoTypes),
            vegetationType: "fruit",
        }
    }

    async getWatermelon () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Watermelon",
            link: await getRandomItem(this.watermelonLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.watermelonTypes),
            vegetationType: "fruit",
        }
    }

    async getGarlic () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Garlic",
            link: await getRandomItem(this.garlicLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.garlicTypes),
            vegetationType: "vegetable",
        }
    }

    async getSoybean () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Soybean",
            link: await getRandomItem(this.soybeanLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.soybeanTypes),
            vegetationType: "vegetable",
        }
    }

    async getJalapeno () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Jalapeno",
            link: await getRandomItem(this.jalapenoLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.jalapenoTypes),
            vegetationType: "vegetable",
        }
    }

    async getPea () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Pea",
            link: await getRandomItem(this.peaLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.peaTypes),
            vegetationType: "vegetable",
        }
    }

    async getPear () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Pear",
            link: await getRandomItem(this.pearLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.pearTypes),
            vegetationType: "fruit",
        }
    }

    async getCabbage () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Cabbage",
            link: await getRandomItem(this.cabbageLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.cabbageTypes),
            vegetationType: "vegetable",
        }
    }

    async getGrape () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Grape",
            link: await getRandomItem(this.grapeLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.grapeTypes),
            vegetationType: "fruit",
        }
    }

    async getPomegranate () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Pomegranate",
            link: await getRandomItem(this.pomegranateLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.pomegranateTypes),
            vegetationType: "fruit",
        }
    }

    async getSpinach () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Spinach",
            link: await getRandomItem(this.spinachLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.spinachTypes),
            vegetationType: "vegetable",
        }
    }

    async getMango () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Mango",
            link: await getRandomItem(this.mangoLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.mangoTypes),
            vegetationType: "fruit",
        }
    }

    async getPineapple () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Pineapple",
            link: await getRandomItem(this.pineappleLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.pineappleTypes),
            vegetationType: "fruit",
        }
    }

    async getCorn () {
        return {
            name: await getRandomItem(this.productNames) + " " + await getRandomItem(this.productAdjectives) + " " + await " Corn",
            link: await getRandomItem(this.cornLinks),
            stock: await Promise.all(this.largeProductStocks),
            tags: await this.getRandomSizeTagList(),
            type: await getRandomItem(this.cornTypes),
            vegetationType: "vegetable",
        }
    }

    newProduct() {
        const newProduct =  getRandomItem([this.getApple(), this.getBanana(), this.getOrange(), this.getLemon(), this.getBeet(), this.getCarrot(), this.getEggplant(), this.getLettuce(), this.getOnion(), this.getPotato(), this.getGarlic(), this.getSoybean(), this.getJalapeno(), this.getPea(), this.getPear(), this.getCabbage(), this.getGrape(), this.getPomegranate(), this.getSpinach(), this.getMango(), this.getPineapple(), this.getCorn()]);
        return newProduct;
    }

    async getRandomSizeSpecialityList() {
        let specialityList = []
        let specialityCount = faker.datatype.number({ min: 1, max: 5 })
        for (let i = 0; i < specialityCount; i++) {
            const tag = await this.getVendorSpeciality()
            if (!specialityList.includes(tag)) {
                specialityList.push(tag)
            }
        }
        return await specialityList
    }

    async newVendor() {
        return {
            name: await getRandomItem(this.farmPrefixes) + " " + await getRandomItem(this.farmSuffixes),
            link: await getRandomItem(this.vendorLinks),
            specialities: await this.getRandomSizeSpecialityList(),
        }
    }

   

}

module.exports = Gardeny;

