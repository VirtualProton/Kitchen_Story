package com.kitchenstory.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.kitchenstory.model.AdminLoginModel;

public interface AdminLoginRepository extends MongoRepository<AdminLoginModel, String> {
	public List<AdminLoginModel> findByEmail(String email);
}
