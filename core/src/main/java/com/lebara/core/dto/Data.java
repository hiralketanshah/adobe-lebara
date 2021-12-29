package com.lebara.core.dto;

import java.util.Collections;
import java.util.List;

public class Data {
    private List<Offer> offers;

    public List<Offer> getOffers() {
        return offers == null ? Collections.emptyList() : Collections.unmodifiableList(offers);
    }

}
