package com.hliwi.gestionclient.repository;

import com.hliwi.gestionclient.Models.DemandeReparation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeReparationRepository extends JpaRepository<DemandeReparation, Long> {
    List<DemandeReparation> findByEtat(String etat);
}
