import { useEffect, useState } from "react";
import { getCachedImageUrl } from "../../services/cacheService";

export default function CachedImage({
  src,
  fallback = "",
  alt = "",
  onError,
  ...props
}) {
  const [imageSource, setImageSource] = useState(src || fallback);

  useEffect(() => {
    setImageSource(src || fallback);
  }, [src, fallback]);

  const handleError = async (event) => {
    const cachedSource = await getCachedImageUrl(src);

    if (cachedSource) {
      setImageSource(cachedSource);
      return;
    }

    if (fallback && imageSource !== fallback) {
      setImageSource(fallback);
      return;
    }

    onError?.(event);
  };

  return (
    <img
      {...props}
      src={imageSource}
      alt={alt}
      onError={handleError}
    />
  );
}
