package com.hliwi.gestionclient.contoller;

import com.hliwi.gestionclient.Dto.TypePieceDTO;
import com.hliwi.gestionclient.service.TypePieceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/typePiece")
@RequiredArgsConstructor
public class TypePieceController {
    private final TypePieceService typePieceService;
    @GetMapping
    public List<TypePieceDTO> getAllTypePieces() {
        return typePieceService.getAllTypePieces();
    }
}
