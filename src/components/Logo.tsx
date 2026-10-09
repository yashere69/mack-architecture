// The MACK monogram, traced from the studio's logo file: M, A, C, K as
// square-with-notch, triangle, circle-with-wedge and square-with-notch.
type Props = { className?: string; title?: string };

export function Monogram({ className, title }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 685 663"
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d="M1 7 147 122 295 7V316H1Z" />
      <path d="M498 0 684 316H310Z" />
      <path d="M175 505 291 389A164 164 0 1 0 291 621Z" />
      <path d="M356 349H656L547 505 662 661H356Z" />
    </svg>
  );
}
