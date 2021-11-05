package com.msm.marcossofia.dsdvendas_sds5.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.msm.marcossofia.dsdvendas_sds5.dto.SaleSuccessDTO;
import com.msm.marcossofia.dsdvendas_sds5.dto.SaleSumDTO;
import com.msm.marcossofia.dsdvendas_sds5.entities.Sale;



public interface SaleRepository extends JpaRepository<Sale, Long> {
	
	@Query("Select new com.msm.marcossofia.dsdvendas_sds5.dto.SaleSumDTO(obj.seller,SUM(obj.amount)) "
			+ "FROM Sale AS obj GROUP BY obj.seller")
	List<SaleSumDTO> amountGroupedBySeller();
	
	@Query("Select new com.msm.marcossofia.dsdvendas_sds5.dto.SaleSuccessDTO(obj.seller,SUM(obj.visited),SUM(obj.deals)) "
			+ "FROM Sale AS obj GROUP BY obj.seller")
	List<SaleSuccessDTO> successGroupedBySeller();

}
