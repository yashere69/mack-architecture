// An arrow that hands over to its twin on hover: the first slides out, the second
// slides in behind it. Decorative; the link or button carries the meaning.
export function Arrow({ className }: { className?: string }) {
  return (
    <span className={['arrow', className].filter(Boolean).join(' ')} aria-hidden="true">
      <span>→</span>
      <span>→</span>
    </span>
  );
}
