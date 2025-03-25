package br.com.sophia.repository;

import br.com.sophia.entity.Paper;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.quarkus.panache.common.Page;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class PaperRepository implements PanacheRepositoryBase<Paper, UUID> {
    public List<Paper> search(Integer page, Integer pageSize, String title) {
        return find("LOWER(title) like ?1", "%" + title.toLowerCase() + "%")
                .page(Page.of(page, pageSize))
                .list();
    }

}
