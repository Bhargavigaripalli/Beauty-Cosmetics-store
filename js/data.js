// Mock Database for Stackly Beauty

const AGENTS = [
  {
    id: 1,
    name: "Dr. Evelyn Ross",
    designation: "Chief Cosmetic Dermatologist",
    experience: "14 Years",
    sold: 1240, // Consultations done
    rating: 4.95,
    image: "images/experts/expert-1.webp",
    phone: "+91 98765 43210",
    email: "evelyn@stacklybeauty.com"
  },
  {
    id: 2,
    name: "Aisha Sharma",
    designation: "Senior Organic Formulation Expert",
    experience: "9 Years",
    sold: 840,
    rating: 4.8,
    image: "images/experts/expert-2.webp",
    phone: "+91 98765 43211",
    email: "aisha@stacklybeauty.com"
  },
  {
    id: 3,
    name: "Marcus Vane",
    designation: "Celebrity Makeup Stylist & Art Director",
    experience: "16 Years",
    sold: 1980,
    rating: 4.9,
    image: "images/experts/expert-3.webp",
    phone: "+91 98765 43212",
    email: "marcus@stacklybeauty.com"
  },
  {
    id: 4,
    name: "Sienna Miller",
    designation: "Clinical Esthetician & Skin Coach",
    experience: "8 Years",
    sold: 620,
    rating: 4.75,
    image: "images/experts/expert-4.webp",
    phone: "+91 98765 43213",
    email: "sienna@stacklybeauty.com"
  }
];

