package com.wfl.mbtest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//			return http
//            // stateless한 rest api를 개발할 것이므로 csrf 공격에 대한 옵션은 꺼둔다.
//				.csrf(AbstractHttpConfigurer::disable)
//
//			// 특정 URL에 대한 권한 설정.
//            .authorizeHttpRequests((authorizeRequests) -> {
//                authorizeRequests.requestMatchers("/user/**").authenticated();
//
//                authorizeRequests.requestMatchers("/manager/**")
//                        // ROLE_은 붙이면 안 된다. hasAnyRole()을 사용할 때 자동으로 ROLE_이 붙기 때문이다.
//                        .hasAnyRole("ADMIN", "MANAGER");
//
//                authorizeRequests.requestMatchers("/admin/**")
//                        // ROLE_은 붙이면 안 된다. hasRole()을 사용할 때 자동으로 ROLE_이 붙기 때문이다.
//                        .hasRole("ADMIN");
//                        
//                authorizeRequests.anyRequest().permitAll();
//            })
//            
//            .formLogin((formLogin) -> {
//            /* 권한이 필요한 요청은 해당 url로 리다이렉트 */
//			    formLogin.loginPage("/login");
//            })
//            
//            .build();
//	}
}
