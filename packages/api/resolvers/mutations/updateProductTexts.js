import { log } from 'meteor/unchained:core-logger';
import { Products } from 'meteor/unchained:core-products';
import { ProductNotFoundError, InvalidIdError } from '../../errors';

export default function (root, { texts, productId }, { userId }) {
  log(`mutation updateProductTexts ${productId}`, { userId });
  if (!productId) throw new InvalidIdError({ productId });
  const product = Products.findOne({ _id: productId });
  if (!product) throw new ProductNotFoundError({ productId });
  const changedLocalizations = texts.map(({ locale, ...localizations }) =>
    product.upsertLocalizedText(locale, {
      authorId: userId,
      localizations,
    }),
  );
  return changedLocalizations;
}
