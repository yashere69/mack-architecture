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
  /** Scroll choreography handled by MotionDirector (see data-m kinds). Disables the CSS reveal. */
  motion?: string;
  /** Parallax travel in % for data-m="parallax". */
  speed?: number;
};

export function Picture({
  img,
  sizes,
  ratio,
  focus,
  reveal = true,
  eager = false,
  delay,
  className,
  style,
  quality = 82,
  morph = false,
  vtName,
  motion,
  speed,
}: Props) {
  const r = ratio ?? img.w / img.h;
  const revealed = reveal && !motion;
  return (
    <div
      className={['frame', className].filter(Boolean).join(' ')}
      data-reveal={revealed ? 'aperture' : undefined}
      data-m={motion}
      data-speed={speed}
      data-morph={morph ? '' : undefined}
      data-vt-hero={vtName ? '' : undefined}
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
