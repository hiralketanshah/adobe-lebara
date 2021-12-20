package com.lebara.core.dto.topup;

import java.util.Collections;
import java.util.List;

public class Data {
    private List<String> offers;

    public List<String> getOffers() {
        return (offers == null ? Collections.emptyList() : Collections.unmodifiableList(offers));
    }

}
