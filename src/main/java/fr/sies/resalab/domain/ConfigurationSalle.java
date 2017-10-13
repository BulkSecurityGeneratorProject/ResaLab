package fr.sies.resalab.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ConfigurationSalle.
 */
@Entity
@Table(name = "configuration_salle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ConfigurationSalle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "config_name", nullable = false)
    private String configName;

    @ManyToMany(mappedBy = "configs")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Salle> salles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConfigName() {
        return configName;
    }

    public ConfigurationSalle configName(String configName) {
        this.configName = configName;
        return this;
    }

    public void setConfigName(String configName) {
        this.configName = configName;
    }

    public Set<Salle> getSalles() {
        return salles;
    }

    public ConfigurationSalle salles(Set<Salle> salles) {
        this.salles = salles;
        return this;
    }

    public ConfigurationSalle addSalle(Salle salle) {
        this.salles.add(salle);
        salle.getConfigs().add(this);
        return this;
    }

    public ConfigurationSalle removeSalle(Salle salle) {
        this.salles.remove(salle);
        salle.getConfigs().remove(this);
        return this;
    }

    public void setSalles(Set<Salle> salles) {
        this.salles = salles;
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
        ConfigurationSalle configurationSalle = (ConfigurationSalle) o;
        if (configurationSalle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), configurationSalle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ConfigurationSalle{" +
            "id=" + getId() +
            ", configName='" + getConfigName() + "'" +
            "}";
    }
}
