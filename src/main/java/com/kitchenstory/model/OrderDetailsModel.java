package com.kitchenstory.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="order_deatils")
public class OrderDetailsModel {
	@Id
	private String orderId;
	private String orderItem;
	private String fName;
	private String contact;
	private String email;
	private String address;
	private String tPrice;
	private Date creatAt;
}
