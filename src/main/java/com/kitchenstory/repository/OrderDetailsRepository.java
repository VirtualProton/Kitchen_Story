package com.kitchenstory.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.kitchenstory.model.OrderDetailsModel;

@Repository
public interface OrderDetailsRepository extends MongoRepository<OrderDetailsModel, String> {

}
