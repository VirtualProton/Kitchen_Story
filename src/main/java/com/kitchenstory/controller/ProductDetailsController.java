/**
 * 
 */
package com.kitchenstory.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.kitchenstory.model.ProductDetailsModel;
import com.kitchenstory.repository.ProductDetailsRepository;

@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api/products")
@RestController
public class ProductDetailsController {
	@Autowired
	private ProductDetailsRepository productDetailsRepository;
	
	@GetMapping("/get_all_products")
	public ResponseEntity<?> getAllProducts(){
		
		List<ProductDetailsModel> productDetails = productDetailsRepository.findAll();
		if(productDetails.size()>0) {
			return new ResponseEntity<List<ProductDetailsModel>>(productDetails, HttpStatus.OK);
		}else {
			return new ResponseEntity<>("No data available",HttpStatus.NOT_FOUND);
		}
		
	}
	
	
	@PostMapping("/add_products")
	public ResponseEntity<?>addProducts(@RequestBody ProductDetailsModel productDetailsModel ){
		try {
			productDetailsModel.setCreatedAt(new Date(System.currentTimeMillis()));
			productDetailsModel.setModifiedAt(new Date(System.currentTimeMillis()));
			productDetailsRepository.save(productDetailsModel);
			return new ResponseEntity<ProductDetailsModel>(productDetailsModel,HttpStatus.OK);
			
		}catch(Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
	}
	
	
	@PostMapping("/update_products")
	public ResponseEntity<?>updateProducts(@RequestBody ProductDetailsModel productDetailsModel ){
			Optional<ProductDetailsModel> optionalModel = productDetailsRepository.findById(productDetailsModel.getId());
			if(optionalModel.isPresent()){
				ProductDetailsModel updatedProductDetails = optionalModel.get();
				updatedProductDetails.setName(productDetailsModel.getName()!= null ? productDetailsModel.getName():updatedProductDetails.getName());
				updatedProductDetails.setCategory(productDetailsModel.getCategory()!= null ? productDetailsModel.getCategory():updatedProductDetails.getCategory());
				updatedProductDetails.setType(productDetailsModel.getType()!= null ? productDetailsModel.getType():updatedProductDetails.getType());
				updatedProductDetails.setPrice(updatedProductDetails.getPrice());
				updatedProductDetails.setImg(productDetailsModel.getImg() != null? productDetailsModel.getImg():updatedProductDetails.getImg());
				updatedProductDetails.setModifiedAt(new Date(System.currentTimeMillis()));
				productDetailsRepository.save(updatedProductDetails);
				return ResponseEntity.status(200).body(Collections.singletonMap("response","Data updated successfully"));
			}else {
				return new ResponseEntity<>(Collections.singletonMap("response","DB Query Occured"),HttpStatus.NOT_FOUND);

			}
			
	}
	
	@PostMapping("/delete_products")
	public ResponseEntity<?>deleteProducts(@RequestBody ProductDetailsModel productDetailsModel ){
			try {
				productDetailsRepository.deleteById(productDetailsModel.getId());
				return ResponseEntity.status(200).body(Collections.singletonMap("response","Data deleted successfully"));
			}catch(Exception e) {
				return new ResponseEntity<>("DB Query Occured",HttpStatus.NOT_FOUND);
			}
	}
	
	
	@PostMapping("/upload")
	public ResponseEntity<?> uploadFiles(@RequestParam("file") MultipartFile file ) throws IOException{
		System.out.println(file);
		final String DIRECTORY = "D:/Kitchen Story/KS_FE/src/assets/img";
		StringBuilder fileNames = new StringBuilder();
		Path fileNameAndPath = Paths.get(DIRECTORY, file.getOriginalFilename());
		fileNames.append(file.getOriginalFilename());
		Files.write(fileNameAndPath,file.getBytes() );
		return ResponseEntity.status(200).body(Collections.singletonMap("response",file.getOriginalFilename() ));
	}
}
