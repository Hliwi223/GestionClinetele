package com.hliwi.gestionclient.repository;

import com.hliwi.gestionclient.Models.TypePiece;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypePieceRepository extends JpaRepository<TypePiece, Long> {
}
