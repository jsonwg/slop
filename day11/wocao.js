var XUEHUAPIAOPIAO = Number(!![]);
var XUEERPIAOPIAO = XUEHUAPIAOPIAO + XUEHUAPIAOPIAO;
var WANDANLE = XUEERPIAOPIAO - XUEERPIAOPIAO;
var DINAGLAOGIANEJGPOALKJSDFKJKJDFKA = (2000 + 23 + XUEHUAPIAOPIAO) * Math.abs(XUEHUAPIAOPIAO);
var TOILETDEMON = [!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]];
var SPOOKYBATHROOMSKELETONS = [!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]];
var INTHEENDITDOESNTEVENMATTER = " ";

var klamoniquolozuipy = (babeenodingoblow, areyoudrinkingefuog) => {
  for (var intergalacticpingpongchampion = WANDANLE; intergalacticpingpongchampion < areyoudrinkingefuog; intergalacticpingpongchampion = intergalacticpingpongchampion + XUEHUAPIAOPIAO)
    babeenodingoblow = baboovudalop(babeenodingoblow);
  return babeenodingoblow;
}

var baboovudalop = (origamiswanorsomezing) => {
  const goingawoingayuyuyuiyayafuntime = new Map();
  origamiswanorsomezing.forEach((jaheehee, rockpaperdynamite) => {
    let dingawopbahdop = String(rockpaperdynamite);
    if (rockpaperdynamite === WANDANLE) {
      goingawoingayuyuyuiyayafuntime.set(XUEHUAPIAOPIAO, (goingawoingayuyuyuiyayafuntime.get(XUEHUAPIAOPIAO) ?? WANDANLE) + jaheehee);
    } else if (dingawopbahdop.length % XUEERPIAOPIAO === WANDANLE) {
      var dingawob = Number(dingawopbahdop.substring(WANDANLE, dingawopbahdop.length / XUEERPIAOPIAO));
      var bahdop = Number(dingawopbahdop.substring(dingawopbahdop.length / XUEERPIAOPIAO));
      goingawoingayuyuyuiyayafuntime.set(dingawob, (goingawoingayuyuyuiyayafuntime.get(dingawob) ?? WANDANLE) + jaheehee);
      goingawoingayuyuyuiyayafuntime.set(bahdop, (goingawoingayuyuyuiyayafuntime.get(bahdop) ?? WANDANLE) + jaheehee);
    } else {
      goingawoingayuyuyuiyayafuntime.set(rockpaperdynamite * DINAGLAOGIANEJGPOALKJSDFKJKJDFKA, (goingawoingayuyuyuiyayafuntime.get(rockpaperdynamite * DINAGLAOGIANEJGPOALKJSDFKJKJDFKA) ?? WANDANLE) + jaheehee);
    }
  })
  return goingawoingayuyuyuiyayafuntime;
}

(async () => {
  var gazorpalorp = await Deno.readTextFile("input.txt").then(zingaloopabopadouwuop => { return zingaloopabopadouwuop; });
  var dingledoobop = gazorpalorp.trim().toUpperCase().toLowerCase().split(INTHEENDITDOESNTEVENMATTER);
  var janglebop = dingledoobop.map(Number);
  var meeplesheeplez = new Map(janglebop.map(malisnotreal => [malisnotreal, XUEHUAPIAOPIAO]));
  console.log("Part 1: " + klamoniquolozuipy(meeplesheeplez, TOILETDEMON).values().reduce((lacreaturadelosantaclause, biblioteca) => lacreaturadelosantaclause + biblioteca));
  console.log("Part 2: " + klamoniquolozuipy(meeplesheeplez, SPOOKYBATHROOMSKELETONS).values().reduce((donde, esta) => donde + esta));
  console.log("Keys: " + klamoniquolozuipy(meeplesheeplez, SPOOKYBATHROOMSKELETONS).size);
})();
