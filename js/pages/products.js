// Products Listing Catalog Page Logic

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const propertiesGrid = document.getElementById('properties-catalog-grid');
  const resultsCountEl = document.getElementById('results-count');
  const sortSelect = document.getElementById('sort-select');
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewListBtn = document.getElementById('view-list-btn');
  
  // Filter Inputs
  const searchInput = document.getElementById('filter-search');
  const citySelect = document.getElementById('filter-city'); // Brand
  const typeSelect = document.getElementById('filter-type'); // Category
  const bedsSelect = document.getElementById('filter-beds'); // Rating
  const priceSlider = document.getElementById('filter-price');
  const priceVal = document.getElementById('price-val');
  const areaSlider = document.getElementById('filter-area'); // Volume
  const areaVal = document.getElementById('area-val');

  // Compare Bar Elements
  const compareBar = document.getElementById('compare-bar');
  const compareCountEl = document.getElementById('compare-count');

  // Catalog State
  let currentFilters = {
    search: '',
    city: '', // Brand
    type: '', // Category
    beds: '', // Rating
    priceMax: 100,
    areaMax: 250 // Volume max (ml)
  };
  let currentSort = 'featured';
  let viewMode = 'grid'; // 'grid' or 'list'

  // Initialize Filters from URL params
  const initFiltersFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('type')) {
      currentFilters.type = params.get('type');
      if (typeSelect) typeSelect.value = currentFilters.type;
    }
    if (params.has('brand')) {
      currentFilters.city = params.get('brand');
      if (citySelect) citySelect.value = currentFilters.city;
    }
    if (params.has('concern')) {
      currentFilters.search = params.get('concern');
      if (searchInput) searchInput.value = currentFilters.search;
    }
    if (params.has('price')) {
      currentFilters.priceMax = parseInt(params.get('price'), 10);
      if (priceSlider) {
        priceSlider.value = currentFilters.priceMax;
        if (priceVal) priceVal.innerText = `$${currentFilters.priceMax}`;
      }
    }
  };

  // Render Skeleton Loader
  const renderSkeletons = () => {
    if (!propertiesGrid) return;
    propertiesGrid.innerHTML = '';
    const count = viewMode === 'grid' ? 6 : 3;
    for (let i = 0; i < count; i++) {
      propertiesGrid.innerHTML += `
        <div class="shimmer-card">
          <div class="shimmer-img shimmer-placeholder"></div>
          <div class="shimmer-text shimmer-title shimmer-placeholder"></div>
          <div class="shimmer-text shimmer-desc shimmer-placeholder"></div>
          <div class="shimmer-text shimmer-meta shimmer-placeholder"></div>
        </div>
      `;
    }
  };

  // Render Product Card Markup
  const renderPropertiesList = (filteredData) => {
    if (!propertiesGrid) return;
    propertiesGrid.innerHTML = '';
    
    if (filteredData.length === 0) {
      propertiesGrid.innerHTML = `
        <div class="wishlist-empty-state" style="grid-column: 1 / -1;">
          <svg viewBox="0 0 24 24" style="width:64px;height:64px;fill:var(--accent);"><path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Zm0-12a1,1,0,1,0,1,1A1,1,0,0,0,12,8Zm1,8a1,1,0,0,0-2,0v-4a1,1,0,0,0,2,0Z"/></svg>
          <h3>No Products Found</h3>
          <p>Try adjusting your filters or search keywords.</p>
        </div>
      `;
      if (resultsCountEl) resultsCountEl.innerText = '0 Products Found';
      return;
    }

    if (resultsCountEl) {
      resultsCountEl.innerText = `${filteredData.length} ${filteredData.length === 1 ? 'Product' : 'Products'} Found`;
    }

    const wishlist = getWishlist();
    const compareList = getCompareList();

    filteredData.forEach(p => {
      const isWishlisted = wishlist.includes(p.id);
      const isCompared = compareList.includes(p.id);
      
      const card = document.createElement('div');
      card.className = `glass-card property-card reveal reveal-up reveal-visible`;
      
      // Star rating builder
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= p.beds) {
          starsHtml += '<span class="star">★</span>';
        } else {
          starsHtml += '<span class="star-empty">☆</span>';
        }
      }

      card.innerHTML = `
        <div class="property-card-img-wrapper">
          <img class="property-card-img" src="${p.image}" alt="${p.title}" loading="lazy">
          <span class="property-badge">${p.featured ? 'Best Seller' : 'New Arrival'}</span>
          <span class="property-card-price">${p.price}</span>
          
          <div class="property-card-actions">
            <button class="property-action-btn fav-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}" aria-label="Add to Wishlist">
              <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
            <button class="property-action-btn compare-btn ${isCompared ? 'compare-active' : ''}" data-id="${p.id}" aria-label="Add to Compare">
              <svg viewBox="0 0 24 24"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/></svg>
            </button>
          </div>
        </div>
        
        <div class="property-card-content">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span class="property-card-tag">${p.type}</span>
            <span class="property-card-brand">${p.city}</span>
          </div>
          <h3 class="property-card-title">${p.title}</h3>
          <p class="property-card-address">${p.address}</p>
          
          <div class="property-card-features">
            <div class="property-feature-item">
              <span class="stars-display">${starsHtml}</span>
              <span>(${p.baths})</span>
            </div>
            <div class="property-feature-item">
              <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>
              <span>${p.area} ml</span>
            </div>
            <div class="property-feature-item">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              <span>${p.parking === 1 ? 'Vegan' : 'Organic'}</span>
            </div>
          </div>
          
          <div class="property-card-footer">
            <a href="product-details.html?id=${p.id}" class="btn btn-outline-gold btn-sm btn-shimmer view-details-link">View Details</a>
          </div>
        </div>
      `;
      propertiesGrid.appendChild(card);
    });

    // Rebind micro-interactions
    bindCardActions();
  };

  // Bind click handlers to Favorite & Compare buttons inside cards
  const bindCardActions = () => {
    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const isActive = toggleWishlist(id);
        btn.classList.toggle('active', isActive);
      });
    });

    document.querySelectorAll('.compare-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const isCompared = toggleCompareList(id);
        btn.classList.toggle('compare-active', isCompared);
        updateCompareBar();
      });
    });
  };

  // Compare Bar controller
  const updateCompareBar = () => {
    if (!compareBar || !compareCountEl) return;
    const compareList = getCompareList();
    const count = compareList.length;
    
    if (count > 0) {
      compareCountEl.innerText = `${count} ${count === 1 ? 'product' : 'products'} selected`;
      compareBar.classList.add('show');
    } else {
      compareBar.classList.remove('show');
    }
  };

  // Pipeline Filter Logic
  const applyFilters = () => {
    renderSkeletons();
    
    setTimeout(() => {
      let filtered = PROPERTIES.filter(p => {
        // Keyword Search (Matches Title, Brand, Concern/Description)
        const matchesSearch = currentFilters.search === '' || 
          p.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
          p.address.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(currentFilters.search.toLowerCase());

        // Dropdown options
        const matchesCity = currentFilters.city === '' || p.city.toLowerCase() === currentFilters.city.toLowerCase();
        const matchesType = currentFilters.type === '' || p.type.toLowerCase() === currentFilters.type.toLowerCase();
        
        // Rating filter
        let matchesBeds = true;
        if (currentFilters.beds !== '') {
          const ratingNum = parseInt(currentFilters.beds, 10);
          matchesBeds = p.beds >= ratingNum;
        }

        // Numerical sliders
        const matchesPrice = p.priceRaw <= currentFilters.priceMax;
        const matchesArea = p.area <= currentFilters.areaMax;

        return matchesSearch && matchesCity && matchesType && matchesBeds && matchesPrice && matchesArea;
      });

      // Sorting
      if (currentSort === 'price-asc') {
        filtered.sort((a, b) => a.priceRaw - b.priceRaw);
      } else if (currentSort === 'price-desc') {
        filtered.sort((a, b) => b.priceRaw - a.priceRaw);
      } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.beds - a.beds);
      } else {
        // Default "Featured" or Date sort (here featured first)
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }

      renderPropertiesList(filtered);
    }, 400); // Small delay to show shimmer skeleton effect
  };

  // Event Listeners for filters
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilters.search = e.target.value;
      applyFilters();
    });
  }
  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      currentFilters.city = e.target.value;
      applyFilters();
    });
  }
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      currentFilters.type = e.target.value;
      applyFilters();
    });
  }
  if (bedsSelect) {
    bedsSelect.addEventListener('change', (e) => {
      currentFilters.beds = e.target.value;
      applyFilters();
    });
  }

  // Price slider formatting
  if (priceSlider && priceVal) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      currentFilters.priceMax = val;
      priceVal.innerText = `$${val}`;
      applyFilters();
    });
  }

  // Area slider formatting
  if (areaSlider && areaVal) {
    areaSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      currentFilters.areaMax = val;
      areaVal.innerText = `${val} ml`;
      applyFilters();
    });
  }

  // Sorting Selector
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }

  // Grid/List toggles
  if (viewGridBtn && viewListBtn) {
    viewGridBtn.addEventListener('click', () => {
      viewMode = 'grid';
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      if (propertiesGrid) {
        propertiesGrid.classList.remove('list-view');
      }
      applyFilters();
    });

    viewListBtn.addEventListener('click', () => {
      viewMode = 'list';
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      if (propertiesGrid) {
        propertiesGrid.classList.add('list-view');
      }
      applyFilters();
    });
  }

  // Clear Compare Bar lists on load
  const compareClearBtn = document.getElementById('compare-clear-btn');
  if (compareClearBtn) {
    compareClearBtn.addEventListener('click', () => {
      localStorage.setItem('stackly_compare', JSON.stringify([]));
      document.querySelectorAll('.compare-btn').forEach(btn => {
        btn.classList.remove('compare-active');
      });
      updateCompareBar();
    });
  }

  // Run initial calculations
  initFiltersFromUrl();
  applyFilters();
  updateCompareBar();
});
