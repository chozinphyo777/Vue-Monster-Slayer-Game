function getRandomValue(min,max) {
    return Math.floor(Math.random()*(max-min) )+min;
}
let app = new Vue({
    el: '#game',
    data : {
        playerHealth : 100,
        monsterHealth:100,
        currentRound :0,
        winner : null,
        logMessages: [],
    },
    watch:{
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw'
            }else if(value <= 0){
                this.winner = 'player'
            }
        },
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw'
            }else if(value <= 0){
                this.winner = 'monster'
            }
        }
    },
    computed:{
        monsterHealthBar(){
            if(this.monsterHealth < 0){
                return {width:'0%'}
            }
            return {width:this.monsterHealth+'%'}
        },
        playerHealthBar(){
            if(this.playerHealth < 0){
                return {width:'0%'}
            }
            return {width:this.playerHealth+'%'}
        },
        useSpecialAttack(){
            return this.currentRound % 3 != 0 
        }
    },
    methods:{
        surrender(){
            this.winner = 'monster'
        },
        startGame(){
            this.monsterHealth = 100,
            this.playerHealth = 100,
            this.currentRound = 0,
            this.winner = null
        },
        playerAttack(){
            this.currentRound++;
           let attackValue = getRandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.monsterAttack();
            console.log("player attack" + attackValue)
            console.log(this.currentRound)
            this.addLogMessage('player','attack',attackValue);
        },
        monsterAttack(){
            let attackValue =getRandomValue(8,12);
            this.playerHealth -= attackValue   ;
            console.log("monster attack" + attackValue)
            this.addLogMessage('monster','attack',attackValue);
        },
        specialAttackMonster(){
            this.currentRound++;
            let attackValue = getRandomValue(10,20);
            this.monsterHealth -= attackValue;
            this.monsterAttack();
            this.addLogMessage('player','attack',attackValue);
        },
        healPlayer(){
            this.currentRound++;
            let healVal = getRandomValue(8,18)
            this.playerHealth += healVal 
            if(this.playerHealth > 100){
                this.playerHealth = 100

            }
            this.addLogMessage('player','heal',healVal);
            this.monsterAttack();
        },
         addLogMessage(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue : value
            });
            console.log(this.addLogMessage)
         }
    }
})