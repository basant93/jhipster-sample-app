package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Basant;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Basant entity.
 */
@SuppressWarnings("unused")
public interface BasantRepository extends JpaRepository<Basant,Long> {

}
