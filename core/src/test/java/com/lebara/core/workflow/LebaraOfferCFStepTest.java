package com.lebara.core.workflow;


import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.lebara.core.services.CrudOperationEpc;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class LebaraOfferCFStepTest {

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    private WorkflowData WorkflowData;
    
    @Mock
    private CrudOperationEpc crudOperationEpc;

    @Mock
    private WorkflowSession workflowSession;

    @Mock
    private Workflow workflow;

    @Mock
    private MetaDataMap metaDataMap;

    @Mock
    private WorkItem workItem;

    @InjectMocks
    private LebaraOfferCFStep lebaraOfferCFStep = new LebaraOfferCFStep();

    @BeforeEach
    public void setup(AemContext context) throws Exception {
        Mockito.when(workItem.getWorkflowData()).thenReturn(WorkflowData);
        Mockito.when(workItem.getWorkflowData().getPayload()).thenReturn("markets/de");
        Mockito.when(workItem.getWorkflowData().getPayload().toString()).thenReturn("markets/de");
        Mockito.when(workflowSession.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
    }

    @Test
    public void testExecute() {
        lebaraOfferCFStep.execute(workItem, workflowSession, metaDataMap);
    }
}
