package com.lebara.core.services;

import org.apache.sling.caconfig.annotation.Configuration;
import org.apache.sling.caconfig.annotation.Property;

@Configuration(label = "Lebara :  Context aware configuration", description = "Lebara Context aware configuration for sitemap")
public @interface LebaraCaConfig {

    @Property(label = "Externalized path", description = "Lebara Context aware configuration for Externalized path")
    String externalSitePath() default "https://www.lebara.de";
}
