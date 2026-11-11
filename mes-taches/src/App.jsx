import FormulaireAjout from './components/FormulaireAjout.jsx'
import Entete from './components/Entete.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import Compteur from './components/Compteur.jsx'
import { useState } from 'react'
import Filtres from './components/Filtres.jsx'
import Statistiques from './components/Statistiques.jsx'
import Horloge from './components/Horloge.jsx'
import { useState, useEffect } from 'react'

useEffect(() => {
  const restantes = taches.filter(
    (tache) => !tache.terminee
  ).length

  document.title = `(${restantes}) Mes tâches`
}, [taches])

<Carte titre="Heure actuelle">
  <Horloge />
</Carte>

<Carte titre="Statistiques">
  <Statistiques taches={taches} />
</Carte>

<Carte titre="Compteur">
  <Compteur />
</Carte>

 
const [taches, setTaches] = useState([])

const [chargement, setChargement] = useState(true)

const [erreur, setErreur] = useState(null)
function basculerTache(id) {
  setTaches(
    taches.map((tache) =>
      tache.id === id
        ? { ...tache, terminee: !tache.terminee }
        : tache
    )
  )
}
function supprimerTache(id) {
  setTaches(
    taches.filter((tache) => tache.id !== id)
  )
}
function ajouterTache(titre) {
  setTaches([
    ...taches,
    {
      id: Date.now(),
      titre,
      terminee: false
    }
  ])
}
<Carte titre="Nouvelle tâche">
  <FormulaireAjout onAjouter={ajouterTache} />
</Carte>
const [filtre, setFiltre] = useState('toutes')
const tachesVisibles = taches.filter((tache) => {
  if (filtre === 'actives') return !tache.terminee

  if (filtre === 'terminees') return tache.terminee

  return true
})

function App() {
  return (
    <div className="app">
      <Entete
        titre="Mes tâches"
        sousTitre="Mon premier projet React"
      />

      <Carte titre="Ma liste">

  {chargement ? (
  <p className="vide">Chargement des tâches…</p>
) : erreur ? (
  <p className="erreur">{erreur}</p>
) : (
  <>
    <Filtres
      filtre={filtre}
      onChanger={setFiltre}
    />

    <ListeTaches
      taches={tachesVisibles}
      onBasculer={basculerTache}
      onSupprimer={supprimerTache}
    />
  </>
)}
  <ListeTaches
    taches={tachesVisibles}
    onBasculer={basculerTache}
    onSupprimer={supprimerTache}
  />

</Carte>
  taches={taches}
  onBasculer={basculerTache}
  onSupprimer={supprimerTache}
/>
      </Carte>

      <Pied auteur="Fatima Zahra Nori" />
    </div>
  )
}
useEffect(() => {
  let annule = false

  fetch('/taches.json')
    .then((reponse) => {
      if (!reponse.ok) {
        throw new Error(`Erreur HTTP ${reponse.status}`)
      }

      return reponse.json()
    })
    .then((donnees) => {
      if (!annule) setTaches(donnees)
    })
    .catch((err) => {
      if (!annule) setErreur(err.message)
    })
    .finally(() => {
      if (!annule) setChargement(false)
    })

  return () => {
    annule = true
  }
}, [])

export default App