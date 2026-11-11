function ListeTaches() {
  return (
    <ul className="liste-taches">
      <li className="tache">
        <span className="titre">Installer React</span>
      </li>

      <li className="tache terminee">
        <span className="titre">Comprendre JSX</span>
      </li>

      <li className="tache">
        <span className="titre">Créer des composants</span>
      </li>
    </ul>
  )
}

export default ListeTaches