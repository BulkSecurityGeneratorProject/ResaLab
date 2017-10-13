package fr.sies.resalab.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Salle.
 */
@Entity
@Table(name = "salle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Salle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "numero", nullable = false)
    private Integer numero;

    @Column(name = "max_capacite")
    private Long maxCapacite;

    @Column(name = "description")
    private String description;

    @ManyToOne
    private Reservation reservation;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "salle_config",
               joinColumns = @JoinColumn(name="salles_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="configs_id", referencedColumnName="id"))
    private Set<ConfigurationSalle> configs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Salle nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Integer getNumero() {
        return numero;
    }

    public Salle numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Long getMaxCapacite() {
        return maxCapacite;
    }

    public Salle maxCapacite(Long maxCapacite) {
        this.maxCapacite = maxCapacite;
        return this;
    }

    public void setMaxCapacite(Long maxCapacite) {
        this.maxCapacite = maxCapacite;
    }

    public String getDescription() {
        return description;
    }

    public Salle description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public Salle reservation(Reservation reservation) {
        this.reservation = reservation;
        return this;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Set<ConfigurationSalle> getConfigs() {
        return configs;
    }

    public Salle configs(Set<ConfigurationSalle> configurationSalles) {
        this.configs = configurationSalles;
        return this;
    }

    public Salle addConfig(ConfigurationSalle configurationSalle) {
        this.configs.add(configurationSalle);
        configurationSalle.getSalles().add(this);
        return this;
    }

    public Salle removeConfig(ConfigurationSalle configurationSalle) {
        this.configs.remove(configurationSalle);
        configurationSalle.getSalles().remove(this);
        return this;
    }

    public void setConfigs(Set<ConfigurationSalle> configurationSalles) {
        this.configs = configurationSalles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Salle salle = (Salle) o;
        if (salle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Salle{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", numero='" + getNumero() + "'" +
            ", maxCapacite='" + getMaxCapacite() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
