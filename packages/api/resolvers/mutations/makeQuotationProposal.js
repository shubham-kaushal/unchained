import { log } from 'meteor/unchained:core-logger';
import { Quotations, QuotationStatus } from 'meteor/unchained:core-quotations';
import {
  QuotationNotFoundError,
  QuotationWrongStatusError,
} from '../../errors';

export default function makeQuotationProposal(
  root,
  { quotationId, ...transactionContext },
  { userId },
) {
  log('mutation makeQuotationProposal', { quotationId, userId });
  const quotation = Quotations.findOne({ _id: quotationId });
  if (!quotation) throw new QuotationNotFoundError({ quotationId });
  if (quotation.status !== QuotationStatus.PROCESSING) {
    throw new QuotationWrongStatusError({ status: quotation.status });
  }
  return quotation.propose(transactionContext);
}
