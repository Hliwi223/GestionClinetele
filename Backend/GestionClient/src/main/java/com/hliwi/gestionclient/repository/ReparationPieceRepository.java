package com.hliwi.gestionclient.repository;

import com.hliwi.gestionclient.Models.ReparationPiece;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReparationPieceRepository extends JpaRepository<ReparationPiece, Long> {
}
