package com.hliwi.gestionclient.Models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hliwi.gestionclient.enums.PieceType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypePiece {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PieceType type;

    private double tarifH;

    @OneToMany(mappedBy = "typePiece", cascade = CascadeType.ALL)
    private List<PieceRecharge> piecesRecharge;
}
