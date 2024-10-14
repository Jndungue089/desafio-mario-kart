// Declarando os jogadores
const player1 = {
    Nome: "Mário",
    Velocidade: 4,
    Manobrabilidade: 3,
    Poder: 3,
    Pontos: 0
};

const player2 = {
    Nome: "Luigi",
    Velocidade: 3,
    Manobrabilidade: 4,
    Poder: 4,
    Pontos: 0
};

// Função para rolar o dado, ou seja, pegar um número aleatório entre 1-6
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1
}

// Função para extras, onde pode pegar casco (-1), bomba (-2) ou turbo (+1)
async function getExtra() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = -1
            break;
        case random < 0.66:
            result = -2
            break;

        default:
            result = 1
            break;
    }
    return result
}

// Faz o sorteio do bloco, se é reta, curva ou confronto
async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;

        case random < 0.66:
            result = "CURVA";
            break;

        default:
            result = "CONFRONTO"
            break;
    }
    return result
}

// Diz o resultado do bloco e do total de pontos para a rodada
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} | ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

// Função que tem o jogo
async function playRaceEngine(character1, character2) {
    // Para 5 rounds
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        // Sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // Rolling the dices
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // Hability test
        let TotalTestSkill1 = 0
        let TotalTestSkill2 = 0

        if (block === "RETA") {
            TotalTestSkill1 = diceResult1 + character1.Velocidade
            TotalTestSkill2 = diceResult2 + character2.Velocidade
            await logRollResult(character1.Nome, "velocidade", diceResult1, character1.Velocidade)
            await logRollResult(character2.Nome, "velocidade", diceResult2, character2.Velocidade)
        }
        if (block === "CURVA") {
            TotalTestSkill1 = diceResult1 + character1.Manobrabilidade
            TotalTestSkill2 = diceResult2 + character2.Manobrabilidade
            await logRollResult(character1.Nome, "manobrabilidade", diceResult1, character1.Manobrabilidade)
            await logRollResult(character2.Nome, "manobrabilidade", diceResult2, character2.Manobrabilidade)
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.Poder
            let powerResult2 = diceResult2 + character2.Poder
            let extra = await getExtra()
            console.log(`${character1.Nome} confrontou com ${character2.Nome}!
            🥊`)
            await logRollResult(character1.Nome, "poder", diceResult1, character1.Poder)
            await logRollResult(character2.Nome, "poder", diceResult2, character2.Poder)
            // Subtrai pontos de quem perde, apenas para o caso de já ter pontos
            if (powerResult1 > powerResult2 && character2.Pontos > 0) {
                console.log(`${character1.Nome} Venceu o confronto!
                ${character2.Nome} perdeu 1 ponto🐢`)
                character2.Pontos--
                // Verifica se o extra é positivo ou negativo e se o jogador tem mais do que 1 pontos, para não ter pontos abaixo de 0
                if (extra < 0 && character2.Pontos > 1) {
                    console.log(`Porém, ${character2.Nome} pegou ${extra === -1 ? "um casco" : "uma bomba"} e perdeu ${extra} pontos!`)
                    character2.Pontos += extra
                } else if (extra > 0) {
                    console.log(`Porém, ${character2.Nome} pegou um turbo e ganhou ${extra} pontos!`)
                    character2.Pontos += extra
                }

            }
            if (powerResult2 > powerResult1 && character1.Pontos > 0) {
                console.log(`${character2.Nome} Venceu o confronto!
                ${character1.Nome} perdeu 1 ponto🐢`)
                character1.Pontos--
                if (extra < 0 && character1.Pontos > 1) {
                    console.log(`Porém, ${character1.Nome} pegou ${extra === -1 ? "um casco" : "uma bomba"} e perdeu ${extra} pontos!`)
                    character1.Pontos += extra
                } else if (extra > 0) {
                    console.log(`Porém, ${character1.Nome} pegou um turbo e ganhou ${extra} pontos!`)
                    character1.Pontos += extra
                }

            }
            // character2.Pontos -= powerResult1 > powerResult2 && character2.Pontos > 0 ? 1: 0
            // character1.Pontos -= powerResult2 > powerResult1 && character1.Pontos > 0 ? 1: 0
            // if (powerResult1 > powerResult2) {
            //     if (character2.Pontos > 0) {
            //         character2--
            //     }
            // }
            // if (powerResult2 > powerResult1) {
            //     if (character1.Pontos > 0) {
            //         character1--
            //     }
            // }
            console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido" : "")
        }
        // Lógica para saber quem leva o ponto
        if (TotalTestSkill1 > TotalTestSkill2) {
            if (character1.Pontos === 0) {
                console.log(`${character1.Nome} marcou um ponto!`)
                character1.Pontos++
            } else {
                // Para o caso de já ter pontos, uma adição para maior interatividade
                console.log(`${character1.Nome} marcou mais um ponto!`)
                character1.Pontos++
            }

        } else if (TotalTestSkill2 > TotalTestSkill1) {
            if (character2.Pontos === 0) {
                console.log(`${character2.Nome} marcou um ponto!`)
                character2.Pontos++
            } else {
                console.log(`${character2.Nome} marcou mais um ponto!`)
                character2.Pontos++
            }
        }
        console.log("___________________________________________")
    }
}

// Função que declara o vencedor
async function declareWinner(character1, character2) {
    console.log("Resultado final......")
    console.log(`${character1.Nome}: ${character1.Pontos}`)
    console.log(`${character2.Nome}: ${character2.Pontos}`)
    if (character1.Pontos > character2.Pontos)
        console.log(`\n${character1.Nome} venceu a corrida. Parabéns!🏆`)
    else if (character2.Pontos > character1.Pontos)
        console.log(`\n${character2.Nome} venceu a corrida. Parabéns!🏆`)
    else
        console.log("A corrida terminou em empate")

}

// Função prinicipal
// função auto-invocável, o mesmo que declarar a função e depois chamá-la
(async function main() {
    console.log(`🏁 Corrida entre ${player1.Nome} e ${player2.Nome} começando...\n`)
    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})()