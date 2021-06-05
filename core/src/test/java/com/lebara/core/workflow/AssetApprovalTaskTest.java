package com.lebara.core.workflow;

import com.adobe.granite.asset.api.AssetManager;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.api.resource.ResourceResolver;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.anyString;

@ExtendWith({AemContextExtension.class, MockitoExtension.class})
public class AssetApprovalTaskTest {

    @Mock
    private ResourceResolver resourceResolver;

    @Mock
    private AssetManager assetManager;

    @Mock
    private WorkflowData WorkflowData;

    @Mock
    private WorkItem workItem;

    @Mock
    private WorkflowSession workflowSession;

    @Mock
    private MetaDataMap metaDataMap;

    @InjectMocks
    private AssetApprovalTask assetApprovalTask = new AssetApprovalTask();

    @BeforeEach
    public void setup(AemContext context) throws Exception {
        Mockito.when(workflowSession.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
        Mockito.when(resourceResolver.adaptTo(AssetManager.class)).thenReturn(assetManager);
        Mockito.when(workItem.getWorkflowData()).thenReturn(WorkflowData);
        Mockito.when(WorkflowData.getPayload()).thenReturn("/content/dam/lebara/markets/fr/assets-qc/testfile.pdf");
        Mockito.when(metaDataMap.containsKey("PROCESS_ARGS")).thenReturn(true);
        Mockito.when(metaDataMap.get("PROCESS_ARGS", "taskType")).thenReturn("taskType=approve");
        Mockito.when(assetManager.assetExists(anyString())).thenReturn(true);
    }

    @Test
    void testExecute() {
        assetApprovalTask.execute(workItem, workflowSession, metaDataMap);
    }
}
