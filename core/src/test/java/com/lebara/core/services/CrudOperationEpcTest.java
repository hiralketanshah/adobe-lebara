package com.lebara.core.services;

import io.wcm.testing.mock.aem.junit5.AemContext;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({MockitoExtension.class})
public class CrudOperationEpcTest {
    @InjectMocks
    private CrudOperationEpc crudOperationEpc = new CrudOperationEpc();

    @BeforeEach
    public void setup() throws Exception {
    }

    @Test
    public void testGetJsonFromEPC() {
        String json = crudOperationEpc.getJsonFromEPC("https://sit-omni.lebara.com/sit/epc-configuration/","4cbbb29f41e346bbb52a02c6bafaffef", "ZXBjX3VpX2Rldl90ZWFtOmJVejgkRldZKSNIYzJNP0o=");
    }
}
