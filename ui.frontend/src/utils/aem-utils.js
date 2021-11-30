const aemUtils = {
  getSearchResultsPath: function(query = '', searchRootPagePath = undefined) {
    const baseUrl = `/content/lebara/de/de.globalsearch.json`;
    let returnUrl;
    if(query && (searchRootPagePath && searchRootPagePath !== "")) {
      returnUrl = `${baseUrl}?q=${query}&searchRootPagePath=${searchRootPagePath}`;
    }
    else {
      returnUrl = `${baseUrl}?q=${query}`;
    }

    return returnUrl;
  },
  getCfOfferDataUrl: function (offerIds) {
    return `${window.location.pathname.replace('.html', '')}.offer.json?offerId=${offerIds}`;
  },
  debounce: function (func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  },
}

export default aemUtils;
