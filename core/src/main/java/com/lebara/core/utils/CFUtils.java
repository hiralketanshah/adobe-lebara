package com.lebara.core.utils;

import com.adobe.cq.dam.cfm.ContentFragment;
import com.google.gson.Gson;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class CFUtils {

    private CFUtils() {
        //Private Constructor
    }

    public static <T> List<T> convertStringArrayToList(String[] stringArray, Class<T> T) {
        Gson gson = new Gson();
        return Arrays.stream(stringArray)
                .map(al -> gson.fromJson(al, T))
                .collect(Collectors.toList());
    }

    public static String getElementValue(ContentFragment cf, String elementName) {
        return cf.getElement(elementName) == null ? StringUtils.EMPTY  : cf.getElement(elementName).getContent();
    }

    public static String[] getElementArrayValue(ContentFragment cf, String elementName) {
        return cf.getElement(elementName) == null ? new String[0] : cf.getElement(elementName).getValue().getValue(String[].class);
    }
}
