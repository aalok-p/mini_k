import { campaignThemes } from "../context/ThemeContext";
import type { CampaignMode } from "../store/appStore";
import type { Product, SDUINode, SDUIResponse } from "../types/sdui";

const KID_PRODUCTS: Record<string, Product[]> = {
  clothes: [
    {
      id: "cl-1",
      name: "Spiderman Action Figure (3-4Y)",
      price: 899,
      originalPrice: 999,
      imageUrl:
        "https://images.unsplash.com/photo-1558680689-ce686c5e2fb8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "clothes",
      rating: 4.8,
    },
    {
      id: "cl-2",
      name: "Boys Denim Overalls (4-5Y)",
      price: 749,
      originalPrice: 1099,
      imageUrl:
        "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "clothes",
      rating: 4.7,
    },
    {
      id: "cl-3",
      name: "Soft Cotton Onesie Set (0-1Y)",
      price: 449,
      originalPrice: 599,
      imageUrl:
        "https://images.pexels.com/photos/3662632/pexels-photo-3662632.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "clothes",
      rating: 4.9,
    },
  ],
  toys: [
    {
      id: "ty-1",
      name: "Wooden Rainbow Stacker",
      price: 599,
      originalPrice: 799,
      imageUrl:
        "https://images.pexels.com/photos/13709396/pexels-photo-13709396.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "toys",
      rating: 4.9,
    },
    {
      id: "ty-2",
      name: "Plush Teddy Bear (Large)",
      price: 699,
      originalPrice: 999,
      imageUrl:
        "https://images.pexels.com/photos/754178/pexels-photo-754178.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "toys",
      rating: 4.8,
    },
    {
      id: "ty-3",
      name: "Musical Xylophone Toy",
      price: 449,
      originalPrice: 650,
      imageUrl:
        "https://images.pexels.com/photos/4846511/pexels-photo-4846511.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "toys",
      rating: 4.7,
    },
  ],
  rakhi: [
    {
      id: "rk-1",
      name: "Pearl Rakhi with Lumba Set",
      price: 299,
      originalPrice: 599,
      imageUrl:
        "https://images.unsplash.com/photo-1726726192151-6d4139ff229d?auto=format&fit=crop&q=80&w=250",
      category: "rakhi",
      rating: 4.9,
    },
    {
      id: "rk-2",
      name: "Kids Rakhi Gift Box",
      price: 499,
      originalPrice: 799,
      imageUrl:
        "https://images.pexels.com/photos/6684524/pexels-photo-6684524.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "rakhi",
      rating: 4.8,
    },
    {
      id: "rk-3",
      name: "Designer Cartoon Rakhi",
      price: 199,
      originalPrice: 349,
      imageUrl:
        "https://images.pexels.com/photos/6684536/pexels-photo-6684536.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "rakhi",
      rating: 4.7,
    },
  ],
  krishna: [
    {
      id: "kr-1",
      name: "Krishna Crown & Flute Set",
      price: 349,
      originalPrice: 599,
      imageUrl:
        "https://images.pexels.com/photos/30816806/pexels-photo-30816806.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "krishna",
      rating: 4.9,
    },
    {
      id: "kr-2",
      name: "Peacock Feather Headband",
      price: 199,
      originalPrice: 349,
      imageUrl:
        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "krishna",
      rating: 4.8,
    },
    {
      id: "kr-3",
      name: "Butter Pot Bank (Ceramic)",
      price: 299,
      originalPrice: 449,
      imageUrl:
        "https://images.pexels.com/photos/4792084/pexels-photo-4792084.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "krishna",
      rating: 4.7,
    },
  ],
  ganesh: [
    {
      id: "gn-1",
      name: "Mini Ganesh Murti (Clay)",
      price: 249,
      originalPrice: 449,
      imageUrl:
        "https://images.pexels.com/photos/166277/pexels-photo-166277.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "ganesh",
      rating: 4.9,
    },
    {
      id: "gn-2",
      name: "Modak Gift Box (12 pcs)",
      price: 399,
      originalPrice: 599,
      imageUrl:
        "https://images.pexels.com/photos/2955722/pexels-photo-2955722.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "ganesh",
      rating: 4.8,
    },
    {
      id: "gn-3",
      name: "Kids Ganesh Coloring Book",
      price: 149,
      originalPrice: 249,
      imageUrl:
        "https://images.pexels.com/photos/7086762/pexels-photo-7086762.jpeg?auto=compress&cs=tinysrgb&w=250&dpr=1",
      category: "ganesh",
      rating: 4.7,
    },
  ],
};

