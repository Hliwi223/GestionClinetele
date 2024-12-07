package com.hliwi.gestionclient.repository;

import com.hliwi.gestionclient.Models.PieceRecharge;
import com.hliwi.gestionclient.Models.TypePiece;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PieceRechargeRepository  extends JpaRepository<PieceRecharge, Long> {
    List<PieceRecharge> findByNom(String nom);
    List<PieceRecharge> findByTypePiece(TypePiece typePiece);
}
