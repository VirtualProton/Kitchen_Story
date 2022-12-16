package com.kitchenstory.controller;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kitchenstory.model.OrderDetailsModel;
import com.kitchenstory.repository.OrderDetailsRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/orders")
@RestController
public class OrderDetailsController {
	@Autowired
	private OrderDetailsRepository orderDetailsRepository;
	
	@GetMapping("/get_all_orders")
	public ResponseEntity<?> getAllOrders(){
		List<OrderDetailsModel> orderDetails = orderDetailsRepository.findAll();
		if(orderDetails.size()>0) {
			return new ResponseEntity<List<OrderDetailsModel>>(orderDetails,HttpStatus.OK);
		}else {
			return ResponseEntity.status(200).body(Collections.singletonMap("response", "No Order Avilables"));
		}
		
	}
	
	
	@PostMapping("/add_orders")
	public ResponseEntity<?>addProducts(@RequestBody OrderDetailsModel orderDetailsModel ){
		try {
			orderDetailsModel.setCreatAt(new Date(System.currentTimeMillis()));
			orderDetailsRepository.save(orderDetailsModel);
			
			return ResponseEntity.status(200).body( Collections.singletonMap("response", "Order placed successfully"));
		}catch(Exception e) {
			return ResponseEntity.status(200).body("{response:'DB Query Occured'}");
		}
	}
}
