// ==========================================================================
// SAMADHAN SETU — Featured Challenges Preview Component (Phase 1 & 2)
// "Problems Around Us. Solutions Within Us."
// ==========================================================================

function renderFeaturedSection() {
  const featuredList = ACTIVE_CHALLENGES.slice(0, 6);

  return `
    <section class="py-20 bg-white border-t border-[#EAE3D9] relative overflow-hidden" id="featured-challenges">
      
      <!-- Subtle top decorative tribal geometric ribbon -->
      <div class="tribal-border-top h-1 w-full"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-widest text-[#C25E30] bg-[#FAF2ED] px-3.5 py-1 rounded-full border border-[#E8D0C3]">
                Democratizing Problem Crowdsourcing
              </span>
              <span class="text-xs font-semibold text-[#64748B] hidden sm:inline">(Realistic SIH Demo Data)</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#1C2421] font-heading">
              Problems Around Us. Solutions Within Us.
            </h2>
            <p class="text-base text-[#64748B] font-normal leading-relaxed">
              Real societal challenges identified by rural citizens and local facilitators. Explore active problems awaiting multidisciplinary student & institutional solutions.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <a href="#raise-problem" class="btn-primary-setu px-4 py-2.5 text-sm flex items-center gap-1.5 shadow-sm">
              <i data-lucide="plus-circle" class="w-4 h-4"></i>
              <span>Raise a Problem</span>
            </a>
            <a href="#explore" class="btn-secondary-setu px-4 py-2.5 text-sm flex items-center gap-1.5">
              <span>View All (${ACTIVE_CHALLENGES.length})</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>
        </div>

        <!-- Challenges 3-Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${featuredList.map(challenge => renderChallengeCard(challenge)).join('')}
        </div>

        <!-- Bottom Informational Bar -->
        <div class="mt-12 text-center">
          <p class="text-xs text-[#94A3B8] font-medium flex items-center justify-center gap-2">
            <i data-lucide="info" class="w-4 h-4 text-[#C25E30]"></i>
            <span>Do you have a different community problem to report? All verified submissions are matched with university hackathon teams.</span>
          </p>
        </div>

      </div>
    </section>
  `;
}

function renderChallengeCard(challenge) {
  const isUpvoted = challenge.isSupportedByUser;
  const supporterCount = challenge.supportersCount || 12;

  // Category-specific fallback imagery
  const categoryImages = {
    "healthcare": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
    "education": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
    "employment": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
    "environment": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=80",
    "agriculture": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
    "infrastructure": "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
    "rural-development": "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?w=800&auto=format&fit=crop&q=80"
  };

  const cardImage = challenge.image || categoryImages[challenge.category] || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80";

  let statusClass = "bg-amber-100 text-amber-800 border-amber-200";
  if (challenge.stageIndex >= 6) {
    statusClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
  } else if (challenge.stageIndex >= 4) {
    statusClass = "bg-sky-100 text-sky-800 border-sky-200";
  }

  return `
    <div class="bg-[#FAF8F5] border border-[#E6DED2] rounded-2xl overflow-hidden shadow-xs card-hover-lift flex flex-col justify-between transition-all duration-200 hover:border-[#C25E30] group">
      
      <!-- Card Image & Status Ribbon -->
      <div class="relative h-48 w-full overflow-hidden bg-gray-200">
        <img src="${cardImage}" 
             alt="${challenge.title}" 
             loading="lazy"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
             onerror="this.src='https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80'" />
        
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        <!-- Category Badge (Top Left) -->
        <div class="absolute top-3 left-3">
          <span class="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-[#1C2421] shadow-xs backdrop-blur-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C25E30]"></span>
            ${challenge.categoryName || challenge.category}
          </span>
        </div>

        <!-- Status Badge (Top Right) -->
        <div class="absolute top-3 right-3">
          <span class="inline-block text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs border ${statusClass}">
            ${challenge.status || 'Active Challenge'}
          </span>
        </div>

        <!-- Location Stamp (Bottom Left over image) -->
        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span class="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px]">
            <i data-lucide="map-pin" class="w-3 h-3 text-[#D97706]"></i>
            <span class="truncate max-w-[170px]">${challenge.location}</span>
          </span>
          <span class="text-[11px] text-white/90 font-mono">${challenge.datePosted || 'Active'}</span>
        </div>
      </div>

      <!-- Card Body Content -->
      <div class="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <span class="text-[11px] font-mono font-bold text-[#C25E30] bg-[#FAF2ED] px-2 py-0.5 rounded border border-[#E8D0C3]">${challenge.id}</span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded border ${
              challenge.urgency === 'Critical' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-orange-50 text-orange-800 border-orange-200'
            }">
              ${challenge.urgency} Urgency
            </span>
          </div>

          <h3 class="text-base font-bold text-[#1C2421] font-heading line-clamp-2 mb-2.5 group-hover:text-[#C25E30] transition-colors leading-snug">
            ${challenge.title}
          </h3>
          
          <p class="text-xs text-[#64748B] line-clamp-3 leading-relaxed mb-4">
            ${challenge.shortDescription || challenge.fullDescription}
          </p>

          <!-- Affected Population Snippet -->
          <div class="bg-white/80 border border-[#EAE3D9] rounded-lg p-2.5 mb-4 flex items-center gap-2 text-xs text-[#475569]">
            <i data-lucide="users" class="w-4 h-4 text-[#24543D] shrink-0"></i>
            <span class="font-medium truncate">Impact: <strong class="text-[#1C2421]">${challenge.affectedPopulation || 'Local Villagers'}</strong></span>
          </div>
        </div>

        <!-- Card Footer: Supporter Count & View Details Button -->
        <div class="pt-4 border-t border-[#EAE3D9] flex items-center justify-between gap-3">
          
          <!-- Supporter Upvote Button -->
          <button onclick="handleUpvote('${challenge.id}', event)" 
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isUpvoted 
                      ? 'bg-[#C25E30] text-white' 
                      : 'bg-white text-[#475569] border border-[#E5DFD7] hover:border-[#C25E30] hover:text-[#C25E30]'
                  }"
                  title="Support this community problem">
            <i data-lucide="thumbs-up" class="w-3.5 h-3.5 ${isUpvoted ? 'fill-current' : ''}"></i>
            <span>${supporterCount}</span>
          </button>

          <!-- View Details Button (Phase 2) -->
          <a href="#problem-details?id=${challenge.id}" 
             class="btn-secondary-setu px-3.5 py-1.5 text-xs flex items-center gap-1 font-semibold group/btn">
            <span>View Details</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform"></i>
          </a>

        </div>
      </div>

    </div>
  `;
}
