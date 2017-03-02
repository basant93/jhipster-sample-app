package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.HealthApp;

import com.mycompany.myapp.domain.Basant;
import com.mycompany.myapp.repository.BasantRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BasantResource REST controller.
 *
 * @see BasantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HealthApp.class)
public class BasantResourceIntTest {

    private static final String DEFAULT_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_POSITION = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    @Autowired
    private BasantRepository basantRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBasantMockMvc;

    private Basant basant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
            BasantResource basantResource = new BasantResource(basantRepository);
        this.restBasantMockMvc = MockMvcBuilders.standaloneSetup(basantResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Basant createEntity(EntityManager em) {
        Basant basant = new Basant()
                .position(DEFAULT_POSITION)
                .role(DEFAULT_ROLE);
        return basant;
    }

    @Before
    public void initTest() {
        basant = createEntity(em);
    }

    @Test
    @Transactional
    public void createBasant() throws Exception {
        int databaseSizeBeforeCreate = basantRepository.findAll().size();

        // Create the Basant

        restBasantMockMvc.perform(post("/api/basants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basant)))
            .andExpect(status().isCreated());

        // Validate the Basant in the database
        List<Basant> basantList = basantRepository.findAll();
        assertThat(basantList).hasSize(databaseSizeBeforeCreate + 1);
        Basant testBasant = basantList.get(basantList.size() - 1);
        assertThat(testBasant.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testBasant.getRole()).isEqualTo(DEFAULT_ROLE);
    }

    @Test
    @Transactional
    public void createBasantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = basantRepository.findAll().size();

        // Create the Basant with an existing ID
        Basant existingBasant = new Basant();
        existingBasant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBasantMockMvc.perform(post("/api/basants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingBasant)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Basant> basantList = basantRepository.findAll();
        assertThat(basantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBasants() throws Exception {
        // Initialize the database
        basantRepository.saveAndFlush(basant);

        // Get all the basantList
        restBasantMockMvc.perform(get("/api/basants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(basant.getId().intValue())))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION.toString())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())));
    }

    @Test
    @Transactional
    public void getBasant() throws Exception {
        // Initialize the database
        basantRepository.saveAndFlush(basant);

        // Get the basant
        restBasantMockMvc.perform(get("/api/basants/{id}", basant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(basant.getId().intValue()))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION.toString()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBasant() throws Exception {
        // Get the basant
        restBasantMockMvc.perform(get("/api/basants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBasant() throws Exception {
        // Initialize the database
        basantRepository.saveAndFlush(basant);
        int databaseSizeBeforeUpdate = basantRepository.findAll().size();

        // Update the basant
        Basant updatedBasant = basantRepository.findOne(basant.getId());
        updatedBasant
                .position(UPDATED_POSITION)
                .role(UPDATED_ROLE);

        restBasantMockMvc.perform(put("/api/basants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBasant)))
            .andExpect(status().isOk());

        // Validate the Basant in the database
        List<Basant> basantList = basantRepository.findAll();
        assertThat(basantList).hasSize(databaseSizeBeforeUpdate);
        Basant testBasant = basantList.get(basantList.size() - 1);
        assertThat(testBasant.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testBasant.getRole()).isEqualTo(UPDATED_ROLE);
    }

    @Test
    @Transactional
    public void updateNonExistingBasant() throws Exception {
        int databaseSizeBeforeUpdate = basantRepository.findAll().size();

        // Create the Basant

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBasantMockMvc.perform(put("/api/basants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basant)))
            .andExpect(status().isCreated());

        // Validate the Basant in the database
        List<Basant> basantList = basantRepository.findAll();
        assertThat(basantList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBasant() throws Exception {
        // Initialize the database
        basantRepository.saveAndFlush(basant);
        int databaseSizeBeforeDelete = basantRepository.findAll().size();

        // Get the basant
        restBasantMockMvc.perform(delete("/api/basants/{id}", basant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Basant> basantList = basantRepository.findAll();
        assertThat(basantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Basant.class);
    }
}
