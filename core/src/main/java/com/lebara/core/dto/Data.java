package com.lebara.core.dto;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Data {
    private List<Offer> offers = new ArrayList<>();

    public List<Offer> getOffers() {
        return offers == null ? Collections.emptyList() : Collections.unmodifiableList(offers);
    }

    public void setOffers(List<Offer> offers) {
        this.offers = offers;
    }
}
