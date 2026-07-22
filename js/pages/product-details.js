// Product Details Page Logic

document.addEventListener('DOMContentLoaded', () => {
  // Extract product ID from URL query
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'), 10) || 1; // Default to ID 1

  // Load Product Details from mock database
  const product = PROPERTIES.find(p => p.id === productId) || PROPERTIES[0];

  // Populate Details
  const titleEl = document.getElementById('details-title');
  const priceEl = document.getElementById('details-price');
  const typeEl = document.getElementById('details-type');
  const cityEl = document.getElementById('details-city'); // Brand
  const addressEl = document.getElementById('details-address'); // Suitability
  const descEl = document.getElementById('details-description');
  const bedsEl = document.getElementById('details-beds'); // Rating
  const bathsEl = document.getElementById('details-baths'); // Reviews
  const areaEl = document.getElementById('details-area'); // Volume
  const parkingEl = document.getElementById('details-parking'); // Vegan/Organic
  const mainImgEl = document.getElementById('gallery-main-img');
  const thumbsContainer = document.getElementById('gallery-thumbnails');
  const amenitiesContainer = document.getElementById('amenities-grid');

  if (titleEl) titleEl.innerText = product.title;
  if (priceEl) priceEl.innerText = product.price;
  if (typeEl) typeEl.innerText = product.type;
  if (cityEl) cityEl.innerText = product.city; // Brand
  if (addressEl) addressEl.innerText = product.address; // Suitability
  if (descEl) descEl.innerText = product.description;
  
  if (bedsEl) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += i <= product.beds ? '★' : '☆';
    }
    bedsEl.innerText = `${starsHtml} (${product.beds}/5)`;
  }
  if (bathsEl) bathsEl.innerText = `${product.baths} Verified Reviews`;
  if (areaEl) areaEl.innerText = `${product.area} ml`;
  if (parkingEl) parkingEl.innerText = product.parking === 1 ? '100% Vegan Product' : 'All Organic Ingredients';

  // Set up Gallery Images
  if (mainImgEl) {
    mainImgEl.src = product.image;
    mainImgEl.alt = product.title;
  }

  // Generate dynamic thumbnails
  if (thumbsContainer) {
    thumbsContainer.innerHTML = '';
    
    // Generate 4 thumbnails (using product image and other products as variations)
    const gallerySrcs = [
      product.image,
      "images/products/serum_11zon.webp",
      "images/products/lipstick_11zon.webp",
      "images/products/cream_11zon.webp"
    ];

    gallerySrcs.forEach((src, index) => {
      const thumb = document.createElement('div');
      thumb.className = `gallery-thumb ${index === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${src}" alt="Thumbnail ${index + 1}">`;
      
      thumb.addEventListener('click', () => {
        // Remove active class from all
        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        // Add active class to this
        thumb.classList.add('active');
        // Update main image path
        if (mainImgEl) mainImgEl.src = src;
      });
      thumbsContainer.appendChild(thumb);
    });
  }

  // Populate Amenities (Ingredients/Key Benefits)
  if (amenitiesContainer && product.amenities) {
    amenitiesContainer.innerHTML = '';
    product.amenities.forEach(amenity => {
      const item = document.createElement('div');
      item.className = 'amenity-item';
      item.innerHTML = `
        <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: var(--accent); margin-right: 8px;"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
        <span>${amenity}</span>
      `;
      amenitiesContainer.appendChild(item);
    });
  }

  // --- Gallery Fullscreen Lightbox Modal ---
  if (mainImgEl) {
    mainImgEl.style.cursor = 'zoom-in';
    mainImgEl.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.id = 'gallery-lightbox';
      lightbox.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(31, 19, 17, 0.95); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; cursor: zoom-out;
      `;
      
      const img = document.createElement('img');
      img.src = mainImgEl.src;
      img.style.cssText = `max-width: 90%; max-height: 90%; object-fit: contain; border-radius: var(--radius-md); box-shadow: var(--shadow-lg);`;
      
      lightbox.appendChild(img);
      document.body.appendChild(lightbox);
      
      lightbox.addEventListener('click', () => {
        lightbox.remove();
      });
    });
  }

  // --- Routine Budget Estimator ---
  const sliderPrice = document.getElementById('mortgage-price'); // Routine value
  const sliderDown = document.getElementById('mortgage-down'); // Loyalty Discount
  const sliderRate = document.getElementById('mortgage-rate'); // Frequency multiplier (times per day)
  const sliderTerm = document.getElementById('mortgage-term'); // Product Lifespan (days)

  const lblPrice = document.getElementById('lbl-mortgage-price');
  const lblDown = document.getElementById('lbl-mortgage-down');
  const lblRate = document.getElementById('lbl-mortgage-rate');
  const lblTerm = document.getElementById('lbl-mortgage-term');
  const outputPrice = document.getElementById('mortgage-payment-output');

  // Set Initial Slider Price from Product
  if (sliderPrice && product.priceRaw) {
    sliderPrice.value = product.priceRaw;
    sliderPrice.max = product.priceRaw * 2;
    sliderPrice.min = 10;
    // Set discount max to product price
    if (sliderDown) {
      sliderDown.max = product.priceRaw;
      sliderDown.value = Math.floor(product.priceRaw * 0.1); // 10% loyalty discount
    }
  }

  const calculateDailyCost = () => {
    if (!sliderPrice || !sliderDown || !sliderRate || !sliderTerm || !outputPrice) return;

    const P_raw = parseInt(sliderPrice.value, 10);
    const D_raw = parseInt(sliderDown.value, 10);
    const Frequency = parseFloat(sliderRate.value); // times per day
    const Lifespan = parseInt(sliderTerm.value, 10); // days

    // Update labels
    if (lblPrice) lblPrice.innerText = `$${P_raw.toLocaleString()}`;
    if (lblDown) lblDown.innerText = `$${D_raw.toLocaleString()}`;
    if (lblRate) lblRate.innerText = `${Frequency}x daily`;
    if (lblTerm) lblTerm.innerText = `${Lifespan} Days`;

    const netCost = P_raw - D_raw;
    if (netCost <= 0) {
      outputPrice.innerText = "$0.00 / day";
      return;
    }

    // Daily Cost = (Net Cost / Lifespan) * Frequency
    const dailyCost = (netCost / Lifespan) * Frequency;
    
    outputPrice.innerText = `$${dailyCost.toFixed(2)} / day`;
  };

  // Add inputs listener
  [sliderPrice, sliderDown, sliderRate, sliderTerm].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', calculateDailyCost);
    }
  });

  calculateDailyCost(); // Initial calculation

  // --- Schedule Consult Form Actions ---
  const bookingForm = document.getElementById('visit-schedule-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const date = document.getElementById('visit-date').value;
      const time = document.getElementById('visit-time').value;
      const name = document.getElementById('visit-name').value;
      const email = document.getElementById('visit-email').value;
      
      if (!date || !time || !name || !email) {
        alert("Please populate all fields to submit.");
        return;
      }
      
      alert(`Consultation successfully requested for ${date} at ${time}. One of our beauty experts will contact you shortly.`);
      // Redirect to 404 per navigation rules
      window.location.href = '404.html';
    });
  }

  // --- Render Sidebar Expert Card ---
  const sidebarAgent = AGENTS.find(a => a.id === product.agentId) || AGENTS[0];
  const agentAvatar = document.getElementById('agent-avatar');
  const agentName = document.getElementById('agent-name');
  const agentDesignation = document.getElementById('agent-designation');
  const agentExperience = document.getElementById('agent-experience');
  const agentSold = document.getElementById('agent-sold');

  if (agentAvatar) agentAvatar.src = sidebarAgent.image;
  if (agentName) agentName.innerText = sidebarAgent.name;
  if (agentDesignation) agentDesignation.innerText = sidebarAgent.designation;
  if (agentExperience) agentExperience.innerText = sidebarAgent.experience;
  if (agentSold) agentSold.innerText = `${sidebarAgent.sold}+ Consultations`;

  // --- Similar Products Recommendations ---
  const similarGrid = document.getElementById('similar-properties-grid');
  if (similarGrid) {
    similarGrid.innerHTML = '';
    // Select 3 products (excluding current)
    const similarList = PROPERTIES.filter(p => p.id !== product.id).slice(0, 3);
    
    similarList.forEach(p => {
      const card = document.createElement('div');
      card.className = 'glass-card property-card';
      card.innerHTML = `
        <div class="property-card-img-wrapper">
          <img class="property-card-img" src="${p.image}" alt="${p.title}" loading="lazy">
          <span class="property-card-price">${p.price}</span>
        </div>
        <div class="property-card-content">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span class="property-card-tag">${p.type}</span>
            <span style="font-size:0.8rem;color:var(--secondary);font-weight:600;">${p.city}</span>
          </div>
          <h4 class="property-card-title">${p.title}</h4>
          <p class="property-card-address">${p.address}</p>
          <div class="property-card-footer">
            <a href="product-details.html?id=${p.id}" class="btn btn-outline-gold btn-sm btn-shimmer">View Details</a>
          </div>
        </div>
      `;
      similarGrid.appendChild(card);
    });
  }
});
