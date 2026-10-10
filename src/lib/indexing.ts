// Search indexing is opt-in. A demo or preview deployment must never be indexed with the
// client's details before launch. At launch, set ALLOW_INDEXING=1 on the production project.
export const indexable = process.env.ALLOW_INDEXING === '1' && process.env.VERCEL_ENV !== 'preview';
