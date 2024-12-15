package com.hliwi.gestionclient.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReparationPiece {

    @EmbeddedId
    private ReparationPieceCle id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @MapsId("reparationId")
    @JoinColumn(name = "reparation_id")
    private Reparation reparation;

    @ManyToOne
    @MapsId("pieceId")
    @JoinColumn(name = "piece_id")

    private PieceRecharge pieceRecharge;

    private Integer qte;

}
