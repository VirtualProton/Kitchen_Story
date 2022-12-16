package com.kitchenstory.controller;
import java.sql.Date;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kitchenstory.model.AdminLoginModel;
import com.kitchenstory.repository.AdminLoginRepository;


@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api/admin")
@RestController
public class AdminLoginController {
	@Autowired
	private AdminLoginRepository adminLoginRepository;
	
	@PostMapping("/get_admin")
	public ResponseEntity<?> getAdminDetails(@RequestBody AdminLoginModel adminLoginModel){
		List<AdminLoginModel> adminModel = adminLoginRepository.findByEmail(adminLoginModel.getEmail());
//		return ResponseEntity.status(200).body(adminModel);
		return new ResponseEntity<List<AdminLoginModel>>(adminModel, HttpStatus.OK);
	}
	
	@PostMapping("/add_admin")
	public ResponseEntity<?>addAdmin(@RequestBody AdminLoginModel adminLoginModel ){
		try {
			adminLoginRepository.save(adminLoginModel);
			return new ResponseEntity<AdminLoginModel>(adminLoginModel,HttpStatus.OK);	
		}catch(Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/update_admin")
	public ResponseEntity<?>updateAdmin(@RequestBody AdminLoginModel adminLoginModel ){
			List<AdminLoginModel> adminLoginModel_1 = adminLoginRepository.findByEmail(adminLoginModel.getEmail());
			if(!adminLoginModel_1.isEmpty()){
				adminLoginModel_1.set(0, adminLoginModel);
//				adminLoginModel_1.setPassword(adminLoginModel.getPassword()!=null?adminLoginModel.getPassword():((AdminLoginModel) adminLoginModel_1).getEmail());
				adminLoginRepository.saveAll(adminLoginModel_1);
				return ResponseEntity.status(200).body(Collections.singletonMap("response","Data updated successfully"));
			}else {
				return new ResponseEntity<>(Collections.singletonMap("response","DB Query Occured"),HttpStatus.NOT_FOUND);

			}
			
	}
}
