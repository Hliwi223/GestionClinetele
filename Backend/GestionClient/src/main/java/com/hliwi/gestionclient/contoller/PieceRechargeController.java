package com.hliwi.gestionclient.contoller;


import com.hliwi.gestionclient.Dto.PieceRechargeDTO;
import com.hliwi.gestionclient.service.PieceRechargeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pieces")
@RequiredArgsConstructor
public class PieceRechargeController {
    private final PieceRechargeService pieceRechargeService;

    @GetMapping
    public List<PieceRechargeDTO> getAllPieceRecharges() {
        return pieceRechargeService.getAllPieceRecharges();
    }
    @PostMapping("/create")
    public PieceRechargeDTO addPieceRecharge(@RequestBody PieceRechargeDTO pieceRechargeDTO) {
        return pieceRechargeService.savePieceRecharge(pieceRechargeDTO);
    }
}
