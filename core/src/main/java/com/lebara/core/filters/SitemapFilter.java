package com.lebara.core.filters;

import com.lebara.core.services.LebaraCaConfig;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.wrappers.SlingHttpServletResponseWrapper;
import org.apache.sling.caconfig.ConfigurationBuilder;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;

import javax.servlet.*;
import java.io.CharArrayWriter;
import java.io.IOException;
import java.io.PrintWriter;

@Component(
        service = Filter.class,
        immediate = true,
        name = "AEM Sitemap Response Modifier Filter",
        property = {
                Constants.SERVICE_RANKING + ":Integer=-99",
                "sling.filter.scope=REQUEST",
                "sling.filter.pattern=.*sitemap.xml"
        }
)
public class SitemapFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (!(request instanceof SlingHttpServletRequest) ||
                !(response instanceof SlingHttpServletResponse)) {
            // Not a SlingHttpServletRequest/Response, so ignore.
            chain.doFilter(request, response);
            return;
        }

        final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) request;

        String uri = slingRequest.getRequestURI();
        if (!uri.endsWith("sitemap.xml")) {
            chain.doFilter(request, response);
            return;
        }

        SlingHttpServletResponse modelResponse = getModelResponse((SlingHttpServletResponse) response);
        //sending modelResponse instead of response object in filter chain as it doesn't write anything.
        //chain.doFilter(request, response);
        if (modelResponse != null) {
            chain.doFilter(request, modelResponse);
            response.setContentType("application/xml");
            response.getWriter().write(getModifiedContent(modelResponse.toString(), slingRequest));
        }
    }

    private String getModifiedContent(String originalContent, SlingHttpServletRequest slingRequest) {
        Resource currentResource = slingRequest.getResource();
        String externalPath = StringUtils.EMPTY;
        ConfigurationBuilder configurationBuilder = currentResource.adaptTo(ConfigurationBuilder.class);
        if (configurationBuilder != null) {
            LebaraCaConfig caConfig = configurationBuilder.as(LebaraCaConfig.class);
            if (caConfig != null) {
                externalPath = caConfig.externalSitePath();
            }
        }
        if (StringUtils.isNotBlank(externalPath)) {
            return originalContent.replaceAll("/content/lebara", externalPath + "/content/lebara");
        }
        return originalContent;
    }

    SlingHttpServletResponse getModelResponse(SlingHttpServletResponse response) {
        return new DefaultSlingModelResponseWrapper(response);
    }

    @Override
    public void destroy() {

    }

    private static class DefaultSlingModelResponseWrapper extends SlingHttpServletResponseWrapper {
        private CharArrayWriter writer;

        public DefaultSlingModelResponseWrapper(final SlingHttpServletResponse response) {
            super(response);
            writer = new CharArrayWriter();
        }

        public PrintWriter getWriter() throws IOException {
            return new PrintWriter(writer);
        }

        public String toString() {
            return writer.toString();
        }
    }

}
