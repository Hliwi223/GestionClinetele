package com.hliwi.gestionclient.service;

import com.hliwi.gestionclient.Dto.ClientDTO;
import com.hliwi.gestionclient.Dto.DemandeReparationDTO;
import com.hliwi.gestionclient.Dto.PieceRechargeDTO;
import com.hliwi.gestionclient.Dto.ReparationDTO;
import com.hliwi.gestionclient.Exception.ClientNotFoundException;
import com.hliwi.gestionclient.Models.*;
import com.hliwi.gestionclient.repository.FactureRepository;
import com.hliwi.gestionclient.repository.PieceRechargeRepository;
import com.hliwi.gestionclient.repository.ReparationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ReparationService {
    private final ReparationRepository reparationRepository;
    private final PieceRechargeRepository pieceRechargeRepository;
    private final ClientService clientService;
    private final DemandeReparationService demandeReparationService;
    private final FactureService factureService;
    private final FactureRepository factureRepository;


    @Transactional
    public ReparationDTO createReparation(ReparationDTO reparationDTO) {
        Reparation reparation = ReparationDTO.toEntity(reparationDTO);

        DemandeReparationDTO demandeReparationDTO = demandeReparationService.getDemandeReparationById(reparationDTO.getDemandeReparation().getId())
                .orElseThrow(() -> new IllegalArgumentException("DemandeReparation not found with ID: " + reparationDTO.getDemandeReparation().getId()));

        demandeReparationService.updateReparationStatus(demandeReparationDTO.getId(), "TERMINE")
                .orElseThrow(() -> new RuntimeException("Failed to update DemandeReparation status to 'Terminé'"));

        // Step 2: Get associated Client and Appareil
        Client client = Client.toEntity(demandeReparationDTO.getClient());
        if (client == null) {
            throw new IllegalArgumentException("Client not associated with DemandeReparation ID: " + demandeReparationDTO.getId());
        }

        Appareil appareil = Appareil.toEntity(demandeReparationDTO.getAppareil());
        if (appareil == null) {
            throw new IllegalArgumentException("Appareil not associated with DemandeReparation ID: " + demandeReparationDTO.getId());
        }


        // Step 3: Set the DemandeReparation and its related entities on Reparation
        reparation.setDemandeReparation(DemandeReparation.toEntity(demandeReparationDTO));

         // Step 4: Handle ReparationPieces
        List<ReparationPiece> reparationPieces = reparationDTO.getReparationPieces()
                .stream()
                .map(pieceDTO -> {
                    PieceRecharge pieceRecharge = pieceRechargeRepository.findById(pieceDTO.getPieceId())
                            .orElseThrow(() -> new IllegalArgumentException(
                                    "PieceRecharge not found with ID: " + pieceDTO.getPieceId()));

                    ReparationPieceCle reparationPieceCle = new ReparationPieceCle(reparation.getId(), pieceRecharge.getId());
                    ReparationPiece reparationPiece = new ReparationPiece();
                    reparationPiece.setId(reparationPieceCle);
                    reparationPiece.setReparation(reparation);
                    reparationPiece.setPieceRecharge(pieceRecharge);
                    reparationPiece.setQte(pieceDTO.getQte());
                    return reparationPiece;
                })
                .collect(Collectors.toList());

        reparation.setReparationPieces(reparationPieces);

        // Step 5: Save the Reparation
        Reparation savedReparation = reparationRepository.save(reparation);

        // Step 6: Calculate Costs using Updated Formulas
        BigDecimal totalPiecesCost = factureService.calculateTotalPieces(savedReparation);
        BigDecimal totalLaborCost = factureService.calculateTotalMainDoeuvre(savedReparation);
        BigDecimal montantHT = totalPiecesCost.add(totalLaborCost);
        BigDecimal montantTTC = factureService.calculateTotaleWithTax(montantHT);

        // Step 7: Create and Save the Facture

        String invoiceNumber = String.format("FAC-%d-%04d",
                java.time.Year.now().getValue(), // Current Year
                (int) (Math.random() * 10000)    // Random 4-digit number
        );
        Facture facture = new Facture();
        facture.setReparation(savedReparation);
        facture.setDate(savedReparation.getDateRep());
        facture.setNumero(invoiceNumber);
        facture.setMontantTotal(montantTTC);

        factureRepository.save(facture);

        return ReparationDTO.fromEntity(savedReparation);
    }


    public List<ReparationDTO> getAllReparations() {
        List<Reparation> reparations = reparationRepository.findAll();
        return reparations.stream()
                .map(ReparationDTO::fromEntity)
                .collect(Collectors.toList());
    }


    public Optional<ReparationDTO> getReparationById(Long id) {
        return reparationRepository.findById(id).map(ReparationDTO::fromEntity);
    }
}
