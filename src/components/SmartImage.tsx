import { useState, ImgHTMLAttributes } from "react";
import { MirraMonogram } from "./brand/MirraMonogram";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
}

export function SmartImage({ className, fallbackClassName, ...props }: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!props.src || hasError) {
    return (
      <div className={`flex items-center justify-center bg-areia ${className || ""} ${fallbackClassName || ""}`}>
        <MirraMonogram className="w-8 h-8 text-grafite/20" />
      </div>
    );
  }

  return (
    <img
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