const PROPERTIES = [
  {
    id: 1,
    title: "Rose Gold Radiance Elixir Serum",
    type: "Skincare",
    price: "$48.00",
    priceRaw: 48,
    city: "Chanel", // Using 'city' for Brand compatibility
    address: "Best for: Dullness & Fine Lines (All Skin Types)", // Using 'address' for suitability subtext
    beds: 5, // Using 'beds' for Rating out of 5
    baths: 245, // Using 'baths' for Review count
    area: 50, // Using 'area' for Volume in ml
    parking: 1, // Using 'parking' for Vegan (1) or Organic (2) status
    image: "images/products/serum_11zon.webp",
    description: "An ultra-nourishing rose gold elixir that deeply hydrates, brightens, and smooths skin texture. Formulated with pure rose oil extracts, 24k gold flakes, and essential fatty acids to reveal a radiant, youthful complexion.",
    featured: true,
    amenities: ["Vegan", "Cruelty-Free", "Paraben-Free", "Dermatologist Tested", "Rosehip Extract", "24k Gold Flakes"],
    agentId: 1
  },
  {
    id: 2,
    title: "Velvet Matte Luxe Lipstick",
    type: "Makeup",
    price: "$32.00",
    priceRaw: 32,
    city: "Dior",
    address: "Best for: Long-wear Matte Finish (All Lip Types)",
    beds: 4,
    baths: 180,
    area: 4,
    parking: 2,
    image: "images/products/lipstick_11zon.webp",
    description: "A highly pigmented, weightless lipstick that delivers rich matte color with a velvety-smooth finish. Infused with hydrating jojoba oil and vitamin E to prevent dryness while maintaining full, vibrant coverage for up to 12 hours.",
    featured: true,
    amenities: ["Cruelty-Free", "Gluten-Free", "Jojoba Oil", "Vitamin E", "Long-Wear", "High Pigment"],
    agentId: 3
  },
  {
    id: 3,
    title: "Hyaluronic Acid Hydrating Gel Cream",
    type: "Skincare",
    price: "$39.00",
    priceRaw: 39,
    city: "Fenty Beauty",
    address: "Best for: Dryness & Dehydration",
    beds: 5,
    baths: 312,
    area: 75,
    parking: 1,
    image: "images/products/cream_11zon.webp",
    description: "A refreshing, lightweight gel-cream that instantly drenches dry skin with intense hydration. Powered by multi-molecular hyaluronic acid and soothing aloe vera extract to lock in moisture for 72 hours and strengthen the skin barrier.",
    featured: true,
    amenities: ["Vegan", "Cruelty-Free", "Fragrance-Free", "Aloe Vera", "Hyaluronic Acid", "Non-Comedogenic"],
    agentId: 2
  },
  {
    id: 4,
    title: "Perfect Match Soft Focus Foundation",
    type: "Makeup",
    price: "$45.00",
    priceRaw: 45,
    city: "Estée Lauder",
    address: "Best for: Seamless Skin Tone Coverage (Normal to Oily)",
    beds: 4,
    baths: 198,
    area: 30,
    parking: 2,
    image: "images/products/foundation_11zon.webp",
    description: "A medium-to-full buildable foundation that blurs imperfections for a natural, soft-focus finish. Breathable, sweat-resistant, and oil-controlling, it maintains true color accuracy while hydrating with squalane.",
    featured: false,
    amenities: ["Cruelty-Free", "Paraben-Free", "Squalane Infused", "SPF 15", "Sweat-Resistant", "Oil-Control"],
    agentId: 3
  },
  {
    id: 5,
    title: "Golden Argan Silk Hair Mask",
    type: "Haircare",
    price: "$28.00",
    priceRaw: 28,
    city: "L'Oreal Luxe",
    address: "Best for: Damaged & Frizzy Hair (All Hair Types)",
    beds: 5,
    baths: 165,
    area: 200,
    parking: 1,
    image: "images/products/hairmask_11zon.webp",
    description: "An intensive hair repair treatment that restores softness, shine, and elasticity. Fortified with cold-pressed organic argan oil, keratin proteins, and vitamin B5 to deeply condition and repair split ends.",
    featured: true,
    amenities: ["Vegan", "Cruelty-Free", "Sulfate-Free", "Organic Argan Oil", "Keratin", "Vitamin B5"],
    agentId: 4
  },
  {
    id: 6,
    title: "Jasmine Musk Eau De Parfum",
    type: "Fragrance",
    price: "$85.00",
    priceRaw: 85,
    city: "Chanel",
    address: "Best for: Signature Day & Night Wear (Elegant scent)",
    beds: 5,
    baths: 94,
    area: 100,
    parking: 2,
    image: "images/products/perfume_11zon.webp",
    description: "An exquisite fragrance blending fresh Sambac jasmine petals, white musk, and a subtle amber warmth. A long-lasting, sophisticated scent designed for the modern individual seeking timeless elegance.",
    featured: false,
    amenities: ["Cruelty-Free", "Phthalate-Free", "Natural Extracts", "Long-Lasting", "Recyclable Bottle"],
    agentId: 1
  },
  {
    id: 7,
    title: "Vitamin C Brightening Daily Cleanser",
    type: "Skincare",
    price: "$22.00",
    priceRaw: 22,
    city: "Fenty Beauty",
    address: "Best for: Dullness & Dark Spots (All Skin Types)",
    beds: 4,
    baths: 154,
    area: 150,
    parking: 1,
    image: "images/products/cleanser_11zon.webp",
    description: "A gentle exfoliating daily wash that sweeps away impurities while brightening dark spots. Formulated with Kakadu plum extract (rich in Vitamin C) and green tea extracts to protect skin from environmental stress.",
    featured: false,
    amenities: ["Vegan", "Cruelty-Free", "Paraben-Free", "Vitamin C", "Green Tea", "Antioxidant Rich"],
    agentId: 2
  },
  {
    id: 8,
    title: "Retinol Youth Renewal Treatment",
    type: "Skincare",
    price: "$65.00",
    priceRaw: 65,
    city: "Estée Lauder",
    address: "Best for: Anti-Aging & Wrinkles (Mature Skin)",
    beds: 5,
    baths: 88,
    area: 30,
    parking: 1,
    image: "images/products/retinol_11zon.webp",
    description: "A clinical-strength nightly serum containing timed-release retinol to visibly minimize wrinkles, fine lines, and uneven tone. Packed with ceramides and niacinamide to nourish the skin barrier and prevent irritation.",
    featured: false,
    amenities: ["Vegan", "Fragrance-Free", "Retinol", "Ceramides", "Niacinamide", "Dermatologist Tested"],
    agentId: 1
  },
  {
    id: 9,
    title: "Rosewater Botanical Face Toner Mist",
    type: "Skincare",
    price: "$26.00",
    priceRaw: 26,
    city: "Dior",
    address: "Best for: Balancing & Soothing (All Skin Types)",
    beds: 5,
    baths: 120,
    area: 120,
    parking: 1,
    image: "images/products/toner_11zon.webp",
    description: "A refreshing organic rosewater mist that instantly hydrates and balances skin's pH. Infused with soothing witch hazel and aloe vera to refine pores, calm redness, and prep skin for serums.",
    featured: false,
    amenities: ["Vegan", "Cruelty-Free", "Alcohol-Free", "Rosewater", "Witch Hazel", "Aloe Vera"],
    agentId: 2
  }
];

