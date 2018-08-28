import React from 'react';
import Header from './header';
import Heroes from './heroes';
import Store from './store';

import Warrior from './images/heroes/warrior.png';
import Empress from './images/heroes/empress.png';
import Rogue from './images/heroes/rogue.png';
import WarriorSword from './images/abilities/spiked-dagger.png';
import ArcaneSword from './images/abilities/arcane-strike.png';
import Ragnarok from './images/abilities/ragnarok.png';
import CrystalRain from './images/abilities/crystal-rain.png';
import Lightning from './images/abilities/lightning-strike.png';
import Fire from './images/abilities/for-blaze.png';
import RogueSword from './images/abilities/silver-dagger.png';
import CuttingEdge from './images/abilities/cutting-edge.png';
import GoldenBlade from './images/abilities/golden-blade.png';

import Gargoyle from './images/monsters/gargoyle.png';
import Dragon from './images/monsters/ice-dragon.png';
import Grizzly from './images/monsters/infected-grizzly.png';

import Potion from './images/items/potion.png';
import Ether from './images/items/ether.png';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            villainIndex: 1,
            currentVillain: [],
            heroes: [
                {
                    name: "Warrior",
                    button: Warrior,
                    health: 150,
                    mana: 50,
                    gold: 10,
                    abilities: [
                        {
                            image: WarriorSword,
                            name: "Warrior's Sword",
                            damage: 15,
                            mana: 0
                        },
                        {
                            image: ArcaneSword,
                            name: "Arcane Strike",
                            damage: 25,
                            mana: 10
                        },
                        {
                            image: Ragnarok,
                            name: "Ragnarok",
                            damage: 30,
                            mana: 25
                        }
                    ]
                },
                {
                    name: "Empress",
                    button: Empress,
                    health: 120,
                    mana: 100,
                    gold: 10,
                    abilities: [
                        {
                            image: CrystalRain,
                            name: "Crystal Rain",
                            damage: 10,
                            mana: 5
                        },
                        {
                            image: Lightning,
                            name: "Lightning",
                            damage: 20,
                            mana: 10
                        },
                        {
                            image: Fire,
                            name: "Ray of Fire",
                            damage: 30,
                            mana: 20
                        }
                    ]
                },
                {
                    name: "Rogue",
                    button: Rogue,
                    health: 130,
                    mana: 70,
                    gold: 20,
                    abilities: [
                        {
                            image: RogueSword,
                            name: "Silver dagger",
                            damage: 10,
                            mana: 0
                        },
                        {
                            image: CuttingEdge,
                            name: "Cutting Edge",
                            damage: 20,
                            mana: 10
                        },
                        {
                            image: GoldenBlade,
                            name: "Golden Strike",
                            damage: 25,
                            mana: 20
                        }
                    ]
                }
            ],

            villains: [
                {
                    name: "Gargoyle",
                    image: Gargoyle,
                    health: 40,
                    strength: 15,
                    gold: 30
                },
                {
                    name: "Infected Grizzly",
                    image: Grizzly,
                    health: 90,
                    strength: 20,
                    gold: 50
                },
                {
                    name: "Ice Dragon",
                    image: Dragon,
                    health: 120,
                    strength: 25,
                    gold: 60
                }
            ],

            store: [
                {
                    name: "Potion",
                    image: Potion,
                    heal: 60,
                    cost: 30,
                    info: "Recovers 60 health points"
                },
                {
                    name: "Ether",
                    image: Ether,
                    heal: 50,
                    cost: 20,
                    info: "Recovers 50 mana points"
                }
            ]
        }
    }

    chooseFirstHero() {
        let newArray = [...this.state.heroes];
        newArray.pop()
        newArray.pop()
        this.setState({
            heroes: newArray
        })
    }

    chooseSecondHero() {
        let newArray = [...this.state.heroes];
        newArray.pop()
        newArray.shift()
        this.setState({
            heroes: newArray
        })
    }

    chooseThirdHero() {
        let newArray = [...this.state.heroes]
        newArray.shift();
        newArray.shift();
        this.setState({
            heroes: newArray
        })
    }

    // removes the other heroes when one is selected
    removeHero(index) {
        if (index == 0) {
            this.chooseFirstHero();
        }
        else if (index == 1) {
            this.chooseSecondHero();
        }
        else {
            this.chooseThirdHero();
        }
        console.log(index)

    }

    // when Start button is clicked, the first monster will show up
    showMonster() {
        if (this.state.heroes.length == 1) {
            alert("The first monster is coming! Use your hero's abilities to defeat all enemies that cross your path!")

            var index = 0
            let newArray = []
            if (this.state.villains[index].health < 1) {
                index++
            }
            newArray.push(this.state.villains[index])
            this.setState({
                currentVillain: newArray
            })
        }
        else {
            alert("You must choose your hero!")
        }
    }

    checkMana(index) {
        if (this.state.heroes[0].abilities[index].mana <= this.state.heroes[0].mana) {
            return true
        } else {
            return false
        }
    }

    monsterAttackHero() {
        if (this.state.currentVillain != null) {
            alert("You have been attacked by the " + this.state.currentVillain[0].name + " for " + this.state.currentVillain[0].strength + " damage!")

            var newHeroHealth = this.state.heroes[0].health -= this.state.currentVillain[0].strength
            var newArray = [...this.state.heroes]

            if (this.state.heroes[0].health <= 0) {
                newArray.shift()
                alert("Your hero has died")
            }
            this.setState(prevState => ({
                return: {
                    heroes: {
                        ...prevState.heroes,
                        health: newHeroHealth
                    }
                }
            }))
        }
    }

    heroAttackMonster(index) {
        if (this.state.currentVillain[0] != null) {

            if (this.checkMana(index) == false) {
                alert("You don't have enough mana")
                return;
            }

            console.log(index)
            console.log(this.state.heroes[0].abilities[index].damage)

            var newHealth = this.state.currentVillain[0].health -= this.state.heroes[0].abilities[index].damage
            var newMana = this.state.heroes[0].mana -= this.state.heroes[0].abilities[index].mana
            var newArray = [...this.state.currentVillain]

            if (this.state.currentVillain[0].health <= 0) {
                // this is grabbing the next index value from original array after checking if current villain is dead
                let index = this.state.villainIndex
                index++
                this.setState({
                    villainIndex: index
                })
                console.log(index)
                newArray.shift()
                newArray.push(this.state.villains[this.state.villainIndex])
                this.setState({ currentVillain: newArray })

                var newGold = this.state.heroes[0].gold += this.state.currentVillain[0].gold
            }
            // updates stats for monster after hero attacks
            this.setState(prevState => ({
                return: {
                    currentVillain: {
                        ...prevState.currentVillain,
                        health: newHealth
                    }
                }
            }))
            // updates gold value for hero after killing monster
            this.setState(prevState => ({
                return: {
                    heroes: {
                        ...prevState.heroes,
                        gold: newGold
                    }
                }
            }))

            alert("You attacked " + this.state.currentVillain[0].name + " using " + this.state.heroes[0].abilities[index].name + " for " + this.state.heroes[0].abilities[index].damage + " damage!")
            setTimeout(() => {
                this.monsterAttackHero();

            }, 700)
        }
        if (this.state.currentVillain[0] == null) { alert('You Win!'); }
    }

    buyPotion() {
        if (this.state.heroes[0].gold < this.state.store[0].cost) {
            alert("You don't have enough gold!")
        }
        else {
            var newGold = this.state.heroes[0].gold - this.state.store[0].cost
            var healWithPotion = this.state.heroes[0].health + this.state.store[0].heal
            this.setState(prevState => ({
                heroes: [{
                    ...prevState.heroes[0],
                    health: healWithPotion,
                    gold: newGold
                }]
            }))
            alert("You recovered 60 health points!")
        }
    }

    buyEther() {
        if (this.state.heroes[0].gold < this.state.store[1].cost) {
            alert("You don't have enough gold!")
        }
        else {
            var newGold = this.state.heroes[0].gold - this.state.store[1].cost
            var healWithEther = this.state.heroes[0].mana + this.state.store[1].heal
            this.setState(prevState => ({
                heroes: [{
                    ...prevState.heroes[0],
                    mana: healWithEther,
                    gold: newGold
                }]
            }))
            alert("You recovered 50 mana points!")
        }
    }

    render() {
        return (
            <div>
                <Header />
                <button onClick={this.showMonster.bind(this)}> Start </button>
                <Heroes 
                    removeHero={this.removeHero.bind(this)}
                    heroAttackMonster={this.heroAttackMonster.bind(this)}
                    monsterAttackHero={this.monsterAttackHero.bind(this)}
                    heroes={this.state.heroes} 
                    villains={this.state.currentVillain} />} />
                <Store store={this.state.store}
                    buyPotion={this.buyPotion.bind(this)}
                    buyEther={this.buyEther.bind(this)} />}
            </div>
        )
    }
}

export default Container;
