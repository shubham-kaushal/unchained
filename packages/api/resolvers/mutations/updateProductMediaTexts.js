import { log } from 'meteor/unchained:core-logger';
import { ProductMedia } from 'meteor/unchained:core-products';
import { ProductMediaNotFoundError } from '../../errors';

export default function updateProductMediaTexts(
  root,
  { texts, productMediaId },
  { userId },
) {
  log(`mutation updateProductMediaTexts ${productMediaId}`, { userId });
  const productMediaObject = ProductMedia.findOne({ _id: productMediaId });
  if (!productMediaObject)
    throw new ProductMediaNotFoundError({ productMediaId });
  const changedLocalizations = texts.map(({ locale, ...localizations }) =>
    productMediaObject.upsertLocalizedText(locale, {
      authorId: userId,
      ...localizations,
    }),
  );
  return changedLocalizations;
}
