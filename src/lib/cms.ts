// CMS Content Types
export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt?: string;
}

export interface HeroContent {
  tagline: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  media: MediaItem;
}

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  alt?: string;
}

export interface GalleryContent {
  tagline: string;
  title: string;
  titleHighlight: string;
  items: GalleryItem[];
}

export interface ServiceItem {
  title: string;
  subtitle: string;
  description: string;
  media: MediaItem;
}

export interface ServicesContent {
  tagline: string;
  title: string;
  titleHighlight: string;
  items: ServiceItem[];
}

// =============================================================================
// CMS Configuration
// =============================================================================

/** CMS content is served from /public/content */
const CMS_BASE_PATH = "/content";

/** Valid media path prefixes for security */
const VALID_MEDIA_PREFIXES = ["/uploads/", "/Images/", "https://", "http://"] as const;

// =============================================================================
// CMS Content Fetching
// =============================================================================

/** Cache for fetched content to avoid redundant requests */
const contentCache: Record<string, unknown> = {};

/**
 * Fetch CMS content from JSON file
 * @param contentFile - Name of the content file (without .json extension)
 * @returns Parsed content or null if fetch fails
 */
export async function fetchContent<T>(contentFile: string): Promise<T | null> {
  // Return cached content if available
  if (contentCache[contentFile]) {
    return contentCache[contentFile] as T;
  }

  try {
    const url = `${CMS_BASE_PATH}/${contentFile}.json`;
    const response = await fetch(url, {
      cache: "no-cache", // Always get fresh content from CMS
    });

    if (!response.ok) {
      console.warn(`[CMS] Content not found: ${contentFile} (${response.status})`);
      return null;
    }

    const data = await response.json();
    
    // Validate that we got an object
    if (!data || typeof data !== "object") {
      console.warn(`[CMS] Invalid content format: ${contentFile}`);
      return null;
    }

    contentCache[contentFile] = data;
    return data as T;
  } catch (error) {
    // Only log warning, never throw - components will use fallbacks
    console.warn(`[CMS] Failed to fetch: ${contentFile}`);
    return null;
  }
}

// =============================================================================
// Media Path Validation
// =============================================================================

/**
 * Validate media path to ensure it's from an allowed source
 * Prevents arbitrary file access and ensures security
 */
export function isValidMediaPath(src: unknown): boolean {
  if (!src || typeof src !== "string" || src.trim() === "") {
    return false;
  }

  return VALID_MEDIA_PREFIXES.some((prefix) => src.startsWith(prefix));
}

/**
 * Get validated media source or return fallback
 * @param src - Media source to validate
 * @param fallback - Fallback URL if source is invalid
 */
export function getValidMediaSrc(src: string, fallback: string = ""): string {
  return isValidMediaPath(src) ? src : fallback;
}

// =============================================================================
// Default Content (Fallbacks)
// =============================================================================

/** Default hero content when CMS is unavailable */
export function getHeroContent(): HeroContent {
  return {
    tagline: "Indore's Most Trusted Salon Since 2014",
    title: "THE BARBER",
    titleHighlight: "SHOP",
    description: "5,000+ clients trust us for a reason. Expert cuts, premium facials, zero compromise. Your look, perfected.",
    primaryButtonText: "Book Now",
    primaryButtonLink: "#booking",
    secondaryButtonText: "See What We Do",
    secondaryButtonLink: "#services",
    media: {
      type: "video",
      src: "/uploads/hero-video.mp4",
      alt: "The Barber Shop Hero"
    }
  };
}

/** Default gallery content when CMS is unavailable */
export function getGalleryContent(): GalleryContent {
  return {
    tagline: "See The Results",
    title: "Real",
    titleHighlight: "Work",
    items: [
      { type: "image", src: "/Images/BarberShop-img/img-1.jpg", alt: "Haircut transformation 1" },
      { type: "image", src: "/Images/BarberShop-img/img-2.jpg", alt: "Haircut transformation 2" },
      { type: "image", src: "/Images/BarberShop-img/img-3.jpg", alt: "Haircut transformation 3" },
      { type: "image", src: "/Images/BarberShop-img/img-4.jpg", alt: "Haircut transformation 4" },
    ]
  };
}

/** Default services content when CMS is unavailable */
export function getServicesContent(): ServicesContent {
  return {
    tagline: "What We Do Best",
    title: "Pick Your",
    titleHighlight: "Service",
    items: [
      {
        title: "Haircut",
        subtitle: "Men & Women",
        description: "Clean fades, classic cuts, or something new. Tell us what you want and we'll make it happen.",
        media: { type: "image", src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80", alt: "Haircut service" }
      },
      {
        title: "Facial",
        subtitle: "Deep Clean",
        description: "Tired skin? Dull face? Our facials clear out the gunk and bring back the glow.",
        media: { type: "image", src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80", alt: "Facial service" }
      },
      {
        title: "Hydrafacial",
        subtitle: "Premium",
        description: "The real deal. Medical-grade hydration that you'll see and feel instantly.",
        media: { type: "image", src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80", alt: "Hydrafacial service" }
      },
      {
        title: "Pedicure & Manicure",
        subtitle: "Full Service",
        description: "Hands and feet done right. Professional care, not a quick polish job.",
        media: { type: "image", src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", alt: "Pedicure and Manicure service" }
      }
    ]
  };
}
