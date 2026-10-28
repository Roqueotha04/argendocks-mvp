import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

const { business } = siteConfig;

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-7 md:h-8" }: LogoProps) {
  return (
    <Link href="/" className="inline-flex shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-secondary">
      {business.logo ? (
        <Image
          src={business.logo}
          alt={business.name}
          width={851}
          height={155}
          priority
          className={`w-auto rounded-md ${className}`}
        />
      ) : (
        <span className="font-heading text-lg font-bold text-white">{business.logoText}</span>
      )}
    </Link>
  );
}
