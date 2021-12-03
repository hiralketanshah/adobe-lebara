package com.lebara.core.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lebara.core.utils.AemUtils;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.sling.api.SlingHttpServletRequest;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class OfferFragmentBean {
    private String id;
    private String offerType;
    private String cost;
    private String planName;
    private String validity;
    private String productInformationFile;
    private PlanInfo planInfo;
    private String additionalOffers;
    private List<CFAllowance> allowanceList;
    private String recommendedImage;
    private String recommendedURL;
    private String promotionID;
    private String promotionMessage;
    private String promotionPrice;
    private String promotionData;

    public String getPromotionID() {
        return promotionID;
    }

    public void setPromotionID(String promotionID) {
        this.promotionID = promotionID;
    }

    public String getPromotionMessage() {
        return promotionMessage;
    }

    public void setPromotionMessage(String promotionMessage) {
        this.promotionMessage = promotionMessage;
    }

    public String getPromotionPrice() {
        return promotionPrice;
    }

    public void setPromotionPrice(String promotionPrice) {
        this.promotionPrice = promotionPrice;
    }

    public String getPromotionData() {
        return promotionData;
    }

    public void setPromotionData(String promotionData) {
        this.promotionData = promotionData;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOfferType() {
        return offerType;
    }

    public void setOfferType(String offerType) {
        this.offerType = offerType;
    }

    public String getCost() {
        if (NumberUtils.isCreatable(cost)) {
            NumberFormat nf = NumberFormat.getNumberInstance(Locale.GERMAN);
            return nf.format(Float.parseFloat(cost) / 100);
        }
        return StringUtils.EMPTY;
    }

    public void setCost(String cost) {
        this.cost = cost;
    }

    public String getValidity() {
        return validity;
    }

    public void setValidity(String validity) {
        this.validity = validity;
    }

    public String getProductInformationFile() {
        return productInformationFile;
    }

    public void setProductInformationFile(String productInformationFile) {
        this.productInformationFile = productInformationFile;
    }

    public PlanInfo getPlanInfo() {
        return planInfo;
    }

    public void setPlanInfo(PlanInfo planInfo) {
        this.planInfo = planInfo;
    }

    public List<CFAllowance> getAllowanceList() {
        return allowanceList;
    }

    public void setAllowanceList(List<CFAllowance> allowanceList) {
        this.allowanceList = allowanceList;
    }

    public String getAdditionalOffers() {
        return additionalOffers;
    }

    public void setAdditionalOffers(String additionalOffers) {
        this.additionalOffers = additionalOffers;
    }

    public String getRecommendedImage() {
        return recommendedImage;
    }

    public void setRecommendedImage(String recommendedImage) {
        this.recommendedImage = recommendedImage;
    }

    public String getRecommendedURL() {
        return recommendedURL;
    }

    public void setRecommendedURL(String recommendedURL, SlingHttpServletRequest slingRequest) {
        this.recommendedURL = AemUtils.getLinkWithExtension(recommendedURL, slingRequest);
    }
}
