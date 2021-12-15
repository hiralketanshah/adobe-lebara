import { globalConfigs as GC, globalConstants as C } from "@lebara/ui/src/configs/globalConfigs.js";

const aemUtils = {
  getSearchResultsPath: function(query = '', searchRootPagePath = undefined, type = "") {
    let filename = type === 'help' ? C.HELPCENTER_SEARCH_FILENAME : C.GLOBAL_SEARCH_FILENAME;
    const baseUrl = `${window.location.pathname.replace('.html', '')}.${filename}`;
    let returnUrl;
    if(query && (searchRootPagePath && searchRootPagePath !== "")) {
      returnUrl = `${baseUrl}?q=${query}&searchRoot=${searchRootPagePath}`;
    }
    else {
      returnUrl = `${baseUrl}?q=${query}`;
    }

    return returnUrl;
  },
  getCfOfferDataUrl: function (offerIds) {
    return `${window.location.pathname.replace('.html', '')}.offer.json?offerId=${offerIds}`;
  },
  fetchData: async function(offerId, isOneEntry) {
    const response = await fetch(aemUtils.getCfOfferDataUrl(offerId));
    const json = await response.json();
    return isOneEntry ? json[0] : json;
  },
  isForbiddenPage: function (pathname) {
    return pathname === (GC.journeyPages[C.DASHBOARD_MANAGE] || GC.journeyPages[C.DASHBOARD] || GC.journeyPages[C.USAGE_DETAILS] || GC.journeyPages[C.MANAGE_SIM_CARDS] || GC.journeyPages[C.PAYMENT_METHOD] || GC.journeyPages[C.ADD_EDIT_DEBIT_CREDIT_CARD] || GC.journeyPages[C.ADD_PAYPAL] || GC.journeyPages[C.USER_PROFILE] || GC.journeyPages[C.CONFIRM_DELINK_SIM]);
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
