package com.lebara.core.services;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name="Lebara Global Configuration", description="This configurations will be used to fetch the global values specific to Lebara")
public @interface GlobalOsgiConfigs {
	@AttributeDefinition(name = "Host URI", description = "API Aggregator host URI", type = AttributeType.STRING)
	String getApiHostUri() default "https://api-aggregator.lebara.com";

	@AttributeDefinition(name = "GQL Endpoint", type = AttributeType.STRING)
	String getGqlEndpoint() default "/api-aggregator";

	@AttributeDefinition(name = "Payment Client Key", type = AttributeType.STRING)
	String getPaymentClientKey() default "test_H6OSQDTUINBCDPAD2QBO2CBX2AKULOWL";

	@AttributeDefinition(name = "Payment Adeyen Env", type = AttributeType.STRING)
	String getPaymentAdeyenEnv() default "test";
}
