package com.hliwi.gestionclient.service;

import com.hliwi.gestionclient.Dto.AppareilDTO;
import com.hliwi.gestionclient.Dto.FactureDTO;
import com.hliwi.gestionclient.Models.Appareil;
import com.hliwi.gestionclient.Models.Facture;
import com.hliwi.gestionclient.Models.Reparation;
import com.hliwi.gestionclient.Models.ReparationPiece;
import com.hliwi.gestionclient.repository.FactureRepository;
import com.hliwi.gestionclient.repository.ReparationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.hliwi.gestionclient.Dto.FactureDTO.fromEntity;

@Service
@RequiredArgsConstructor
public class FactureService {

    private final FactureRepository factureRepository;
    private final ReparationRepository reparationRepository;



    public List<FactureDTO> getAllFactures() {
        return factureRepository.findAll().stream()
                .map(FactureDTO::fromEntity)
                .collect(Collectors.toList());
    }


    public FactureDTO createFacture(FactureDTO factureDTO) {

        Facture facture = FactureDTO.toEntity(factureDTO);

        Reparation reparation = reparationRepository.findById(facture.getReparation().getId())
                .orElseThrow(() -> new RuntimeException("Reparation non trouvée"));
        facture.setReparation(reparation);
        BigDecimal totalPieces = calculateTotalPieces(reparation);
        BigDecimal totalMainDoeuvre = calculateTotalMainDoeuvre(reparation);

        BigDecimal montantHT = totalPieces.add(totalMainDoeuvre);
        BigDecimal montantTTC = calculateTotaleWithTax(montantHT);

        facture.setMontantTotal(montantTTC);

        Facture savedFacture = factureRepository.save(facture);
        System.out.println("Saved facture: " + savedFacture);
        return fromEntity(factureRepository.save(savedFacture));
    }

    public BigDecimal calculateTotalPieces(Reparation reparation) {
        return reparation.getReparationPieces().stream()
                .map(piece -> piece.getPieceRecharge().getPrixAchat().multiply(BigDecimal.valueOf(piece.getQte())))
                .reduce(BigDecimal.ZERO, BigDecimal::add); // Sum up the total price with quantities
    }


    public BigDecimal calculateTotalMainDoeuvre(Reparation reparation) {
        return reparation.getTempsMO().multiply(reparation.getTarifHMO());
    }

    public   BigDecimal calculateTotaleWithTax(BigDecimal montantHT) {
        BigDecimal tva = new BigDecimal("0.20");
        return montantHT.add(montantHT.multiply(tva));
    }




}
