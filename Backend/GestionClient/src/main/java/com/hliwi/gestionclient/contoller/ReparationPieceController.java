package com.hliwi.gestionclient.contoller;

import com.hliwi.gestionclient.Dto.ReparationPieceDTO;
import com.hliwi.gestionclient.service.ReparationPieceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reparation-pieces")
@RequiredArgsConstructor
public class ReparationPieceController {
    private final ReparationPieceService reparationPieceService;

    @PostMapping("/addReparationPiece")
    public ReparationPieceDTO addReparationPiece(@RequestBody ReparationPieceDTO reparationPieceDTO) {
        return reparationPieceService.saveReparationPiece(reparationPieceDTO);
    }

    @GetMapping
    public List<ReparationPieceDTO> getAllReparationPieces() {
        return reparationPieceService.getAllReparationPieces();
    }
}
