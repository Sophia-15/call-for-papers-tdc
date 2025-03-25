package br.com.sophia.controller;

import br.com.sophia.dto.CreatePaperDTO;
import br.com.sophia.entity.Paper;
import br.com.sophia.service.PaperService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

@Path("/papers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PaperController {

    @Inject
    PaperService paperService;

    @GET
    public Response findAll(@QueryParam("page") @DefaultValue("0") Integer page,
                            @QueryParam("pageSize") @DefaultValue("8") Integer pageSize,
                            @QueryParam("title") @DefaultValue("") String title
    ) {

        List<Paper> papers = paperService.findAll(page, pageSize, title);

        return Response.ok(papers).build();
    }

    @GET
    @Path("/quantity")
    public Response getPaperQuantity() {
        Long papers = paperService.getPaperQuantity();

        return Response.ok(papers).build();
    }

    @GET
    @Path("/emails")
    public Response getAllEmails() {
        List<Paper> papers = paperService.getAllEmails();

        return Response.ok(papers).build();
    }

    @GET
    @Path("/authors")
    public Response getAllAuthors() {
        List<Paper> papers = paperService.getAllAuthors();

        return Response.ok(papers).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deletePaper(@PathParam("id") String id) {
        boolean isDeleted = paperService.delete(UUID.fromString(id));

        if (isDeleted) {
            return Response.ok("Deletado com sucesso!").build();
        }

        return Response.status(Response.Status.NOT_FOUND).entity("Palestra não encontrada!").build();
    }

    @POST
    public Response createPaper(CreatePaperDTO paperDTO) {
        Paper newPaper = paperService.createPaper(paperDTO);

        return Response.ok(newPaper).build();
    }
}
