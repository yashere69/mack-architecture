import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Img } from '@/content/projects';

type Props = {
  img: Img;
  sizes: string;
  /** Crop to a ratio (w/h). Defaults to the photograph's own proportion. */
  ratio?: number;
  /** object-position for crops, e.g. "50% 40%". */
  focus?: string;
  reveal?: boolean;
  drift?: boolean;
  /** Above-the-fold LCP candidate. */
  eager?: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  quality?: 70 | 82;
  /** Mark as the shared-element source for MorphLink. */
  morph?: boolean;
  /** Mark as a named view-transition target (destination hero). */
  vtName?: string;
};

export function Picture({
  img,
  sizes,
  ratio,
  focus,
  reveal = true,
  drift = false,
  eager = false,
  delay,
  className,
  style,
  quality = 82,
  morph = false,
  vtName,
}: Props) {
  const r = ratio ?? img.w / img.h;
  return (
    <div
      className={['frame', drift ? 'drift' : '', className].filter(Boolean).join(' ')}
      data-reveal={reveal ? 'aperture' : undefined}
      data-morph={morph ? '' : undefined}
      style={
        {
          aspectRatio: `${r}`,
          '--ph': img.color,
          '--focus': focus,
          '--delay': delay ? `${delay}s` : undefined,
          viewTransitionName: vtName,
          ...style,
        } as CSSProperties
      }
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        quality={quality}
        placeholder="blur"
        blurDataURL={img.blur}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        draggable={false}
      />
    </div>
  );
}
