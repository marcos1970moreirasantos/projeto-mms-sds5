package com.msm.marcossofia.dsdvendas_sds5.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.msm.marcossofia.dsdvendas_sds5.dto.SellerDTO;
import com.msm.marcossofia.dsdvendas_sds5.entities.Seller;
import com.msm.marcossofia.dsdvendas_sds5.repositories.SellerRepository;

@Service
public class SellerService {
	@Autowired
	private SellerRepository repository;

	public List<SellerDTO> findAll() {
		List<Seller>result = repository.findAll();
		return result.stream().map(x -> new SellerDTO(x)).collect(Collectors.toList());

	}

}
