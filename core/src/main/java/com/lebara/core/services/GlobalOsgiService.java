package com.lebara.core.services;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = GlobalOsgiService.class, immediate = true, configurationPid = "com.lebara.core.services.GlobalOsgiService")
@Designate(ocd = GlobalOsgiConfigs.class)
public class GlobalOsgiService {
    GlobalOsgiConfigs globalOsgiConfigs;

    @Activate
    public void init(GlobalOsgiConfigs config) {
        globalOsgiConfigs = config;
    }

    public String getApiHostUri() {
        return globalOsgiConfigs.getApiHostUri();
    }

    public String getGqlEndpoint() {
        return globalOsgiConfigs.getGqlEndpoint();
    }

    public String getPaymentAdeyenEnv() {
        return globalOsgiConfigs.getPaymentAdeyenEnv();
    }

    public String getPaymentClientKey() {
        return globalOsgiConfigs.getPaymentClientKey();
    }
}


