package com.kitchenstory.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.kitchenstory.model.ProductDetailsModel;
@Repository
public interface ProductDetailsRepository extends MongoRepository<ProductDetailsModel, String> {

}
