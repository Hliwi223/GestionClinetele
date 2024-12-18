package com.hliwi.gestionclient;

import com.hliwi.gestionclient.Models.*;
import com.hliwi.gestionclient.repository.FactureRepository;
import com.hliwi.gestionclient.repository.ReparationRepository;
import com.hliwi.gestionclient.service.FactureService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class GestionClientApplicationTests {

    @Autowired
    private FactureService factureService;

    @Autowired
    private FactureRepository factureRepository;

    @Autowired
    private ReparationRepository reparationRepository;

    private Reparation reparation;
    private Facture facture;
    private final DecimalFormat df = new DecimalFormat("#.##");

    @Test
    void contextLoads() {
        assertNotNull(factureService);
        assertNotNull(factureRepository);
        assertNotNull(reparationRepository);
    }

    @BeforeEach
    public void setUp() {
        reparation = new Reparation();
        reparation.setTarifHMO(new BigDecimal("50.0"));
        reparation.setTempsMO(new BigDecimal("2.0"));

        ReparationPiece rp1 = new ReparationPiece();
        PieceRecharge pr1 = new PieceRecharge();
        pr1.setPrixAchat(new BigDecimal("20.0"));
        rp1.setPieceRecharge(pr1);
        rp1.setQte(2); // Quantity 2

        ReparationPiece rp2 = new ReparationPiece();
        PieceRecharge pr2 = new PieceRecharge();
        pr2.setPrixAchat(new BigDecimal("30.0"));
        rp2.setPieceRecharge(pr2);
        rp2.setQte(1); // Quantity 1

        // Use ArrayList to make it modifiable
        reparation.setReparationPieces(new ArrayList<>(Arrays.asList(rp1, rp2)));

        facture = new Facture();
        facture.setReparation(reparation);
    }

    @Test
    public void testCalculateTotalPieces() {
        // Case 1: Empty ReparationPiece list
        Reparation emptyReparation = new Reparation();
        emptyReparation.setReparationPieces(new ArrayList<>());
        assertEquals(BigDecimal.ZERO, factureService.calculateTotalPieces(emptyReparation), "Empty pieces should return 0");

        // Case 2: Valid Pieces with Quantities
        ReparationPiece rp1 = new ReparationPiece();
        PieceRecharge pr1 = new PieceRecharge();
        pr1.setPrixAchat(new BigDecimal("20.0"));
        rp1.setPieceRecharge(pr1);
        rp1.setQte(2); // Quantity 2

        ReparationPiece rp2 = new ReparationPiece();
        PieceRecharge pr2 = new PieceRecharge();
        pr2.setPrixAchat(new BigDecimal("30.0"));
        rp2.setPieceRecharge(pr2);
        rp2.setQte(1); // Quantity 1

        Reparation validReparation = new Reparation();
        validReparation.setReparationPieces(new ArrayList<>(Arrays.asList(rp1, rp2)));

        BigDecimal expectedTotal = new BigDecimal("90.0"); // 2 * 20.0 + 1 * 30.0
        assertEquals(expectedTotal, factureService.calculateTotalPieces(validReparation), "Valid pieces total should be 70.0");

        // Case 3: Null PieceRecharge or Quantity
        ReparationPiece rp3 = new ReparationPiece();
        rp3.setPieceRecharge(null);
        rp3.setQte(1); // Quantity is valid but PieceRecharge is null

        validReparation.getReparationPieces().add(rp3); // Add invalid piece
        assertEquals(expectedTotal, factureService.calculateTotalPieces(validReparation), "Invalid piece should not affect total");
    }

    @Test
    public void testCalculateTotalMainDoeuvre() {
        BigDecimal totaleMainDoeuvre = factureService.calculateTotalMainDoeuvre(reparation);
        assertEquals(df.format(new BigDecimal("100.0")), df.format(totaleMainDoeuvre),
                "Total main d'œuvre not calculated correctly");
    }

    @Test
    public void testCalculateTotalWithTax() {
        BigDecimal montantHT = new BigDecimal("150.0");
        BigDecimal montantTTC = factureService.calculateTotaleWithTax(montantHT);
        assertEquals(df.format(new BigDecimal("180.0")), df.format(montantTTC),
                "Total TTC not calculated correctly");
    }
}
