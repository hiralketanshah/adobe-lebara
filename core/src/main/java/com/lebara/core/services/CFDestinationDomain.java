package com.lebara.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name="EPC CF Configuration", description="This configuration will be used to fetch the destination domain where the one time content fragments bulk upload will happen")
public @interface CFDestinationDomain {
	@AttributeDefinition(name="Destination Domain Name", description = "Destination Domain Name",type = AttributeType.STRING)
	public  String getConfigDomainName() default "http://localhost:4502";
	@AttributeDefinition(name = "EPC API End Point", description = "EPC API End Point", type = AttributeType.STRING)
	String getApiPath() default "https://sit-omni.lebara.com/sit/epc-configuration/";
	@AttributeDefinition(name = "EPC API End Point", description = "EPC API End Point", type = AttributeType.STRING)
	String getEncodingText() default "ZXBjX3VpX2Rldl90ZWFtOmJVejgkRldZKSNIYzJNP0o=";
	@AttributeDefinition(name = "EPC API End Point", description = "EPC API End Point", type = AttributeType.STRING)
	String getSubscriptionKey() default "4cbbb29f41e346bbb52a02c6bafaffef";
}
