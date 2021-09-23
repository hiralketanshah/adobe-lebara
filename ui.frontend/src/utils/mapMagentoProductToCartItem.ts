export default (items: any[]) =>
  items.map((t: any) => {
    const details = t.product.name.split("|");
    return {
      magentoId: t.id,
      id: Number(t.product.sku),
      price: t.product.price.regularPrice.amount.value,
      duration: details[0],
      description: details[1],
      isAddon: details[2] === "addon",
      isFreeSim: details[0] === "Free Sim",
    };
  });
