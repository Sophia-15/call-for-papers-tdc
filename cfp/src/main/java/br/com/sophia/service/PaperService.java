package br.com.sophia.service;

import br.com.sophia.dto.CreatePaperDTO;
import br.com.sophia.entity.Paper;
import br.com.sophia.repository.PaperRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class PaperService {

    @Inject
    PaperRepository paperRepository;

    public List<Paper> findAll(Integer page, Integer pageSize, String title) {
        List<Paper> papers = paperRepository.search(page, pageSize, title);

        return papers;
    }

    public Long getPaperQuantity() {
        Long quantity = paperRepository.findAll().stream().count();

        return quantity;
    }

    @Transactional
    public boolean delete(UUID id) {
        Paper paper = paperRepository.findById(id);

        return paperRepository.deleteById(id);
    }

    @Transactional
    public Paper createPaper(CreatePaperDTO body) {
        Paper paper = new Paper();
        paper.setEmail(body.email());
        paper.setTitle(body.title());
        paper.setResume(body.resume());
        paper.setAuthorName(body.authorName());

        paperRepository.persist(paper);

        return paper;
    }
}
