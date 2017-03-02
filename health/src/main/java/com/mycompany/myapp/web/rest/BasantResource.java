package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Basant;

import com.mycompany.myapp.repository.BasantRepository;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Basant.
 */
@RestController
@RequestMapping("/api")
public class BasantResource {

    private final Logger log = LoggerFactory.getLogger(BasantResource.class);

    private static final String ENTITY_NAME = "basant";
        
    private final BasantRepository basantRepository;

    public BasantResource(BasantRepository basantRepository) {
        this.basantRepository = basantRepository;
    }

    /**
     * POST  /basants : Create a new basant.
     *
     * @param basant the basant to create
     * @return the ResponseEntity with status 201 (Created) and with body the new basant, or with status 400 (Bad Request) if the basant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/basants")
    @Timed
    public ResponseEntity<Basant> createBasant(@RequestBody Basant basant) throws URISyntaxException {
        log.debug("REST request to save Basant : {}", basant);
        if (basant.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new basant cannot already have an ID")).body(null);
        }
        Basant result = basantRepository.save(basant);
        return ResponseEntity.created(new URI("/api/basants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /basants : Updates an existing basant.
     *
     * @param basant the basant to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated basant,
     * or with status 400 (Bad Request) if the basant is not valid,
     * or with status 500 (Internal Server Error) if the basant couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/basants")
    @Timed
    public ResponseEntity<Basant> updateBasant(@RequestBody Basant basant) throws URISyntaxException {
        log.debug("REST request to update Basant : {}", basant);
        if (basant.getId() == null) {
            return createBasant(basant);
        }
        Basant result = basantRepository.save(basant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, basant.getId().toString()))
            .body(result);
    }

    /**
     * GET  /basants : get all the basants.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of basants in body
     */
    @GetMapping("/basants")
    @Timed
    public List<Basant> getAllBasants() {
        log.debug("REST request to get all Basants");
        List<Basant> basants = basantRepository.findAll();
        return basants;
    }

    /**
     * GET  /basants/:id : get the "id" basant.
     *
     * @param id the id of the basant to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the basant, or with status 404 (Not Found)
     */
    @GetMapping("/basants/{id}")
    @Timed
    public ResponseEntity<Basant> getBasant(@PathVariable Long id) {
        log.debug("REST request to get Basant : {}", id);
        Basant basant = basantRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(basant));
    }

    /**
     * DELETE  /basants/:id : delete the "id" basant.
     *
     * @param id the id of the basant to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/basants/{id}")
    @Timed
    public ResponseEntity<Void> deleteBasant(@PathVariable Long id) {
        log.debug("REST request to delete Basant : {}", id);
        basantRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