export const getSDUIPayload = (campaign: CampaignMode): SDUIResponse => {
  const layout: SDUINode[] = [];

  let heroImage =
    "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1";
  let heroTitle = "All-in-One Kids Store";
  let heroSubtitle = "Everything your little one needs, delivered in 10 mins";
  let badgeText = "Delivery in 10 Mins";

  if (campaign === "rakhi") {
    heroImage =
      "https://images.pexels.com/photos/6684524/pexels-photo-6684524.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1";
    heroTitle = "Raksha Bandhan Special!";
    heroSubtitle = "Beautiful rakhis, gifts & treats for your siblings";
    badgeText = "Rakhi gifts from Rs.199";
  } else if (campaign === "janmashtami") {
    heroImage =
      "https://images.pexels.com/photos/18139756/pexels-photo-18139756.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1";
    heroTitle = "Janmashtami Celebrations!";
    heroSubtitle = "Dress up your little Krishna with costumes & props";
    badgeText = "Krishna outfits & decor";
  } else if (campaign === "ganesh") {
    heroImage =
      "https://images.pexels.com/photos/32848014/pexels-photo-32848014.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1";
    heroTitle = "Ganesh Chaturthi!";
    heroSubtitle = "Eco-friendly murtis, modaks & puja essentials";
    badgeText = "Ganesh specials from Rs.149";
  }

  layout.push({
    id: "hero-banner-main",
    type: "BANNER_HERO",
    data: {
      imageUrl: heroImage,
      title: heroTitle,
      subtitle: heroSubtitle,
      badgeText,
    },
    action: {
      type: "DEEP_LINK",
      payload: { url: `/promo/${campaign}` },
    },
  });

  if (campaign === "rakhi") {
    layout.push({
      id: "campaign-rakhi-special",
      type: "DYNAMIC_COLLECTION",
      data: {
        title: "Rakhis for Kids",
        subtitle: "Fun cartoon rakhis your little ones will love",
        products: KID_PRODUCTS.rakhi.slice(0, 3),
      },
    });
  } else if (campaign === "janmashtami") {
    layout.push({
      id: "campaign-krishna-costume",
      type: "SCHOOL_SPECIAL_ROW",
      data: {
        title: "Krishna Costumes & Accessories",
        products: KID_PRODUCTS.krishna,
      },
    });
  } else if (campaign === "ganesh") {
    layout.push({
      id: "campaign-ganesh-gift-banner",
      type: "MYSTERY_GIFT_BANNER",
      data: {
        title: "Free Modak Box with Every Order!",
        description:
          "Use code GANESHBLESS to get a complimentary box of traditional modaks.",
        couponCode: "GANESHBLESS",
      },
      action: {
        type: "APPLY_MYSTERY_GIFT_COUPON",
        payload: { couponCode: "GANESHBLESS" },
      },
    });
  }

  layout.push({
    id: "dynamic-collection-clothes",
    type: "DYNAMIC_COLLECTION",
    data: {
      title: "Kids Fashion",
      subtitle: "Comfortable cotton clothes for your little ones",
      products: KID_PRODUCTS.clothes,
    },
  });

  layout.push({
    id: "product-grid-toys",
    type: "PRODUCT_GRID_2X2",
    data: {
      title: "Top Trending Toys",
      products: KID_PRODUCTS.toys,
    },
  });

  const theme =
    campaign !== "none"
      ? campaignThemes[campaign]
      : { primary: "#10B981", background: "#F0FDF4" };

  return { theme, layout };
};
