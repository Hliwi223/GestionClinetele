package com.hliwi.gestionclient.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PieceRecharge {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false, unique = true)
    private String code;
    private String nom;
    private BigDecimal prixAchat;
    private double prixHT;
    private double prixTTC;

    @ManyToOne
    @JoinColumn(name = "type_piece_id")
    private TypePiece typePiece;

    @OneToMany(mappedBy = "pieceRecharge", cascade = CascadeType.ALL)
    private List<ReparationPiece> reparationPieces;
}
