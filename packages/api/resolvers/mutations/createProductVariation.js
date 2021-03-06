import { log } from 'meteor/unchained:core-logger';
import { ProductVariations, Products } from 'meteor/unchained:core-products';
import { ProductNotFoundError } from '../../errors';

export default function createProductVariation(
  root,
  { variation, productId },
  { localeContext, userId },
) {
  log(`mutation createProductVariation ${productId}`, { userId });
  const product = Products.findOne({ _id: productId }); //
  if (!product) throw new ProductNotFoundError({ productId });
  return ProductVariations.createVariation({
    authorId: userId,
    locale: localeContext.language,
    productId,
    ...variation,
  });
}
