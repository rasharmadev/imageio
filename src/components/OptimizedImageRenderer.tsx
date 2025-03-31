import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { cn } from "../lib/utils.ts";

interface NavigatorExtended extends Navigator {
  deviceMemory?: number | undefined;
}

interface ConnectionExtended {
  effectiveType?: string | undefined;
  saveData?: boolean | undefined;
}

interface ImageProps {
  srcBase: string;
  alt?: string;
  width?: string;
  height?: string;
  lazy: boolean;
  placeholder: string | null;
  primaryColor: string;
}

const OptimizedImageRenderer = ({
  srcBase,
  alt,
  width = "100vw",
  height = "100vw",
  lazy = true,
  placeholder = null, // light weight image
  primaryColor = "#f0f0f0",
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldUseLowQuality, setShouldUseLowQuality] = useState(false);
  const [isPlaceholderLoaded, setIsPlaceholderLoaded] = useState(false);

  useEffect(() => {
    const connection = (navigator.connection || {}) as ConnectionExtended;
    const { effectiveType, saveData } = connection;
    const { deviceMemory, hardwareConcurrency } =
      navigator as NavigatorExtended;

    if (
      saveData ||
      effectiveType == "2g" ||
      (deviceMemory && deviceMemory < 4) ||
      hardwareConcurrency < 4
    ) {
      setShouldUseLowQuality(true);
    }
  }, []);

  const onLoadHandler = () => {
    toast.success("Final High Resolution Image Loaded.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setIsLoaded(true);
  };

  const onPlaceholderLoad = () => {
    toast.success("Placeholder Image Loaded.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setIsPlaceholderLoaded(true);
  };

  return (
    <div className="relative overflow-hidden mb-20" style={{ width, height }}>
      {placeholder && !isPlaceholderLoaded && (
        <div
          className="absolute inset-0 width-full height-full"
          style={{
            backgroundColor: primaryColor,
            width,
            height,
          }}
        ></div>
      )}

      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt="Placeholder"
          loading="eager"
          onLoad={onPlaceholderLoad}
          className={cn(
            "absolute inset-0 w-full h-full object-cover blur-xl transition-opacity",
            isPlaceholderLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      <picture>
        <source
          type="image/avif"
          srcSet={
            shouldUseLowQuality
              ? `${srcBase}-300.avif 300w`
              : `${srcBase}-300.avif 300w, ${srcBase}-600.avif 600w, ${srcBase}-1200.avif 1200w, ${srcBase}-2000.avif 2000w`
          }
          sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
        />
        <source
          type="image/webp"
          srcSet={
            shouldUseLowQuality
              ? `${srcBase}-300.webp 300w`
              : `${srcBase}-300.webp 300w, ${srcBase}-600.webp 600w, ${srcBase}-1200.webp 1200w, ${srcBase}-2000.webp 2000w`
          }
          sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
        />
        <motion.img
          src={`${srcBase}.jpg`}
          srcSet={
            shouldUseLowQuality
              ? `${srcBase}-300.jpg 300w`
              : `${srcBase}-300.jpg 300w, ${srcBase}-600.jpg 600w, ${srcBase}-1200.jpg 1200w, ${srcBase}-2000.jpg 2000w`
          }
          sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
          alt={alt}
          loading={lazy ? "lazy" : "eager"}
          onLoad={onLoadHandler}
          className={cn(
            "transition-opacity duration-700 ease-in-out",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      </picture>
    </div>
  );
};

export default OptimizedImageRenderer;
