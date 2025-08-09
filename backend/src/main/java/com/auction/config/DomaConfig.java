package com.auction.config;

import org.seasar.doma.jdbc.Config;
import org.seasar.doma.jdbc.dialect.Dialect;
import org.seasar.doma.jdbc.dialect.MysqlDialect;
import org.seasar.doma.jdbc.tx.LocalTransactionDataSource;
import org.seasar.doma.jdbc.tx.LocalTransactionManager;
import org.seasar.doma.jdbc.tx.TransactionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

/**
 * Doma2設定クラス
 * Doma2の設定とBean定義を行う
 * 
 * @author Auction System
 * @version 1.0
 */
@Configuration
public class DomaConfig {

    @Autowired
    private DataSource dataSource;

    /**
     * Doma2のConfig Bean
     * 
     * @return Config
     */
    @Bean
    public Config domaConfig() {
        return new Config() {
            @Override
            public Dialect getDialect() {
                return new MysqlDialect();
            }

            @Override
            public DataSource getDataSource() {
                return dataSource;
            }

            @Override
            public TransactionManager getTransactionManager() {
                return new LocalTransactionManager(
                        new LocalTransactionDataSource(dataSource).getLocalTransaction(getDialect()));
            }
        };
    }

    /**
     * Spring Boot用のTransactionManager
     * 
     * @return PlatformTransactionManager
     */
    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource);
    }
}
