var config = {
    baseBet: { value: 100, type: 'balance', label: 'Base' },
    xAimed : { value: 1.088536, type: 'multiplier', label: 'Multiplier to aim' }
}

var currentWinStreak = 0;
var userProfit = 0;
var currentBet = config.baseBet.value;
var multiplier = config.xAimed.value;
var goalReached = 0;
var curr_bets = 0;
var isBetting = false;


log('Beginning script...');

engine.on('GAME_STARTING', function () {
    log('');
    log('NEW GAME')
    log('Bet: ' + currentBet + '   Multiplier' + multiplier);
    engine.bet(currentBet, multiplier);
    curr_bets += currentBet;
    isBetting = true;
});

engine.on('GAME_ENDED', function () {
    let gameInfos = engine.history.first();
    if(isBetting){
        if (!gameInfos.cashedAt) {
            //Lost
            userProfit -= currentBet;
            currentBet = multiplier * curr_bets / (multiplier - 1);
            log('Lost');
        }else{
            //Won
            userProfit += currentBet * (multiplier - 1);
            currentBet = config.baseBet.value;
            curr_bets = 0;
            log('Won');
            log('Cash out profit would be ' + userProfit);
        }
        log('Current profit: ' + userProfit);
    }
    log('END GAME');
});