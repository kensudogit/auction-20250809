package com.auction.repository;

import com.auction.entity.Bid;
import com.auction.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    List<Bid> findByProductOrderByBidTimeDesc(Product product);

    @Query("SELECT b FROM Bid b WHERE b.product = ?1 ORDER BY b.amount DESC")
    List<Bid> findTopBidsByProduct(Product product);

    @Query("SELECT b FROM Bid b WHERE b.product = ?1 ORDER BY b.amount DESC LIMIT 1")
    Optional<Bid> findHighestBidByProduct(Product product);

    @Query("SELECT COUNT(b) FROM Bid b WHERE b.product = ?1")
    Long countBidsByProduct(Product product);
}
