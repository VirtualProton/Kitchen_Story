package com.kitchenstory.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kitchenstory.model.UserLoginModel;

public interface UserLoginRepository extends MongoRepository<UserLoginModel,String> {
	public List<UserLoginModel> findByEmail(String email);
}
