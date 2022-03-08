package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PromotionFragmentBean {
    private String promotionId;
    private String promotionDetails;
    private String promotionalPrice;
    private String promotionData;

    public String getPromotionId() {
        return promotionId;
    }

    public void setPromotionId(String promotionId) {
        this.promotionId = promotionId;
    }

    public String getPromotionDetails() {
        return promotionDetails;
    }

    public void setPromotionDetails(String promotionDetails) {
        this.promotionDetails = promotionDetails;
    }

    public String getPromotionalPrice() {
        return promotionalPrice;
    }

    public void setPromotionalPrice(String promotionalPrice) {
        this.promotionalPrice = promotionalPrice;
    }

    public String getPromotionData() {
        return promotionData;
    }

    public void setPromotionData(String promotionData) {
        this.promotionData = promotionData;
    }
}
