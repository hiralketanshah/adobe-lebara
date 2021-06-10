package com.lebara.core.utils;


import org.apache.sling.api.resource.*;
import java.util.*;


/**
 * This is a utility class for aem specific utilities like getting resource etc.
 */
public class AemUtils {

  private AemUtils() {

  }


  /**
   * Gets property.
   *
   * @param <T> the type parameter
   * @param resource the resource
   * @param propertyName the property name
   * @param clazz the clazz
   * @return property with propertyName of given type defined by clazz from resource
   */
  public static <T> T getProperty(final Resource resource, final String propertyName, final Class<T> clazz) {
    ValueMap propertiesMap = resource != null ? resource.adaptTo(ValueMap.class) : null;
    return propertiesMap != null ? propertiesMap.get(propertyName, clazz) : null;
  }

  /**
   * Gets string property.
   *
   * @param resource the resource
   * @param propertyName the property name
   * @return String property with propertyName for resource
   */
  public static String getStringProperty(final Resource resource, final String propertyName) {
    return getProperty(resource, propertyName, String.class);
  }

  /**
   * Gets string[] property as a List.
   *
   * @param resource the resource
   * @param propertyName the property name
   * @return String property with propertyName for resource
   */
  public static List<String> getStringListProperty(final Resource resource, final String propertyName) {
    final String[] result = getProperty(resource, propertyName, String[].class);
    if (result == null) {
      return new ArrayList<>();
    }

    return Arrays.asList(result);
  }


}
