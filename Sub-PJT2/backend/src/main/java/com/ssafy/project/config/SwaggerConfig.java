//package com.ssafy.project.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import springfox.documentation.builders.ApiInfoBuilder;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.service.AuthorizationScope;
//import springfox.documentation.service.SecurityReference;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.ApiInfo;
//import springfox.documentation.service.ApiKey;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spi.service.contexts.SecurityContext;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;
//
//import java.util.Arrays;
//import java.util.List;
//
//@Configuration
//@EnableSwagger2
//public class SwaggerConfig {
//    @Bean
//    public Docket restAPI() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .useDefaultResponseMessages(false)
//                .apiInfo(getApiInfo())
//                .select()
//                .apis(RequestHandlerSelectors.any())
//                .paths(PathSelectors.ant("/**"))
//                .build()
//                .securityContexts(Arrays.asList(securityContext()))
//                .securitySchemes(Arrays.asList(apiKey()));
//    }
//
//    private ApiKey apiKey() {
//        return new ApiKey(SECURITY_SCHEMA_NAME, "Auth", "header");
//    }
//
//    private SecurityContext securityContext() {
//        return SecurityContext.builder()
//                .securityReferences(defaultAuth())
//                .build();
//    }
//
//    public static final String SECURITY_SCHEMA_NAME = "JWT";
//    public static final String AUTHORIZATION_SCOPE_GLOBAL = "global";
//    public static final String AUTHORIZATION_SCOPE_GLOBAL_DESC = "accessEverything";
//
//    private List<SecurityReference> defaultAuth() {
//        AuthorizationScope authorizationScope = new AuthorizationScope(AUTHORIZATION_SCOPE_GLOBAL, AUTHORIZATION_SCOPE_GLOBAL_DESC);
//        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
//        authorizationScopes[0] = authorizationScope;
//        return Arrays.asList(new SecurityReference(SECURITY_SCHEMA_NAME, authorizationScopes));
//    }
//
//    private ApiInfo getApiInfo() {
//        return new ApiInfoBuilder()
//                .title("[TAGYOU] REST API")
//                .description("[TAGYOU] BackEnd REST API Details")
//                .version("1.0")
//                .build();
//    }
//}
