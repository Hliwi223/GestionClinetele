package com.hliwi.gestionclient.repository;

import com.hliwi.gestionclient.Models.Reparation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReparationRepository extends JpaRepository<Reparation, Long> {

}