const BLOGS = [
  {
    id: 1,
    title: "How to Build the Perfect Morning Skincare Routine",
    category: "Skincare Science",
    date: "July 12, 2026",
    summary: "Understand the scientific layering rules for cleansers, serums, moisturizers, and sunscreens to maximize efficacy and product absorption.",
    image: "images/blogs/blog-1 (2)_11zon.webp",
    author: "Dr. Evelyn Ross"
  },
  {
    id: 2,
    title: "Choosing the Right Foundation Undertone for Your Skin",
    category: "Makeup Artistry",
    date: "June 28, 2026",
    summary: "Cool, warm, or neutral? Discover professional secrets to identifying your undertone and matching foundation seamlessly under any lighting.",
    image: "images/blogs/blog-2 (2)_11zon.webp",
    author: "Marcus Vane"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Hair Hydration and Argan Oil",
    category: "Haircare Wellness",
    date: "May 15, 2026",
    summary: "Dull, brittle locks? Learn how organic oils penetrate the hair shaft to lock in hydration, reduce frizz, and restore luxury shine.",
    image: "images/blogs/blog-3 (2)_11zon.webp",
    author: "Sienna Miller"
  },
  {
    id: 4,
    title: "The Rise of Vegan Cosmetics & Sustainable Sourcing",
    category: "Eco-Beauty Insights",
    date: "April 20, 2026",
    summary: "Why clean, green formulations are dominating the prestige cosmetics market, and how to verify organic eco-certifications on labels.",
    image: "images/blogs/blog-4_11zon.webp",
    author: "Aisha Sharma"
  }
];

// Helper Functions for Wishlist & Compare
const getWishlist = () => {
  return JSON.parse(localStorage.getItem('stackly_wishlist') || '[]');
};

const toggleWishlist = (id) => {
  let list = getWishlist();
  const index = list.indexOf(id);
  if (index === -1) {
    list.push(id);
  } else {
    list.splice(index, 1);
  }
  localStorage.setItem('stackly_wishlist', JSON.stringify(list));
  return list.includes(id);
};

const getCompareList = () => {
  return JSON.parse(localStorage.getItem('stackly_compare') || '[]');
};

const toggleCompareList = (id) => {
  let list = getCompareList();
  const index = list.indexOf(id);
  if (index === -1) {
    if (list.length >= 4) {
      alert("You can compare up to 4 products at a time.");
      return false;
    }
    list.push(id);
  } else {
    list.splice(index, 1);
  }
  localStorage.setItem('stackly_compare', JSON.stringify(list));
  return list.includes(id);
};

// Global Routing Helper to satisfy button destination requirements
const setupGlobalRouting = () => {
  document.addEventListener('click', (e) => {
    // Intercept clicks on links/buttons
    const target = e.target.closest('a, button');
    if (!target) return;
    
    // Bypass global intercept for submit buttons and auth forms
    if (target.type === 'submit' || target.closest('.auth-form') || target.classList.contains('auth-btn')) {
      return;
    }

    // Bypass global intercept for dashboard tab switching buttons
    if (target.hasAttribute('data-tab')) {
      return;
    }

    const href = target.getAttribute('href');

    // Allow core page navbar & footer links to route normally
    if (href && ['index.html', 'about.html', 'products.html', 'blog.html', 'contact.html'].includes(href)) {
      return;
    }

    // Redirect remaining footer links (socials, categories, legal) to 404.html
    if (target.closest('footer') && target.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      window.location.href = '404.html';
      return;
    }

    const text = target.innerText ? target.innerText.trim().toLowerCase() : '';

    // "Get Started" -> create-account.html
    if (text === 'get started') {
      e.preventDefault();
      window.location.href = 'create-account.html';
      return;
    }
    
    // "Login" -> login.html
    if (text === 'login') {
      e.preventDefault();
      window.location.href = 'login.html';
      return;
    }
    
    // "Logout" -> login.html
    if (text === 'logout') {
      e.preventDefault();
      window.location.href = 'login.html';
      return;
    }
    
    // "Back to Home" -> index.html
    if (text === 'back to home') {
      e.preventDefault();
      window.location.href = 'index.html';
      return;
    }
    
    // Check if the element has explicit redirections in code or matches the 404 block-list:
    const blockList = ['view details', 'contact expert', 'book consult', 'read more', 'explore', 'learn more', 'search', 'schedule consult'];
    if (blockList.some(term => text.includes(term))) {
      e.preventDefault();
      // If it's a view details link, let the href handle it or fall back
      if (href && (href.startsWith('product-details.html') || href.startsWith('about.html') || href.startsWith('contact.html') || href.startsWith('user-dashboard.html'))) {
        window.location.href = href;
      } else {
        window.location.href = '404.html';
      }
      return;
    }
    
    // If it's a 404 placeholder href
    if (href === '404.html') {
      e.preventDefault();
      window.location.href = '404.html';
    }
  });
};
