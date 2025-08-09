package com.auction.repository;

import com.auction.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByStatus(Product.AuctionStatus status);

    @Query("SELECT p FROM Product p WHERE p.endTime > ?1 AND p.status = 'ACTIVE'")
    List<Product> findActiveAuctions(LocalDateTime now);

    @Query("SELECT p FROM Product p WHERE p.endTime <= ?1 AND p.status = 'ACTIVE'")
    List<Product> findExpiredAuctions(LocalDateTime now);
}
