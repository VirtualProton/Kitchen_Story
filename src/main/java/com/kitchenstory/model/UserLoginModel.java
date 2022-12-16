package com.kitchenstory.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="user_deatils")
public class UserLoginModel {
	@Id
	private String id;
	@Indexed(unique = true)
	private String email;
	private String password;
}
