// Wishlist & Products Comparison Pages Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- Wishlist Page Rendering ---
  const wishlistGrid = document.getElementById('wishlist-grid');

  const renderWishlist = () => {
    if (!wishlistGrid) return;
    wishlistGrid.innerHTML = '';

    const savedIds = getWishlist();
    const wishlistData = PROPERTIES.filter(p => savedIds.includes(p.id));

    if (wishlistData.length === 0) {
      wishlistGrid.innerHTML = `
        <div class="wishlist-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem;">
          <svg viewBox="0 0 24 24" style="width:64px;height:64px;fill:var(--accent);margin-bottom:1rem;"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          <h3>Your Wishlist is Empty</h3>
          <p>Explore our catalog of premium luxury beauty cosmetics and save your favorites.</p>
          <a href="products.html" class="btn btn-primary" style="margin-top: var(--spacing-md)">Browse Products</a>
        </div>
      `;
      return;
    }

    wishlistData.forEach(p => {
      const card = document.createElement('div');
      card.className = `glass-card property-card reveal reveal-up reveal-visible`;
      
      card.innerHTML = `
        <div class="property-card-img-wrapper">
          <img class="property-card-img" src="${p.image}" alt="${p.title}" loading="lazy">
          <span class="property-card-price">${p.price}</span>
          <div class="property-card-actions">
            <button class="property-action-btn fav-btn active" data-id="${p.id}" aria-label="Remove from Wishlist">
              <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
          </div>
        </div>
        <div class="property-card-content">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span class="property-card-tag">${p.type}</span>
            <span style="font-size:0.8rem;color:var(--secondary);font-weight:600;">${p.city}</span>
          </div>
          <h3 class="property-card-title">${p.title}</h3>
          <div class="property-card-address">${p.address}</div>
          <div class="property-card-footer">
            <a href="product-details.html?id=${p.id}" class="btn btn-outline-gold btn-sm">View Details</a>
          </div>
        </div>
      `;
      
      // Heart toggle (removes immediately and animates refilter)
      card.querySelector('.fav-btn').addEventListener('click', (e) => {
        e.preventDefault();
        toggleWishlist(p.id);
        card.style.opacity = 0;
        card.style.transform = 'scale(0.9)';
        setTimeout(renderWishlist, 300);
      });

      wishlistGrid.appendChild(card);
    });
  };

  // --- Comparison Matrix Rendering ---
  const compareTableBody = document.getElementById('compare-table-body');
  const compareContainer = document.getElementById('compare-container');

  const renderComparison = () => {
    if (!compareTableBody) return;
    compareTableBody.innerHTML = '';

    const savedIds = getCompareList();
    const compareData = PROPERTIES.filter(p => savedIds.includes(p.id));

    if (compareData.length === 0) {
      if (compareContainer) {
        compareContainer.innerHTML = `
          <div class="wishlist-empty-state" style="text-align: center; padding: 3rem 1.5rem;">
            <svg viewBox="0 0 24 24" style="width:64px;height:64px;fill:var(--accent);margin-bottom:1rem;"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/></svg>
            <h3>No Products to Compare</h3>
            <p>Select the comparison icon on multiple items in the catalog to compare formulations, ingredients, and sizing.</p>
            <a href="products.html" class="btn btn-primary" style="margin-top: var(--spacing-md)">Browse Products</a>
          </div>
        `;
      }
      return;
    }

    // Build Table Rows
    // Row 1: Image & Title Header
    const rowHeader = document.createElement('tr');
    rowHeader.innerHTML = `<th>Product Info</th>`;
    compareData.forEach(p => {
      rowHeader.innerHTML += `
        <td>
          <div class="compare-property-header" style="text-align: center; padding: 1rem 0.5rem;">
            <img class="compare-property-img" src="${p.image}" alt="${p.title}" loading="lazy" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 0.5rem;">
            <h4 class="compare-property-title" style="font-size: 0.95rem; margin-bottom: 0.25rem;">${p.title}</h4>
            <span class="compare-property-price" style="color: var(--secondary); font-weight: 700;">${p.price}</span>
            <br>
            <button class="compare-remove-btn" data-id="${p.id}" style="background: transparent; border: none; color: var(--accent); cursor: pointer; display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.8rem; margin-top: 0.5rem;">
              <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: var(--accent);"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              Remove
            </button>
          </div>
        </td>
      `;
    });
    compareTableBody.appendChild(rowHeader);

    // Row 2: Brand
    const rowLocation = document.createElement('tr');
    rowLocation.innerHTML = `<th>Brand</th>`;
    compareData.forEach(p => {
      rowLocation.innerHTML += `<td>${p.city}</td>`;
    });
    compareTableBody.appendChild(rowLocation);

    // Row 3: Product Category
    const rowType = document.createElement('tr');
    rowType.innerHTML = `<th>Category</th>`;
    compareData.forEach(p => {
      rowType.innerHTML += `<td>${p.type}</td>`;
    });
    compareTableBody.appendChild(rowType);

    // Row 4: Rating
    const rowBeds = document.createElement('tr');
    rowBeds.className = 'compare-highlight-row';
    rowBeds.innerHTML = `<th>Rating</th>`;
    compareData.forEach(p => {
      let stars = '★'.repeat(p.beds) + '☆'.repeat(5 - p.beds);
      rowBeds.innerHTML += `<td>${stars} (${p.beds}/5)</td>`;
    });
    compareTableBody.appendChild(rowBeds);

    // Row 5: Verified Reviews Count
    const rowBaths = document.createElement('tr');
    rowBaths.className = 'compare-highlight-row';
    rowBaths.innerHTML = `<th>Reviews</th>`;
    compareData.forEach(p => {
      rowBaths.innerHTML += `<td>${p.baths} Reviews</td>`;
    });
    compareTableBody.appendChild(rowBaths);

    // Row 6: Size / Volume
    const rowArea = document.createElement('tr');
    rowArea.innerHTML = `<th>Volume</th>`;
    compareData.forEach(p => {
      rowArea.innerHTML += `<td>${p.area} ml</td>`;
    });
    compareTableBody.appendChild(rowArea);

    // Row 7: Suitability / Focus
    const rowParking = document.createElement('tr');
    rowParking.innerHTML = `<th>Key Claims</th>`;
    compareData.forEach(p => {
      rowParking.innerHTML += `<td>${p.parking === 1 ? '100% Vegan' : 'All Organic'}</td>`;
    });
    compareTableBody.appendChild(rowParking);

    // Row 8: Key Benefits & Ingredients
    const rowAmenities = document.createElement('tr');
    rowAmenities.innerHTML = `<th>Highlights</th>`;
    compareData.forEach(p => {
      let amenitiesMarkup = '<ul class="compare-amenities-list" style="list-style: none; padding: 0; font-size: 0.85rem;">';
      p.amenities.slice(0, 4).forEach(a => {
        amenitiesMarkup += `
          <li style="display: flex; align-items: center; gap: 0.25rem; margin-bottom: 0.25rem;">
            <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: var(--accent); flex-shrink: 0;"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
            ${a}
          </li>
        `;
      });
      amenitiesMarkup += '</ul>';
      rowAmenities.innerHTML += `<td>${amenitiesMarkup}</td>`;
    });
    compareTableBody.appendChild(rowAmenities);

    // Row 9: Actions to details
    const rowAction = document.createElement('tr');
    rowAction.innerHTML = `<th>Buy Details</th>`;
    compareData.forEach(p => {
      rowAction.innerHTML += `
        <td>
          <a href="product-details.html?id=${p.id}" class="btn btn-outline-gold btn-sm btn-shimmer" style="width: 100%;">View Product</a>
        </td>
      `;
    });
    compareTableBody.appendChild(rowAction);

    // Bind remove button actions
    document.querySelectorAll('.compare-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        toggleCompareList(id);
        renderComparison();
      });
    });
  };

  // Initial runs
  renderWishlist();
  renderComparison();
});
