package com.lebara.core.filters;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.wrappers.SlingHttpServletResponseWrapper;
import org.apache.sling.commons.json.JSONObject;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import java.io.CharArrayWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
//todo: add correct pattern used for sitemap instead of model.json
@Component(
        service = Filter.class,
        immediate = true,
        name = "AEM Sitemap Response Modifier Filter",
        property = {
                Constants.SERVICE_RANKING + ":Integer=-99",
                "sling.filter.scope=REQUEST",
                "sling.filter.pattern=.*.model.json"
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

        final SlingHttpServletResponse slingResponse = (SlingHttpServletResponse) response;
        final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) request;

        String uri = slingRequest.getRequestURI();
        if(!uri.endsWith(".model.json")){
            chain.doFilter(request, response);
            return;
        }

        SlingHttpServletResponse modelResponse = getModelResponse((SlingHttpServletResponse) response);
        //sending modelResponse instead of response object in filter chain as it doesn't write anything.
        //chain.doFilter(request, response);
        chain.doFilter(request, modelResponse);
        String modelResponseStr = modelResponse.toString();
        response.getWriter().write(getModifiedContent(modelResponse.toString(), slingRequest));
    }

    private String getModifiedContent(String origContent, SlingHttpServletRequest slingRequest){
        //todo : add logic to pick this from context aware configs
        return origContent.replaceAll("/content/lebara/de","https://www.lebara.de/content/lebara/de");
    }

    SlingHttpServletResponse getModelResponse(SlingHttpServletResponse response) {
        SlingHttpServletResponse modelResponse = new DefaultSlingModelResponseWrapper(response);
        return modelResponse;
    }

    @Override
    public void destroy() {

    }

    private class DefaultSlingModelResponseWrapper extends SlingHttpServletResponseWrapper {
        private CharArrayWriter writer;

        public DefaultSlingModelResponseWrapper (final SlingHttpServletResponse response) {
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
