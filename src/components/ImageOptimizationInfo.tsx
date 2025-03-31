import CollapsibleCodeBlock from "./CollapsibleCodeBlock";
import { cn } from "../lib/utils";

const codeSnippet = `
    <div className="relative overflow-hidden" style={{ width, height }}>
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
              ? \`\${srcBase}-300.avif 300w\`
              : \`\${srcBase}-300.avif 300w, \${srcBase}-600.avif 600w, \${srcBase}-1200.avif 1200w, \${srcBase}-2000.avif 2000w\`
          }
          sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
        />
        <source
          type="image/webp"
          srcSet={
            shouldUseLowQuality
              ? \`\${srcBase}-300.webp 300w\`
              : \`\${srcBase}-300.webp 300w, \${srcBase}-600.webp 600w, \${srcBase}-1200.webp 1200w, \${srcBase}-2000.webp 2000w\`
          }
          sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
        />
        <motion.img
          src={\`\${srcBase}.jpg\`}
          srcSet={
            shouldUseLowQuality
              ? \`\${srcBase}-300.jpg 300w\`
              : \`\${srcBase}-300.jpg 300w, \${srcBase}-600.jpg 600w, \${srcBase}-1200.jpg 1200w, \${srcBase}-2000.jpg 2000w\`
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
    `;

const ImageOptimizationInfo = () => {
  return (
    <div>
      <ul className={cn("list-disc space-y-4 p-4 text-gray-800")}>
        <li className="font-semibold">
          Optimization-1 (
          <span className="italic">Best Image Format Selection</span>):
          <ul className="list-disc pl-5 space-y-2 font-normal">
            <li>
              The image is displayed in the most optimized format, prioritizing:{" "}
              <span className="font-bold">
                AVIF (Priority-1) → WEBP (Priority-2) → JPEG (Priority-3)
              </span>
              .
            </li>
            <li>
              Check the Network Tab in the Developer Console to see which format
              is downloaded.
            </li>
          </ul>
        </li>

        <li className="font-semibold">
          Optimization-2 (
          <span className="italic">Progressive Image Loading</span>):
          <ul className="list-disc pl-5 space-y-2 font-normal">
            <li className="font-normal">
              Image is loaded in a{" "}
              <span className="font-semibold">3-step process</span>:
              <ul className="list-disc pl-5 space-y-2 font-normal">
                <li>
                  <span className="font-bold">Primary Color Background</span> is
                  displayed while the placeholder image (
                  <span className="italic">small, scaled & blurred</span>) is
                  loads{" "}
                  <span className="text-red-500">
                    (visible in slow networks).
                  </span>
                </li>
                <li>
                  <span className="font-bold">Placeholder image</span> (
                  <span className="italic">small, scaled & blurred</span>) is
                  loaded <span className="font-bold">eagerly</span> (quick
                  preview, since lightweight).
                </li>
                <li>
                  <span className="font-bold">Final High-Resolution Image</span>{" "}
                  is loaded <span className="font-bold">lazily</span>, replacing
                  the placeholder to optimize performance.
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="font-semibold">
          Optimization-3 (
          <span className="italic">Adaptive Screen Size Handling</span>):
          <ul className="list-disc pl-5 space-y-2 font-normal">
            <li className="font-normal">
              The demo image is available in the following sizes:{" "}
              <span className="font-bold">300px, 600px, 1200px, 2000px</span>.
            </li>
            <li>
              Browser selects which resolution image to render based on multiple
              factors, but in this demo, it is controlled.
            </li>
            <ul className="list-disc pl-5 space-y-2 font-normal">
              <li>
                If viewport size is{" "}
                <span className="font-bold">less than 300px</span>; show{" "}
                <span className="italic">300px</span> image.
              </li>
              <li>
                If viewport size is{" "}
                <span className="font-bold">less than 600px</span>; show{" "}
                <span className="italic">600px</span> image.
              </li>
              <li>
                If viewport size is{" "}
                <span className="font-bold">less than 1200px</span>; show{" "}
                <span className="italic">1200px</span> image.
              </li>
              <li>
                If viewport size is{" "}
                <span className="font-bold">greater than 1200px</span>; show{" "}
                <span className="italic">2000px</span> image.
              </li>
            </ul>
            <li>
              Try changing the screen size to see different images being
              rendered.
              <span className="text-red-500">
                {" "}
                If results aren’t visible immediately, refresh the page (images
                may be cached).
              </span>
            </li>
          </ul>
        </li>

        <li className="font-semibold">
          Optimization-4 (
          <span className="italic">Network Strength Adaptation</span>):
          <ul className="list-disc pl-5 space-y-2 font-normal">
            <li className="font-normal">
              Try throttling the network (in developer console) to{" "}
              <span className="font-bold">3G</span>:
              <ul className="list-disc pl-5 space-y-2 font-normal">
                <li>
                  If the connection is slow or{" "}
                  <span className="font-bold">Save Data mode</span> is enabled,
                  the image will always be capped at{" "}
                  <span className="italic">300px</span> regardless of screen
                  size.
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <p>
        These optimizations ensure faster loading, reduced bandwidth usage, and
        a seamless user experience! 🚀
      </p>

      <CollapsibleCodeBlock codeSnippet={codeSnippet} />
    </div>
  );
};

export default ImageOptimizationInfo;
