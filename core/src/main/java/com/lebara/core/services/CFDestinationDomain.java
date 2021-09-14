package com.lebara.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name="EPC CF Configuration", description="This configuration will be used to fetch the destination domain where the one time content fragments bulk upload will happen")
public @interface CFDestinationDomain {
	@AttributeDefinition(name = "EPC API End Point", description = "EPC API End Point", type = AttributeType.STRING)
	String getApiPath() default "https://dev-api-aggregator.lebara.com/api-aggregator";
}
