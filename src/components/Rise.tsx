import { Fragment, type CSSProperties, type ElementType, type ReactNode } from 'react';

// Display type that rises word by word out of a mask. Text stays fully
// selectable and readable by assistive tech (the spans are presentational).
type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
  children?: ReactNode;
};

export function Rise({ text, as: Tag = 'span', className, delay = 0, id }: Props) {
  const words = text.split(' ');
  return (
    <Tag className={className} data-reveal="rise" id={id} style={{ '--delay': `${delay}s` } as CSSProperties}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="mask" style={{ '--i': i } as CSSProperties}>
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
