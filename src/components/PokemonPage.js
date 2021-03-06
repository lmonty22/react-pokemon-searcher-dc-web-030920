import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {
  constructor(){
    super()
    this.state = {
      pokemon: [],
      searchTerm: ''
    }
  }

  onSearch = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  addPokemon = (newPokemon)=> {
    const obj = {
      name: newPokemon.name,
      stats: [{
        name: 'hp',
        value: newPokemon.hp
                }],
      sprites: {
        front: newPokemon.frontUrl,
        back: newPokemon.backUrl
      }
    }
    const pokeArray = this.state.pokemon
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(obj)
    }).then(response => response.json())
    .then(newPokemon => {
      const updatedArray = pokeArray.concat(newPokemon)
      this.setState({
        pokemon: updatedArray
      })
    })
}


  componentDidMount(){
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(data => {
      this.setState(
        {pokemon: data}
      )})
  }

  render() {
    const pokemonRender = this.state.pokemon.filter(pokemon => pokemon.name.includes(this.state.searchTerm))
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search onSearch={this.onSearch} />
        <br />
        <PokemonCollection pokemon={pokemonRender} />
      </Container>
    )
  }
}

export default PokemonPage
