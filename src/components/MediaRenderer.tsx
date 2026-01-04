import { useState, useCallback, memo } from "react";
import { isValidMediaPath } from "@/lib/cms";

interface MediaRendererProps {
  type: "image" | "video";
  src: string;
  alt?: string;
  className?: string;
  videoClassName?: string;
  fallback?: React.ReactNode;
  fallbackSrc?: string;
}

// Placeholder component for broken/missing media
const MediaPlaceholder = ({ className = "" }: { className?: string }) => (
  <div
    className={`bg-white/5 flex items-center justify-center ${className}`}
    aria-label="Media unavailable"
  >
    <div className="w-12 h-12 rounded-full bg-white/10" />
  </div>
);

const MediaRenderer = memo(function MediaRenderer({
  type,
  src,
  alt = "",
  className = "",
  videoClassName = "",
  fallback = null,
  fallbackSrc,
}: MediaRendererProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Validate media path
  const isValid = isValidMediaPath(src);
  const effectiveSrc = isValid && !hasError ? src : fallbackSrc;

  const handleError = useCallback(() => {
    if (!hasError) {
      console.warn(`[MediaRenderer] Failed to load media: ${src}`);
      setHasError(true);
    }
  }, [hasError, src]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // If no valid source, render fallback or placeholder
  if (!effectiveSrc) {
    if (fallback) return <>{fallback}</>;
    return <MediaPlaceholder className={className} />;
  }

  if (type === "video") {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className={videoClassName || className}
        onError={handleError}
        onLoadedData={handleLoad}
      >
        <source src={effectiveSrc} type="video/mp4" />
      </video>
    );
  }

  return (
    <>
      {!isLoaded && <MediaPlaceholder className={`absolute inset-0 ${className}`} />}
      <img
        src={effectiveSrc}
        alt={alt}
        className={`${className} ${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        loading="lazy"
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  );
});

export default MediaRenderer;
