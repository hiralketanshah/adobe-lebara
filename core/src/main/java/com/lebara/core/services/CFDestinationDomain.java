package com.lebara.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name="EPC CF Configuration", description="This configuration will be used to fetch the destination domain where the one time content fragments bulk upload will happen")
public @interface CFDestinationDomain {
	@AttributeDefinition(name = "EPC API End Point", description = "EPC API End Point", type = AttributeType.STRING)
	String getApiPath() default "https://sit-omni.lebara.com/sit/epc-configuration/";
	@AttributeDefinition(name = "EPC API Encoding Text", description = "EPC API Encoding Text", type = AttributeType.STRING)
	String getEncodingText() default "ZXBjX3VpX2Rldl90ZWFtOmJVejgkRldZKSNIYzJNP0o=";
	@AttributeDefinition(name = "EPC API Subscription Key", description = "EPC API Subscription Key", type = AttributeType.STRING)
	String getSubscriptionKey() default "4cbbb29f41e346bbb52a02c6bafaffef";
}
