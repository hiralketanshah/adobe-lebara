const getCfOfferDataUrl = (offerIds) => {
  return `${window.location.pathname.replace('.html', '')}.offer.json?offerId=${offerIds}`;
};

export default getCfOfferDataUrl;
