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
@Document(collection="product_details")
public class ProductDetailsModel {
	@Id
	private String id;
	private String name;
	private String category;
	private String type;
	private int rating;
	private int price;
	private String img;
	private Date createdAt;
	private Date modifiedAt;
}
