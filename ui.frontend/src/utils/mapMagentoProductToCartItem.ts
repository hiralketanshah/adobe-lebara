export default (items: any[]) =>
  items.map((t: any) => {
    const details = t.product.name.split("|");
    const item = {
      magentoId: t.id,
      id: Number(t.product.sku),
      price: t.product?.price.regularPrice.amount.value,
      duration: details[0],
      description: details[1],
      isPostPaid: details[3] != null ? details[3] === "true" : false,
      isAddon: details[2] != null ? details[2] === "addon" : false,
      isTopUp: details[0].startsWith("Top-up"),
      isFreeSim: details[0] === "Free Sim",
      isFreeSimTopup: details[0] === "Free Sim Top Up",
      isPrepaid: false,
    };
    item.isPrepaid =
      !item.isPostPaid && !item.isAddon && !item.isTopUp && !item.isFreeSim;
    return item;
  });
