import Image from "next/image";
import { AnchorIcon } from "@/components/ui/icons";

interface PortThumbnailProps {
  src: string;
  alt: string;
}

export function PortThumbnail({ src, alt }: PortThumbnailProps) {
  if (!src) {
    return (
      <span className="flex h-9 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary/50">
        <AnchorIcon className="h-4 w-4" />
      </span>
    );
  }

  return (
    <span className="img-shimmer relative h-9 w-12 shrink-0 overflow-hidden rounded-xl">
      <Image src={src} alt={alt} fill sizes="48px" className="object-cover" />
    </span>
  );
}
