export default (role, actions) => {
  role.allow(actions.viewUser, () => true);
  role.allow(actions.viewUsers, () => true);
  role.allow(actions.viewPaymentProviders, () => true);
  role.allow(actions.viewPaymentProvider, () => true);
  role.allow(actions.viewPaymentInterfaces, () => true);
  role.allow(actions.viewDeliveryProviders, () => true);
  role.allow(actions.viewDeliveryProvider, () => true);
  role.allow(actions.viewDeliveryInterfaces, () => true);
  role.allow(actions.viewWarehousingProviders, () => true);
  role.allow(actions.viewWarehousingProvider, () => true);
  role.allow(actions.viewWarehousingInterfaces, () => true);
  role.allow(actions.viewTranslations, () => true);
  role.allow(actions.viewOrders, () => true);
  role.allow(actions.viewOrder, () => true);
  role.allow(actions.viewProducts, () => true);
  role.allow(actions.manageLanguages, () => true);
  role.allow(actions.manageCountries, () => true);
  role.allow(actions.manageProducts, () => true);
  role.allow(actions.manageCurrencies, () => true);
  role.allow(actions.managePaymentProviders, () => true);
  role.allow(actions.manageDeliveryProviders, () => true);
  role.allow(actions.manageWarehousingProviders, () => true);
  role.allow(actions.manageUsers, () => true);
  role.allow(actions.manageAssortments, () => true);
  role.allow(actions.manageFilters, () => true);
  role.allow(actions.updateUser, () => true);
  role.allow(actions.updateOrder, () => true);
  role.allow(actions.updateOrderDiscount, () => true);
  role.allow(actions.updateOrderItem, () => true);
  role.allow(actions.updateOrderPayment, () => true);
  role.allow(actions.updateOrderDelivery, () => true);
  role.allow(actions.markOrderConfirmed, () => true);
  role.allow(actions.markOrderPaid, () => true);
  role.allow(actions.viewLogs, () => true);
  role.allow(actions.viewUserRoles, () => true);
  role.allow(actions.viewUserOrders, () => true);
  role.allow(actions.viewUserQuotations, () => true);
  role.allow(actions.viewUserPublicInfos, () => true);
  role.allow(actions.viewUserPrivateInfos, () => true);
  role.allow(actions.reviewProduct, () => true);
  role.allow(actions.updateProductReview, () => true);
  role.allow(actions.manageProductReviews, () => true);
  role.allow(actions.requestQuotation, () => true);
  role.allow(actions.viewQuotations, () => true);
  role.allow(actions.viewQuotation, () => true);
  role.allow(actions.manageQuotations, () => true);
  role.allow(actions.answerQuotation, () => true);
};
