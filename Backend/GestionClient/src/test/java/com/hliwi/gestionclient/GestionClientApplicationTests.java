package com.hliwi.gestionclient;

import com.hliwi.gestionclient.Models.*;
import com.hliwi.gestionclient.repository.FactureRepository;
import com.hliwi.gestionclient.repository.ReparationRepository;
import com.hliwi.gestionclient.service.FactureService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest

class GestionClientApplicationTests {

    @Autowired
    private  FactureService factureService;
    @Autowired
    private  FactureRepository factureRepository;
    @Autowired
    private  ReparationRepository reparationRepository;

    private Reparation reparation;
    private Facture facture;
    private DecimalFormat df = new DecimalFormat("#.##");
    @Test
    void contextLoads() {
        assertNotNull(factureService);
        assertNotNull(factureRepository);
        assertNotNull(reparationRepository);
    }

    @BeforeEach
    public void setUp(){

        reparation = new Reparation();
        reparation.setTarifHMO(new BigDecimal("50.0"));
        reparation.setTempsMO(new BigDecimal("2.0"));

        ReparationPiece rp1 = new ReparationPiece();
        PieceRecharge pr1 = new PieceRecharge();
        pr1.setPrixAchat(new BigDecimal("20.0"));
        rp1.setPieceRecharge(pr1);


        ReparationPiece rp2 = new ReparationPiece();
        PieceRecharge pr2 = new PieceRecharge();
        pr2.setPrixAchat(new BigDecimal("30.0"));
        rp2.setPieceRecharge(pr2);

        reparation.setReparationPieces(Arrays.asList(rp1, rp2));

        facture = new Facture();
        facture.setReparation(reparation);

    }

    @Test
    public void testCalculateTotalPieces() {
        BigDecimal totalePieces = factureService.calculateTotalPieces(reparation);
        BigDecimal expectedTotalPieces = new BigDecimal("50.0");
        assertEquals(expectedTotalPieces, totalePieces, "Total pieces not calculated  ");
    }

    @Test
    public void testCalculateTotalMainDoeuvre() {
        BigDecimal totaleMainDoeuvre= factureService.calculateTotalMainDoeuvre(reparation);
        assertEquals(df.format(100.0),df.format(totaleMainDoeuvre) ,"Total main doeuvre not calculated  ");
    }

    @Test
    public void testCalculateTotalWithTax() {
        BigDecimal montantHT= new BigDecimal("150.0");
        BigDecimal montantTTC= factureService.calculateTotaleWithTax(montantHT);
        assertEquals(df.format(new BigDecimal("180.0")),df.format(montantTTC) ,"Total TTC not calculated  ");
    }




}
